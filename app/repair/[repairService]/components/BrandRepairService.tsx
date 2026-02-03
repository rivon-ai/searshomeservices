import React from "react";
import BrokenAppliance from "./BrokenAppliance";
import ApplianceSuggestions from "./ApplianceSuggestions";
import ExpertsCard from "./ExpertsCard";
import FAQ from "@/app/components/FAQ";
import HowItWorks from "@/app/components/HowItWorksSVG";
import ImageScheduleCard from "@/components/Image&ScheduleCard";
import RenderRandomContent from "./RenderRandomContent";
import RatingSection from "@/components/RatingSection";
import ApplianceBrandsWeRepair from "./ApplianceBrandsWeRepair";
import CommonBrandSymptoms from "./CommonBrandSymptoms";
import img from "@/public/image1.webp";
import {
  parseRepairServiceData,
  ScrapedNode,
  RepairServiceData,
} from "@/utils/repair-service-parser";
import { RepairResources } from "@/app/symptom-center/components/RepairResourcesAndGlossaryTerms";
import GlossaryTerms from "@/app/components/GlossaryTerms";

interface BrandRepairServiceProps {
  scrapedData: { full_content: ScrapedNode[] } | null;
  repairServiceSlug: string;
}

export default function BrandRepairService({
  scrapedData,
  repairServiceSlug,
}: BrandRepairServiceProps) {
  if (!scrapedData || !scrapedData.full_content) {
    return <div>Loading...</div>;
  }

  const data: RepairServiceData = parseRepairServiceData(
    scrapedData.full_content,
  );

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
    <div className="max-w-[80%] mx-auto">
      {/* 1. Image&ScheduleCard */}
      <div className="relative mb-12">
        <ImageScheduleCard
          heroImage={img}
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

      {/* 2. randomArea (Remaining Content) */}
      <div className="mt-42">
        <RenderRandomContent nodes={data.randomContent} />
      </div>

      {/* 3. Broken Appliance */}
      {data.brokenAppliancesData &&
        data.brokenAppliancesData.appliances &&
        data.brokenAppliancesData.appliances.length > 0 && (
          <div className="my-10">
            <BrokenAppliance
              title={
                data.brokenAppliancesData.title ||
                "WHICH KENMORE APPLIANCE IS BROKEN?"
              }
              appliances={data.brokenAppliancesData.appliances}
            />
          </div>
        )}

      {/* 7. How it works steps */}
      <div className="my-20">
        <HowItWorks />
      </div>

      {/* 4. Appliance Suggestions */}
      {data.brandSuggestionsData &&
        data.brandSuggestionsData.brands &&
        data.brandSuggestionsData.brands.length > 0 && (
          <div className="my-10">
            <ApplianceSuggestions
              title={
                data.brandSuggestionsData.title ||
                "Which appliance needs repair?"
              }
              suggestions={data.brandSuggestionsData.brands.map((b: any) => ({
                label: b.label || b.name,
                iconSrc: b.iconSrc || b.logoUrl,
                iconAlt: b.iconAlt || b.alt,
                href: b.href || "#",
              }))}
            />
          </div>
        )}

      {/* 5. Experts Card */}
      {data.expertsData &&
        data.expertsData.experts &&
        data.expertsData.experts.length > 0 && (
          <div className="my-10">
            <ExpertsCard
              title={
                data.expertsData.title || "We are the Kenmore repair experts"
              }
              experts={data.expertsData.experts.map((e: any) => ({
                name: e.name,
                description: e.description,
                iconSrc: e.iconSrc,
                iconAlt: e.iconAlt,
              }))}
            />
          </div>
        )}

      {/* 6. FAQ */}
      <div className="my-10">
        <FAQ
          items={data.faqData.map((f) => ({
            question: f.question,
            answer: f.answer.join("\n"),
          }))}
        />
      </div>

      {/* 8. ApplianceBrandsWeRepair (if applicable to brand page) */}
      {data.applianceBrandsData && data.applianceBrandsData.brands && (
        <div className="my-10">
          <ApplianceBrandsWeRepair
            title={data.applianceBrandsData.title}
            brands={data.applianceBrandsData.brands}
          />
        </div>
      )}

      {/* RatingSection */}
      <div className="my-10">
        <RatingSection reviews={reviews} />
      </div>

      {/* RepairResources */}
      <div className="my-10 max-w-[50%] mx-auto">
        {data.repairResourcesData && (
          <RepairResources
            blogPosts={data.repairResourcesData.blogPosts || []}
            appliance={applianceName}
            glossaryData={[]}
          />
        )}
      </div>

      {/* GlossaryTerms */}
      <div className="max-w-[50%] mx-auto">
        <GlossaryTerms />
      </div>

      {/* 10. CommonBrandSymptoms */}
      {data.commonBrandSymptomsData &&
        data.commonBrandSymptomsData.symptoms && (
          <div className="lg:w-[50%] mx-auto pt-10">
            <CommonBrandSymptoms
              title={data.commonBrandSymptomsData.title}
              symptoms={data.commonBrandSymptomsData.symptoms}
            />
          </div>
        )}
    </div>
  );
}
