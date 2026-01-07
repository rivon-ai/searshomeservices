
import fs from 'fs';
import path from 'path';
import { JSDOM } from 'jsdom';

const scrapedDataDir = path.join(process.cwd(), 'data/scraped');
const outputFilePath = path.join(process.cwd(), 'data/h2_content.json');

const main = async () => {
  const allH2Content: { [key: string]: any } = {};

  const processFile = (filePath: string, key: string) => {
    try {
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const jsonData = JSON.parse(fileContent);
      let h2s: string[] = [];

      if (jsonData.full_content && Array.isArray(jsonData.full_content)) {
        h2s = jsonData.full_content
          .filter((item: any) => item.tag === 'h2')
          .map((item: any) => item.content);
      } else if (jsonData.html && typeof jsonData.html === 'string') {
        const dom = new JSDOM(jsonData.html);
        const h2Elements = dom.window.document.querySelectorAll('h2');
        h2s = Array.from(h2Elements).map(h2 => h2.textContent || '');
      }

      allH2Content[key] = h2s;
    } catch (error) {
      console.error(`Error processing file ${filePath}:`, error);
    }
  };

  const topLevelFiles = fs.readdirSync(scrapedDataDir);

  for (const file of topLevelFiles) {
    const fullPath = path.join(scrapedDataDir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      const folderName = file;
      const filesInFolder = fs.readdirSync(fullPath);
      const jsonFile = filesInFolder.find(f => f.endsWith('.json'));
      if (jsonFile) {
        processFile(path.join(fullPath, jsonFile), folderName);
      }
    } else if (file.endsWith('.json')) {
      const key = file.replace('.json', '');
      processFile(fullPath, key);
    }
  }

  fs.writeFileSync(outputFilePath, JSON.stringify(allH2Content, null, 2));
  console.log(`Successfully generated h2_content.json at ${outputFilePath}`);
};

main();
