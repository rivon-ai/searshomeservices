import {
  HeroSectionProps,
  ServiceGridProps,
  BrandLogosProps,
  MaintenanceStepsProps,
  BookingCardProps,
  RecentSymptomsProps,
  LatestResourceProps,
  ContentGridProps,
} from "../types/maintain-data";

import { ImageSectionProps } from "../components/ImageSection";
import { SlugServiceCardGridProps } from "../components/SlugServiceCardGrid";
import { SlugSupportedBrandCardsProps } from "../components/SlugSupportedBrandCards";
import { SlugBookingCardProps } from "../components/SlugBookingCard";
import { SlugMaintainCardsGridProps } from "../components/SlugMaintainCardsGrid";
import { MaintenanceStepsProps as ComponentMaintenanceStepsProps } from "../components/MaintenanceSteps";

export function mapHeroProps(props: HeroSectionProps): ImageSectionProps {
  return {
    heading: props.heading,
    description: props.description,
    backgroundImage: props.backgroundImage,
    scheduler: props.scheduler
      ? {
          defaultAppliance: props.scheduler.defaultAppliance,
          available_options: props.scheduler.available_options,
        }
      : undefined,
  };
}

export function mapServiceGridProps(
  props: ServiceGridProps,
): SlugServiceCardGridProps {
  return {
    title: props.title,
    services: props.services.map((s) => ({
      title: s.title,
      image: s.image,
      description: s.description,
      links: [
        {
          text: s.repairLink ? "Schedule Repair" : "Learn More",
          url: s.repairLink || s.link || "#",
        },
      ],
    })),
  };
}

export function mapBrandLogosProps(
  props: BrandLogosProps,
): SlugSupportedBrandCardsProps {
  return {
    title: props.title,
    brands: props.brands.map((b) => ({
      name: b.name || "Brand", // Fallback
      alt: b.name || "Brand Logo",
      logo: b.logo,
      link: b.link,
    })),
  };
}

export function mapBookingCardProps(
  props: BookingCardProps,
): SlugBookingCardProps {
  return {
    sectionTitle: props.title,
    sectionDescription: undefined,
    cardTitle: props.title || "Service",
    cardDescription: props.content || [],
    features: props.features || [],
    offerText: props.price || "",
    buttonText: "Schedule Now",
    buttonLink: props.ctaLink || "#",
    featuresTitle: "Includes:",
  };
}

export function mapRecentSymptomsProps(
  props: RecentSymptomsProps,
): SlugMaintainCardsGridProps {
  return {
    services: props.symptoms.map((s) => ({
      title: s.symptom,
      description: s.description,
      linkUrl: s.link,
      linkText: "Troubleshoot",
      icon: undefined,
    })),
  };
}

export function mapLatestResourcesProps(
  props: LatestResourceProps,
): SlugMaintainCardsGridProps {
  return {
    services: props.resources.map((r) => ({
      title: r.title,
      description: r.description,
      linkUrl: r.link,
      linkText: "Read Article",
      icon: r.image,
    })),
  };
}

export function mapContentGridProps(
  props: ContentGridProps,
): SlugMaintainCardsGridProps {
  return {
    services: props.items.map((item) => ({
      title: item.title || item.author,
      description: `"${item.quote}"`,
      linkUrl: "#",
      linkText: "",
      icon: undefined,
    })),
  };
}

export function mapMaintenanceStepsProps(
  props: MaintenanceStepsProps,
): ComponentMaintenanceStepsProps {
  return {
    title: props.title,
    steps: props.steps.map((s) => ({
      title: s.title,
      description: s.description,
      icon: s.icon,
    })),
  };
}
