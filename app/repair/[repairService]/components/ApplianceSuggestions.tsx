import React from "react";
import Link from "next/link";

export interface SuggestionItem {
  label: string;
  iconSrc: string;
  iconAlt: string;
  href: string;
}

export interface ApplianceSuggestionsProps {
  title: string;
  suggestions: SuggestionItem[];
}

export default function ApplianceSuggestions({
  title,
  suggestions,
}: ApplianceSuggestionsProps) {
  return (
    <div className="px-0 ">
      <h3 className="text-blue-950 uppercase text-2xl font-medium leading-8 lg:leading-9 my-4 font-oswald">
        {title}
      </h3>
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-y-18 place-items-center py-4">
        {suggestions.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className="flex flex-col items-center justify-start w-[160px] text-center gap-4 hover:no-underline"
            data-metric-id={`kenmore_repair_combo_page_links_list_items_${index}`}
            data-metric-value=""
            target="_self"
          >
            {/* Replaced button with div to avoid invalid HTML (active element inside active element), keeping classes */}
            <div className="flex flex-col items-center w-full text-blue-950">
              <div className="m-2 rounded-lg h-12 w-12 shrink-0">
                <div className="min-w-[50px] min-h-[50px]">
                  <img
                    alt={item.iconAlt}
                    loading="lazy"
                    width="50"
                    height="50"
                    decoding="async"
                    style={{ color: "transparent" }}
                    src={item.iconSrc}
                  />
                </div>
              </div>
              <p className="text-2xl leading-6 lg:leading-8 mt-[18px] min-h-[3em] font-medium hover:no-underline">
                {item.label}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
