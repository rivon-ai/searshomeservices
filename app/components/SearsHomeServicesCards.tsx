import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import warrantyIcon from "@/public/HomeWarrenty.svg";
import partsIcon from "@/public/ApplianceParts.svg";
import cleaningIcon from "@/public/HomeCleaning.svg";
import Link from "next/link";

interface ServiceCard {
  title: string;
  icon: any; 
  description: string;
  href: string;
}

const servicesData: ServiceCard[] = [
  {
    title: "HOME WARRANTY",
    icon: warrantyIcon,
    description: "Protect your home's appliances and systems",
    href: "/home-warranty",
  },
  {
    title: "APPLIANCE PARTS",
    icon: partsIcon,
    description: "Shop 3 million+ parts. Lookup 50,000 manuals",
    href: "https://www.searspartsdirect.com",
  },
  {
    title: "HOME CLEANING",
    icon: cleaningIcon,
    description: "Air duct, carpet and upholstery cleaning experts",
    href: "https://www.searsclean   .com",
  },
];

export default function SearsHomeServicesCards() {
  return (
    <div className="py-12 w-full">
      <h2 className="text-2xl font-bold text-blue-900 mb-2 uppercase">
        SEARS HOME SERVICES
      </h2>
      <p className="text-gray-600 mb-12">
        We&apos;re more than just repairs. Discover all the services we offer
        for your home:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {servicesData.map((service, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] p-8 border border-gray-100 flex flex-col items-center text-center h-full hover:shadow-lg transition-shadow duration-300"
          >
            <div className="mb-6 mt-4">
              <Image
                src={service.icon}
                alt={service.title}
                className="w-16 h-16 object-contain"
              />
            </div>

            <h3 className="text-blue-900 font-bold uppercase mb-4 text-lg">
              {service.title}
            </h3>

            <p className="text-gray-600 text-base leading-relaxed mb-8 grow max-w-[80%]">
              {service.description}
            </p>

            <Button
              variant="outline"
              className="w-full border-blue-600 text-blue-600 hover:bg-blue-50 font-medium py-6 text-base rounded-md"
            >
              <Link href={service.href}>Learn More</Link>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
