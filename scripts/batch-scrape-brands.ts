import puppeteer from "puppeteer";
type Browser = any;
type Page = any;
import fs from "fs/promises";
import path from "path";

// --- CONFIG ---
const URLS_FILE = path.join(process.cwd(), "data", "brands-urls.json");
const OUTPUT_BASE = path.join(process.cwd(), "data", "scraped");
const BROWSER_ARGS = [
  "--no-sandbox",
  "--disable-setuid-sandbox",
  "--disable-blink-features=AutomationControlled",
  "--window-size=1920,1080",
];

// --- INTERFACES (Adapting to brands-urls structure) ---
interface ServiceUrl {
  text: string;
  url: string;
}

// brands-urls.json structure: { "A-D": [ ... ], "E-H": [ ... ] }
interface BrandsData {
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
  appliance: string; // Will use 'Brand Page' or similar generic type since this is a brand page
  symptom: string;
}

// --- HELPER FUNCTIONS ---
function sanitizeName(name: string): string {
  // Replace special characters (like '&', '/') with underscore or hyphen
  // e.g. "Black & Decker" -> "Black_and_Decker"
  // Keep logic consistent with previous scraper
  return name
    .replace(/&/g, "and")
    .replace(/[^a-zA-Z0-9]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase(); // Align with folder naming convention usually being lowercase
}

async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function scrapeAndFormatUrl(
  browser: Browser,
  service: ServiceUrl,
  category: string,
): Promise<void> {
  const { text, url } = service;
  const sanitizedText = sanitizeName(text);

  // Folder strategy: data/scraped/{brand-name}/
  const outputDir = path.join(OUTPUT_BASE, sanitizedText);
  // File name: {brand-name}.json
  const outputPath = path.join(outputDir, `${sanitizedText}.json`);

  console.log(`\nProcessing: [${category}] ${text} -> ${url}`);
  console.log(`Target: ${outputPath}`);

  // Create directory
  await fs.mkdir(outputDir, { recursive: true });

  const page = await browser.newPage();
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  );
  await page.setViewport({ width: 1920, height: 1080 });

  try {
    // Navigate
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });

    // Cloudflare/Antibot check
    console.log("  Waiting for content...");
    try {
      await page.waitForFunction(() => document.title !== "Just a moment...", {
        timeout: 30000,
      });
    } catch (e) {
      console.log(
        "  Timeout waiting for title change (might be OK if title is static).",
      );
    }
    await delay(3000); // Extra wait for dynamic loading

    // Parse (Format logic)
    console.log("  Parsing content...");
    const parsedData = await page.evaluate(() => {
      const title = document.title;
      const full_content: FullContent[] = [];
      let order = 0;

      document.body.querySelectorAll("*").forEach((element) => {
        const attributes: Attribute = {};
        for (const attr of element.attributes) {
          attributes[attr.name] = attr.value;
        }

        full_content.push({
          tag: element.tagName.toLowerCase(),
          content: element.textContent?.trim() || "",
          attributes: JSON.stringify(attributes),
          order: order++,
        });
      });

      return {
        title,
        full_content,
      };
    });

    // Construct final JSON
    // Adapt structure for brands
    // Assuming Brand Pages might be treated as a "Brand" entity + "Page" appliance or similar.
    // Or just generic structure.

    const finalJson: ParsedContent[] = [
      {
        brand: text, // The actual brand name e.g. "Ace"
        appliance: "Brand Page", // Placeholder
        symptom: "info", // Placeholder
        url: url,
        title: parsedData.title,
        full_content: parsedData.full_content,
      },
    ];

    await fs.writeFile(outputPath, JSON.stringify(finalJson, null, 2));
    console.log(`  SUCCESS: Saved to ${outputPath}`);
  } catch (err) {
    console.error(`  ERROR processing ${text}:`, err);
    await fs.appendFile(
      path.join(OUTPUT_BASE, "brands_failed.txt"),
      `${new Date().toISOString()} - ${text} - ${url} - ${err}\n`,
    );
  } finally {
    await page.close();
  }
}

async function main() {
  // Read URLs
  console.log(`Reading URL list from ${URLS_FILE}...`);
  const rawUrls = await fs.readFile(URLS_FILE, "utf-8");
  const categories: BrandsData = JSON.parse(rawUrls);

  // Launch Browser
  console.log("Launching browser...");
  const browser = await puppeteer.launch({
    headless: true,
    args: BROWSER_ARGS,
  });

  try {
    for (const [category, services] of Object.entries(categories)) {
      console.log(`\n--- Category: ${category} ---`);

      for (const service of services) {
        await scrapeAndFormatUrl(browser, service, category);
        // Small delay between requests
        await delay(2000);
      }
    }
  } finally {
    await browser.close();
    console.log("\nBatch scraping complete.");
  }
}

main().catch(console.error);
