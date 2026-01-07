"use client";

import React from "react";
import ImageScheduleCard from "@/components/Image&ScheduleCard";
import HowItWorks from "@/app/components/HowItWorksSVG";
import WhyToChoose from "@/components/WhyToChoose"; // Verified in components root
import RatingSection from "@/components/RatingSection";
import ScheduleProfessionalMaintenance from "@/app/components/SchdeluProfessionalMaintenance";
import GlossaryTerms from "@/app/components/GlossaryTerms";
import RepairResources from "@/app/symptom-center/[brand-appliance-issue]/components/RepairResources";

import ApplianceBrandsWeRepair from "./ApplianceBrandsWeRepair";
import BrandSuggestions from "./BrandSuggestions";
import CommonBrandSymptoms from "./CommonBrandSymptoms";
import CommonApplianceSymptoms from "./CommonApplianceSymptoms";
import RenderRandomContent from "./RenderRandomContent";
import FAQ from "@/app/components/FAQ";

import img from "@/public/image1.webp";

import {
  parseRepairServiceData,
  ScrapedNode,
  RepairServiceData,
} from "@/utils/repair-service-parser";
import { useParams } from "next/navigation";

interface RepairServiceHeroSectionProps {
  scrapedData: { full_content: ScrapedNode[] } | null;
  repairServiceSlug: string; // To pass into components if needed
}

export default function RepairServiceHeroSection({
  scrapedData,
  repairServiceSlug,
}: RepairServiceHeroSectionProps) {
  if (!scrapedData || !scrapedData.full_content) {
    return <div>Loading...</div>;
  }

  const data: RepairServiceData = parseRepairServiceData(
    scrapedData.full_content,
  );

  // Random Area Render Logic

  const applianceName = data.heroData.heading
    ? data.heroData.heading.replace(" Repair Services", "")
    : "Appliance";

  // Placeholder reviews for RatingSection (required prop)
  const reviews = [
    {
      title: "Great Service",
      rating: 5,
      text: "The technician was very professional and fixed my appliance quickly.",
      author: "John D.",
    },
    {
      title: "Highly Recommend",
      rating: 5,
      text: "Excellent experience from start to finish.",
      author: "Sarah M.",
    },
    {
      title: "Fast Repair",
      rating: 5,
      text: "He knew exactly what was wrong and had the part on the truck.",
      author: "Mike T.",
    },
  ];

  return (
    <div className="max-w-[75%] mx-auto">
      {/* 1. Image&ScheduleCard */}
      <div className="relative mb-12">
        <ImageScheduleCard
          heroImage={img}
          heading={data.heroData.heading || "Repair Services"}
          description={
            data.heroData.description || "Expert repairs for your home."
          }
          // Add other props as extracted
          showBanner={true}
          bannerText={{
            boldInfo: "4.8/5 Stars",
            italicInfo: "from 1M+ customers",
          }}
        />
      </div>

      {/* 2. randomArea */}
      {data.randomContent && data.randomContent.length > 0 && (
        <div className="mt-42">
          <RenderRandomContent nodes={data.randomContent} />
        </div>
      )}

      {/* 3. HowITWorks */}
      <div className="my-10">
        <HowItWorks />
      </div>

      {/* 12. FAQ */}
      {data.faqData && data.faqData.length > 0 && (
        <div className=" my-10">
          <FAQ items={data.faqData} />
        </div>
      )}

      {/* 4. WhyToChoose */}
      <div className="my-10">
        <WhyToChoose />
      </div>

      {/* 5. ApplianceBrandsWeRepair */}
      {data.applianceBrandsData &&
        data.applianceBrandsData.brands &&
        data.applianceBrandsData.brands.length > 0 && (
          <div className="my-10">
            <ApplianceBrandsWeRepair
              title={data.applianceBrandsData.title}
              brands={data.applianceBrandsData.brands}
            />
          </div>
        )}

      {/* 6. RatingSection */}
      <div className="my-10">
        <RatingSection reviews={reviews} />
      </div>

      {/* 7. ScheduleProfessionalMaintenance */}
      <div className="my-10">
        <ScheduleProfessionalMaintenance />
      </div>

      {/* 8. BrandSuggestions */}
      {data.brandSuggestionsData &&
        data.brandSuggestionsData.brands &&
        data.brandSuggestionsData.brands.length > 0 && (
          <div className="my-10">
            <BrandSuggestions
              title={data.brandSuggestionsData.title}
              brands={data.brandSuggestionsData.brands.map((b: any) => ({
                name: b.label || b.name,
                logoUrl: b.iconSrc || b.logoUrl,
                alt: b.iconAlt || b.alt,
                link: b.href || b.link,
              }))}
            />
          </div>
        )}

      {/* 9. RepairResources */}
      {data.repairResourcesData &&
        data.repairResourcesData.blogPosts &&
        data.repairResourcesData.blogPosts.length > 0 && (
          <div className="my-10">
            <RepairResources
              blogPosts={data.repairResourcesData.blogPosts}
              appliance={applianceName}
              glossaryData={[]}
            />
          </div>
        )}

      {/* 11. GlossaryTerms */}
      <div className="lg:w-[50%] mx-auto">
        <GlossaryTerms />
      </div>

      {/* 13. CommonBrandSymptoms */}
      {data.commonBrandSymptomsData &&
        data.commonBrandSymptomsData.symptoms &&
        data.commonBrandSymptomsData.symptoms.length > 0 && (
          <div className="lg:w-[50%] mx-auto pt-10">
            <CommonBrandSymptoms
              title={data.commonBrandSymptomsData.title}
              symptoms={data.commonBrandSymptomsData.symptoms}
            />
          </div>
        )}

      {/* 13. CommonApplianceSymptoms */}
      {data.commonApplianceSymptomsData &&
        data.commonApplianceSymptomsData.symptoms &&
        data.commonApplianceSymptomsData.symptoms.length > 0 && (
          <div className="lg:w-[50%] mx-auto">
            <CommonApplianceSymptoms
              title={data.commonApplianceSymptomsData.title}
              symptoms={data.commonApplianceSymptomsData.symptoms}
            />
          </div>
        )}
    </div>
  );
}
