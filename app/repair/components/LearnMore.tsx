import React from "react";
import Link from "next/link";
import repairServicesUrls from "@/data/repair-services-urls.json";

const getLocalUrl = (fullUrl: string) => {
  return fullUrl.replace("https://www.searshomeservices.com", "");
};

// Split APPLIANCES into two groups
const appliances = repairServicesUrls.APPLIANCES;
const appliancesGroup1 = appliances.slice(0, 9);
const appliancesGroup2 = appliances.slice(9);

const coolingHeating = repairServicesUrls["COOLING & HEATING"];
const fitness = repairServicesUrls.FITNESS;
const lawnGarden = repairServicesUrls["LAWN & GARDEN"];

export default function LearnMore() {
  return (
    <div className="w-full py-12">
      <h3 className="text-xl md:text-2xl font-medium text-blue-950 mb-8 uppercase text-center md:text-left">
        LEARN MORE ABOUT OUR SERVICES
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-start">
        {/* Appliances Column 1 */}
        <div className="flex flex-col space-y-4">
          <h3 className="text-sm font-medium text-blue-950 uppercase tracking-wide">
            APPLIANCES
          </h3>
          <ul className="space-y-3">
            {appliancesGroup1.map((item, index) => (
              <li key={index}>
                <Link
                  href={getLocalUrl(item.url)}
                  className="text-blue-800 font-medium hover:text-blue-700 hover:underline block"
                >
                  {item.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Appliances Column 2 (Continuation) */}
        <div className="flex flex-col space-y-4 pt-0 md:pt-9">
          
          <ul className="space-y-3">
            {appliancesGroup2.map((item, index) => (
              <li key={index}>
                <Link
                  href={getLocalUrl(item.url)}
                  className="text-blue-800 font-medium hover:text-blue-700 hover:underline block"
                >
                  {item.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Cooling & Heating */}
        <div className="flex flex-col space-y-4">
          <h3 className="text-sm font-bold text-blue-950 uppercase tracking-wide">
            COOLING & HEATING
          </h3>
          <ul className="space-y-3">
            {coolingHeating.map((item, index) => (
              <li key={index}>
                <Link
                  href={getLocalUrl(item.url)}
                  className="text-blue-800 font-medium hover:text-blue-700 hover:underline block"
                >
                  {item.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Fitness */}
        <div className="flex flex-col space-y-4">
          <h3 className="text-sm font-bold text-blue-950 uppercase tracking-wide">
            FITNESS
          </h3>
          <ul className="space-y-3">
            {fitness.map((item, index) => (
              <li key={index}>
                <Link
                  href={getLocalUrl(item.url)}
                  className="text-blue-800 font-medium hover:text-blue-800 hover:underline block"
                >
                  {item.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Lawn & Garden */}
        <div className="flex flex-col space-y-4">
          <h3 className="text-sm font-bold text-blue-950 uppercase tracking-wide">
            LAWN & GARDEN
          </h3>
          <ul className="space-y-3">
            {lawnGarden.map((item, index) => (
              <li key={index}>
                <Link
                  href={getLocalUrl(item.url)}
                  className="text-blue-800 font-medium hover:text-blue-700 hover:underline block"
                >
                  {item.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
