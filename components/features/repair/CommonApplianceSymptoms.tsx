import React from "react";
import Link from "next/link";
import { Symptom } from "./CommonBrandSymptoms"; // Reuse interface if desired or redefine

export interface CommonApplianceSymptomsProps {
  title?: string;
  symptoms?: Symptom[];
}

export default function CommonApplianceSymptoms({
  title,
  symptoms = [],
}: CommonApplianceSymptomsProps) {
  return (
    <div className="my-8 lg:mt-0 lg:mb-15">
      <h2 className="text-blue-950 mb-0 leading-8 text-2xl font-semibold">{title}</h2>
      <div className="mt-4 lg:mt-5">
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-1 lg:gap-x-8 lg:gap-y-0"
          data-metric-id="blog_list_section"
          data-metric-value="repair_category_page_section_blog_list"
        >
          {symptoms.map((symptom, index) => (
            <div key={index}>
              <div className="flex flex-col h-full">
                <div className="leading-8">
                  <Link
                    href={symptom.link}
                    className="hover:text-inherit focus:text-inherit hover:no-underline focus:no-underline"
                    data-testid={`repair_category_page_section_blog_list_title_${symptom.link}`}
                    data-metric-id={`repair_category_page_section_blog_list_title_${symptom.link}`}
                    data-metric-value={symptom.link}
                  >
                    <span className="text-gray-600 text-md font-medium leading-6 line-clamp-2 mb-2 lg:mb-3">
                      {symptom.text}
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
