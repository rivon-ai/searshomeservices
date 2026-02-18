import React from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

export interface ServiceCardLink {
  text: string;
  url: string;
}

export interface ServiceCardItem {
  title: string;
  image: string | StaticImageData;
  description?: string;
  links: ServiceCardLink[];
}

export interface SlugServiceCardGridProps {
  title?: string;
  description?: string;
  services: ServiceCardItem[];
}

const ChevronRight = () => (
  <svg
    className="w-4 h-4 ml-1"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 5l7 7-7 7"
    />
  </svg>
);

export default function SlugServiceCardGrid({
  title = "Sears experts know HVAC systems maintenance",
  description = "Sears has the HVAC experts for your furnace and air conditioning replacement",
  services = [],
}: SlugServiceCardGridProps) {
  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-[#002B5C] mb-3 leading-tight max-w-2xl">
            {title}
          </h2>
          <p className="text-gray-500 text-lg">{description}</p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-shadow duration-300 p-8 flex flex-col h-full"
            >
              <h3 className="text-xl font-bold text-[#002B5C] mb-6">
                {service.title}
              </h3>

              {/* Image Container */}
              <div className="bg-gray-100 rounded-xl mb-6 flex items-center justify-center p-8 h-48 relative overflow-hidden group">
                <div className="relative w-full h-full transform group-hover:scale-105 transition-transform duration-300">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              <p className="text-gray-600 mb-8 leading-relaxed grow">
                {service.description}
              </p>

              <div className="border-t border-gray-100 pt-6 space-y-3 mt-auto">
                {service.links.map((link, linkIndex) => (
                  <Link
                    key={linkIndex}
                    href={link.url}
                    className="flex items-center text-[#002B5C] font-medium hover:text-blue-600 transition-colors group"
                  >
                    {link.text}
                    <span className="transform group-hover:translate-x-1 transition-transform">
                      <ChevronRight />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
