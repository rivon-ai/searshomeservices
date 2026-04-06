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
} from "@/app/maintain/types/maintain-data";

import { ImageSectionProps } from "@/components/features/maintain/ImageSection";
import { SlugServiceCardGridProps } from "@/components/features/maintain/SlugServiceCardGrid";
import { SlugSupportedBrandCardsProps } from "@/components/features/maintain/SlugSupportedBrandCards";
import { SlugBookingCardProps } from "@/components/features/maintain/SlugBookingCard";
import { SlugMaintainCardsGridProps } from "@/components/features/maintain/SlugMaintainCardsGrid";
import { MaintenanceStepsProps as ComponentMaintenanceStepsProps } from "@/components/features/maintain/MaintenanceSteps";
import { DiscountCardsProps } from "@/components/features/maintain/DiscountCards";
import { CleaningBeforeAfterSectionProps } from "@/components/features/maintain/CleaningBeforeAfterSection";
import { ContentGridProps as ComponentContentGridProps } from "@/components/shared/ContentGrid";
import { RepairResources } from "@/components/shared/RepairResources";

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

