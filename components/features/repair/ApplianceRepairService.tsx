"use client";

import React from "react";
import ImageScheduleCard from "@/components/shared/Image&ScheduleCard";
import HowItWorks from "@/components/shared/HowItWorksSVG";
import WhyToChoose from "@/components/shared/WhyToChoose";
import RatingSection from "@/components/shared/RatingSection";
import ScheduleProfessionalMaintenance from "@/components/shared/SchdeluProfessionalMaintenance";
import GlossaryTerms from "@/components/shared/GlossaryTerms";
import { RepairResources } from "@/components/shared/RepairResources";

import ApplianceBrandsWeRepair from "./ApplianceBrandsWeRepair";
import BrandSuggestions from "./BrandSuggestions";
import CommonBrandSymptoms from "./CommonBrandSymptoms";
import CommonApplianceSymptoms from "./CommonApplianceSymptoms";
import RenderRandomContent from "./RenderRandomContent";
import FAQ from "@/components/shared/FAQ";

import img from "@/public/image1.webp";

import { SummarizedRepairData, ScrapedNode } from "@/types/repairTypes";
import { parseServiceOverview } from "@/utils/service-overview-parser";

interface RepairServiceHeroSectionProps {
  scrapedData: SummarizedRepairData | null;
  repairServiceSlug: string;
}

export default function RepairServiceHeroSection({
  scrapedData,
  repairServiceSlug,
}: RepairServiceHeroSectionProps) {
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

      {/* 2. randomArea */}
      {randomContent && randomContent.length > 0 && (
        <div className="mt-42">
          <RenderRandomContent nodes={randomContent} />
        </div>
      )}

      {/* 3. HowITWorks */}
      <div className="my-10">
        <HowItWorks />
      </div>

      {/* 12. FAQ */}
      {scrapedData.faq && scrapedData.faq.length > 0 && (
        <div className=" my-10">
          <FAQ
            items={scrapedData.faq.map((f) => ({
              question: f.question,
              answer: f.answer,
            }))}
          />
        </div>
      )}

      {/* 4. WhyToChoose */}
      <div className="my-10">
        <WhyToChoose />
      </div>

      {/* 5. ApplianceBrandsWeRepair */}
      {scrapedData.brandsWeRepair &&
        scrapedData.brandsWeRepair.brands &&
        scrapedData.brandsWeRepair.brands.length > 0 && (
          <div className="my-10">
            <ApplianceBrandsWeRepair
              title={scrapedData.brandsWeRepair.title || `${applianceName} Brands We Repair`}
              brands={scrapedData.brandsWeRepair.brands}
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
      {scrapedData.applianceBrandSelector &&
        scrapedData.applianceBrandSelector.brands &&
        scrapedData.applianceBrandSelector.brands.length > 0 && (
          <div className="my-10">
            <BrandSuggestions
              title={scrapedData.applianceBrandSelector.title}
              brands={scrapedData.applianceBrandSelector.brands.map((b: any) => ({
                name: b.name || b.label,
                logoUrl: b.logoUrl || b.iconUrl || b.iconSrc,
                alt: b.alt || b.iconAlt || b.name || b.label || "",
                link: b.link || b.href || "#",
              }))}
            />
          </div>
        )}

      {/* 9. RepairResources */}
      {blogPosts && blogPosts.length > 0 && (
        <div className="my-10">
          <RepairResources
            blogPosts={blogPosts}
            appliance={applianceName}
            glossaryData={[]}
          />
        </div>
      )}

      {/* 11. GlossaryTerms */}
      <div className="lg:w-[50%] mx-auto">
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

      {/* 13. CommonBrandSymptoms */}
      {scrapedData.brandSymptomLinks &&
        scrapedData.brandSymptomLinks.length > 0 && (
          <div className="lg:w-[50%] mx-auto pt-10">
            <CommonBrandSymptoms
              title={`Common ${applianceName} Symptoms`}
              symptoms={scrapedData.brandSymptomLinks}
            />
          </div>
        )}

      {/* 13. CommonApplianceSymptoms */}
      {scrapedData.symptomLinks &&
        scrapedData.symptomLinks.length > 0 && (
          <div className="lg:w-[50%] mx-auto">
            <CommonApplianceSymptoms
              title={`Common ${applianceName} Symptoms`}
              symptoms={scrapedData.symptomLinks}
            />
          </div>
        )}
    </div>
  );
}
