import React from "react";
import BrokenAppliance from "./BrokenAppliance";
import ApplianceSuggestions from "./ApplianceSuggestions";
import FAQ from "@/components/shared/FAQ";
import HowItWorks from "@/components/shared/HowItWorksSVG";
import ImageScheduleCard from "@/components/shared/Image&ScheduleCard";
import RenderRandomContent from "./RenderRandomContent";
import RatingSection from "@/components/shared/RatingSection";
import ApplianceBrandsWeRepair from "./ApplianceBrandsWeRepair";
import CommonBrandSymptoms from "./CommonBrandSymptoms";
import img from "@/public/image1.webp";
import { RepairResources } from "@/components/shared/RepairResources";
import GlossaryTerms from "@/components/shared/GlossaryTerms";

import { SummarizedRepairData, ScrapedNode } from "@/types/repairTypes";
import { parseServiceOverview } from "@/utils/service-overview-parser";

interface BrandRepairServiceProps {
  scrapedData: SummarizedRepairData | null;
  repairServiceSlug: string;
}

export default function BrandRepairService({
  scrapedData,
  repairServiceSlug,
}: BrandRepairServiceProps) {
  if (!scrapedData) {
    return <div>Loading...</div>;
  }

  const overview = parseServiceOverview(scrapedData.serviceOverview);

  const applianceName = scrapedData.pageTitle
    ? scrapedData.pageTitle.replace(" Repair Services", "")
    : "Appliance";

  // Build ScrapedNode[] from articleNodes for RenderRandomContent
  const randomContent: ScrapedNode[] = overview.articleNodes.map(
    (node, i) => ({
      tag: node.type,
      content: node.content,
      attributes: node.src ? { src: node.src } : {},
      order: i,
    }),
  );

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

  // Map blog links to RepairResources format
  const blogPosts = scrapedData.blogArticles.links.map((l) => ({
    title: l.title,
    link: l.href,
    image: undefined,
  }));

  return (
    <div className="max-w-[80%] mx-auto">
      {/* 1. Image&ScheduleCard */}
      <div className="relative mb-12">
        <ImageScheduleCard
          heroImage={overview.heroImage || img}
          heading={scrapedData.pageTitle || "Repair Services"}
          description={
            overview.heroDescription || "Expert repairs for your home."
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
        <RenderRandomContent nodes={randomContent} />
      </div>

      {/* 3. Broken Appliance */}
      {scrapedData.applianceSelector &&
        scrapedData.applianceSelector.appliances &&
        scrapedData.applianceSelector.appliances.length > 0 && (
          <div className="my-10">
            <BrokenAppliance
              title={
                scrapedData.applianceSelector.title ||
                `WHICH ${scrapedData.brand.toUpperCase()} APPLIANCE IS BROKEN?`
              }
              appliances={scrapedData.applianceSelector.appliances}
            />
          </div>
        )}

      {/* 7. How it works steps */}
      <div className="my-20">
        <HowItWorks />
      </div>

      {/* 4. Appliance Suggestions */}
      {scrapedData.applianceBrandSelector &&
        scrapedData.applianceBrandSelector.brands &&
        scrapedData.applianceBrandSelector.brands.length > 0 && (
          <div className="my-10">
            <ApplianceSuggestions
              title={
                scrapedData.applianceBrandSelector.title ||
                "Which appliance needs repair?"
              }
              suggestions={scrapedData.applianceBrandSelector.brands.map(
                (b: any) => ({
                  label: b.name || b.label,
                  iconSrc: b.logoUrl || b.iconUrl || b.iconSrc,
                  iconAlt: b.alt || b.iconAlt || b.name || b.label || "",
                  href: b.link || b.href || "#",
                }),
              )}
            />
          </div>
        )}

      {/* 5. Experts Card — not available in summarized JSON, keeping stub for future */}

      {/* 6. FAQ */}
      <div className="my-10">
        <FAQ
          items={scrapedData.faq.map((f) => ({
            question: f.question,
            answer: f.answer,
          }))}
        />
      </div>

      {/* 8. ApplianceBrandsWeRepair (if applicable to brand page) */}
      {scrapedData.brandsWeRepair && scrapedData.brandsWeRepair.brands && (
        <div className="my-10">
          <ApplianceBrandsWeRepair
            title={scrapedData.brandsWeRepair.title || `${applianceName} Brands We Repair`}
            brands={scrapedData.brandsWeRepair.brands}
          />
        </div>
      )}

      {/* RatingSection */}
      <div className="my-10">
        <RatingSection reviews={reviews} />
      </div>

      {/* RepairResources */}
      <div className="my-10 max-w-[50%] mx-auto">
        {blogPosts.length > 0 && (
          <RepairResources
            blogPosts={blogPosts}
            appliance={applianceName}
            glossaryData={[]}
          />
        )}
      </div>

      {/* GlossaryTerms */}
      <div className="max-w-[50%] mx-auto">
        <GlossaryTerms
          items={
            scrapedData.glossary.length > 0
              ? scrapedData.glossary.map((g) => ({
                  title: g.term,
                  description: g.definition,
                }))
              : undefined
          }
        />
      </div>

      {/* 10. CommonBrandSymptoms */}
      {scrapedData.brandSymptomLinks &&
        scrapedData.brandSymptomLinks.length > 0 && (
          <div className="lg:w-[50%] mx-auto pt-10">
            <CommonBrandSymptoms
              title={`Common ${applianceName} Symptoms`}
              symptoms={scrapedData.brandSymptomLinks}
            />
          </div>
        )}
    </div>
  );
}
