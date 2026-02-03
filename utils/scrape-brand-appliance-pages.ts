import puppeteer from "puppeteer";
type Browser = any;
type Page = any;
import fs from "fs/promises";
import path from "path";
import { existsSync } from "fs";

// --- CONFIG ---
const URLS_FILE = path.join(process.cwd(), "data", "brand-appliance-urls.json");
const OUTPUT_BASE = path.join(
  process.cwd(),
  "data",
  "repairServiceForBrandsAppliances",
);
const BROWSER_ARGS = [
  "--no-sandbox",
  "--disable-setuid-sandbox",
  "--disable-blink-features=AutomationControlled",
  "--window-size=1920,1080",
];

// --- INTERFACES ---
interface ApplianceUrl {
  appliance: string;
  url: string;
}

interface BrandApplianceData {
  [brand: string]: ApplianceUrl[];
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
function sanitizeSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function scrapeAndSave(
  browser: Browser,
  brand: string,
  item: ApplianceUrl,
): Promise<void> {
  const { appliance, url } = item;

  const brandSlug = sanitizeSlug(brand);
  const applianceSlug = sanitizeSlug(appliance);

  const outputDir = path.join(OUTPUT_BASE, brandSlug);
  const outputPath = path.join(outputDir, `${applianceSlug}.json`);

  // Check existence
  if (existsSync(outputPath)) {
    console.log(`Skipping (exists): ${brand} - ${appliance}`);
    return;
  }

  console.log(`\nProcessing: [${brand}] ${appliance} -> ${url}`);
  console.log(`Target: ${outputPath}`);

  await fs.mkdir(outputDir, { recursive: true });

  const page = await browser.newPage();
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  );
  await page.setViewport({ width: 1920, height: 1080 });

  try {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });

    try {
      await page.waitForFunction(() => document.title !== "Just a moment...", {
        timeout: 10000,
      });
    } catch (e) {
      // ignore
    }

    await delay(2000);

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

    const finalJson: ParsedContent[] = [
      {
        brand: brand,
        appliance: appliance,
        symptom: "info",
        url: url,
        title: parsedData.title,
        full_content: parsedData.full_content,
      },
    ];

    await fs.writeFile(outputPath, JSON.stringify(finalJson, null, 2));
    console.log(`  SUCCESS: Saved to ${outputPath}`);
  } catch (err) {
    console.error(`  ERROR processing ${brand} ${appliance}:`, err);
    await fs.appendFile(
      path.join(OUTPUT_BASE, "scrape_failures.txt"),
      `${new Date().toISOString()} - ${brand} - ${appliance} - ${url} - ${err}\n`,
    );
  } finally {
    await page.close();
  }
}

async function main() {
  if (!existsSync(URLS_FILE)) {
    console.error(`Input file not found: ${URLS_FILE}`);
    process.exit(1);
  }

  console.log(`Reading URL list from ${URLS_FILE}...`);
  const rawUrls = await fs.readFile(URLS_FILE, "utf-8");
  const brandData: BrandApplianceData = JSON.parse(rawUrls);

  console.log("Launching browser...");
  const browser = await puppeteer.launch({
    headless: true,
    args: BROWSER_ARGS,
  });

  try {
    const brandsEntries = Object.entries(brandData);
    console.log(`Found ${brandsEntries.length} brands to process.`);

    // Concurrency Limit
    const CONCURRENCY = 5;

    for (let i = 0; i < brandsEntries.length; i += CONCURRENCY) {
      const chunk = brandsEntries.slice(i, i + CONCURRENCY);
      console.log(
        `\n--- Processing Chunk ${Math.floor(i / CONCURRENCY) + 1} / ${Math.ceil(brandsEntries.length / CONCURRENCY)} ---`,
      );

      await Promise.all(
        chunk.map(async ([brand, appliances]) => {
          if (!Array.isArray(appliances)) {
            console.warn(`Skipping ${brand}: appliances is not an array`);
            return;
          }
          for (const item of appliances) {
            await scrapeAndSave(browser, brand, item);
            // Random delay between appliances
            await delay(500 + Math.random() * 500);
          }
        }),
      );
    }
  } finally {
    await browser.close();
    console.log("\nScraping complete.");
  }
}

main().catch(console.error);
