import puppeteer, { Browser, Page } from 'puppeteer';
import fs from 'fs/promises';
import path from 'path';

// --- CONFIG ---
const URLS_FILE = path.join(process.cwd(), 'data', 'repair-services-urls.json');
const OUTPUT_BASE = path.join(process.cwd(), 'data', 'scraped');
const BROWSER_ARGS = [
  '--no-sandbox',
  '--disable-setuid-sandbox',
  '--disable-blink-features=AutomationControlled',
  '--window-size=1920,1080'
];

// --- INTERFACES ---
interface ServiceUrl {
  text: string;
  url: string;
}

interface RepairServicesData {
  [category: string]: ServiceUrl[];
}

interface Attribute {
  [key: string]: string;
}

interface FullContent {
  tag: string;
  content: string;
  attributes: string;
  order: number;
}

interface ParsedContent {
  title: string;
  full_content: FullContent[];
  url: string;
  brand: string;
  appliance: string;
  symptom: string;
}

// --- HELPER FUNCTIONS ---
function sanitizeName(name: string): string {
  // Replace special characters (like '&', '/') with underscore or hyphen
  // e.g. "Humidifier & Dehumidifier" -> "Humidifier_Dehumidifier"
  return name.replace(/[^a-zA-Z0-9]/g, '_').replace(/_+/g, '_').replace(/^_|_$/g, '');
}

async function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function scrapeAndFormatUrl(browser: Browser, service: ServiceUrl, category: string): Promise<void> {
  const { text, url } = service;
  const sanitizedText = sanitizeName(text);
  const outputDir = path.join(OUTPUT_BASE, sanitizedText);
  const outputPath = path.join(outputDir, `${sanitizedText}-repair-service.json`);

  console.log(`\nProcessing: [${category}] ${text} -> ${url}`);
  console.log(`Target: ${outputPath}`);

  // Create directory
  await fs.mkdir(outputDir, { recursive: true });

  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
  await page.setViewport({ width: 1920, height: 1080 });

  try {
    // Navigate
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });

    // Cloudflare check
    console.log('  Waiting for content...');
    try {
        await page.waitForFunction(() => document.title !== "Just a moment...", { timeout: 30000 });
    } catch(e) {
        console.log('  Timeout waiting for title change (might be OK if title is static).');
    }
    await delay(3000); // Extra wait for dynamic loading

    // Parse (Format logic)
    console.log('  Parsing content...');
    const parsedData = await page.evaluate(() => {
      const title = document.title;
      const full_content: FullContent[] = [];
      let order = 0;

      document.body.querySelectorAll('*').forEach(element => {
        // Skip script/style tags if we want cleaner output, but keeping raw-ish for now as per "format" script
        const attributes: Attribute = {};
        for (const attr of element.attributes) {
          attributes[attr.name] = attr.value;
        }

        full_content.push({
          tag: element.tagName.toLowerCase(),
          content: element.textContent?.trim() || '',
          attributes: JSON.stringify(attributes),
          order: order++,
        });
      });

      return {
        title,
        full_content
      };
    });

    // Construct final JSON
    // Mapping structure: 
    // We don't have distinct brand/appliance/symptom from simple URLs always, but we can infer or use placeholders.
    // The user wants "[text]-repair-service.json".
    // I will use sanitizedText as "appliance" or just "text".
    // "Brand" is generically Sears or implied.
    
    // Attempting to extract from URL if possible, else defaults.
    const urlObj = new URL(url);
    const urlParts = urlObj.pathname.split('/').filter(p => p);
    // e.g. /repair/cooktop-repair-service
    
    const finalJson: ParsedContent[] = [
      {
        brand: 'Sears', // Generic or N/A
        appliance: sanitizedText,
        symptom: 'repair-service',
        url: url,
        title: parsedData.title,
        full_content: parsedData.full_content
      }
    ];
    
    await fs.writeFile(outputPath, JSON.stringify(finalJson, null, 2));
    console.log(`  SUCCESS: Saved to ${outputPath}`);

  } catch (err) {
    console.error(`  ERROR processing ${text}:`, err);
    // Log error to a file
    await fs.appendFile(path.join(OUTPUT_BASE, 'dates_failed.txt'), `${new Date().toISOString()} - ${text} - ${url} - ${err}\n`);
  } finally {
    await page.close();
  }
}

async function main() {
  // Read URLs
  console.log('Reading URL list...');
  const rawUrls = await fs.readFile(URLS_FILE, 'utf-8');
  const categories: RepairServicesData = JSON.parse(rawUrls);

  // Launch Browser
  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    headless: true,
    args: BROWSER_ARGS
  });

  try {
    for (const [category, services] of Object.entries(categories)) {
      console.log(`\n--- Category: ${category} ---`);
      
      for (const service of services) {
        await scrapeAndFormatUrl(browser, service, category);
        // Small delay between requests to be polite/stealthy
        await delay(2000); 
      }
    }
  } finally {
    await browser.close();
    console.log('\nBatch scraping complete.');
  }
}

main().catch(console.error);
