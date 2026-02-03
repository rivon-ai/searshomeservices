import React from "react";
import Image from "next/image";
import Link from "next/link";

// Icons
import fridgeIcon from "@/public/sear-page-icons-images/fridge.svg";
import washerIcon from "@/public/sear-page-icons-images/washingMachine.svg";
import dryerIcon from "@/public/sear-page-icons-images/dryer.svg";
import dishwasherIcon from "@/public/sear-page-icons-images/dishwasher.svg";
import rangeIcon from "@/public/sear-page-icons-images/reange.svg";
import ovenIcon from "@/public/sear-page-icons-images/oven.svg";
import hvacIcon from "@/public/sear-page-icons-images/HVAC.svg";
import freezerIcon from "@/public/sear-page-icons-images/freezer.svg";
import waterHeaterIcon from "@/public/sear-page-icons-images/water-heater.svg";
// Reusing range icon for Cooktop as discussed, or I could use reange.svg again if strictly needed,
// but since it's the same file I'll just import it or reuse the variable.
// I'll import it again to be explicit in the data structure if needed, or just use rangeIcon variable.

const services = [
  { name: "refrigerator", icon: fridgeIcon },
  { name: "washer", icon: washerIcon },
  { name: "dryer", icon: dryerIcon },
  { name: "dishwasher", icon: dishwasherIcon },
  { name: "range", icon: rangeIcon },
  { name: "oven", icon: ovenIcon },
  { name: "hvac", icon: hvacIcon },
  { name: "freezer", icon: freezerIcon },
  { name: "waterheater", icon: waterHeaterIcon },
  { name: "cooktop", icon: rangeIcon }, // Reusing Range icon
];

export default function ApplianceServicesNearYou() {
  return (
    <div className="w-full py-12">
      <h3 className="text-xl md:text-2xl text-blue-950 mb-12 uppercase text-center md:text-left">
        SEARS APPLIANCE REPAIR SERVICES NEAR YOU -- WE REPAIR ALL MAJOR
        APPLIANCES
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-12">
        {services.map((service, index) => (
          <Link
            key={index}
            href={service.name === "hvac" ? `/repair/hvac-repair-service` : `/schedule?serviceType=Repair&appliance=${service.name}`}
            className="flex flex-col items-center justify-center group cursor-pointer"
          >
            <div className="mb-4 h-16 flex items-end">
              <Image
                src={service.icon}
                alt={service.name}
                className="w-auto h-12 object-contain"
              />
            </div>
            <span className="text-blue-950 font-bold uppercase text-sm tracking-wide text-center">
              {service.name}
            </span>
          </Link>
        ))}
      </div>

      <div>
        <Link
          href="/schedule"
          className="text-blue-800 font-medium hover:text-blue-600 hover:underline"
        >
          Schedule all other repairs
        </Link>
      </div>
    </div>
  );
}
