"use client";

import React from "react";
import Link from "next/link";
import { SymptomPageData } from "@/services/symptomService";

// Import all dedicated components
import PageHeading from "./PageHeading";
import RadialStatsSection from "./ReasonStat&ScheduleCard";
import RepairCardsContainer from "./MostCommonRepairs";
import ReviewCarousel from "./ReviewCarousel";
import FAQ from "@/components/shared/FAQ";
import { RepairResources } from "@/components/shared/RepairResources";
import AdditionalSymptoms from "./AdditionalSymptoms";
import BrandComparisonSection from "./BrandComparisonSection";
import QuickRepairSteps from "./QuickRepairSteps";

interface DynamicSymptomRendererProps {
  symptomData: SymptomPageData;
}

export default function DynamicSymptomRenderer({
  symptomData,
}: Readonly<DynamicSymptomRendererProps>) {
  const {
    meta,
    stats,
    repairs,
    testimonials,
    faqs,
    blogPosts,
    glossary,
    additionalSymptomsLinks,
    otherBrandLinks,
    quickRepair,
    troubleshootingSections,
  } = symptomData;

  // Extract brand, appliance, and symptom from title
  // Since we have structured data, we might be able to get these from better places, 
  // but let's keep the existing extraction logic if it works or use meta.title.
  const titleParts = meta.title.split(" ");
  const brand = titleParts[0] || "";
  const appliance = titleParts[1] || "";
  const symptom = titleParts.slice(2).join(" ") || "";

  return (
    <div className="max-w-[75%] mx-auto">
      {/* 1. Main Heading (H1) */}
      <div className="pt-8">
        <PageHeading title={meta.title} />
      </div>

      {/* 2. Stats & Schedule Card */}
      {stats.length > 0 && (
        <RadialStatsSection
          title={`Common reasons your ${brand} ${appliance} is ${symptom}`}
          stats={stats}
          phoneNumber="(646) 440-2692"
          description={
            meta.description ||
            `We can help! Our service technicians have repaired over 250,000 ${brand} ${appliance}s. We can fix yours no matter where you bought it.`
          }
          productOptions={[
            {
              label: appliance.charAt(0).toUpperCase() + appliance.slice(1),
              value: appliance,
            },
          ]}
          brandOptions={[{ label: brand.toUpperCase(), value: brand }]}
          currentBrand={brand}
          currentAppliance={appliance}
          scheduleTitle={`Schedule your ${appliance} repair now!`}
        />
      )}

      {/* 3. Most Common Repairs */}
      {repairs.length > 0 ? (
        <RepairCardsContainer
          mainTitle={`Most common repairs needed to fix a ${brand} ${appliance} ${symptom}`}
          repairs={repairs}
        />
      ) : null}

      {/* 4. Troubleshooting Sections (The new "Inconsistent" content) */}
      {troubleshootingSections && troubleshootingSections.length > 0 && (
        <div className="py-8">
          <div className="max-w-[80%] mx-auto space-y-12">
            {troubleshootingSections.map((section) => (
              <div key={section.heading} className="space-y-6">
                <h2 className="text-3xl font-bold text-blue-950">
                  {section.heading}
                </h2>
                <div 
                  className="text-lg text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: section.body }}
                />
                
                {section.subSections && section.subSections.length > 0 && (
                  <div className="grid grid-cols-1 gap-10 mt-8">
                    {section.subSections.map((sub) => (
                      <div key={sub.heading} className="space-y-4">
                        <h3 className="text-2xl font-semibold text-gray-500 leading-tight">
                          {sub.heading}
                        </h3>
                        {sub.image && (
                          <div className="my-6 rounded-lg overflow-hidden border border-gray-100">
                            <img 
                              src={sub.image.startsWith("//") ? `https:${sub.image}` : sub.image} 
                              alt={sub.heading}
                              className="w-full object-cover max-h-[500px]"
                            />
                          </div>
                        )}
                        <div 
                          className="text-lg text-gray-600 leading-relaxed prose prose-blue max-w-none prose-p:my-2"
                          dangerouslySetInnerHTML={{ __html: sub.body }}
                        />
                        {sub.links && sub.links.length > 0 && (
                          <div className="mt-4 flex flex-wrap gap-5">
                            {sub.links.map((link) => (
                              <Link 
                                key={link.label} 
                                href={link.href}
                                className="text-blue-600 hover:text-blue-800 font-medium underline underline-offset-8 transition-colors"
                              >
                                {link.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4.5 Quick Repair Steps */}
      {quickRepair && (
        <div className="py-8">
          <QuickRepairSteps
            title={quickRepair.title}
            items={quickRepair.items}
          />
        </div>
      )}

      {/* 5. What Our Customers Say - Testimonials */}
      {testimonials.length > 0 && (
        <div className="py-12">
          <ReviewCarousel testimonials={testimonials} />
        </div>
      )}

      {/* 6. Frequently Asked Questions */}
      {faqs.length > 0 && (
        <div className="py-8">
          <FAQ items={faqs} />
        </div>
      )}

      {/* 7. Repair Resources & Glossary */}
      {(blogPosts.length > 0 || glossary.length > 0) && (
        <div className="py-8">
          <RepairResources
            blogPosts={blogPosts}
            appliance={appliance.charAt(0).toUpperCase() + appliance.slice(1)}
            glossaryData={glossary}
          />
        </div>
      )}

      {/* 8. Additional Symptoms */}
      {additionalSymptomsLinks.length > 0 && (
        <div className="py-8">
          <AdditionalSymptoms
            symptomsData={additionalSymptomsLinks}
            brand={brand}
            appliance={appliance}
          />
        </div>
      )}

      {/* 9. Brand Comparison */}
      {otherBrandLinks.length > 0 && (
        <div className="py-8">
          <BrandComparisonSection
            otherBrandLinks={otherBrandLinks}
            symptom={symptom}
          />
        </div>
      )}
    </div>
  );
}

