import React from "react";
import Image, { StaticImageData } from "next/image";

// Import default brand logos
import kenMore from "@/public/sear-page-icons-images/kenmore-01.svg";
import whirpool from "@/public/sear-page-icons-images/whirlpool-01.svg";
import fridigate from "@/public/sear-page-icons-images/frigidaire-01.svg";
import ge from "@/public/sear-page-icons-images/GE-01.svg";
import kitchenAid from "@/public/sear-page-icons-images/kitchenaid-01.svg";
import bosch from "@/public/sear-page-icons-images/bosch-01.svg";

export interface BrandProps {
  name: string;
  alt: string;
  logo?: string | StaticImageData;
  link?: string;
}

export interface SlugSupportedBrandCardsProps {
  title?: string;
  description?: string;
  brands: BrandProps[];
}

const brandLogoMap: Record<string, StaticImageData> = {
  Kenmore: kenMore,
  Whirlpool: whirpool,
  Frigidaire: fridigate,
  GE: ge,
  KitchenAid: kitchenAid,
  Bosch: bosch,
};

export default function SlugSupportedBrandCards({
  title = "Supported Brands",
  description = "We offer maintenance for most major brands, no matter where you bought it.",
  brands,
}: SlugSupportedBrandCardsProps) {
  return (
    <div className="py-12 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-[#002B5C] mb-3">{title}</h2>
          <p className="text-gray-500 text-lg">{description}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {brands.map((brand, index) => {
            const LogoSrc = brand.logo || brandLogoMap[brand.name];

            const Content = () => (
              <>
                {LogoSrc ? (
                  <div className="relative w-full h-full flex items-center justify-center">
                    <Image
                      src={LogoSrc}
                      alt={brand.alt}
                      className="object-contain max-h-16 w-auto"
                      width={160}
                      height={90}
                    />
                  </div>
                ) : (
                  <span className="text-gray-400 font-medium">
                    {brand.name}
                  </span>
                )}
              </>
            );

            return (
              <div
                key={`${brand.name}-${index}`}
                className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 p-6 flex items-center justify-center h-32"
              >
                {brand.link ? (
                  <a
                    href={brand.link}
                    className="w-full h-full flex items-center justify-center"
                  >
                    <Content />
                  </a>
                ) : (
                  <Content />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
