import React from "react";

export interface ExpertItem {
  name: string;
  description: string;
  iconSrc: string;
  iconAlt: string;
}

export interface ExpertsCardProps {
  title: string;
  experts: ExpertItem[];
}

export default function ExpertsCard({ title, experts }: ExpertsCardProps) {
  return (
    <div className="lg:pb-10 mt-6 font-oswald bg-gray-100 rounded-xl p-[1.563rem] pb-12">
      <div className="text-center lg:px-0 py-3">
        <h2 className="text-left text-4xl lg:text-4xl-plus font-normal leading-9 text-blue-300 uppercase">
          {title}
        </h2>
      </div>
      <div>
        <div className="grid mt-10 px-0 md:px-4 lg:px-2 xl:pl-2 lg:grid-cols-3 grid-cols-1 md:grid-cols-2 gap-9 text-left sm:justify-items-start">
          {experts.map((expert, index) => (
            <div key={index} className="flex flex-col gap-4 w-full">
              <div
                data-metric-id="repair_brand_page_4_basic_list_basic_list_card_image"
                className="text-blue-300 justify-items-center md:justify-items-start"
              >
                <img
                  alt={expert.iconAlt}
                  loading="lazy"
                  width="40"
                  height="40"
                  decoding="async"
                  className="w-[55px] h-[55px]"
                  style={{ color: "transparent" }}
                  src={expert.iconSrc}
                />
                <div></div>
              </div>
              <h3
                data-metric-id="repair_brand_page_4_basic_list_basic_list_card_title"
                data-metric-value={expert.name}
                className="text-blue-300 uppercase text-lg-plus md:text-xl font-medium leading-8 text-center md:text-left"
              >
                {expert.name}
              </h3>
              <p className="text-gray-500 text-md font-normal leading-6 font-montserrat text-center md:text-left">
                {expert.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
