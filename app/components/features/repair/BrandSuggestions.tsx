import React from "react";
import Link from "next/link";

export interface BrandSuggestion {
  name: string;
  logoUrl: string;
  link: string;
  alt: string;
  isSvg?: boolean;
  svgContent?: React.ReactNode;
}

export interface BrandSuggestionsProps {
  title?: string;
  brands?: BrandSuggestion[];
}

export default function BrandSuggestions({
  title,
  brands = [],
}: BrandSuggestionsProps) {
  return (
    <div className="px-0 md:px-4">
      <h3 className="text-blue-950 uppercase text-2xl font-medium leading-8 lg:leading-9 my-4 font-oswald">
        {title}
      </h3>
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-y-18 place-items-center py-4">
        {brands.map((brand, index) => (
          <Link
            key={index}
            href={brand.link}
            className="flex flex-col items-center justify-start w-[160px] text-center gap-4 hover:no-underline"
            data-testid={`cooktop_repair_combo_page_links_list_items_${index}`}
            data-metric-id={`cooktop_repair_combo_page_links_list_items_${index}`}
          >
            <button
              type="button"
              className="flex flex-col items-center w-full text-blue-950"
            >
              <div className="m-2 rounded-lg h-12 w-12 shrink-0">
                {(brand as any).isSvg ? ( // Casting to any for the ad-hoc property. In a real app we'd add to interface
                  (brand as any).svgContent
                ) : (
                  <div className="min-w-[50px] min-h-[50px]">
                    <img
                      alt={brand.alt}
                      loading="lazy"
                      width={50}
                      height={50}
                      decoding="async"
                      data-nimg="1"
                      style={{ color: "transparent" }}
                      src={brand.logoUrl}
                    />
                  </div>
                )}
              </div>
              <p className="text-lg leading-6 lg:leading-8 mt-[18px] min-h-[3em] font-semibold hover:no-underline">
                {brand.name}
              </p>
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
}
