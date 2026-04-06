"use client";

import React from "react";
import Image from "next/image";
import calendar from "@/public/sear-page-icons-images/calendar-icon.svg";
import comment from "@/public/sear-page-icons-images/comment-icon.svg";
import handHome from "@/public/sear-page-icons-images/handHome-icon.svg";

export default function HowItWorks() {
  return (
    <div className="flex flex-col items-center justify-center py-20 bg-white">
      <h2 className="text-3xl md:text-4xl text-blue-950 font-medium mb-16 uppercase text-center px-4">
        HOW IT WORKS
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Easy Scheduling */}
        <div className="flex flex-col items-center text-center px-6">
          <div className="mb-6">
            <Image
              src={calendar}
              alt="Calendar Icon"
              className="w-16 h-16 md:w-20 md:h-20"
            />
          </div>
          <h3 className="text-xl font-medium text-blue-950 mb-4 uppercase tracking-wide">
            Easy Scheduling
          </h3>
          <p className="text-gray-600 leading-relaxed text-sm md:text-base">
            Schedule online in less than a minute. We’re available 6 days a week
            in most areas.
          </p>
        </div>

        {/* Expert Technicians */}
        <div className="flex flex-col items-center text-center px-6">
          <div className="mb-6">
            <Image
              src={comment}
              alt="Comment Icon"
              className="w-16 h-16 md:w-20 md:h-20"
            />
          </div>
          <h3 className="text-xl font-medium text-blue-950 mb-4 uppercase tracking-wide">
            Expert Technicians
          </h3>
          <p className="text-gray-600 leading-relaxed text-sm md:text-base">
            Discuss your repair needs with a local Sears expert. Our pros arrive
            with the right tools.
          </p>
        </div>

        {/* Quality Repair */}
        <div className="flex flex-col items-center text-center px-6">
          <div className="mb-6">
            <Image
              src={handHome}
              alt="Hand Home Icon"
              className="w-16 h-16 md:w-20 md:h-20"
            />
          </div>
          <h3 className="text-xl font-medium text-blue-950 mb-4 uppercase tracking-wide">
            Quality Repair
          </h3>
          <p className="text-gray-600 leading-relaxed text-sm md:text-base">
            We repair most major brands. Sears technicians have fixed millions
            of appliances over decades.
          </p>
        </div>
      </div>
    </div>
  );
}
