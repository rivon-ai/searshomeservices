import React from "react";

import Image1 from "@/public/symptom-center/resourceImage1.webp";
import Image2 from "@/public/symptom-center/resourceImage2.webp";
import Image3 from "@/public/symptom-center/resourceImage3.webp";
import Image4 from "@/public/symptom-center/resourceImage4.webp";
import Image, { StaticImageData } from "next/image";

// Repair Resources Component
export interface RepairResource {
  title: string;
  readTime?: string;
  date?: string;
  description?: string;
  category?: string;
  categoryLink?: string;
  secondaryCategory?: string;
  secondaryCategoryLink?: string;
  imageUrl?: string | StaticImageData;
  imageAlt?: string;
  link: string;
}

const repairResources: RepairResource[] = [
  {
    title: "When It's Time to Bring in a Pro for Appliance Repair",
    readTime: "7 min read",
    date: "Dec. 17",
    description:
      "When it's time to call in professional appliance technicians for repair, trust Sears Home Services.",
    category: "Kitchen Appliances",
    categoryLink: "/blog/repair/kitchen-appliances-resources",
    imageUrl: Image1,
    imageAlt: "Sears technician repairing an oven",
    link: "/blog/when-its-time-to-bring-in-a-pro-for-appliance-repair",
  },
  {
    title: "How Does a Mixing Valve Work?",
    readTime: "6 min read",
    date: "Dec. 17",
    description:
      "Learn how a mixing valve works to control water temperature in a washer.",
    category: "Washer",
    categoryLink: "/blog/repair/washer-resources",
    secondaryCategory: "Appliance 101",
    secondaryCategoryLink: "/blog/repair/appliance-101-resources",
    imageUrl: Image2,
    imageAlt: "washer mixing valve image for blog article",
    link: "/blog/how-does-a-mixing-valve-work-explanation",
  },
  {
    title: "Why Use a Vetted Home Service Provider?",
    readTime: "4 min read",
    date: "Dec. 17",
    description:
      "Discover how to find thoroughly vetted home services contractors and get reliable professionals for your projects.",
    category: "HVAC",
    categoryLink: "/blog/repair/hvac-resources",
    imageUrl: Image3,
    imageAlt:
      "homeowner using a vetted Sears Home Services appliance technician",
    link: "/blog/why-use-a-vetted-home-service-provider",
  },
  {
    title: "Samsung Fridge Troubleshooting: A Comprehensive Guide",
    readTime: "6 min read",
    date: "Dec. 17",
    description:
      "Get expert troubleshooting tips for your Samsung fridge with our comprehensive guide.",
    category: "Refrigerator",
    categoryLink: "/blog/repair/refrigerator-resources",
    imageUrl: Image4,
    imageAlt: "Homeowner happy about fixing his fridge",
    link: "/blog/samsung-fridge-troubleshooting-comprehensive-guide",
  },
];

interface RepairResourcesProps {
  blogPosts?: any[];
  appliance?: string;
  glossaryData?: any[];
}

