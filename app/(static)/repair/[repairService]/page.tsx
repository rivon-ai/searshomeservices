import React from "react";
import ApplianceRepairService from "@/components/features/repair/ApplianceRepairService";
import { notFound } from "next/navigation";
import BrandRepairService from "@/components/features/repair/BrandRepairService";
import { getRepairServiceData } from "@/utils/fetchers/repair-data";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{ repairService: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { repairService } = await params;
  const data = await getRepairServiceData(repairService);
  if (!data) return { title: repairService };
  return {
    title: data.seoTitle,
    description: data.pageTitle,
  };
}

export default async function RepairServicePage({ params }: PageProps) {
  const { repairService } = await params;
  const data = await getRepairServiceData(repairService);

  if (!data) {
    console.warn("Data not found for", repairService);
    notFound();
  }

  return (
    <div className="repair-service-page">
      {repairService.includes("repair-service") ? (
        <ApplianceRepairService
          scrapedData={data}
          repairServiceSlug={repairService}
        />
      ) : (
        <BrandRepairService
          scrapedData={data}
          repairServiceSlug={repairService}
        />
      )}
    </div>
  );
}
