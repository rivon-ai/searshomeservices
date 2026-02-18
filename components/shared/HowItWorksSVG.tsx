

import Image from "next/image";
import React from "react";
import Calendar from "@/public/sear-page-icons-images/calendar-icon.svg";
import comment from "@/public/sear-page-icons-images/comment-icon.svg";
import handHome from "@/public/sear-page-icons-images/handHome-icon.svg";

export default function HowItWorksSVG() {
  return (
    <div>
      {/* How It Works Section */}
      <div className="">
        <h3 className="text-xl font-medium text-blue-950 mb-8 uppercase tracking-wide">
          How It Works
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Easy Scheduling */}
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 flex items-center justify-center">
                <Image
                  src={Calendar}
                  alt={"calendar svg"}
                  className="w-16 h-16"
                />
              </div>
            </div>
            <h3 className="text-sm font-bold text-blue-900 mb-3 uppercase tracking-wide">
              Easy Scheduling
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Book online in less than a minute.
            </p>
          </div>

          {/* Diagnostic Fee */}
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 flex items-center justify-center">
                <Image
                  src={comment}
                  alt={"comment svg"}
                  className="w-16 h-16"
                />
              </div>
            </div>
            <h3 className="text-sm font-bold text-blue-900 mb-3 uppercase tracking-wide">
              Diagnostic Fee
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Apply your diagnostic fee to the costs of repair.
            </p>
          </div>

          {/* Expert Technicians */}
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 flex items-center justify-center">
                <Image
                  src={handHome}
                  alt={"handHome svg"}
                  className="w-16 h-16"
                />
              </div>
            </div>
            <h3 className="text-sm font-bold text-blue-900 mb-3 uppercase tracking-wide">
              Expert Technicians
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Save up to $150 on your repair if you enroll in a home warranty.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
