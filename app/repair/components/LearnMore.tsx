import React from "react";
import Link from "next/link";

const appliancesGroup1 = [
  "Cooktop",
  "Dishwasher",
  "Double Oven",
  "Dryer",
  "Freezer",
  "Garbage Disposal",
  "Gas Grill",
  "Ice Maker",
  "Microwave",
];

const appliancesGroup2 = [
  "Oven",
  "Range",
  "Range Hood",
  "Refrigerator",
  "Stacked Laundry",
  "Trash Compactor",
  "Washer",
  "Washer Dryer Combo",
];

const coolingHeating = [
  "Boiler",
  "Central Air",
  "Gas Furnace",
  "HVAC",
  "Heat Pump",
  "Humidifier & Dehumidifier",
  "Water Heater",
];

const fitness = [
  "Elliptical Machine",
  "Stationary Bike",
  "Stepper",
  "Treadmill",
];

const lawnGarden = ["Riding Mower", "Snowblower", "Wide-Deck Lawn Mower"];

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
                  href="#"
                  className="text-blue-800 font-medium hover:text-blue-700 hover:underline block"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Appliances Column 2 (Continuation) */}
        <div className="flex flex-col space-y-4 pt-0 md:pt-9">
          {/* Spacer for alignment with header if needed, or just margin-top on mobile? 
                 On desktop, the first column has a header. This one doesn't. 
                 The list should align with the list items of the first column.
                 The header in col 1 takes up space. 
                 We can add a blank header or just padding top.
                 md:pt-9 approximates the header height + spacing (text-sm is 20px line-height + mb-4 is 16px = 36px? ~9 * 4 = 36px).
             */}
          <ul className="space-y-3">
            {appliancesGroup2.map((item, index) => (
              <li key={index}>
                <Link
                  href="#"
                  className="text-blue-800 font-medium hover:text-blue-700 hover:underline block"
                >
                  {item}
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
                  href="#"
                  className="text-blue-800 font-medium hover:text-blue-700 hover:underline block"
                >
                  {item}
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
                  href="#"
                  className="text-blue-800 font-medium hover:text-blue-800 hover:underline block"
                >
                  {item}
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
                  href="#"
                  className="text-blue-800 font-medium hover:text-blue-700 hover:underline block"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
