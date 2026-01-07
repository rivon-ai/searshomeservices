
import * as fs from 'fs';
import * as path from 'path';

const SCRAPED_DIR = 's:\\RIVON\\searshomeservices\\data\\scraped';

async function replaceFiles() {
  if (!fs.existsSync(SCRAPED_DIR)) {
    console.error(`Directory not found: ${SCRAPED_DIR}`);
    return;
  }

  const sections = fs.readdirSync(SCRAPED_DIR);
  let count = 0;

  for (const section of sections) {
    const sectionPath = path.join(SCRAPED_DIR, section);
    if (!fs.statSync(sectionPath).isDirectory()) continue;

    const files = fs.readdirSync(sectionPath);
    const cleanedFile = files.find(f => f.endsWith('-cleaned.json'));

    if (cleanedFile) {
      const cleanedPath = path.join(sectionPath, cleanedFile);
      const originalFilename = cleanedFile.replace('-cleaned.json', '.json');
      const originalPath = path.join(sectionPath, originalFilename);

      try {
        // Rename cleaned file to original filename (this effectively overwrites/removes the original if it exists on many OSes, or we can explicit delete first)
        if (fs.existsSync(originalPath)) {
            fs.unlinkSync(originalPath); // Delete original
        }
        
        fs.renameSync(cleanedPath, originalPath); // Rename cleaned to original
        
        console.log(`Replaced: ${originalFilename}`);
        count++;
      } catch (error) {
        console.error(`  Error replacing files in ${section}:`, error);
      }
    }
  }
  console.log(`Total files replaced: ${count}`);
}

replaceFiles();
