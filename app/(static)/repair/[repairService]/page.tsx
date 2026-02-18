import React from "react";
import ApplianceRepairService from "@/components/features/repair/ApplianceRepairService";
import { notFound } from "next/navigation";
import BrandRepairService from "@/components/features/repair/BrandRepairService";
import { getRepairServiceData } from "@/utils/fetchers/repair-data";

export default async function RepairServicePage({
  params,
}: {
  params: Promise<{ repairService: string }>;
}) {
  const { repairService } = await params;

  const foundData = await getRepairServiceData(repairService);

  if (!foundData) {
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
