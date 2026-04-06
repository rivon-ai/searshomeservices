"use client";

import React from "react";
import Image from "next/image";
import starIcon from "@/public/sear-page-icons-images/star-icon.svg";
import calendarIcon from "@/public/sear-page-icons-images/calendar-icon.svg";
import userIcon from "@/public/sear-page-icons-images/user-icon.svg";
import settingIcon from "@/public/sear-page-icons-images/settings-icon.svg";

export default function WhyToChoose() {
  const defaultSignals = [
    {
      label: "Happy Customers",
      value:
        "Average of 4,600,000+ homes serviced/year. Over 1,000,000 5 star ratings.",
      icon: starIcon,
    },
    {
      label: "Flexible Scheduling",
      value: "Available 6 days a week in most areas.",
      icon: calendarIcon,
    },
    {
      label: "Expert Technicians",
      value:
        "2,500+ manufacturer-trained technicians with an average of 10+ years of experience.",
      icon: userIcon,
    },
    {
      label: "Quality Parts for Hundreds of Brands",
      value: "Repairs for most major brands, no matter where you bought it.",
      icon: settingIcon,
    },
  ];

  return (
    <>
      {/* Why Sears Home Services */}
      <div className="">
        <h3 className="text-xl font-bold text-blue-950 mb-10 uppercase tracking-wide">
          Why Sears Home Services?
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {defaultSignals.map((signal, idx) => (
            <div key={idx} className="text-left">
              <div className="mb-4">
                <Image
                  src={signal.icon}
                  alt={signal.label}
                  className="w-16 h-16"
                />
              </div>
              <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">
                {signal.label}
              </h3>
              <p className="text-gray-600 text-xs leading-relaxed">
                {signal.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}