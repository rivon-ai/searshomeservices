import fs from 'fs/promises';
import path from 'path';

const DATA_PATH = path.join(process.cwd(), 'data', 'brands', 'cooktop', 'cooktop', 'service.json');

async function cleanupData() {
  console.log(`Reading data from ${DATA_PATH}...`);
  const rawData = await fs.readFile(DATA_PATH, 'utf-8');
  const data = JSON.parse(rawData);

  // We expect data to be an array with one item, or just handle the first item
  const pageData = Array.isArray(data) ? data[0] : data;
  
  if (!pageData.full_content || !Array.isArray(pageData.full_content)) {
    console.error('Invalid data structure: full_content is missing or not an array.');
    process.exit(1);
  }

  const fullContent = pageData.full_content;
  console.log(`Original content length: ${fullContent.length}`);

  // 1. Find the first h1 tag
  const h1Index = fullContent.findIndex((item: any) => item.tag === 'h1');
  if (h1Index === -1) {
    console.error('Could not find any h1 tag.');
    process.exit(1);
  }
  console.log(`Found first h1 at index: ${h1Index}`);

  // 2. Find the h2 tag with "Common Cooktop symptoms to look out for"
  // The grep search showed it exists. We check content.
  const h2Index = fullContent.findIndex((item: any) => 
    item.tag === 'h2' && 
    item.content && 
    item.content.trim().toLowerCase().includes('common cooktop symptoms to look out for')
  );

  if (h2Index === -1) {
    console.error('Could not find the specific h2 tag.');
    // Optional: list all h2s to debug?
    // process.exit(1);
  } else {
    console.log(`Found target h2 at index: ${h2Index}`);
  }

  // 3. Find the NEXT h2 tag after the target h2
  let endSlice = -1;
  if (h2Index !== -1) {
    // Search for the next h2 after h2Index
    const nextH2 = fullContent.find((item: any, index: number) => 
      index > h2Index && item.tag === 'h2'
    );
    
    if (nextH2) {
      endSlice = fullContent.indexOf(nextH2);
      console.log(`Found next h2 ("${nextH2.content}") at index: ${endSlice}`);
    } else {
      console.log('No next h2 found through find(), checking via index loop just in case or assuming end of file.');
       // Simpler loop to find index
      for (let i = h2Index + 1; i < fullContent.length; i++) {
        if (fullContent[i].tag === 'h2') {
            endSlice = i;
            console.log(`Found next h2 ("${fullContent[i].content}") at index: ${endSlice}`);
            break;
        }
      }
    }
  }

  // Check for footer tag between h2Index and endSlice
  // If footer comes *before* the next H2, we should stop at footer.
  let footerIndex = -1;
  const searchEnd = endSlice === -1 ? fullContent.length : endSlice;
  
  for (let i = h2Index + 1; i < searchEnd; i++) {
      if (fullContent[i].tag === 'footer') {
          footerIndex = i;
          console.log(`Found footer at index: ${footerIndex}`);
          break;
      }
  }

  if (footerIndex !== -1) {
      console.log(`Footer found before next H2. Adjusting endSlice from ${endSlice} to ${footerIndex}`);
      endSlice = footerIndex;
  }

  // If still -1, it means no next H2, so take everything till end
  if (endSlice === -1) {
    endSlice = fullContent.length;
    console.log(`No next h2 found, keeping until end of content.`);
  }

  const cleanedContent = fullContent.slice(h1Index, endSlice);
  console.log(`Cleaned content length: ${cleanedContent.length}`);

  // Re-assign and save
  pageData.full_content = cleanedContent;
  
  // Re-index order?
  cleanedContent.forEach((item: any, index: number) => {
    item.order = index;
  });

  // If data was an array, wrap it back
  const finalData = Array.isArray(data) ? [pageData] : pageData;

  console.log(`Writing cleaned data back to ${DATA_PATH}...`);
  await fs.writeFile(DATA_PATH, JSON.stringify(finalData, null, 2));
  console.log('Cleanup complete.');
}

cleanupData().catch(err => {
  console.error(err);
  process.exit(1);
});
