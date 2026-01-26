"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp, Check } from "lucide-react";

export interface DiscountCardsProps {
  title?: string;
  cards?: PricingCardProps[];
}

export interface PricingCardProps {
  title: string;
  saveLabel: string;
  description?: string; // Optional in some cases?
  price: string;
  link?: string; // Added link
  services: ServiceItem[];
  isBestValue?: boolean;
  features?: string[]; // Added to match adapter if needed, but using services for now
}

interface ServiceItem {
  name: string;
}

const DEFAULT_CARDS: PricingCardProps[] = [
  {
    title: "Washer and Dryer",
    saveLabel: "SAVE 25%*",
    description:
      "Two appliances, one great price! We'll inspect both for proper functioning, wear and tear, excess noise, water and gas leaks, and clean internal components.",
    price: "$149.99",
    services: [{ name: "Washer" }, { name: "Dryer" }],
    isBestValue: false,
  },
  {
    title: "Kitchen and Laundry",
    saveLabel: "SAVE 50%*",
    description:
      "Five appliances, one great price! Count on the Sears appliance experts to keep your appliances running safely and efficiently.",
    price: "$249.99",
    services: [
      { name: "Washer" },
      { name: "Dryer" },
      { name: "Refrigerator" },
      { name: "Dishwasher" },
      { name: "Range" },
    ],
    isBestValue: true,
  },
  {
    title: "Kitchen Appliances",
    saveLabel: "SAVE 40%*",
    description:
      "Three appliances, one great price! We'll check all three for proper functioning, wear and tear, water and gas leaks and clean internal components.",
    price: "$179.99",
    services: [
      { name: "Refrigerator" },
      { name: "Dishwasher" },
      { name: "Range" },
    ],
    isBestValue: false,
  },
];

export default function DiscountCards({
  title,
  cards = DEFAULT_CARDS,
}: DiscountCardsProps) {
  const [openCardIndex, setOpenCardIndex] = useState<number | null>(null);

  const toggleCard = (index: number) => {
    setOpenCardIndex(openCardIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      {title && (
        <h2 className="text-3xl font-bold text-[#002B5C] mb-8 text-center">
          {title}
        </h2>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`relative rounded-3xl p-6 sm:p-8 flex flex-col items-center text-center transition-all duration-300 ${
              card.isBestValue
                ? "bg-[#285bc8] text-white shadow-xl scale-100 lg:scale-105 z-10"
                : "bg-blue-50 text-blue-950 border border-blue-100"
            }`}
          >
            {card.isBestValue && (
              <div className="absolute -top-4 rounded-full bg-blue-950 px-4 py-1.5 flex items-center gap-2 shadow-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4 text-white"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-white text-sm font-bold tracking-wide">
                  Best value
                </span>
              </div>
            )}

            <h3 className="text-2xl font-semibold mb-4">{card.title}</h3>

            <div
              className={`rounded-full px-6 py-1.5 mb-6 font-bold text-sm tracking-wide ${
                card.isBestValue
                  ? "bg-white/20 text-white"
                  : "bg-blue-950 text-white"
              }`}
            >
              {card.saveLabel}
            </div>

            <p
              className={`text-sm mb-6 leading-relaxed ${
                card.isBestValue ? "text-blue-50" : "text-gray-600"
              }`}
            >
              {card.description}
            </p>

            <div className="text-4xl font-bold mb-8">{card.price}</div>

            <Link
              href={card.link || "/maintain/schedule"}
              className={`w-full py-3.5 rounded-full font-bold mb-8 transition-colors ${
                card.isBestValue
                  ? "bg-linear-to-r from-[#5CE5B4] to-[#31D3F5] text-[#003C60] font-bold py-3 px-8 rounded-full hover:opacity-90 transition-opacity"
                  : "bg-white text-blue-500 border-2 border-green-300 hover:bg-green-50"
              }`}
            >
              Schedule Now
            </Link>

            <div className="w-full text-left space-y-3 mb-6 grow">
              {card.services.map((service, sIndex) => (
                <div key={sIndex} className="flex items-center gap-3">
                  <Check
                    className={`w-5 h-5 ${
                      card.isBestValue ? "text-white" : "text-blue-500"
                    }`}
                  />
                  <span
                    className={`text-sm ${
                      card.isBestValue ? "text-white" : "text-gray-500"
                    }`}
                  >
                    {service.name}
                  </span>
                </div>
              ))}
            </div>

            <div className="w-full pt-6 border-t border-current/10">
              <button
                onClick={() => toggleCard(index)}
                className={`flex items-center justify-center gap-2 text-sm font-medium w-full ${
                  card.isBestValue
                    ? "text-white hover:text-blue-50"
                    : "text-blue-950 hover:text-blue-700"
                }`}
              >
                More Details
                {openCardIndex === index ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
