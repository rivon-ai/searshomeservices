import React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function ScheduleCard() {
  return (
    <div
      className={cn(
        "bg-white rounded-xl shadow-lg border border-gray-100 p-6",
        "lg:sticky lg:top-[120px] lg:z-10", // Sticky behavior on desktop
        "flex flex-col gap-5",
      )}
    >
      <div className="space-y-1">
        <h3 className="text-xl font-bold text-gray-900">
          Schedule your repair
        </h3>
        <p className="text-sm text-gray-500">
          Same-day service available in most areas.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-1.5">
          <label
            htmlFor="product-select"
            className="text-sm font-medium text-gray-700"
          >
            Product
          </label>
          <div className="relative">
            <select
              id="product-select"
              className="w-full appearance-none bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 pr-8"
              defaultValue=""
            >
              <option value="" disabled>
                Select a product
              </option>
              <option value="refrigerator">Refrigerator</option>
              <option value="washer">Washer</option>
              <option value="dryer">Dryer</option>
              <option value="dishwasher">Dishwasher</option>
              <option value="oven">Oven / Range</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="brand-select"
            className="text-sm font-medium text-gray-700"
          >
            Brand
          </label>
          <div className="relative">
            <select
              id="brand-select"
              className="w-full appearance-none bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 pr-8"
              defaultValue=""
            >
              <option value="" disabled>
                Select a brand
              </option>
              <option value="kenmore">Kenmore</option>
              <option value="whirlpool">Whirlpool</option>
              <option value="ge">GE</option>
              <option value="lg">LG</option>
              <option value="samsung">Samsung</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <button className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 text-center transition-colors shadow-md hover:shadow-lg mt-2">
        Schedule Now
      </button>

      <div className="text-center">
        <span className="text-xs text-gray-400">
          Trusted by over 1M customers
        </span>
      </div>
    </div>
  );
}
