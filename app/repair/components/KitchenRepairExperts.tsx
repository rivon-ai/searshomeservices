import React from "react";
import Image from "next/image";

// Icons
import fridgeIcon from "@/public/sear-page-icons-images/fridge.svg";
import dishwasherIcon from "@/public/sear-page-icons-images/dishwasher.svg";
import ovenIcon from "@/public/sear-page-icons-images/oven.svg";
import stoveIcon from "@/public/sear-page-icons-images/reange.svg"; // Using 'reange.svg' for Stove

const experts = [
  { name: "REFRIGERATOR", icon: fridgeIcon },
  { name: "DISHWASHER", icon: dishwasherIcon },
  { name: "OVEN", icon: ovenIcon },
  { name: "STOVE", icon: stoveIcon },
];

export default function KitchenRepairExperts() {
  return (
    <div className="w-full py-12">
      {/* Icon Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 max-w-4xl mx-auto">
        {experts.map((expert, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center group"
          >
            <div className="mb-4 h-16 flex items-end">
              <Image
                src={expert.icon}
                alt={expert.name}
                className="w-auto h-12 object-contain"
              />
            </div>
            <span className="text-blue-950 font-bold uppercase text-sm tracking-wide text-center">
              {expert.name}
            </span>
          </div>
        ))}
      </div>

      {/* Content Section */}
      <div className="w-full">
        <h3 className="text-xl md:text-2xl font-medium text-blue-950 mb-6 uppercase">
          WE&apos;RE KITCHEN APPLIANCE REPAIR EXPERTS
        </h3>
        <p className="text-gray-600 mb-6 leading-relaxed text-[15px]">
          Most households rely on their kitchen appliances every day, and when
          something breaks down, you need reliable help fast.
        </p>
        <p className="text-gray-600 mb-6 leading-relaxed text-[15px]">
          Whether it&apos;s a refrigerator not cooling properly or an oven that
          won&apos;t heat evenly, our skilled technicians can diagnose the issue
          accurately and complete the repair efficiently. If you&apos;re
          searching for a refrigerator repairman or oven technician near you,
          Sears Home Services has you covered. Our certified appliance repair
          specialists provide prompt, professional service to get your fridge,
          oven and other kitchen appliances working again quickly.
        </p>
        <p className="text-gray-600 leading-relaxed text-[15px]">
          Choosing a reputable appliance service company like Sears ensures
          you&apos;ll work with trusted experts who bring decades of experience
          to every job. When you need dependable, same-day service from a
          qualified appliance technician near you, count on Sears Home Services
          for expert care and lasting repairs.
        </p>
      </div>
    </div>
  );
}
