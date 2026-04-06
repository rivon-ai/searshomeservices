// =====================================================================
// Summarized Repair Data Types
// These types mirror the JSON structure served by the backend API.
// =====================================================================

// ScrapedNode is used by RenderRandomContent to render mixed content
export interface ScrapedNode {
  tag: string;
  content: string;
  attributes: string | Record<string, any>;
  order: number;
}


export interface ServiceOverviewItem {
  type: 'p' | 'img' | 'iframe' | 'h2' | 'h3' | 'h4' | 'ul' | 'li' | 'strong' | 'a';
  content: string;
  src?: string;
}

export interface BrandItem {
  name: string;
  logoUrl: string;
  link: string;
  alt: string;
}

export interface ApplianceItem {
  label: string;
  iconSrc: string;
  href: string;
  iconAlt: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface BlogLink {
  title: string;
  href: string;
}

export interface GlossaryItem {
  term: string;
  definition: string;
}

export interface SymptomLink {
  text: string;
  link: string;
}

export interface ReviewItem {
  title: string;
  body: string;
  reviewer: string;
  date: string;
}

export interface SummarizedRepairData {
  brand: string;
  appliance: string;
  pageType: 'repair-service' | 'info';
  url: string;
  seoTitle: string;
  pageTitle: string;

  serviceOverview: ServiceOverviewItem[];

  trustSignals: Array<{ value: string }>;

  brandsWeRepair: {
    title: string;
    brands: BrandItem[];
  };

  applianceBrandSelector: {
    title: string;
    brands: BrandItem[];
  };

  applianceSelector: {
    title: string;
    appliances: ApplianceItem[];
  };

  faq: FaqItem[];

  blogArticles: {
    title: string;
    links: BlogLink[];
  };

  glossary: GlossaryItem[];
  symptomLinks: SymptomLink[];
  brandSymptomLinks: SymptomLink[];

  maintenanceSection: {
    show: boolean;
    title: string;
  };

  ratingSection: {
    show: boolean;
    title: string;
    totalReviews: string;
    rating: string;
  };

  reviews: ReviewItem[];

  navigationSections: {
    whySears: { show: boolean; title: string };
    howItWorks: { show: boolean; title: string };
  };
}

// =====================================================================
// Booking Wizard API Types
// These types mirror the JSON contract defined by the backend team.
// Base URL: http://localhost:5000/api/v1/appointments
// =====================================================================

/** A single appliance option returned by GET /options */
export interface ApplianceOption {
  id: string;    // e.g. "washer" — used as the value in API calls
  label: string; // e.g. "Washer" — displayed to the user
  icon: string;  // e.g. "🫧"
}

/** Map of appliance id → array of brand name strings, from GET /options */
export type BrandsByAppliance = Record<string, string[]>;

/** A single US state option returned by GET /options */
export interface StateOption {
  abbreviation: string; // e.g. "TX"
  name: string;         // e.g. "Texas"
}

/** Full response shape for GET /options */
export interface WizardOptions {
  success: boolean;
  appliances: ApplianceOption[];
  brandsByAppliance: BrandsByAppliance;
  states: StateOption[];
}

/** A single time slot within a schedule day */
export interface TimeSlot {
  id: string;        // e.g. "8AM-12PM" — stored as serviceTime in booking
  label: string;     // e.g. "8:00 AM – 12:00 PM" — displayed to the user
  startTime: string; // e.g. "08:00"
  endTime: string;   // e.g. "12:00"
  available: boolean;
}

/** A single day entry in the schedule, derived from GET /availability/schedule */
export interface ScheduleDay {
  date: string;       // ISO date string e.g. "2026-04-01"
  slots: TimeSlot[];
}

/** Response shape for GET /availability/zip/:zip */
export interface ZipValidationResponse {
  valid: boolean;
  zip: string;
  city: string | null;
  state: string | null;
  message: string;
}

/** Response shape for GET /pricing */
export interface PricingResponse {
  success: boolean;
  diagnosticFee: number;
  currency: string;
  formatted: string; // e.g. "$129.00" — use this directly for display
}

/** Customer sub-object for the POST /appointments payload */
export interface BookingCustomer {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

/** Address sub-object for the POST /appointments payload */
export interface BookingAddress {
  streetAddress: string;
  suite?: string;
  city: string;
  state: string;
}

/** Full payload sent to POST /appointments */
export interface CreateAppointmentPayload {
  appliance: string;
  brand: string;
  zipCode: string;
  serviceDate: string;
  serviceTime: string;
  serviceType: "repair";
  customer: BookingCustomer;
  address: BookingAddress;
  specialInstructions: string;
}

/** The appointment record returned by the backend after booking */
export interface AppointmentRecord {
  id: string;        // Virtual id mapped to orderId (e.g. "ORD-A7X2P")
  orderId: string;
  appliance: string;
  brand: string;
  diagnosticFee: number;
  zipCode: string;
  serviceDate: string;
  serviceTime: string;
  status: "upcoming" | "visited" | "cancelled";
  customer: BookingCustomer;
  address: BookingAddress;
  specialInstructions?: string;
  rejectionReason?: string;
  applianceModelNumber?: string;
  applianceSerialNumber?: string;
  applianceIssueImage?: string;
  applianceBarcodeImage?: string;
  createdAt: string;
}

/** Full success response from POST /appointments */
export interface CreateAppointmentResponse {
  success: boolean;
  orderId: string;
  appointment: AppointmentRecord;
}
