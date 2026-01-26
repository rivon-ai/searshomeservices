import React from "react";
import { SectionData } from "../types/maintain-data";

// Components
import ImageSection from "./ImageSection"; // Hero
import SlugServiceCardGrid from "./SlugServiceCardGrid";
import MaintenanceSteps from "./MaintenanceSteps";
import SlugSupportedBrandCards from "./SlugSupportedBrandCards";
import SlugBookingCard from "./SlugBookingCard";
import SlugMaintainCardsGrid from "./SlugMaintainCardsGrid";
import SlugRichTextRenderer from "./SlugRichTextRenderer";
import DiscountCards from "./DiscountCards";
import CleaningBeforeAfterSection from "./CleaningBeforeAfterSection";
import RatingSection from "../../../components/RatingSection";
import { RepairResources } from "../../../components/RepairResources";
import ContentGrid from "../../components/ContentGrid";

// Adapters
import {
  mapHeroProps,
  mapServiceGridProps,
  mapBrandLogosProps,
  mapMaintenanceStepsProps,
  mapBookingCardProps,
  mapRecentSymptomsProps,
  mapLatestResourcesProps,

  mapDealCardsProps,
  mapCleaningSectionProps,
  mapRatingSectionProps,
  mapRecentSymptomsToContentGridProps,
  mapLatestResourcesToRepairResourcesProps,
} from "../utils/maintain-adapters";
import Link from "next/link";

interface SectionRendererProps {
  section: SectionData;
}

export default function SectionRenderer({ section }: SectionRendererProps) {
  switch (section.type) {
    case "hero_section":
      return <ImageSection {...mapHeroProps(section.props)} />;

    case "services_grid":
      return <SlugServiceCardGrid {...mapServiceGridProps(section.props)} />;

    case "maintenance_steps":
      return <MaintenanceSteps {...mapMaintenanceStepsProps(section.props)} />;

    case "brand_logos":
      return <SlugSupportedBrandCards {...mapBrandLogosProps(section.props)} />;

    case "booking_card":
      return <SlugBookingCard {...mapBookingCardProps(section.props)} />;

    case "recent_appliance_symptoms":
      return (
        <div className="w-[50%] mx-auto">
          <ContentGrid {...mapRecentSymptomsToContentGridProps(section.props)} />
        </div>
      );

    case "latest_resource":
      return (
        <div className="w-[50%] mx-auto">
          <RepairResources
            {...mapLatestResourcesToRepairResourcesProps(section.props)}
          />
        </div>
      );


    case "generic_section":
      return (
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-[#002B5C] mb-8">
                {section.props.title}
              </h2>
              <SlugRichTextRenderer content={section.props.content} />
            </div>
          </div>
        </section>
      );

    case "deal_cards":
      return <DiscountCards {...mapDealCardsProps(section.props)} />;

    case "appliance_cleaning_section":
      return (
        <CleaningBeforeAfterSection {...mapCleaningSectionProps(section.props)} />
      );

    case "rating_section":
      return <RatingSection {...mapRatingSectionProps(section.props)} />;

    case "glossary":
      // Simple Glossary Renderer inline for now
      return (
        <section className="py-12 w-[50%] mx-auto">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-[#002B5C] mb-8">
              {section.props.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
              {section.props.terms.map((term: any, i: number) => (
                <div key={i} className="">
                  <Link href={term.link} className="font-semibold text-blue-950 mb-4">
                    {term.term}
                  </Link>
                  <p className="text-gray-600 mb-4">{term.definition}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    default:
      console.warn(`SectionRenderer: Unknown section type '${section.type}'`);
      return null;
  }
}
