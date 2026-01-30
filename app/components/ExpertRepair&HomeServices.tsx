import Link from "next/link";
import React from "react";

interface ContentItem {
  type: "heading" | "paragraph" | "list";
  text?: string;
  level?: "h1" | "h2" | "h3";
  content?: (string | { text: string; href: string })[]; // For paragraphs with links
  items?: string[]; // For lists
  listType?: "grid" | "bullet"; // grid for 3-cols, bullet for simple list
}

const contentData: ContentItem[] = [
  {
    type: "heading",
    text: "EXPERT APPLIANCE REPAIR & HOME SERVICES",
    level: "h1",
  },
  {
    type: "paragraph",
    content: [
      "We’re the nation's largest appliance repair service provider. Our technicians repair and maintain most major appliance brands, makes and models, no matter where you bought them.",
    ],
  },
  {
    type: "paragraph",
    content: [
      "Sears Home Services also provides ",
      { text: "HVAC repair", href: "#" },
      ", replacement and maintenance services across the country. Additionally, we offer home cleaning services such as carpet and air duct cleaning.",
    ],
  },
  {
    type: "paragraph",
    content: [
      "Sears Home Services delivers solutions for your entire home with our Sears Protect ",
      { text: "home warranty", href: "#" },
      " plans.",
    ],
  },
  {
    type: "heading",
    text: "Our Services",
    level: "h2",
  },
  {
    type: "heading",
    text: "Appliance Repair",
    level: "h3",
  },
  {
    type: "paragraph",
    content: [
      "Sears Home Services Technicians perform more than 7 million repairs annually and we have thousands of appliance experts employed nationwide. We're the #1 appliance repair service in the country, delivering guaranteed quality and workmanship.",
    ],
  },
  {
    type: "paragraph",
    content: ["Our technicians repair these types of home appliances:"],
  },
  {
    type: "list",
    listType: "grid",
    items: [
      "Refrigerators",
      "Stoves & Ranges",
      "Dishwashers",
      "Washers & Dryers",
      "Freezers",
      "Microwaves",
      "Wall Ovens",
      "Ice Makers",
      "Gas Grills",
    ],
  },
  {
    type: "paragraph",
    content: [
      "Sear Home Services repairs all major brands of appliances including Kenmore, Whirlpool, Frigidaire, Maytag, Amana, GE, Samsung, LG and more.",
    ],
  },
  {
    type: "paragraph",
    content: [
      "We also provide professional ",
      { text: "appliance maintenance", href: "#" },
      " service to help keep all your products in top shape and lasting longer.",
    ],
  },
  {
    type: "heading",
    text: "HVAC Repair & Maintenance",
    level: "h3",
  },
  {
    type: "paragraph",
    content: [
      "Sears Home Services is the best solution for home HVAC repair, providing top-quality expertise and service for all your heating and cooling needs.",
    ],
  },
  {
    type: "paragraph",
    content: [
      "Our HVAC system repair is designed to keep your home comfortable year-round, with skilled technicians who can diagnose and fix any issue quickly and efficiently.",
    ],
  },
  {
    type: "paragraph",
    content: [
      "To keep your heating and cooling systems running smoothly, we offer professional HVAC maintenance checks. We recommend having a furnace checkup at the start of heating season and an AC tune-up at the start of air conditioning season.",
    ],
  },
  {
    type: "heading",
    text: "Home Warranty",
    level: "h3",
  },
  {
    type: "paragraph",
    content: [
      "With one of our affordable home warranty plans, you'll worry less about the cost or stress of unexpected appliance or home-system repairs. Available in most zip codes nationwide, we’re here to help with monthly plans starting at very low prices.",
    ],
  },
  {
    type: "paragraph",
    content: [
      "Sears Protect is the only nationwide provider that employs its own service experts - technicians who undergo extensive training. That means you don't have to spend hours searching for the best, asking around or getting quotes.",
    ],
  },
  {
    type: "heading",
    text: "Why Choose Sears Home Services?",
    level: "h3",
  },
  {
    type: "list",
    listType: "bullet",
    items: [
      "Certified, insured techs",
      "Satisfaction guarantee",
      "National reach, local techs",
    ],
  },
  {
    type: "paragraph",
    content: [
      "Whether you need HVAC service or your dryer isn’t heating, we have appliance repair technicians ready to fix the problem.",
    ],
  },
];

export default function ExpertRepairAndHomeServices() {
  return (
    <div className="py-8">
      {contentData.map((section, index) => {
        if (section.type === "heading") {
          const Tag = section.level || "h2";
          const styles =
            section.level === "h1"
              ? "text-xl text-blue-950 mb-6 uppercase"
              : section.level === "h2"
                ? "text-xl text-blue-950 mt-8 mb-4 border-l-4 border-yellow-400 pl-3" 
                : "text-lg text-blue-950 mt-6 mb-3";

          const trueStyles =
            section.level === "h1"
              ? "text-2xl md:text-3xl text-blue-950 mb-4 uppercase"
              : section.level === "h2"
                ? "text-xl md:text-2xl text-blue-950 mt-8 mb-4"
                : "text-lg md:text-xl text-blue-950 mt-6 mb-2";

          return (
            <Tag key={index} className={trueStyles}>
              {section.text}
            </Tag>
          );
        }

        if (section.type === "paragraph") {
          return (
            <p
              key={index}
              className="text-gray-500 leading-relaxed mb-4 text-base"
            >
              {section.content?.map((part, i) =>
                typeof part === "string" ? (
                  <span key={i}>{part}</span>
                ) : (
                  <Link
                    key={i}
                    href={part.href}
                    className="text-blue-600 hover:underline hover:text-blue-800"
                  >
                    {part.text}
                  </Link>
                ),
              )}
            </p>
          );
        }

        if (section.type === "list") {
          if (section.listType === "grid") {
            return (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-3 gap-y-2 gap-x-4 mb-6 text-gray-600"
              >
                {section.items?.map((item, i) => (
                  <div key={i} className="flex items-center">
                    <span className="w-full">{item}</span>
                  </div>
                ))}
              </div>
            );
          } else {
            return (
              <ul
                key={index}
                className="list-disc pl-6 mb-6 text-gray-700 space-y-2"
              >
                {section.items?.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            );
          }
        }

        return null;
      })}
    </div>
  );
}
