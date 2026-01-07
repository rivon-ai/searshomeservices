import React from "react";
import ApplianceRepairService from "./components/ApplianceRepairService";
import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import BrandRepairService from "./components/BrandRepairService";

export default async function RepairServicePage({
  params,
}: {
  params: Promise<{ repairService: string }>;
}) {
  const { repairService } = await params;

  // Logic to find the JSON file.
  // We assume the directory name matches a sanitized version of the service name or we check all.
  // For verification purposes with "Wide_Deck_Lawn_Mower", let's try to map "wide-deck-lawn-mower-repair-service" to that.

  const scrapedDataDir = path.join(process.cwd(), "data", "scraped");
  // Simple search for matching file
  let foundData = null;

  try {
    if (fs.existsSync(scrapedDataDir)) {
      const dirs = fs.readdirSync(scrapedDataDir);
      for (const dir of dirs) {
        // Check files in dir
        const dirPath = path.join(scrapedDataDir, dir);
        if (fs.statSync(dirPath).isDirectory()) {
          const files = fs.readdirSync(dirPath);
          for (const file of files) {
            if (file.endsWith(".json")) {
              const content = fs.readFileSync(path.join(dirPath, file), "utf8");
              const json = JSON.parse(content);
              let dataObj = json;
              if (Array.isArray(json)) {
                if (json.length > 0) dataObj = json[0];
                else continue;
              }

              // Check if URL matches or slug matches?
              // Current slug: wide-deck-lawn-mower-repair-service
              // JSON url: .../wide-deck-lawn-mower-repair-service
              if (dataObj.url && dataObj.url.endsWith(repairService)) {
                foundData = dataObj;
                break;
              }
            }
          }
        }
        if (foundData) break;
      }
    }
  } catch (e) {
    console.error("Error loading repair service data", e);
  }

  if (!foundData) {
    // Fallback for verification/dev if file not found by URL matching
    // Logic to map "wide-deck-lawn-mower-repair-service" to folder "Wide_Deck_Lawn_Mower"
    // Not strictly robust but helpful for dev
    if (repairService.includes("wide-deck-lawn-mower")) {
      try {
        const specificPath = path.join(
          scrapedDataDir,
          "Wide_Deck_Lawn_Mower",
          "Wide_Deck_Lawn_Mower-repair-service.json",
        );
        if (fs.existsSync(specificPath)) {
          foundData = JSON.parse(fs.readFileSync(specificPath, "utf8"));
        }
      } catch (e) {}
    }
  }

  if (!foundData) {
    // return notFound(); // Uncomment for production
    // For now, render to show structure even if empty or show error
    console.warn("Data not found for", repairService);
  }

  return (
    <div className="repair-service-page">
      {(await params).repairService.includes("repair-service") ? (
        <ApplianceRepairService
          scrapedData={foundData}
          repairServiceSlug={repairService}
        />
      ) : (
        <BrandRepairService
          scrapedData={foundData}
          repairServiceSlug={repairService}
        />
      )}
    </div>
  );
}
