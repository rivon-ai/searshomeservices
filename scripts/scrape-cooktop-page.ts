import puppeteer from "puppeteer";
type Browser = any;
type Page = any;
import fs from "fs/promises";
import path from "path";

const URL = "https://www.searshomeservices.com/repair/cooktop-repair-service";
const OUTPUT_DIR = path.join(process.cwd(), "data", "scraped");
const JSON_OUTPUT_PATH = path.join(OUTPUT_DIR, "cooktop-content.json");
const CSV_OUTPUT_PATH = path.join(OUTPUT_DIR, "cooktop-content.csv");

async function scrapeCooktopPage() {
  console.log("Launching browser...");
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-blink-features=AutomationControlled",
    ],
  });
  const page = await browser.newPage();
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  );

  console.log(`Navigating to ${URL}...`);
  await page.goto(URL, { waitUntil: "domcontentloaded" });

  // Wait for potential Cloudflare challenge
  console.log("Waiting for content...");
  try {
    // Wait for a clear indicator of the real page, or just wait a fixed time if unsure
    // Real page likely has a title different from "Just a moment..."
    await page.waitForFunction(() => document.title !== "Just a moment...", {
      timeout: 30000,
    });
    // Give it a bit more time to fully render
    await new Promise((r) => setTimeout(r, 5000));
  } catch (e) {
    console.log("Timeout waiting for title change, might still be stuck.");
  }

  console.log("Getting page content...");
  const htmlContent = await page.content();

  await browser.close();
  console.log("Browser closed.");

  // Ensure output directory exists
  await fs.mkdir(OUTPUT_DIR, { recursive: true });

  // Save as JSON
  console.log(`Saving JSON to ${JSON_OUTPUT_PATH}...`);
  const jsonData = {
    url: URL,
    html: htmlContent,
  };
  await fs.writeFile(JSON_OUTPUT_PATH, JSON.stringify(jsonData, null, 2));
  console.log("JSON file saved.");

  // Save as CSV
  console.log(`Saving CSV to ${CSV_OUTPUT_PATH}...`);
  const csvHeader = '"url","html"';
  const csvRow = `"${URL}","${htmlContent.split('"').join('""')}"`;
  const csvContent = `${csvHeader}
${csvRow}`;
  await fs.writeFile(CSV_OUTPUT_PATH, csvContent);
  console.log("CSV file saved.");

  console.log("Scraping complete!");
}

scrapeCooktopPage().catch((error) => {
  console.error("An error occurred during scraping:", error);
  process.exit(1);
});
