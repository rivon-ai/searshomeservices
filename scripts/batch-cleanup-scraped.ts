
import * as fs from 'fs';
import * as path from 'path';

const SCRAPED_DIR = 's:\\RIVON\\searshomeservices\\data\\scraped';

interface ScrapedNode {
  tag: string;
  content: string;
  attributes: string;
  order: number;
}

interface ScrapedFile {
  brand: string;
  appliance: string;
  symptom: string;
  url: string;
  title: string;
  full_content: ScrapedNode[];
}

function cleanupContent(nodes: ScrapedNode[]): ScrapedNode[] {
  if (!nodes || nodes.length === 0) return [];

  // 1. Find start index (first h1)
  let startIndex = nodes.findIndex(node => node.tag.toLowerCase() === 'h1');
  if (startIndex === -1) {
    console.warn('  No H1 tag found. Starting from beginning.');
    startIndex = 0;
  }

  // 2. Find end index (first footer)
  let endIndex = nodes.findIndex(node => node.tag.toLowerCase() === 'footer');
  if (endIndex === -1) {
    console.warn('  No Footer tag found. Going to end.');
    endIndex = nodes.length;
  }

  // Slice content
  let sliced = nodes.slice(startIndex, endIndex);

  // 3. Filter out Scripts, Styles, and Navs from within the slice
  sliced = sliced.filter(node => {
    const tag = node.tag.toLowerCase();
    return tag !== 'script' && tag !== 'style' && tag !== 'nav' && tag !== 'noscript' && tag !== 'iframe';
  });

  return sliced;
}

async function processFiles() {
  if (!fs.existsSync(SCRAPED_DIR)) {
    console.error(`Directory not found: ${SCRAPED_DIR}`);
    return;
  }

  const sections = fs.readdirSync(SCRAPED_DIR);

  for (const section of sections) {
    const sectionPath = path.join(SCRAPED_DIR, section);
    if (!fs.statSync(sectionPath).isDirectory()) continue;

    const files = fs.readdirSync(sectionPath);
    const jsonFile = files.find(f => f.endsWith('-repair-service.json') && !f.includes('cleaned'));

    if (jsonFile) {
      const filePath = path.join(sectionPath, jsonFile);
      console.log(`Processing: ${jsonFile}`);

      try {
        const rawData = fs.readFileSync(filePath, 'utf-8');
        let data: any = JSON.parse(rawData);

        // Handle array root
        if (Array.isArray(data)) {
          if (data.length > 0) {
            data = data[0];
          } else {
            console.warn(`  Empty array in ${jsonFile}`);
            continue;
          }
        }

        if (data && data.full_content) {
          const cleanedContent = cleanupContent(data.full_content);
          
          const cleanedData = {
            ...data,
            full_content: cleanedContent
          };

          const outputFilename = jsonFile.replace('.json', '-cleaned.json');
          const outputPath = path.join(sectionPath, outputFilename);

          fs.writeFileSync(outputPath, JSON.stringify(cleanedData, null, 2));
          console.log(`  Saved cleaned file to: ${outputFilename}`);
        } else {
            console.warn(`  No full_content found in ${jsonFile}`);
            if (data) console.log('  Keys:', Object.keys(data));
        }

      } catch (error) {
        console.error(`  Error processing ${jsonFile}:`, error);
      }
    }
  }
}

processFiles();
