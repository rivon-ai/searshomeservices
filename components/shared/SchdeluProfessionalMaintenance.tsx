"use client";

import React from "react";
import Image from "next/image";
import kitchenIcon from "@/public/sear-page-icons-images/fridge.svg";
import laundryIcon from "@/public/sear-page-icons-images/washingMachine.svg";
import hvacIcon from "@/public/sear-page-icons-images/HVAC.svg";

const maintenanceOptions = [
  {
    title: "Kitchen",
    description:
      "Keep your kitchen running. Bundle 2 or more of these appliances: Refrigerator, Dishwasher, Wait Range, Oven or Cooktop.",
    image: kitchenIcon,
  },
  {
    title: "Laundry",
    description:
      "Maintain your laundry pair and help prevent downtime. Includes: Washer and Dryer.",
    image: laundryIcon,
  },
  {
    title: "HVAC",
    description:
      "Ensure your home stays comfortable year round. Includes: Heating and Cooling Systems.",
    image: hvacIcon,
  },
];

export default function SchdeluProfessionalMaintenance() {
  return (
    <div className="flex flex-col items-center justify-center py-20 bg-white w-full">
      <div className="max-w-6xl w-full px-4">
        <h2 className="text-3xl md:text-4xl text-blue-950 font-medium mb-12 uppercase text-center">
          SCHEDULE PROFESSIONAL MAINTENANCE
        </h2>
        <p className="text-gray-600 mb-12 text-center">
          Extend the life of your appliances with routine maintenance & save when
          you bundle.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {maintenanceOptions.map((option, index) => (
            <div
              key={index}
              className="flex flex-col items-center bg-gray-50 p-6 rounded-lg text-center"
            >
              <div className="mb-6 w-32 h-32 relative">
                <Image
                  src={option.image}
                  alt={option.title}
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-4">
                {option.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                {option.description}
              </p>
              <button className="text-blue-600 font-bold uppercase text-sm hover:underline">
                View Bundle
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
