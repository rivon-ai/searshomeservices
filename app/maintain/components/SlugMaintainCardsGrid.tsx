import React from "react";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";

export interface MaintainServiceItem {
  title: string;
  description: string;
  icon?: React.ReactNode | StaticImageData | string;
  linkUrl: string;
  linkText?: string;
}

export interface SlugMaintainCardsGridProps {
  services: MaintainServiceItem[];
}

const ArrowRight = () => (
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
      d="M14 5l7 7m0 0l-7 7m7-7H3"
    />
  </svg>
);

export default function SlugMaintainCardsGrid({
  services = [],
}: SlugMaintainCardsGridProps) {
  // Calculate grid columns based on number of services (max 3 for now in logical layout, but can be 2 if only 2 items)
  // Logic: 1 item -> 1 col, 2 items -> 2 cols, 3+ items -> 3 cols
  const gridColsClass =
    services.length === 1
      ? "grid-cols-1 max-w-2xl mx-auto"
      : services.length === 2
        ? "grid-cols-1 md:grid-cols-2"
        : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";

  return (
    <div className="">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`grid ${gridColsClass} gap-8`}>
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col h-full"
            >
              {/* Icon Area - Only render if icon exists */}
              {service.icon && (
                <div className="mb-6 text-[#1E40AF]">
                  {typeof service.icon === "string" ||
                  (typeof service.icon === "object" &&
                    "src" in (service.icon as any)) ? (
                    <Image
                      src={service.icon as string | StaticImageData}
                      alt={service.title}
                      width={48}
                      height={48}
                      className="object-contain"
                    />
                  ) : (
                    // Render ReactNode directly
                    <div className="w-12 h-12 flex items-center justify-start">
                      {service.icon as React.ReactNode}
                    </div>
                  )}
                </div>
              )}

              <h3 className="text-2xl font-bold text-[#002B5C] mb-4">
                {service.title}
              </h3>

              <p className="text-gray-500 leading-relaxed mb-8 grow">
                {service.description}
              </p>

              <div className="mt-auto">
                <Link
                  href={service.linkUrl}
                  className="inline-flex items-center text-[#1E40AF] font-bold hover:text-blue-800 transition-colors"
                >
                  {service.linkText || "Learn More"}
                  <span className="transform transition-transform ml-1">
                    <ArrowRight />
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}