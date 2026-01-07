import React from "react";
import FAQ from "@/app/components/FAQ";
import HowItWorks from "@/app/components/HowItWorksSVG";
import ImageScheduleCard from "@/components/Image&ScheduleCard";
import RenderRandomContent from "./RenderRandomContent";
import CommonApplianceSymptoms from "./CommonApplianceSymptoms";
import img from "@/public/image1.webp";
import {
  parseBrandApplianceData,
  BrandApplianceData,
  ScrapedNode,
} from "@/utils/brand-appliance-parser";
import { RepairResources } from "@/components/RepairResources";
import GlossaryTerms from "@/app/components/GlossaryTerms";

interface BrandApplianceRepairServiceProps {
  scrapedData: { full_content: ScrapedNode[] } | null;
  repairServiceSlug: string;
}

export default function BrandApplianceRepairService({
  scrapedData,
  repairServiceSlug,
}: BrandApplianceRepairServiceProps) {
  if (!scrapedData || !scrapedData.full_content) {
    return <div>Loading...</div>;
  }

  const data: BrandApplianceData = parseBrandApplianceData(
    scrapedData.full_content,
  );

  const applianceName = data.heroData.heading
    ? data.heroData.heading.replace(" Repair Services", "")
    : "Appliance";

  console.log("scraped data...... : ", data);

  return (
    <div className="max-w-[75%] mx-auto">
      {/* 1. Image&ScheduleCard */}
      <div className="relative mb-12">
        <ImageScheduleCard
          heroImage={data.heroData.imageUrl || img}
          heading={data.heroData.heading || "Repair Services"}
          description={
            data.heroData.description || "Expert repairs for your home."
          }
          showBanner={true}
          bannerText={{
            boldInfo: "4.8/5 Stars",
            italicInfo: "from 1M+ customers",
          }}
        />
      </div>

      {/* 2. randomArea (Content before first styled component) */}
      {data.randomContent && data.randomContent.length > 0 && (
        <div className="mt-42">
          <RenderRandomContent nodes={data.randomContent} />
        </div>
      )}

      {/* 3. FAQ (optional) */}
      {data.faqData && data.faqData.length > 0 && (
        <div className="my-10">
          <FAQ items={data.faqData} />
        </div>
      )}

      {/* 4. How it works (optional) */}
      {data.howItWorksData &&
        data.howItWorksData.content &&
        data.howItWorksData.content.length > 0 && (
          <div className="my-20">
            <HowItWorks />
          </div>
        )}

      {/* 5. RepairResources (optional) */}
      {data.repairResourcesData &&
        data.repairResourcesData.blogPosts &&
        data.repairResourcesData.blogPosts.length > 0 && (
          <div className="my-10 max-w-[50%] mx-auto">
            <RepairResources
              blogPosts={data.repairResourcesData.blogPosts}
              appliance={applianceName}
            />
          </div>
        )}

      {/* 6. GlossaryTerms (optional) */}
      {data.glossaryTermsData &&
        data.glossaryTermsData.content &&
        data.glossaryTermsData.content.length > 0 && (
          <div className="max-w-[50%] mx-auto">
            <GlossaryTerms nodes={data.glossaryTermsData.content} />
          </div>
        )}

      {/* 7. CommonApplianceSymptoms (optional) */}
      {data.commonApplianceSymptomsData &&
        data.commonApplianceSymptomsData.symptoms &&
        data.commonApplianceSymptomsData.symptoms.length > 0 && (
          <div className="lg:w-[50%] mx-auto pt-10">
            <CommonApplianceSymptoms
              title={data.commonApplianceSymptomsData.title}
              symptoms={data.commonApplianceSymptomsData.symptoms}
            />
          </div>
        )}
    </div>
  );
}
