import React from "react";
import Image, { StaticImageData } from "next/image";

export interface TrustFeatureItem {
  title: string;
  description: string;
  icon: React.ReactNode | string | StaticImageData;
}

export interface SlugBlueTrustBarProps {
  title?: string;
  features: TrustFeatureItem[];
}

export default function SlugBlueTrustBar({
  title = "Why Choose Sears for Carpet Cleaning?",
  features = [],
}: SlugBlueTrustBarProps) {
  return (
    <div className="bg-[#1E40AF] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <h2 className="text-3xl md:text-3xl font-bold text-white mb-12 max-w-2xl leading-tight">
          {title}
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 sm:gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-start">
              {/* Icon */}
              <div className="mb-6 text-white">
                {typeof feature.icon === "string" ||
                (typeof feature.icon === "object" &&
                  "src" in (feature.icon as any)) ? (
                  <div className="relative w-12 h-12">
                    <Image
                      src={feature.icon as string | StaticImageData}
                      alt={feature.title}
                      fill
                      className="object-contain brightness-0 invert" // Make standard black icons white
                    />
                  </div>
                ) : (
                  <div className="w-12 h-12 flex items-center justify-start [&>svg]:w-10 [&>svg]:h-10 [&>svg]:stroke-white">
                    {feature.icon as React.ReactNode}
                  </div>
                )}
              </div>

              <h3 className="text-xl font-bold text-white mb-3">
                {feature.title}
              </h3>

              <p className="text-blue-100 text-lg leading-relaxed font-medium">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
