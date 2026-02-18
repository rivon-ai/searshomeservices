import React from "react";
import Link from "next/link";

export default function HelpOptions() {
  return (
    <section className="">
      <div className="flex flex-col items-center gap-20 px-4 lg:px-7 py-12 lg:py-20">
        <div className="mx-auto">
          <div className="text-center pb-6 lg:pb-10">
            <h2 className="text-blue-950 font-semibold text-2xl lg:text-3xl">
              What are you looking answers for?
            </h2>
          </div>
          <div className="mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link
                href="/help/repair-faq"
                className="hover:no-underline"
                data-testid="help_center_home_page_help_center_category_list_0"
                data-metric-id="help_center_home_page_help_center_category_list_0"
                data-metric-value="Repair"
                target="_self"
              >
                <div className="bg-slate-100 rounded-xl lg:justify-center px-8 py-3 lg:py-8 lg:px-4 lg:w-[24rem] flex justify-center transition-all duration-300 ease-in-out border-2 border-transparent hover:border-blue-900">
                  <h5 className="text-blue-800 font-semibold text-lg">
                    Repair
                  </h5>
                </div>
              </Link>
              <Link
                href="/help/maintain-faq"
                className="hover:no-underline"
                data-testid="help_center_home_page_help_center_category_list_1"
                data-metric-id="help_center_home_page_help_center_category_list_1"
                data-metric-value="Maintenance"
                target="_self"
              >
                <div className="bg-slate-100 rounded-xl lg:justify-center px-8 py-3 lg:py-8 lg:px-4 lg:w-[24rem] flex justify-center transition-all duration-300 ease-in-out border-2 border-transparent hover:border-blue-900">
                  <h5 className="text-blue-800 font-semibold text-lg">
                    Maintenance
                  </h5>
                </div>
              </Link>
              <Link
                href="/help/home-warranty-faq"
                className="hover:no-underline"
                data-testid="help_center_home_page_help_center_category_list_2"
                data-metric-id="help_center_home_page_help_center_category_list_2"
                data-metric-value="Home Warranty"
                target="_self"
              >
                <div className="bg-slate-100 rounded-xl lg:justify-center px-8 py-3 lg:py-8 lg:px-4 lg:w-[24rem] flex justify-center transition-all duration-300 ease-in-out border-2 border-transparent hover:border-blue-900">
                  <h5 className="text-blue-800 font-semibold text-lg">
                    Home Warranty
                  </h5>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
