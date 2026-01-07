import fs from 'fs/promises';
import path from 'path';

const DATA_PATH = path.join(process.cwd(), 'data', 'brands', 'cooktop', 'cooktop', 'service.json');

async function inspectH2() {
  const rawData = await fs.readFile(DATA_PATH, 'utf-8');
  const data = JSON.parse(rawData);
  const pageData = Array.isArray(data) ? data[0] : data;
  const fullContent = pageData.full_content;

  console.log(`Total items: ${fullContent.length}`);
  const start = Math.max(0, fullContent.length - 50);
  
  for (let i = start; i < fullContent.length; i++) {
     const item = fullContent[i];
     console.log(`Index: ${i}, Tag: ${item.tag}, Content: "${item.content.substring(0, 50)}..."`);
  }
}

inspectH2().catch(console.error);
