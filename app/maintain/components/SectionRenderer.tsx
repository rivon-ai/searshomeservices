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

// Adapters
import {
  mapHeroProps,
  mapServiceGridProps,
  mapBrandLogosProps,
  mapMaintenanceStepsProps,
  mapBookingCardProps,
  mapRecentSymptomsProps,
  mapLatestResourcesProps,
  mapContentGridProps,
} from "../utils/maintain-adapters";

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
        <React.Fragment>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-4">
            <h2 className="text-3xl font-bold text-[#002B5C]">
              {section.props.title}
            </h2>
          </div>
          <SlugMaintainCardsGrid {...mapRecentSymptomsProps(section.props)} />
        </React.Fragment>
      );

    case "latest_resource":
      return (
        <React.Fragment>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-4">
            <h2 className="text-3xl font-bold text-[#002B5C]">
              {section.props.title}
            </h2>
          </div>
          <SlugMaintainCardsGrid {...mapLatestResourcesProps(section.props)} />
        </React.Fragment>
      );

    case "content_grid":
      // Using MaintainCardsGrid for Testimonials/Reviews for now (fallback)
      return (
        <React.Fragment>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-4">
            <h2 className="text-3xl font-bold text-[#002B5C]">
              {section.props.title}
            </h2>
          </div>
          <SlugMaintainCardsGrid {...mapContentGridProps(section.props)} />
        </React.Fragment>
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

    case "glossary":
      // Simple Glossary Renderer inline for now
      return (
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-[#002B5C] mb-8">
              {section.props.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {section.props.terms.map((term: any, i: number) => (
                <div key={i} className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="text-xl font-bold text-[#1E40AF] mb-2">
                    {term.term}
                  </h3>
                  <p className="text-gray-600 mb-4">{term.definition}</p>
                  {term.link && (
                    <a
                      href={term.link}
                      className="text-blue-500 hover:underline font-medium"
                    >
                      Read more
                    </a>
                  )}
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
