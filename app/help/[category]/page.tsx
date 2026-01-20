"use client";

import React from "react";
import { useParams } from "next/navigation";
import CategoryLinks from "../components/CategoryLinks";
import LatestResource from "@/app/components/LatestResource";
import GlossaryTerms from "@/app/components/GlossaryTerms";
import ContentGrid from "@/app/components/ContentGrid";

export interface LinkData {
  text: string;
  href: string;
}

interface CategoryLinksProps {
  title?: string;
  items?: LinkData[];
  imageSrc?: string;
  imageAlt?: string;
}

const defaultItems = [
  {
    text: "Do you repair products that weren't purchased at Sears?",
    href: "/help/repair-faq/do-you-repair-products-that-werent-purchased-at-sears",
  },
  {
    text: "Does Sears Home Services repair heating and air conditioning systems?",
    href: "/help/repair-faq/does-sears-home-services-repair-heating-and-air-conditioning-systems",
  },
  {
    text: "Does Sears Home Services still repair appliances?",
    href: "/help/repair-faq/does-sears-home-services-still-repair-appliances",
  },
];

const defaultImage =
  "https://www.searshomeservices.com/cftassets/7IcHGrQdIsBOE9pqdTgLHN/89bb9e6cbdedb20511779085b208aff8/Brands-products-we-repair.jpeg?w=3840&q=90&fm=webp";

const data = [
  {
    title: "Brands & Products We Repair",
    items: defaultItems,
    imageSrc: defaultImage,
    imageAlt: "Technician repairing an oven",
  },
  {
    title: "Repair Scheduling",
    items: defaultItems,
    imageSrc: defaultImage,
    imageAlt: "Technician repairing an oven",
  },
  {
    title: "Repair Pricing",
    items: defaultItems,
    imageSrc: defaultImage,
    imageAlt: "Technician repairing an oven",
  },
];

const symptomItems = [
  {
    title: "Payne central air not working",
    description:
      "When your Payne central air conditioner won’t turn on or isn’t cooling, check for power problems...",
    href: "#",
  },
  {
    title: "ICP central air not working",
    description:
      "When your ICP central air conditioner won’t turn on or isn’t cooling, check for power problems...",
    href: "#",
  },
  {
    title: "Heil central air not working",
    description:
      "When your Heil central air conditioner won’t turn on or isn’t cooling, check for power problems...",
    href: "#",
  },
  {
    title: "Carrier central air not working",
    description:
      "When your Carrier central air conditioner won’t turn on or isn’t cooling, check for power problems...",
    href: "#",
  },
  {
    title: "Comfortmaker central air not working",
    description:
      "When your Comfortmaker central air conditioner won’t turn on or isn’t cooling, check for power problems...",
    href: "#",
  },
  {
    title: "Ruud central air not working",
    description:
      "When your Ruud central air conditioner won’t turn on or isn’t cooling, check for power problems...",
    href: "#",
  },
];

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function Page() {
  const params = useParams();
  const category = params.category as string;

  const formatCategory = (slug: string) => {
    if (!slug) return "";
    return slug
      .split("-")
      .map((word) =>
        word.toLowerCase() === "faq"
          ? "FAQ"
          : word.charAt(0).toUpperCase() + word.slice(1),
      )
      .join(" ");
  };

  const formattedCategory = formatCategory(category);

  return (
    <div>
      <div className="w-[80%] mx-auto pt-10">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/help">Help Center</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-gray-900 font-normal">
                {formattedCategory}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <h2 className="text-3xl font-semibold leading-8 mt-0 text-blue-950 w-[80%] mx-auto pb-10">
        {formattedCategory}
      </h2>

      {data.map((item, index) => {
        const swapLayout = index % 2 === 0;

        return (
          <div
            key={index}
            className={` ${swapLayout ? "bg-slate-200" : ""} flex justify-center`}
          >
            <CategoryLinks
              SwapLayout={swapLayout}
              title={item.title}
              items={item.items}
              imageSrc={item.imageSrc}
              imageAlt={item.imageAlt}
            />
          </div>
        );
      })}

      <div className="mx-auto lg:max-w-[50%] flex flex-col gap-20 py-10">
        <LatestResource />
        <GlossaryTerms />
        <ContentGrid
          sectionTitle="Recent Appliance Symptoms"
          items={symptomItems}
        />
      </div>
    </div>
  );
}
