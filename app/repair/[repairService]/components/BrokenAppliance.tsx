import React from "react";
import Link from "next/link";

export interface ApplianceItem {
  label: string;
  iconSrc: string;
  iconAlt: string;
  href: string;
}

export interface BrokenApplianceProps {
  title: string;
  appliances: ApplianceItem[];
}

export default function BrokenAppliance({
  title,
  appliances,
}: BrokenApplianceProps) {
  return (
    <div className="px-0 py-4 mb-3 lg:mb-6">
      <h3 className="text-2xl font-medium leading-8 lg:leading-9 pt-4 lg:py-4 uppercase">
        {title}
      </h3>
      <div className="grid gap-y-6 lg:gap-y-12 gap-x-3 mt-10 place-items-center text-blue-950 grid-cols-2 md:grid-cols-4 lg:grid-cols-3">
        {appliances.map((appliance, index) => (
          <div
            key={index}
            className="flex flex-col items-center m-2 text-center"
            data-metric-id={`repair_brand_page_2_${index}_schedule_repair_list`}
            data-metric-value={appliance.label}
          >
            <Link href={appliance.href} className="hover:no-underline">
              <div className="flex flex-col items-center uppercase">
                <div className="pt-2 pb-1.5 pl-2 pr-1.5 rounded-xl shrink-0">
                  {/* Using standard img tag as per snippet, but could be Next/Image if configured. Keeping it simple as requested. */}
                  <img
                    alt={appliance.iconAlt}
                    loading="lazy"
                    width="50"
                    height="50"
                    decoding="async"
                    className="w-12/5 h-12.5"
                    style={{ color: "transparent" }}
                    src={appliance.iconSrc}
                  />
                </div>
                <h4 className="my-3 text-lg-plus lg:text-xl font-medium leading-7 text-blue-950">
                  {appliance.label}
                </h4>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
