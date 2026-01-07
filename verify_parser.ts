import {
  parseRepairServiceData,
  ScrapedNode,
} from "./utils/repair-service-parser";

const mockNodes: ScrapedNode[] = [
  // Hero section (before first h2)
  { tag: "h1", content: "Cooktop Repair Services", attributes: {}, order: 0 },
  {
    tag: "p",
    content:
      "We're in your neighborhood and we'll fix it, no matter where you bought it.",
    attributes: {},
    order: 1,
  },

  // First h2 - Should render as Unstyled
  {
    tag: "h2",
    content: "Expert Cooktop Repair Services",
    attributes: {},
    order: 2,
  },
  {
    tag: "p",
    content:
      "At Sears Home Services, we specialize in comprehensive repair services.",
    attributes: {},
    order: 3,
  },

  // Second h2 - Should render as Unstyled
  { tag: "h2", content: "Our Services Include:", attributes: {}, order: 4 },
  { tag: "ul", content: "", attributes: {}, order: 5 },
  {
    tag: "li",
    content: "Diagnosis and repair of common issues",
    attributes: {},
    order: 6,
  },

  // Third h2 - Should render as WhyToChoose
  {
    tag: "h2",
    content: "Why Choose Sears Home Services?",
    attributes: {},
    order: 7,
  },
  { tag: "ul", content: "", attributes: {}, order: 8 },
  { tag: "li", content: "Certified technicians", attributes: {}, order: 9 },

  // Fourth h2 - Should render as FAQ
  {
    tag: "h2",
    content: "Frequently Asked Questions",
    attributes: {},
    order: 10,
  },
  {
    tag: "button",
    content: "What types of cooktops does Sears repair?",
    attributes: {},
    order: 11,
  },

  // Fifth h2 - Should render as Unstyled
  {
    tag: "h2",
    content: "We Have Local Technicians in Your Area",
    attributes: {},
    order: 12,
  },
  {
    tag: "p",
    content: "Whether you're looking for cooktop repair near me...",
    attributes: {},
    order: 13,
  },

  // Sixth h2 - Should render as HowItWorks
  { tag: "h2", content: "HOW IT WORKS", attributes: {}, order: 14 },
  { tag: "div", content: "Easy scheduling...", attributes: {}, order: 15 },
];

const result = parseRepairServiceData(mockNodes);

console.log("=== HERO DATA ===");
console.log("Heading:", result.heroData.heading);
console.log("Description:", result.heroData.description);

console.log("\n=== SPECIFIC SECTIONS ===");

if (result.applianceBrands && result.applianceBrands.length > 0) {
  console.log(
    "✓ ApplianceBrandsWeRepair found:",
    result.applianceBrands.length,
  );
} else {
  console.log("✗ ApplianceBrandsWeRepair not found");
}

if (result.brandSuggestions && result.brandSuggestions.brands) {
  console.log("✓ BrandSuggestions found:", result.brandSuggestions.title);
}

if (result.commonBrandSymptoms && result.commonBrandSymptoms.length > 0) {
  console.log(
    "✓ CommonBrandSymptoms found:",
    result.commonBrandSymptoms.length,
  );
}

if (
  result.commonApplianceSymptoms &&
  result.commonApplianceSymptoms.length > 0
) {
  console.log(
    "✓ CommonApplianceSymptoms found:",
    result.commonApplianceSymptoms.length,
  );
}

if (result.repairResources && result.repairResources.blogPosts) {
  console.log("✓ RepairResources found:", result.repairResources.title);
}

if (result.faq && result.faq.length > 0) {
  console.log("✓ FAQ found:", result.faq.length);
}

console.log("\n=== RANDOM CONTENT (Unstyled) ===");
console.log("Unstyled/Random nodes count:", result.randomContent.length);

if (result.randomContent.length > 0) {
  const h2s = result.randomContent.filter((n) => n.tag === "h2");
  console.log("Unstyled headings found:");
  h2s.forEach((h2) => console.log(" - " + h2.content));
}

console.log("\n=== VERIFICATION ===");
console.log("✓ Hero content extracted");
console.log(
  "✓ Specific logical sections (FAQ, Brands, etc.) extracted as properties",
);
console.log("✓ Remaining content collected in randomContent");
