import React from "react";
import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import { Metadata } from "next";

import {
  parseRepairServiceData,
  ScrapedNode,
} from "@/utils/repair-service-parser";

import ApplianceRepairService from "../components/ApplianceRepairService";
import BrandApplianceRepairService from "../components/BrandApplianceRepairService";

interface PageProps {
  params: Promise<{
    repairService: string;
    "appliance-repair-service": string;
  }>;
}

// Helper to sanitize slugs to match file paths
function sanitizeSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

async function getRawScrapedData(
  brand: string,
  appliance: string,
): Promise<{ full_content: ScrapedNode[] } | null> {
  const brandSlug = sanitizeSlug(brand);
  const applianceSlug = sanitizeSlug(appliance);

  const baseDir = path.join(
    process.cwd(),
    "data",
    "scraped",
    brandSlug,
    "appliances",
  );

  // Try direct match first: [appliance].json
  let filePath = path.join(baseDir, `${applianceSlug}.json`);

  if (!fs.existsSync(filePath)) {
    // Try brand prefixed match: [brand]-[appliance].json
    const prefixedPath = path.join(
      baseDir,
      `${brandSlug}-${applianceSlug}.json`,
    );
    if (fs.existsSync(prefixedPath)) {
      filePath = prefixedPath;
    } else {
      // Log warning only if neither exists
      console.warn(`File not found: ${filePath} or ${prefixedPath}`);
      return null;
    }
  }

  try {
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const json = JSON.parse(fileContent);

    if (Array.isArray(json) && json.length > 0 && json[0].full_content) {
      return { full_content: json[0].full_content };
    }

    return null;
  } catch (error) {
    console.error("Error reading scraped data:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { repairService, "appliance-repair-service": appliance } = await params;
  const rawData = await getRawScrapedData(repairService, appliance);

  if (rawData) {
    const data = parseRepairServiceData(rawData.full_content);
    if (data.heroData) {
      return {
        title: data.heroData.heading || `${repairService} ${appliance} Repair`,
        description:
          data.heroData.description ||
          `Schedule your ${repairService} ${appliance} repair today.`,
      };
    }
  }

  return {
    title: `${repairService} ${appliance} Repair`,
  };
}

export default async function ApplianceRepairPage({ params }: PageProps) {
  const { repairService, "appliance-repair-service": appliance } = await params;

  const rawScrapedData = await getRawScrapedData(repairService, appliance);

  if (!rawScrapedData) {
    console.warn(`Data not found for ${repairService} / ${appliance}`);
    notFound();
  }

  return (
    <main className="min-h-screen bg-white">
      <BrandApplianceRepairService
        repairServiceSlug={repairService}
        scrapedData={rawScrapedData}
      />
    </main>
  );
}
