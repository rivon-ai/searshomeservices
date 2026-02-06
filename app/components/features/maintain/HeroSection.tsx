import React from "react";
import Image from "next/image";
import Link from "next/link";

const services = [
  {
    title: "Appliances",
    href: "/maintain/appliance-maintenance",
    icon: "https://www.searshomeservices.com/cftassets/7Cml89kdW9E27UdYFvqFcs/745c4d19fde9e5127b065b0b3dabfcdf/maintenance-category-appliance-button-icon.svg?w=96&q=90",
  },
  {
    title: "HVAC",
    href: "/maintain/heating-cooling-maintenance",
    icon: "https://www.searshomeservices.com/cftassets/6uu90GMBQrAQbFmHPOLg6q/d487e8d8a029461638431d7a2de190cb/HVAC.svg?w=128&q=90",
  },
  {
    title: "Lawn & Garden",
    href: "/maintain/lawn-and-garden",
    icon: "https://www.searshomeservices.com/cftassets/6oqBTG57pWhELM6Q7tK8nc/af44e4fec05102c086de93c97fa318a3/Lawn-and-garden.svg?w=128&q=90",
  },
  {
    title: "Cleaning",
    href: "/maintain/carpet-and-duct-cleaning-service",
    icon: "https://www.searshomeservices.com/cftassets/2x8XprsaPpnxdfUlG8Bh8J/ba80f7dfef692a1eade37eaf9d0856d7/maintenance-category-cleaning-button.svg?w=256&q=90",
  },
];

export default function HeroSection() {
  return (
    <section className="bg-white">
      <div className="flex flex-col items-center gap-12 px-4 py-12 lg:py-20 max-w-300 mx-auto">
        <div className="text-center pb-6 lg:pb-10">
          <h2 className="mb-4 text-blue-950 text-3xl md:text-4xl font-bold">
            Maintenance and cleaning services
          </h2>
          <p className="text-xl md:text-2xl leading-8 text-gray-500 font-semibold">
            Quick reliable service with a personal touch
          </p>
        </div>

        <div className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {services.map((service, index) => (
              <Link
                key={index}
                href={service.href}
                className="group hover:no-underline block"
              >
                <div className="bg-blue-50 rounded-4xl px-8 py-4 lg:py-6 lg:px-4 h-28 flex items-center justify-center lg:justify-start transition-transform hover:scale-105 duration-200">
                  <div className="flex items-center space-x-4">
                    <div className="relative w-12 h-12 shrink-0">
                      <Image
                        alt={`Maintain category ${service.title}`}
                        src={service.icon}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <h5 className="text-blue-950 text-xl font-bold lg:max-w-28">
                      {service.title}
                    </h5>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
