import puppeteer from 'puppeteer';
import fs from 'fs/promises';
import path from 'path';

const SCRAPED_DATA_PATH = path.join(process.cwd(), 'data', 'scraped', 'cooktop-content.json');
const OUTPUT_DIR_BASE = path.join(process.cwd(), 'data', 'brands');

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
}

async function formatScrapedData() {
  console.log('Reading scraped data...');
  const scrapedData = JSON.parse(await fs.readFile(SCRAPED_DATA_PATH, 'utf-8'));
  const { url, html } = scrapedData;

  console.log('Launching browser to parse HTML...');
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.setContent(html);

  const parsedContent: ParsedContent = await page.evaluate(() => {
    const title = document.title;
    const full_content: FullContent[] = [];
    let order = 0;

    document.body.querySelectorAll('*').forEach(element => {
      const attributes: Attribute = {};
      for (const attr of element.attributes) {
        attributes[attr.name] = attr.value;
      }

      full_content.push({
        tag: element.tagName.toLowerCase(),
        content: element.textContent.trim(),
        attributes: JSON.stringify(attributes),
        order: order++,
      });
    });

    return {
      title,
      full_content,
    };
  });

  await browser.close();
  console.log('Browser closed.');

  // Extract brand, appliance, and symptom from URL
  const urlParts = new URL(url).pathname.split('/').filter(part => part);
  const appliance = urlParts[1].split('-')[0];
  const symptom = "service"; // It's a general service page
  const brand = 'cooktop'; // Since the URL is cooktop-repair-service, we'll assume the brand is "cooktop"

  const outputDir = path.join(OUTPUT_DIR_BASE, brand, appliance);
  await fs.mkdir(outputDir, { recursive: true });
  const outputPath = path.join(outputDir, `${symptom}.json`);


  const finalJson = [
    {
      brand,
      appliance,
      symptom,
      url,
      title: parsedContent.title,
      description: '', // No description available from the scraped data
      full_content: parsedContent.full_content,
    },
  ];

  console.log(`Saving formatted data to ${outputPath}...`);
  await fs.writeFile(outputPath, JSON.stringify(finalJson, null, 2));
  console.log('Formatted data saved.');
}

formatScrapedData().catch(error => {
  console.error('An error occurred during data formatting:', error);
  process.exit(1);
});