import React from "react";
import FAQ from "@/components/shared/FAQ";
import HowItWorks from "@/components/shared/HowItWorksSVG";
import ImageScheduleCard from "@/components/shared/Image&ScheduleCard";
import RenderRandomContent from "./RenderRandomContent";
import CommonApplianceSymptoms from "./CommonApplianceSymptoms";
import img from "@/public/image1.webp";
import { RepairResources } from "@/components/shared/RepairResources";
import GlossaryTerms from "@/components/shared/GlossaryTerms";

import { SummarizedRepairData, ScrapedNode } from "@/types/repairTypes";
import { parseServiceOverview } from "@/utils/service-overview-parser";

interface BrandApplianceRepairServiceProps {
  scrapedData: SummarizedRepairData | null;
  repairServiceSlug: string;
}

export default function BrandApplianceRepairService({
  scrapedData,
  repairServiceSlug,
}: BrandApplianceRepairServiceProps) {
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

      {/* 2. randomArea (Content before first styled component) */}
      {randomContent && randomContent.length > 0 && (
        <div className="mt-42">
          <RenderRandomContent nodes={randomContent} />
        </div>
      )}

      {/* 3. FAQ (optional) */}
      {scrapedData.faq && scrapedData.faq.length > 0 && (
        <div className="my-10">
          <FAQ
            items={scrapedData.faq.map((f) => ({
              question: f.question,
              answer: f.answer,
            }))}
          />
        </div>
      )}

      {/* 4. How it works (optional) */}
      {scrapedData.navigationSections.howItWorks.show && (
        <div className="my-20">
          <HowItWorks />
        </div>
      )}

      {/* 5. RepairResources (optional) */}
      {blogPosts && blogPosts.length > 0 && (
        <div className="my-10 max-w-[50%] mx-auto">
          <RepairResources
            blogPosts={blogPosts}
            appliance={applianceName}
          />
        </div>
      )}

      {/* 6. GlossaryTerms (optional) */}
      {scrapedData.glossary && scrapedData.glossary.length > 0 && (
        <div className="max-w-[50%] mx-auto">
          <GlossaryTerms
            items={scrapedData.glossary.map((g) => ({
              title: g.term,
              description: g.definition,
            }))}
          />
        </div>
      )}

      {/* 7. CommonApplianceSymptoms (optional) */}
      {scrapedData.symptomLinks &&
        scrapedData.symptomLinks.length > 0 && (
          <div className="lg:w-[50%] mx-auto pt-10">
            <CommonApplianceSymptoms
              title={`Common ${applianceName} Symptoms`}
              symptoms={scrapedData.symptomLinks}
            />
          </div>
        )}
    </div>
  );
}
