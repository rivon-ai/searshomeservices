import React from "react";
import { Button } from "@/components/ui/button";

interface PricingPackage {
  savePercentage: string;
  title: string;
  price: string;
  description: string;
}

const packages: PricingPackage[] = [
  {
    savePercentage: "25%*",
    title: "LAUNDRY APPLIANCES",
    price: "$149.99",
    description:
      "Keep your laundry spinning with cleaning and maintenance for your washer and dryer.",
  },
  {
    savePercentage: "40%*",
    title: "KITCHEN APPLIANCES",
    price: "$179.99",
    description:
      "Keep your kitchen humming with cleaning and maintenance for your refrigerator, dishwasher and range.",
  },
  {
    savePercentage: "50%*",
    title: "KITCHEN & LAUNDRY APPLIANCES",
    price: "$249.99",
    description:
      "Five appliances, one great price. Includes maintenance and cleaning for three kitchen appliances and two laundry appliances.",
  },
];

export default function SchdeluProfessionalMaintenance() {
  return (
    <div className="py-12 w-full">
      <h2 className="text-2xl font-bold text-blue-900 mb-2 uppercase">
        SCHEDULE PROFESSIONAL APPLIANCE MAINTENANCE
      </h2>
      <p className="text-gray-600 mb-12">
        Extend the life of your appliances with routine maintenance & save when
        you bundle.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {packages.map((pkg, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg p-8 pt-12 relative border border-gray-100 flex flex-col items-center text-center"
          >
            {/* Green Badge */}
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-green-300 rounded-full w-24 h-24 flex flex-col items-center justify-center shadow-sm z-10 border-4 border-white">
              <span className="text-blue-900 font-bold text-sm leading-tight">
                SAVE
              </span>
              <span className="text-blue-900 font-bold text-xl leading-tight">
                {pkg.savePercentage}
              </span>
            </div>

            <h3 className="text-blue-900 font-bold uppercase mb-2 mt-4 text-sm tracking-wide">
              {pkg.title}
            </h3>
            <div className="text-blue-900 font-bold text-3xl mb-6">
              {pkg.price}
            </div>

            <div className="w-full border-t border-gray-200 mb-6"></div>

            <p className="text-gray-600 text-sm leading-relaxed mb-8 grow">
              {pkg.description}
            </p>

            <Button className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-md py-6 text-base">
              Add Clean & Maintain
            </Button>
          </div>
        ))}
      </div>

      <p className="text-gray-500 text-xs leading-relaxed">
        * Tax and all parts and labor for repairs (if needed) are extra. Savings
        are obtained with multiple appliance packages vs. the individual regular
        price of $99.99 each.
      </p>
    </div>
  );
}
