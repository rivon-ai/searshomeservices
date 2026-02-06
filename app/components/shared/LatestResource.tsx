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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
        {resources.map((resource, index) => (
          <Card
            key={index}
            className="flex flex-col h-full group hover:shadow-xl hover:shadow-blue-900/5 transition-all rounded-2xl overflow-hidden"
          >
            <CardContent className="p-0 flex flex-col h-full">
              <div className="relative overflow-hidden h-48 w-full">
                <Image
                  src={resource.image}
                  alt={resource.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  placeholder="blur"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-lg text-[10px] font-bold text-blue-900 uppercase tracking-widest shadow-sm">
                    {resource.category}
                  </span>
                </div>
              </div>

              <div className="p-6 flex flex-col grow">
                <h3 className="text-lg font-bold text-[#002855] mb-3 group-hover:text-blue-700 transition-colors leading-tight min-h-14">
                  {resource.title}
                </h3>

                <div className="text-gray-400 text-xs font-bold mb-4 flex items-center gap-2 uppercase tracking-wide">
                  <span>{resource.readTime}</span>
                  <span className="text-blue-200">•</span>
                  <span>{resource.date}</span>
                </div>

                <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3">
                  {resource.description}
                </p>

                <div className="mt-auto">
                  <Button asChild variant="link" className="p-0 h-auto text-blue-600 hover:text-blue-800 font-bold group/btn">
                    <Link href="#">
                      Learn More
                      <span className="ml-1 inline-block transition-transform group-hover/btn:translate-x-1">→</span>
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
