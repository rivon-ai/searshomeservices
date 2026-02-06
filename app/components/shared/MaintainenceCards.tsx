import React from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import hvacIcon from "@/public/HVAC-Maintainence.png";
import mowerIcon from "@/public/RidingMower-Maintenance.svg";

interface MaintenanceCard {
  title: string;
  icon: StaticImageData | string;
  description: string;
  linkText: string;
  linkHref: string;
}

const maintenanceData: MaintenanceCard[] = [
  {
    title: "HVAC MAINTENANCE",
    icon: hvacIcon,
    description:
      "Regular annual maintenance is important to make sure your hvac stays in peak performance shape. If your hvac is broken, please visit our hvac service repair page.",
    linkText: "Learn more about hvac maintenance",
    linkHref: "#",
  },
  {
    title: "RIDING MOWER MAINTENANCE",
    icon: mowerIcon,
    description:
      "Regular annual maintenance is important to make sure your riding mower stays in peak performance shape. If your mower is broken, please visit our riding mower repair page.",
    linkText: "Learn more about riding mower maintenance",
    linkHref: "#",
  },
];

export default function MaintainenceCards() {
  return (
    <div className="">
      <div className="grid grid-cols-1 md:grid-cols-2 shadow-md rounded-xl">
        {maintenanceData.map((card, index) => (
          <div
            key={index}
            className={`bg-white px-8 py-6 flex flex-col h-full border border-gray-100 ${index === 0 ? 'rounded-l-lg' : index === 1 ? 'rounded-r-lg' : 'rounded-r-lg'}`}
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 shrink-0 relative">
                <Image
                  src={card.icon}
                  alt={card.title}
                  className="w-full h-full object-contain"
                />
              </div>
              <h1 className="text-2xl text-blue-950 uppercase mt-1">
                {card.title}
              </h1>
            </div>

            <p className="text-gray-600 text-base leading-relaxed grow">
              {card.description}
            </p>

            <Link
              href={card.linkHref}
              className="text-blue-600 hover:underline mt-2 block mb-8"
            >
              {card.linkText}
            </Link>

            <div className="flex justify-end mt-auto">
              <Link
                href="/schedule"
                className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-medium py-2 px-6 rounded-sm flex items-center justify-center transition-colors"
              >
                Schedule Now
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
