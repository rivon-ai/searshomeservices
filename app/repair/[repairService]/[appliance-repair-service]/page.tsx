import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";

import {
  parseRepairServiceData,
} from "@/utils/repair-service-parser";

import BrandApplianceRepairService from "../components/BrandApplianceRepairService";
import { getBrandApplianceRepairData } from "@/app/utils/repair-data";

interface PageProps {
  params: Promise<{
    repairService: string;
    "appliance-repair-service": string;
  }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { repairService, "appliance-repair-service": appliance } = await params;
  const rawData = await getBrandApplianceRepairData(repairService, appliance);

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

  const rawScrapedData = await getBrandApplianceRepairData(repairService, appliance);

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
