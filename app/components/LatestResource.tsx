import React from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import furnaceImg from "@/public/latestResource/how-much-does-it-cost-to-fix-a-furnace.webp";
import repairImg from "@/public/latestResource/same-day-next-day-service-image.webp";
import iceMakerImg from "@/public/latestResource/Ice_cubes_in_a_refrigerator_ice_make_bin.webp";
import dryerImg from "@/public/latestResource/Dryer_Not_Heating_5_Ways_to_Fix_It.webp";

interface Resource {
  title: string;
  image: StaticImageData | string;
  readTime: string;
  date: string;
  description: string;
  category: string;
}

const resources: Resource[] = [
  {
    title: "How Much Does It Cost to Fix a Furnace?",
    image: furnaceImg,
    readTime: "7 min read",
    date: "Dec. 30",
    description:
      "Discover the average cost of fixing a furnace and get expert advice from Sears Home Services.",
    category: "HVAC",
  },
  {
    title: "Where Can I Get Same-Day Appliance Repair?",
    image: repairImg,
    readTime: "4 min read",
    date: "Dec. 30",
    description:
      "Waiting for repairs when your appliance breaks down is a frustrating experience.",
    category: "Kitchen Appliances",
  },
  {
    title: "Ice Maker Not Making Ice? Troubleshoot and Fix It Today",
    image: iceMakerImg,
    readTime: "9 min read",
    date: "Dec. 30",
    description:
      "Find out how to fix your refrigerator ice maker when it's not making ice.",
    category: "Refrigerator",
  },
  {
    title: "Dryer Not Heating? 5 DIY Fixes You Can Try Today",
    image: dryerImg,
    readTime: "7 min read",
    date: "Dec. 29",
    description:
      "Learn 5 DIY troubleshooting tips to fix your dryer when it is not heating. Accurately diagnose why your dryer is not getting hot and fix the problem fast.",
    category: "Dryer",
  },
];

export default function LatestResource() {
  return (
    <div className="w-full">
      <h2 className="text-3xl font-semibold text-blue-950 mb-12">
        Latest Resources
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-8 gap-y-12">
        {resources.map((resource, index) => (
          <div
            key={index}
            className="flex flex-col h-full group cursor-pointer"
          >
            <div className="relative overflow-hidden rounded-xl mb-4 h-44 w-full">
              <Image
                src={resource.image}
                alt={resource.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                placeholder="blur"
              />
            </div>

            <h2 className="text-lg font-bold text-blue-950 mb-3 group-hover:text-blue-700 transition-colors leading-tight">
              {resource.title}
            </h2>

            <div className="text-gray-500 text-sm font-medium mb-3 flex items-center gap-2">
              <span>{resource.readTime}</span>
              <span>•</span>
              <span>{resource.date}</span>
            </div>

            <p className="text-gray-600 text-base leading-relaxed mb-4 grow">
              {resource.description}
            </p>

            <div className="mt-auto">
              <Link
                href="#"
                className="text-blue-800 uppercase text-sm hover:text-blue-700 tracking-wide inline-block"
              >
                {resource.category}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
