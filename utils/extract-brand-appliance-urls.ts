import fs from "fs";
import path from "path";

// Define types for better code clarity
interface ScrapedData {
  full_content: ContentItem[];
  [key: string]: any;
}

interface ContentItem {
  tag: string;
  content: string;
  attributes?: string;
  order: number;
}

interface BrandApplianceUrl {
  brand: string;
  appliance: string;
  url: string;
}

const BASE_URL = "https://www.searshomeservices.com";
const DATA_DIR = path.join(process.cwd(), "data");
const SCRAPED_DIR = path.join(DATA_DIR, "scraped");
const BRAND_NAMES_FILE = path.join(DATA_DIR, "brand-names-repairs.json");
const OUTPUT_FILE = path.join(DATA_DIR, "brand-appliance-urls.json");

async function extractBrandApplianceUrls() {
  try {
    // 1. Read brand names
    const brandNamesRaw = fs.readFileSync(BRAND_NAMES_FILE, "utf-8");
    const brandNames: string[] = JSON.parse(brandNamesRaw);

    // Use a Record to group appliances by brand
    const extractionResults: Record<
      string,
      { appliance: string; url: string }[]
    > = {};

    console.log(`Starting extraction for ${brandNames.length} brands...`);

    for (const brand of brandNames) {
      // 2. Construct file path
      // Improve slug generation:
      // - Lowercase
      // - Replace '&' with 'and'
      // - Remove special chars (keep letters, numbers, spaces, hyphens)
      // - Replace spaces with hyphens
      const slug = brand
        .toLowerCase()
        .replace(/&/g, "and")
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-");

      const filePath = path.join(SCRAPED_DIR, slug, `${slug}.json`);

      if (!fs.existsSync(filePath)) {
        console.warn(`File not found for brand: ${brand} (path: ${filePath})`);
        continue;
      }

      // 3. Read and parse JSON
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const data: ScrapedData[] = JSON.parse(fileContent);

      if (!Array.isArray(data) || data.length === 0) {
        console.warn(`Invalid or empty data for brand: ${brand}`);
        continue;
      }

      const scrapedPage = data[0]; // Assuming first item describes the page

      // 5. Find the "Which [Brand] appliance needs repair?" section (H2 or H3)
      let startIndex = -1;
      // Matches header variations
      const headerRegex = new RegExp(
        `(which\\s+.*${brand}.*\\s+(needs\\s+repair|is\\s+broken)\\?)|(do\\s+you\\s+need\\s+to\\s+have\\s+(an|a)?\\s+.*${brand}.*\\s+(repaired\\s+or\\s+maintained)\\?)`,
        "i",
      );

      for (let i = 0; i < data[0].full_content.length; i++) {
        const item = data[0].full_content[i];
        if ((item.tag === "h2" || item.tag === "h3") && item.content) {
          if (headerRegex.test(item.content)) {
            startIndex = i;
            break;
          }
        }
      }

      const fullContent = data[0].full_content || [];

      if (startIndex !== -1) {
        // 3. Extract links from the section following the H2/H3
        for (let i = startIndex + 1; i < fullContent.length; i++) {
          const item = fullContent[i];

          // Stop conditions
          // Stop if we hit a header OF THE SAME LEVEL or higher (e.g. h1, h2 if we are in h3? actually just h2/h3/section/footer is safe)
          if (["h2", "h3", "section", "footer"].includes(item.tag)) {
            break;
          }

          if (item.tag === "a" && item.attributes) {
            try {
              const attributes = JSON.parse(item.attributes);
              let href = attributes.href;

              // Accept BOTH /repair/ and /scheduler/ links to capture all appliances
              if (
                href &&
                (href.includes("/repair/") ||
                  href.includes("/scheduler/shs")) &&
                href !== "/repair" &&
                href !== "/repair/"
              ) {
                // Determine appliance name
                // Priority 1: <a> content
                let applianceName = item.content ? item.content.trim() : "";

                // Priority 2: formatting tags inside <a> might show up as next items if the scraper flattened them,
                // OR if the <a> content is empty, check next item
                if (!applianceName && i + 1 < fullContent.length) {
                  const nextItem = fullContent[i + 1];
                  // Verify if it looks like a text container
                  if (
                    ["p", "div", "span"].includes(nextItem.tag) &&
                    nextItem.content
                  ) {
                    applianceName = nextItem.content.trim();
                  }
                }

                if (
                  applianceName &&
                  applianceName.toLowerCase() !== "schedule now" &&
                  applianceName.toLowerCase() !== "read more"
                ) {
                  // CONSTRUCT URL based on user request: repair/[brand]/[appliance]

                  // Slugify appliance name
                  const applianceSlug = applianceName
                    .toLowerCase()
                    .replace(/&/g, "and")
                    .replace(/[^a-z0-9\s-]/g, "")
                    .trim()
                    .replace(/\s+/g, "-");

                  // Use the brand slug we already have
                  const constructedUrl = `${BASE_URL}/repair/${slug}/${applianceSlug}`;

                  // Add to extraction results
                  if (!extractionResults[brand]) {
                    extractionResults[brand] = [];
                  }

                  // Avoid duplicates
                  const exists = extractionResults[brand].find(
                    (r) =>
                      r.appliance === applianceName && r.url === constructedUrl,
                  );

                  if (!exists) {
                    extractionResults[brand].push({
                      appliance: applianceName,
                      url: constructedUrl,
                    });
                  }
                }
              }
            } catch (e) {
              // ignore JSON parse errors for attributes
            }
          }
        }
      } else {
        console.log(`Could not find header for ${brand}`);
      }
    }

    // 6. Save output
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(extractionResults, null, 2));
    const totalBrands = Object.keys(extractionResults).length;
    const totalUrls = Object.values(extractionResults).reduce(
      (sum, urls) => sum + urls.length,
      0,
    );
    console.log(
      `Successfully extracted ${totalUrls} URLs for ${totalBrands} brands to ${OUTPUT_FILE}`,
    );
  } catch (error) {
    console.error("Error during extraction:", error);
  }
}

function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
}

extractBrandApplianceUrls();
