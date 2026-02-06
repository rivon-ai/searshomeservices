import {
  HeroSectionProps,
  ServiceGridProps,
  BrandLogosProps,
  MaintenanceStepsProps,
  BookingCardProps,
  RecentSymptomsProps,
  LatestResourceProps,
  ContentGridProps,
  DealCardsProps,
  CleaningSectionProps,
} from "../maintain/types/maintain-data";

import { ImageSectionProps } from "../components/maintain/ImageSection";
import { SlugServiceCardGridProps } from "../components/maintain/SlugServiceCardGrid";
import { SlugSupportedBrandCardsProps } from "../components/maintain/SlugSupportedBrandCards";
import { SlugBookingCardProps } from "../components/maintain/SlugBookingCard";
import { SlugMaintainCardsGridProps } from "../components/maintain/SlugMaintainCardsGrid";
import { MaintenanceStepsProps as ComponentMaintenanceStepsProps } from "../components/maintain/MaintenanceSteps";
import { DiscountCardsProps } from "../components/maintain/DiscountCards";
import { CleaningBeforeAfterSectionProps } from "../components/maintain/CleaningBeforeAfterSection";
import { ContentGridProps as ComponentContentGridProps } from "../components/shared/ContentGrid";
import { RepairResources } from "../../components/RepairResources";

const DATA_BASE_URL = (process.env.NEXT_PUBLIC_DATA_URL || 'http://localhost:3001').replace(/\/$/, '');

export async function getMaintainPageData(slug: string): Promise<any | null> {
    // Candidates for fetching data. 
    // Adapting to potential JSON server structures.
    // 1. Direct slug match (e.g. /maintain-main or /upholstery-cleaning)
    // 2. Nested under maintain (e.g. /maintain/upholstery-cleaning)
    
    // Note: If the JSON server is mimicking the file system, simple slugs might be keys.
    const candidates = [
        `${DATA_BASE_URL}/${slug}`,
        `${DATA_BASE_URL}/maintain/${slug}`,
        `${DATA_BASE_URL}/data/maintain/summarized/${slug}.json` // Fallback to a path-like structure if server serves static files
    ];

    for (const url of candidates) {
        try {
            const response = await fetch(url, { cache: 'no-store' }); // Ensure fresh data
            if (response.ok) {
                const json = await response.json();
                // Handle array return from json-server filtering or single object
                if (Array.isArray(json)) {
                     // If it's an array, it might be a filter result. 
                     // Usually json-server returns array for /posts?id=1 but object for /posts/1
                     // maintain-main is likely an object key.
                     return json.length > 0 ? json[0] : null;
                }
                return json;
            }
        } catch (err: any) {
            // Continue to next candidate
            // console.error(`Failed to fetch from ${url}`, err);
        }
    }

    return null;
}

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

export function mapDealCardsProps(props: DealCardsProps): DiscountCardsProps {
  return {
    title: props.title,
    cards: props.cards.map((card) => ({
      title: card.title,
      saveLabel: `SAVE ${card.save_percent}`,
      price: card.price,
      description: undefined, // Not present in deal_cards JSON
      link: card.link,
      services: card.features.map((f) => ({ name: f })),
      isBestValue: card.features.length >= 5, // Logic to determine best value? Or should be in JSON?
      // For now, let's assume if it has 5+ features it's best value, or default to false
    })),
  };
}

export function mapCleaningSectionProps(
  props: CleaningSectionProps,
): CleaningBeforeAfterSectionProps {
  return {
    title: props.title,
    items: props.items.map((item) => ({
      title: item.title,
      description: item.description,
      details: item.details,
      features: item.features,
      before_image: item.before_image,
      after_image: item.after_image,
    })),
  };
}

export function mapRatingSectionProps(props: ContentGridProps) {
  return {
    reviews: props.items.map((item) => ({
      title: item.title || "Great Service", // Fallback title
      rating: 5, // Default to 5 stars as per requirement
      text: item.quote,
      author: item.author,
    })),
  };
}

export function mapRecentSymptomsToContentGridProps(
  props: RecentSymptomsProps,
): ComponentContentGridProps {
  return {
    sectionTitle: props.title,
    items: props.symptoms.map((s) => ({
      title: s.symptom,
      description: s.description,
      href: s.link,
    })),
  };
}

type RepairResourcesProps = React.ComponentProps<typeof RepairResources>;

export function mapLatestResourcesToRepairResourcesProps(
  props: LatestResourceProps,
): RepairResourcesProps {
  return {
    title: props.title,
    blogPosts: props.resources.map((r) => {
      // Parse metadata string "4 min read | Jan. 23"
      let readTime = "5 min read";
      let date = "Recently Updated";

      if (r.metadata) {
        const parts = r.metadata.split("|").map((s) => s.trim());
        if (parts.length > 0) readTime = parts[0];
        if (parts.length > 1) date = parts[1];
      }

      return {
        title: r.title,
        description: r.description,
        link: r.link,
        image: r.image,
        readTime,
        date,
        category: r.category?.name,
        categoryLink: r.category?.link,
      };
    }),
  };
}
