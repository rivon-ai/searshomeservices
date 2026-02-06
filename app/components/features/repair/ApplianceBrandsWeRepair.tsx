import React from "react";
import Link from "next/link";
import Image from "next/image";

export interface Brand {
  name: string;
  logoUrl: string;
  link: string;
  alt: string;
}

export interface ApplianceBrandsWeRepairProps {
  title?: string;
  description?: string[];
  brands?: Brand[];
  seeAllLink?: {
    text: string;
    href: string;
  };
}

export default function ApplianceBrandsWeRepair({
  title,
  description = [],
  brands = [],
  seeAllLink,
}: ApplianceBrandsWeRepairProps) {
  return (
    <div className="grid grid-cols-1">
      <div className="lg:pb-0 lg:px-0 flex flex-col justify-center align-middle">
        <h2 className="my-2 lg:my-4 text-blue-300 font-oswald uppercase font-normal text-4xl lg:text-[1.625rem] leading-9">
          {title}
        </h2>
        <div className="my-3.5 lg:my-3.75 text-gray-500 text-sm lg:text-[0.9375rem] pt-3">
          {description.map((desc, index) => (
            <p
              key={index}
              className="text-md leading-6 text-gray-500 font-normal text-left mb-4"
            >
              {desc}
            </p>
          ))}
        </div>
      </div>

      <div className="sm:mb-0 items-center xl:w-[90%] px-1 gap-0 xl:gap-0 flex flex-wrap justify-around sm:justify-center mx-auto lg:mx-8 xl:mx-14.8">
        {brands.map((brand, index) => (
          <div
            key={index}
            data-metric-id={`repair_category_page_4_${index}_brand_list`}
            data-metric-value={brand.name}
            className={`flex justify-center items-center h-33 w-36 md:w-41.25 ${brand.name === "KitchenAid" ? "md:w-25" : ""}`} // KitchenAid had a specifc width in extracted HTML, preserving it roughly or handling via specific logic if needed.
            // Wait, standard width is md:w-[10.3125rem] except KitchenAid was w-36 md:w-[6.25rem] in the snippet?
            // In the snippet: KitchenAid: <div ... class="... w-36 md:w-[6.25rem]">
            // All others: <div ... class="... w-36 md:w-[10.3125rem]">
            // I will use a conditional or just pass className if I wanted to be super generic, but for now I'll check name.
          >
            <Link
              href={brand.link}
              className="w-full h-full flex justify-center items-center filter invert-40 transition-[filter] duration-300 ease-out hover:invert-0"
            >
              <img
                alt={brand.alt}
                loading="lazy"
                width={brand.name === "LG" ? 100 : 125} // LG had width 100 in snippet
                height={125}
                decoding="async"
                data-nimg="1"
                style={{ color: "transparent" }}
                src={brand.logoUrl}
              />
            </Link>
          </div>
        ))}
      </div>

      <div className="text-gray-500 text-[0.9375rem]">
        <p className="text-md leading-6 text-gray-500 font-normal text-left my-4">
          <Link
            href={"#"}
            className="text-[0.9375rem] font-normal text-blue-500"
          >
            see all links
          </Link>
        </p>
      </div>
    </div>
  );
}
