import brandAppliancesData from "../data/brands_appliances_symptoms_structured.json";

export interface Appliance {
  appliance: string;
  symptoms: string[];
}

export interface BrandData {
  brand: string;
  appliances: Appliance[];
}

export const brandAppliances: BrandData[] = brandAppliancesData;
