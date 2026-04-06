import React from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import furnaceImg from "@/public/latestResource/how-much-does-it-cost-to-fix-a-furnace.webp";
import repairImg from "@/public/latestResource/same-day-next-day-service-image.webp";
import iceMakerImg from "@/public/latestResource/Ice_cubes_in_a_refrigerator_ice_make_bin.webp";
import dryerImg from "@/public/latestResource/Dryer_Not_Heating_5_Ways_to_Fix_It.webp";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
      <h2 className="text-3xl font-extrabold text-[#002855] mb-12 tracking-tight">
        Latest Resources
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {resources.map((resource, index) => (
          <Link key={index} href="#" className="group flex flex-col h-full bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-all">
            <div className="bg-gray-100 aspect-video overflow-hidden">
              <Image
                src={resource.image}
                alt={resource.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                placeholder="blur"
              />
            </div>
            <div className="p-5 flex flex-col grow">
              <div className="flex items-center gap-2 text-xs font-bold text-blue-600 mb-2 uppercase tracking-wider">
                <span>{resource.category}</span>
              </div>
              <h4 className="font-bold text-gray-900 mb-3 group-hover:text-blue-700 leading-snug">
                {resource.title}
              </h4>
              <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                {resource.description}
              </p>
              <div className="mt-auto flex items-center gap-2 text-xs font-medium text-gray-500">
                <span>{resource.date}</span>
                <span>&middot;</span>
                <span>{resource.readTime}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
