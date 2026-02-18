import Image from "next/image";
import React from "react";
import heroImage from "@/public/Brand-list-page-hero.webp";
import brandData from "@/data/brands-urls.json";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

export default function page() {
  return (
    <div className="w-[75%] mx-auto">
      {/* hero image */}

      <div className="relative">
        <Image
          src={heroImage}
          alt="Hero Image"
          className="w-full h-auto rounded-lg"
          width={1200}
          height={600}
        />

        {/* Main Content Card */}
        <div className="absolute top-[90%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-2xl p-4 max-w-md w-[70%]">
          {/* Heading */}
          <div className="mb-6">
            <h2 className="font-bold text-2xl text-blue-950 mb-3">
              Appliance Brand We Repair & Maintain
            </h2>
          </div>
        </div>
      </div>

      {/* brand list */}
      <div className="mt-32 mb-20">
        <Accordion
          type="multiple"
          defaultValue={Object.keys(brandData)}
          className="w-full"
        >
          {Object.entries(brandData).map(([category, brands]) => (
            <AccordionItem key={category} value={category}>
              <AccordionTrigger className="uppercase font-bold text-gray-600">
                BRANDS {category}
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4">
                  {brands.map((brand, index) => (
                    <Link
                      key={index}
                      href={brand.url}
                      className="text-blue-600 hover:underline font-medium"
                    >
                      {brand.text}
                    </Link>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
