import fs from "fs/promises";
import path from "path";

const SCRAPED_ROOT = path.join(process.cwd(), "data", "scraped");

async function main() {
  console.log("Searching for brand JSON files...");

  const brandDirs = await fs.readdir(SCRAPED_ROOT);

  for (const dir of brandDirs) {
    const dirPath = path.join(SCRAPED_ROOT, dir);
    // Ignore non-directories (like files or symlinks if any, though readdir returns names)
    // We need to stat to be sure, but let's just try/catch inside
    try {
      const stats = await fs.stat(dirPath);
      if (!stats.isDirectory()) continue;

      const files = await fs.readdir(dirPath);
      // Look for {brand}.json or just any .json that isn't a temp file
      // The structure is data/scraped/ace/ace.json
      const jsonFile = files.find(
        (f) => f.endsWith(".json") && !f.startsWith("."),
      );

      if (jsonFile) {
        const filePath = path.join(dirPath, jsonFile);
        await processFile(filePath);
      }
    } catch (err) {
      // likely not a directory or access denied
      continue;
    }
  }
}

async function processFile(filePath: string) {
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    const data = JSON.parse(raw);

    // Expecting array of 1 object
    if (!Array.isArray(data) || data.length === 0) return;

    let modified = false;

    for (const entry of data) {
      if (!entry.full_content) continue;

      // Find hero image
      // Criteria: img tag with class containing "absolute inset-0"

      const heroNode = entry.full_content.find((node: any) => {
        if (node.tag !== "img") return false;
        const attrs = node.attributes ? JSON.parse(node.attributes) : {};
        const className = attrs.class || "";
        return (
          className.includes("absolute inset-0") ||
          (className.includes("object-cover") && className.includes("h-full"))
        ); // Fallback
      });

      if (heroNode) {
        const attrs = JSON.parse(heroNode.attributes);
        let src = attrs.src || "";

        // Sometimes scraping gets relative paths or optimizations
        // If it starts with /, prepend domain if needed, but user just asked for "image url" from scraped data

        if (src) {
          // Check if it already exists to avoid redundant writes
          if (entry.image_url !== src) {
            entry.image_url = src;
            modified = true;
            console.log(
              `Updated ${path.basename(filePath)}: Found image ${src}`,
            );
          }
        }
      } else {
        // console.log(`Warning: No hero image found for ${path.basename(filePath)}`);
      }
    }

    if (modified) {
      await fs.writeFile(filePath, JSON.stringify(data, null, 2));
    }
  } catch (e) {
    console.error(`Error processing ${filePath}:`, e);
  }
}

main().catch(console.error);
