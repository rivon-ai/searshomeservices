export interface SEOData {
  title: string;
  description: string;
}

export interface SchedulerData {
  defaultAppliance: string;
  available_options: string[];
}

export interface HeroSectionProps {
  heading: string;
  description: string;
  backgroundImage: string;
  scheduler?: SchedulerData;
}

export interface ServiceItemData {
  title: string;
  image: string;
  link?: string;
  repairLink?: string; // Potential variation
  description?: string;
}

export interface ServiceGridProps {
  title: string;
  services: ServiceItemData[];
}

export interface BrandItemData {
  link?: string;
  logo?: string;
  name?: string; // Sometimes inferred
}

export interface BrandLogosProps {
  title: string;
  brands: BrandItemData[];
}

export interface StepItemData {
  icon: string;
  title: string;
  description: string;
}

export interface MaintenanceStepsProps {
  title: string;
  steps: StepItemData[];
}

export interface TestimonialItemData {
  quote: string;
  author: string;
  title?: string;
}

export interface ContentGridProps {
  title: string;
  items: TestimonialItemData[];
}

export interface ResourceCategory {
  name: string;
  link: string;
}

export interface ResourceItemData {
  image: string;
  title: string;
  metadata?: string;
  description: string;
  link: string;
  category?: ResourceCategory;
}

export interface LatestResourceProps {
  title: string;
  resources: ResourceItemData[];
}

export interface GlossaryTermData {
  term: string;
  link: string;
  definition: string;
}

export interface GlossaryProps {
  title: string;
  terms: GlossaryTermData[];
}

export interface SymptomItemData {
  symptom: string;
  link: string;
  description: string;
}

export interface RecentSymptomsProps {
  title: string;
  symptoms: SymptomItemData[];
}

export interface BookingCardProps {
  title?: string;
  content?: any[]; // Rich text array
  price?: string;
  features?: string[];
  ctaLink?: string;
}

// Deal Cards
export interface DealCardItem {
  title: string;
  save_percent: string;
  price: string;
  link: string;
  features: string[];
}

export interface DealCardsProps {
  title: string;
  cards: DealCardItem[];
}

// Cleaning Section
export interface CleaningItemData {
  title: string;
  description: string;
  details: string;
  features: string[];
  before_image: string;
  after_image: string;
}

export interface CleaningSectionProps {
  title: string;
  items: CleaningItemData[];
}

export interface SectionData {
  id: string;
  type:
    | "hero_section"
    | "services_grid"
    | "generic_section"
    | "maintenance_steps"
    | "content_grid"
    | "latest_resource"
    | "glossary"
    | "recent_appliance_symptoms"
    | "brand_logos"
    | "booking_card"
    | "deal_cards"
    | "appliance_cleaning_section"
    | "rating_section"; // Added
  props:
    | HeroSectionProps
    | ServiceGridProps
    | MaintenanceStepsProps
    | ContentGridProps
    | LatestResourceProps
    | GlossaryProps
    | RecentSymptomsProps
    | BrandLogosProps
    | BookingCardProps
    | DealCardsProps
    | CleaningSectionProps
    | ContentGridProps // Re-using ContentGridProps for RatingSection as the structure is identical (title + items)
    | any; // For generic_section which is complex
}

export interface MaintainPageData {
  slug: string;
  seo: SEOData;
  sections: SectionData[];
}
