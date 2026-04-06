import { notFound } from "next/navigation";
import { Metadata } from "next";
import CategoryView from "@/components/features/blog/CategoryView";
import PostView from "@/components/features/blog/PostView";
import { blogService } from "@/services/blogService";

const VALID_CATEGORIES = new Set(["repair", "protect", "maintain"]);

// Fallback whitelist to validate appliances and strictly return 404 for made-up URLs
const VALID_APPLIANCES = new Set([
  "dishwasher",
  "dryer",
  "furnace",
  "refrigerator",
  "washer",
  "oven",
  "hvac",
  "garage",
  "heating",
  "kitchen-appliances",
  "air-conditioner",
  "ac",
  "lighting",
  "electrical",
  "riding-mower",
  "cooktop",
  "double-oven",
  "freezer",
  "garbage-disposal",
  "gas-grill",
  "ice-maker",
  "microwave",
  "range",
  "range-hood",
  "stacked-laundry",
  "trash-compactor",
  "washer-dryer-combo",
  "boiler",
  "central-air",
  "gas-furnace",
  "heat-pump",
  "humidifier-dehumidifier",
  "water-heater",
  "elliptical-machine",
  "stationary-bike",
  "stepper",
  "treadmill",
  "snow-blower",
  "wide-deck-lawn-mower"
]);

type RouteResolution =
  | { type: "category"; category: string; applianceSlug?: string }
  | { type: "post"; postSlug: string }
  | { type: "not_found" };

/**
 * Shared Route Resolver (DRY)
 * Safely parses the URL segments and strictly decides whether it is a category or a post.
 */
function resolveBlogRoute(slug: string[]): RouteResolution {
  if (!slug || slug.length === 0) return { type: "not_found" };

  // Depth 1 (/blog/repair OR /blog/my-post)
  if (slug.length === 1) {
    const routeParam = slug[0].toLowerCase();
    
    if (VALID_CATEGORIES.has(routeParam)) {
      return { type: "category", category: routeParam };
    }
    
    // If not a known category, treat it as a blog post slug
    return { type: "post", postSlug: routeParam };
  }

  // Depth 2 (/blog/repair/dishwasher-resources)
  if (slug.length === 2 && slug[1].endsWith("-resources")) {
    const category = slug[0].toLowerCase();
    const applianceRawSlug = slug[1].toLowerCase();
    
    if (VALID_CATEGORIES.has(category)) {
      const applianceSlug = applianceRawSlug.replace("-resources", "");
      
      // Strict Appliance Validation: Ensure the slug is a real appliance before rendering
      if (VALID_APPLIANCES.has(applianceSlug)) {
        return { type: "category", category, applianceSlug };
      }
    }
  }

  // Any other pattern strictly 404s
  return { type: "not_found" };
}

interface DynamicBlogRouterProps {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const resolution = resolveBlogRoute(resolvedParams.slug);

  if (resolution.type === "not_found") {
    return { title: "Page Not Found | Sears Home Services" };
  }

  if (resolution.type === "category") {
    const { category, applianceSlug } = resolution;
    const displayCat = category.charAt(0).toUpperCase() + category.slice(1);
    
    if (applianceSlug) {
      const displayApp = applianceSlug.charAt(0).toUpperCase() + applianceSlug.slice(1);
      return {
        title: `${displayCat} - ${displayApp} Resources | Sears Home Services Blog`,
        description: `Find expert ${category} advice and troubleshooting resources specifically for your ${applianceSlug}.`
      };
    }
    
    return {
      title: `${displayCat} Guides & Tips | Sears Home Services Blog`,
      description: `Expert advice to help you troubleshoot, ${category}, and correctly operate your home appliances.`
    };
  }

  if (resolution.type === "post") {
    // If we want perfect SEO, we fetch the post here to read its real title.
    // Next.js will dedupe this fetch request if PostView fetches it too.
    const post = await blogService.getPostBySlug(resolution.postSlug);
    if (!post) return { title: "Post Not Found | Sears Home Services" };
    
    return {
      title: `${post.title} | Sears Home Services Blog`,
      description: post.excerpt || "Read expert appliance repair tips from Sears Home Services."
    };
  }

  return { title: "Sears Home Services Blog" };
}

export const dynamic = "force-dynamic";

export default async function DynamicBlogRouter({ params, searchParams }: DynamicBlogRouterProps) {
  // Await the entire params promise for Next.js 15
  const resolvedParams = await params;
  const resolution = resolveBlogRoute(resolvedParams.slug);

  if (resolution.type === "not_found") {
    notFound();
  }

  // Let Server Components handle their own data fetching to optimize Suspense / Streaming
  if (resolution.type === "category") {
    return (
      <CategoryView 
        category={resolution.category} 
        applianceFilter={resolution.applianceSlug} 
        searchParams={searchParams} 
      />
    );
  }

  if (resolution.type === "post") {
    return <PostView slug={resolution.postSlug} />;
  }
}
