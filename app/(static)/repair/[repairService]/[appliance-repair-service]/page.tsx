import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import BrandApplianceRepairService from "@/components/features/repair/BrandApplianceRepairService";
import { getBrandApplianceRepairData } from "@/utils/fetchers/repair-data";

interface PageProps {
  params: Promise<{
    repairService: string;
    "appliance-repair-service": string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { repairService, "appliance-repair-service": appliance } = await params;
  const data = await getBrandApplianceRepairData(repairService, appliance);
  if (!data) return { title: `${repairService} ${appliance} Repair` };
  return {
    title: data.seoTitle,
    description: data.pageTitle,
  };
}

export default async function ApplianceRepairPage({ params }: PageProps) {
  const { repairService, "appliance-repair-service": appliance } = await params;
  const data = await getBrandApplianceRepairData(repairService, appliance);

  if (!data) {
    console.warn(`Data not found for ${repairService} / ${appliance}`);
    notFound();
  }

  return (
    <main className="min-h-screen bg-white">
      <BrandApplianceRepairService
        repairServiceSlug={repairService}
        scrapedData={data}
      />
    </main>
  );
}
