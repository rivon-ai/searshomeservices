"use client";

import React, { useState } from "react";
import ReactCompareImage from "react-compare-image";

interface CleaningItem {
  title: string;
  description: string;
  details: string;
  features: string[];
  before_image: string;
  after_image: string;
}

export interface CleaningBeforeAfterSectionProps {
  title: string;
  items: CleaningItem[];
}

export default function CleaningBeforeAfterSection({
  title,
  items,
}: CleaningBeforeAfterSectionProps) {
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);

  const selectedItem = items[selectedItemIndex];

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-[#002B5C] mb-12 text-center">
          {title}
        </h2>

        {/* Desktop Layout */}
        <div className="hidden lg:grid grid-cols-12 gap-8">
          {/* Sidebar / Tabs */}
          <div className="col-span-3 space-y-2">
            {items.map((item, index) => (
              <button
                key={index}
                onClick={() => setSelectedItemIndex(index)}
                className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                  selectedItemIndex === index
                    ? "bg-blue-50 text-blue-600 border-l-4 border-blue-600"
                    : "hover:bg-gray-50 text-gray-700 border-l-4 border-transparent"
                }`}
              >
                {item.title}
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="col-span-9 grid grid-cols-2 gap-8">
            {/* Image Comparison */}
            <div className="rounded-xl overflow-hidden shadow-lg border border-gray-100 h-fit">
              <ReactCompareImage
                leftImage={selectedItem.before_image}
                rightImage={selectedItem.after_image}
                leftImageLabel="Before"
                rightImageLabel="After"
              />
            </div>

            {/* Details */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-[#002B5C] mb-2">
                {selectedItem.title}
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                {selectedItem.description}
              </p>

              <div className="bg-blue-50 p-6 rounded-xl">
                <p className="font-semibold text-blue-900 mb-4">
                  {selectedItem.details}
                </p>
                <ul className="space-y-3">
                  {selectedItem.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden space-y-12">
          {items.map((item, index) => (
            <div key={index} className="space-y-6">
              <h3 className="text-2xl font-bold text-[#002B5C] text-center">
                {item.title}
              </h3>
              <div className="rounded-xl overflow-hidden shadow-lg border border-gray-100">
                <ReactCompareImage
                  leftImage={item.before_image}
                  rightImage={item.after_image}
                  leftImageLabel="Before"
                  rightImageLabel="After"
                />
              </div>

              <div className="space-y-4">
                <p className="text-gray-600 text-lg leading-relaxed">
                  {item.description}
                </p>

                <div className="bg-blue-50 p-6 rounded-xl">
                  <p className="font-semibold text-blue-900 mb-4">
                    {item.details}
                  </p>
                  <ul className="space-y-3">
                    {item.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              {index < items.length - 1 && (
                <div className="w-full h-px bg-gray-200 mt-12" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