export function RepairResources({
  blogPosts = [],
  appliance,
  glossaryData,
}: RepairResourcesProps) {
  // Transform scraped blog posts to match RepairResource interface if provided
  const resourcesToDisplay: RepairResource[] =
    blogPosts.length > 0
      ? blogPosts.map((post) => ({
          title: post.title || "Appliance Repair Tip",
          description:
            post.description ||
            `Learn more about ${appliance || "appliance"} repair.`,
          link: post.link || "#",
          imageUrl: post.image, // May be undefined or string
          imageAlt: post.title || "Blog post image",
          readTime: "5 min read", // Placeholder
          date: "Recently Updated", // Placeholder
          category: appliance || "Repair",
          categoryLink: "#",
        }))
      : repairResources;

  return (
    <div className="mb-6 md:mb-10">
      <hr className="mb-6 md:mb-10" />
      <div className="">
        <h2 className="text-[#003d82] text-4xl mb-4 px-4 lg:px-0 lg:mb-8">
          Repair Resources
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6">
          {resourcesToDisplay.map((resource, index) => (
            <div key={index} className="flex flex-col h-full py-4 px-4 md:px-0">
              {/* Image */}
              <div className="mb-6 relative w-full h-53">
                <a
                  href={resource.link}
                  className="hover:text-inherit focus:text-inherit hover:no-underline focus:no-underline"
                >
                  <div className="relative w-full h-full">
                    {resource.imageUrl ? (
                      <Image
                        alt={resource.imageAlt || "Resource image"}
                        loading="lazy"
                        decoding="async"
                        className="object-cover rounded-2xl absolute h-full w-full"
                        src={resource.imageUrl}
                        width={500}
                        height={300}
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 rounded-2xl flex items-center justify-center text-gray-400">
                        No Image
                      </div>
                    )}
                  </div>
                </a>
              </div>

              {/* Content */}
              <div className="flex flex-col md:justify-between md:max-h-52 md:h-full">
                <div>
                  {/* Title */}
                  <div className="mb-1">
                    <a
                      href={resource.link}
                      className="hover:no-underline focus:no-underline"
                    >
                      <p className="text-xl leading-8 text-[#003d82] font-semibold">
                        {resource.title}
                      </p>
                    </a>
                  </div>

                  {/* Meta data - Read time and Date */}
                  <p className="w-full items-center mt-4 md:mt-0 leading-8 text-xs text-gray-500">
                    <span className="wrap-break-word">{resource.readTime}</span>
                    <span className="ml-2 before:content-['•'] before:mr-2 wrap-break-word">
                      {resource.date}
                    </span>
                  </p>

                  {/* Description */}
                  <div className="text-[#1a1a1a] leading-6 line-clamp-3 mt-0">
                    <p className="text-[#1a1a1a] text-md leading-6 font-normal">
                      {resource.description}
                    </p>
                  </div>

                  {/* Categories */}
                  <p className="font-medium text-xs w-full items-center mt-2 leading-4 text-gray-500">
                    <span className="wrap-break-word">
                      <a
                        className="break-all text-[#0066cc] text-xs"
                        href={resource.categoryLink || "#"}
                      >
                        {resource.category}
                      </a>
                    </span>
                    {resource.secondaryCategory && (
                      <span className="ml-2 before:content-['•'] before:mr-2 wrap-break-word">
                        <a
                          className="break-all text-[#0066cc] text-xs"
                          href={resource.secondaryCategoryLink || "#"}
                        >
                          {resource.secondaryCategory}
                        </a>
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Recent Appliance Symptoms Component
interface Symptom {
  title: string;
  description: string;
  link: string;
}

const recentSymptoms: Symptom[] = [
  {
    title: "Payne central air not working",
    description:
      "When your Payne central air conditioner won't turn on or isn't cooling, check for power problems, a failed capacitor, or a clogged condensate drain. This guide covers quick, safe troubleshooting steps and explains when to call Sears Home Services for expert central AC repair.",
    link: "/symptom/payne-central-air-not-working",
  },
  {
    title: "ICP central air not working",
    description:
      "When your ICP central air conditioner won't turn on or isn't cooling, check for power problems, a failed capacitor, or a clogged condensate drain. This guide covers quick, safe troubleshooting steps and explains when to call Sears Home Services for expert central AC repair.",
    link: "/symptom/icp-central-air-not-working",
  },
  {
    title: "Heil central air not working",
    description:
      "When your Heil central air conditioner won't turn on or isn't cooling, check for power problems, a failed capacitor, or a clogged condensate drain. This guide covers quick, safe troubleshooting steps and explains when to call Sears Home Services for expert central AC repair.",
    link: "/symptom/heil-central-air-not-working",
  },
  {
    title: "Carrier central air not working",
    description:
      "When your Carrier central air conditioner won't turn on or isn't cooling, check for power problems, a failed capacitor, or a clogged condensate drain. This guide covers quick, safe troubleshooting steps and explains when to call Sears Home Services for expert central AC repair.",
    link: "/symptom/carrier-central-air-not-working",
  },
];

export function RecentSymptoms() {
  return (
    <div className="max-w-300 lg:mx-auto">
      <div className="mx-4 lg:max-w-149 lg:mx-auto lg:mt-6 mb-12">
        <h3 className="text-[#003d82] mb-0 text-4xl">
          Recent Appliance Symptoms
        </h3>
        <div className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            {recentSymptoms.map((symptom, index) => (
              <div key={index} className="flex flex-col h-full">
                <div className="text-xl font-semibold leading-8 mt-0 lg:mt-4 mb-1">
                  <a
                    className="hover:text-inherit focus:text-inherit hover:no-underline focus:no-underline"
                    href={symptom.link}
                  >
                    <span className="text-[#003d82] text-xl font-semibold leading-8 line-clamp-2">
                      {symptom.title}
                    </span>
                  </a>
                </div>
                <div className="text-[#1a1a1a] leading-6 line-clamp-3 mb-8 lg:mb-4">
                  <p className="text-[#1a1a1a] text-md leading-6 font-normal">
                    {symptom.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Glossary Terms Component
interface GlossaryTerm {
  title: string;
  description: string;
  link: string;
}

const glossaryTerms: GlossaryTerm[] = [
  {
    title: "What is the drum of the washing machine?",
    description:
      "The drum is the core part of the washer that holds your laundry and enables the cleaning process through rotation, agitation, and rinsing.",
    link: "/glossary/what-is-a-washer-drum",
  },
  {
    title: "What is a 608 Certification?",
    description:
      "The 608 Certification, mandated by the Environmental Protection Agency (EPA), is required for HVAC technicians to legally handle refrigerants. It ensures technicians understand refrigerant types, environmental impact, and proper handling techniques.",
    link: "/glossary/what-is-a-608-certification",
  },
  {
    title: "What is a Compressor?",
    description:
      "A compressor is a mechanical device that increases the pressure of a gas by reducing its volume, essential in various systems including refrigerators, air conditioners, and HVAC units for cooling and refrigeration processes.",
    link: "/glossary/what-is-a-compressor",
  },
  {
    title: "What is a Condenser?",
    description:
      "A condenser is a component of HVAC and refrigeration systems, responsible for releasing absorbed heat from the refrigerant into the outside air or a water line, thus facilitating the cooling process.",
    link: "/glossary/what-is-a-condenser",
  },
];

export function GlossaryTerms() {
  return (
    <div className="">
      <div className="mx-4 lg:max-w-xl lg:mx-auto mt-8 mb-12 lg:mb-20 lg:mt-20">
        <h3 className="text-[#003d82] mb-0 text-4xl">Glossary Terms</h3>
        <div className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            {glossaryTerms.map((term, index) => (
              <div key={index}>
                <div className="flex flex-col h-full">
                  <div className="text-xl font-semibold leading-8 mt-0 lg:mt-4 mb-1">
                    <a
                      className="hover:text-inherit focus:text-inherit hover:no-underline focus:no-underline"
                      href={term.link}
                    >
                      <span className="text-[#003d82] text-xl font-semibold leading-8 line-clamp-2">
                        {term.title}
                      </span>
                    </a>
                  </div>
                  <div className="text-[#1a1a1a] leading-6 line-clamp-3 mb-8 lg:mb-4">
                    <p className="text-[#1a1a1a] text-md leading-6 font-normal">
                      {term.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Combined Demo Component
export default function RepairResourcesAndGlossary() {
  return (
    <div className="bg-white py-8">
      <RepairResources />
      <RecentSymptoms />
      <GlossaryTerms />
    </div>
  );
}
