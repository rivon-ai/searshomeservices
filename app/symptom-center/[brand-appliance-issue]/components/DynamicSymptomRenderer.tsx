"use client";

import React from "react";
import { SymptomPageData } from "@/app/utils/symptom-data";
import { renderInconsistentSection } from "../utils/renderInconsistentSection";

// Import all dedicated components
import PageHeading from "./PageHeading";
import RadialStatsSection from "./ReasonStat&ScheduleCard";
import RepairCardsContainer from "./MostCommonRepairs";
import ReviewCarousel from "./ReviewCarousel";
import FAQAccordition from "./FAQAccordition";
import RepairResources from "./RepairResources";
import AdditionalSymptoms from "./AdditionalSymptoms";
import BrandComparisonSection from "./BrandComparisonSection";
import QuickRepairSteps from "./QuickRepairSteps";
import { QuickRepairData } from "@/app/utils/symptom-data";

interface DynamicSymptomRendererProps {
  symptomData: SymptomPageData;
}

export default function DynamicSymptomRenderer({
  symptomData,
}: DynamicSymptomRendererProps) {
  const {
    rawNodes,
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
  } = symptomData;

  // Extract brand, appliance, and symptom from title
  const slug = meta.title.toLowerCase().replace(/\s/g, "-");
  const parts = slug.split("-");
  const brand = parts[0] || "";
  const appliance = parts[1] || "";
  const symptom = parts.slice(2).join(" ") || "";

  // Find H2 section indices
  const h2Indices: number[] = [];
  rawNodes.forEach((node, index) => {
    if (node.tag === "h2") {
      h2Indices.push(index);
    }
  });

  // Identify sections
  const firstH2Index = h2Indices[0] || -1;
  const secondH2Index = h2Indices[1] || -1;

  // Check if second H2 is "Most common repairs"
  const hasMostCommonRepairs =
    secondH2Index !== -1 &&
    rawNodes[secondH2Index].content
      .toLowerCase()
      .includes("most common repairs");

  // Find "What our customers say" section
  const customersH2Index =
    h2Indices.find((idx) =>
      rawNodes[idx].content.toLowerCase().includes("what our customers say"),
    ) || -1;

  // Find FAQ section
  const faqH2Index =
    h2Indices.find((idx) =>
      rawNodes[idx].content
        .toLowerCase()
        .includes("frequently asked questions"),
    ) || -1;

  // Find Resources section
  const resourcesH2Index =
    h2Indices.find(
      (idx) =>
        rawNodes[idx].content.toLowerCase().includes("repair") &&
        rawNodes[idx].content.toLowerCase().includes("resources"),
    ) || -1;

  // Find Additional Symptoms section
  const additionalSymptomsH2Index =
    h2Indices.find(
      (idx) =>
        rawNodes[idx].content.toLowerCase().includes("additional possible") &&
        rawNodes[idx].content.toLowerCase().includes("symptoms"),
    ) || -1;

  // Find Brand Comparison section
  const brandComparisonH2Index =
    h2Indices.find((idx) =>
      rawNodes[idx].content
        .toLowerCase()
        .includes("brands may also experience"),
    ) || -1;

  // Track all reserved indices (content that belongs to specific sections)
  const reservedIndices = new Set<number>();

  // Mark stats section indices as reserved
  rawNodes.forEach((node, idx) => {
    if (
      node.tag === "span" &&
      node.content.includes("% of the time it's the")
    ) {
      reservedIndices.add(idx);
      if (rawNodes[idx + 1]) reservedIndices.add(idx + 1); // The label span
    }
  });

  // Mark repairs section indices as reserved
  if (hasMostCommonRepairs && secondH2Index !== -1) {
    const nextH2AfterRepairs =
      h2Indices.find((idx) => idx > secondH2Index) || rawNodes.length;
    for (let i = secondH2Index; i < nextH2AfterRepairs; i++) {
      reservedIndices.add(i);
    }
  }

  // Mark testimonials section indices as reserved
  if (customersH2Index !== -1) {
    const nextH2AfterCustomers =
      h2Indices.find((idx) => idx > customersH2Index) || rawNodes.length;
    for (let i = customersH2Index; i < nextH2AfterCustomers; i++) {
      reservedIndices.add(i);
    }
  }

  // Mark FAQ section indices as reserved
  if (faqH2Index !== -1) {
    const nextH2AfterFAQ =
      h2Indices.find((idx) => idx > faqH2Index) || rawNodes.length;
    for (let i = faqH2Index; i < nextH2AfterFAQ; i++) {
      reservedIndices.add(i);
    }
  }

  // Mark Resources section indices as reserved (includes Glossary)
  if (resourcesH2Index !== -1) {
    const nextH2AfterResources =
      h2Indices.find((idx) => idx > resourcesH2Index) || rawNodes.length;
    for (let i = resourcesH2Index; i < nextH2AfterResources; i++) {
      reservedIndices.add(i);
    }
  }

  // Mark Additional Symptoms section indices as reserved
  if (additionalSymptomsH2Index !== -1) {
    const nextH2AfterSymptoms =
      h2Indices.find((idx) => idx > additionalSymptomsH2Index) ||
      rawNodes.length;
    for (let i = additionalSymptomsH2Index; i < nextH2AfterSymptoms; i++) {
      reservedIndices.add(i);
    }
  }

  // Mark Brand Comparison section indices as reserved
  if (brandComparisonH2Index !== -1) {
    const nextH2AfterBrands =
      h2Indices.find((idx) => idx > brandComparisonH2Index) || rawNodes.length;
    for (let i = brandComparisonH2Index; i < nextH2AfterBrands; i++) {
      reservedIndices.add(i);
    }
  }

  // Mark QuickRepairSteps section indices as reserved
  const quickRepairTriggerIdx = rawNodes.findIndex(
    (n) =>
      n.tag === "h2" &&
      n.content.toLowerCase().includes("repair is quick and easy"),
  );

  if (quickRepairTriggerIdx !== -1) {
    reservedIndices.add(quickRepairTriggerIdx);
    let itemsCollected = 0;
    let j = quickRepairTriggerIdx + 1;
    while (j < rawNodes.length && itemsCollected < 3) {
      if (
        rawNodes[j]?.tag === "img" &&
        rawNodes[j + 1]?.tag === "h3" &&
        rawNodes[j + 2]?.tag === "p"
      ) {
        reservedIndices.add(j);
        reservedIndices.add(j + 1);
        reservedIndices.add(j + 2);
        j += 3;
        itemsCollected++;
      } else {
        j++;
        if (j > quickRepairTriggerIdx + 10) break;
      }
    }
  }

  // Mark first H2 section (stats intro) as reserved
  if (firstH2Index !== -1 && secondH2Index !== -1) {
    for (let i = firstH2Index; i < secondH2Index; i++) {
      reservedIndices.add(i);
    }
  }

  // Extract inconsistent section nodes - everything not reserved
  let inconsistentSectionNodes: typeof rawNodes = [];
  rawNodes.forEach((node, idx) => {
    if (!reservedIndices.has(idx)) {
      // Skip nodes before first H2 and conversion component nodes
      if (
        idx < firstH2Index ||
        node.tag === "h4" ||
        node.tag === "h1" ||
        (node.tag === "div" && node.content === "$") ||
        (node.tag === "div" && node.content === "/$") ||
        node.attributes?.toString().includes("hidden")
      ) {
        return;
      }
      inconsistentSectionNodes.push(node);
    }
  });

  return (
    <div className="max-w-[75%] mx-auto">
      {/* 1. Main Heading (H1) */}
      <div className="pt-8">
        <PageHeading title={meta.title} />
      </div>

      {/* 2. First H2 Section - Stats & Schedule Card */}
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

      {/* 3. Second H2 Section - Most Common Repairs OR Inconsistent Section */}
      {hasMostCommonRepairs && repairs.length > 0 ? (
        <RepairCardsContainer
          mainTitle={`Most common repairs needed to fix a ${brand} ${appliance} ${symptom}`}
          repairs={repairs}
        />
      ) : null}

      {/* 4. Inconsistent Section (if exists) */}
      {inconsistentSectionNodes.length > 0 && (
        <div className="py-8">
          <div className="max-w-[50%] mx-auto">
            {renderInconsistentSection(inconsistentSectionNodes)}
          </div>
        </div>
      )}

      {/* 4.5 Quick Repair Steps */}
      {quickRepair && (
        <div className="py-8">
          <div className="">
            <QuickRepairSteps
              title={quickRepair.title}
              items={quickRepair.items}
            />
          </div>
        </div>
      )}

      {/* 5. What Our Customers Say - Testimonials */}
      {testimonials.length > 0 && (
        <div className="  ">
          <ReviewCarousel testimonials={testimonials} />
        </div>
      )}

      {/* 6. Frequently Asked Questions */}
      {faqs.length > 0 && (
        <div className="   py-8">
          <FAQAccordition faqItems={faqs} />
        </div>
      )}

      {/* 7. Repair Resources & Glossary */}
      {(blogPosts.length > 0 || glossary.length > 0) && (
        <div className="   py-8">
          <RepairResources
            blogPosts={blogPosts}
            appliance={appliance.charAt(0).toUpperCase() + appliance.slice(1)}
            glossaryData={glossary}
          />
        </div>
      )}

      {/* 8. Additional Symptoms */}
      {additionalSymptomsLinks.length > 0 && (
        <div className="   py-8">
          <AdditionalSymptoms
            symptomsData={additionalSymptomsLinks}
            brand={brand}
            appliance={appliance}
          />
        </div>
      )}

      {/* 9. Brand Comparison */}
      {otherBrandLinks.length > 0 && (
        <div className="   py-8">
          <BrandComparisonSection
            otherBrandLinks={otherBrandLinks}
            symptom={symptom}
          />
        </div>
      )}
    </div>
  );
}
