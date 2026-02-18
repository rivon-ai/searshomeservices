'use client'

import React from 'react'
import { Refrigerator, WashingMachine, Wind, Flame, Snowflake, Droplet } from 'lucide-react'
import Link from 'next/link'
import fridge from "@/public/sear-page-icons-images/fridge.svg"
import washer from "@/public/sear-page-icons-images/washingMachine.svg"
import dryer from "@/public/sear-page-icons-images/dryer.svg"
import dishwasher from "@/public/sear-page-icons-images/dishwasher.svg"
import waterHeater from "@/public/sear-page-icons-images/water-heater.svg"
import oven from "@/public/sear-page-icons-images/oven.svg"
import range from "@/public/sear-page-icons-images/reange.svg"
import hvac from "@/public/sear-page-icons-images/HVAC.svg"
import freezer from "@/public/sear-page-icons-images/freezer.svg"
import cookTop from "@/public/sear-page-icons-images/reange.svg"
import Image from 'next/image'

const services = [
  {
    icon: fridge,
    title: "Refrigerator"
  },
  {
    icon: washer,
    title: "Washer"
  },
  {
    icon: dryer,
    title: "dryer"
  },
  {
    icon: dishwasher,
    title: "dishwasher"
  }
  ,
  {
    icon: range,
    title: "range"
  },
  {
    icon: oven,
    title: "oven"
  },
  {
    icon: hvac,
    title: "hvac"
  },
  {
    icon: freezer,
    title: "freezer"
  },
  {
    icon: waterHeater,
    title: "Refrigerator"
  },
  {
    icon: cookTop,
    title: "Refrigerator"
  }
]

export default function LearnMore() {
  return (
    <div className="bg-white">
      {/* Learn More About Our Services */}
      <div className="border-t border-gray-200 pt-8 mb-16">
        <h2 className="text-lg font-bold text-blue-900 mb-8 uppercase tracking-wide">
          Learn More About Our Services
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Appliances Column */}
          <div>
            <h3 className="text-sm font-bold text-blue-900 mb-4 uppercase tracking-wide">
              Appliances
            </h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-blue-600 hover:underline text-xs">Cooktop</Link></li>
              <li><Link href="#" className="text-blue-600 hover:underline text-xs">Double Oven</Link></li>
              <li><Link href="#" className="text-blue-600 hover:underline text-xs">Freezer</Link></li>
              <li><Link href="#" className="text-blue-600 hover:underline text-xs">Gas Grill</Link></li>
              <li><Link href="#" className="text-blue-600 hover:underline text-xs">Microwave</Link></li>
              <li><Link href="#" className="text-blue-600 hover:underline text-xs">Range Hood</Link></li>
              <li><Link href="#" className="text-blue-600 hover:underline text-xs">Oven</Link></li>
              <li><Link href="#" className="text-blue-600 hover:underline text-xs">Trash Compactor</Link></li>
              <li><Link href="#" className="text-blue-600 hover:underline text-xs">Washer Dryer Combo</Link></li>
            </ul>
          </div>

          {/* Second Appliances Column */}
          <div>
            <h3 className="text-sm font-bold text-blue-900 mb-4 uppercase tracking-wide opacity-0">
              Appliances
            </h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-blue-600 hover:underline text-xs">Dishwasher</Link></li>
              <li><Link href="#" className="text-blue-600 hover:underline text-xs">Dryer</Link></li>
              <li><Link href="#" className="text-blue-600 hover:underline text-xs">Garbage Disposal</Link></li>
              <li><Link href="#" className="text-blue-600 hover:underline text-xs">Ice Maker</Link></li>
              <li><Link href="#" className="text-blue-600 hover:underline text-xs">Range</Link></li>
              <li><Link href="#" className="text-blue-600 hover:underline text-xs">Refrigerator</Link></li>
              <li><Link href="#" className="text-blue-600 hover:underline text-xs">Stacked Laundry</Link></li>
              <li><Link href="#" className="text-blue-600 hover:underline text-xs">Washer</Link></li>
            </ul>
          </div>

          {/* Cooling & Heating Column */}
          <div>
            <h3 className="text-sm font-bold text-blue-900 mb-4 uppercase tracking-wide">
              Cooling & Heating
            </h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-blue-600 hover:underline text-xs">Boiler</Link></li>
              <li><Link href="#" className="text-blue-600 hover:underline text-xs">Furnace</Link></li>
              <li><Link href="#" className="text-blue-600 hover:underline text-xs">Gas Furnace</Link></li>
              <li><Link href="#" className="text-blue-600 hover:underline text-xs">HVAC</Link></li>
              <li><Link href="#" className="text-blue-600 hover:underline text-xs">Heat Pump</Link></li>
              <li><Link href="#" className="text-blue-600 hover:underline text-xs">Humidifier & Dehumidifier</Link></li>
              <li><Link href="#" className="text-blue-600 hover:underline text-xs">Water Heater</Link></li>
            </ul>
          </div>

          {/* Fitness & Lawn Column */}
          <div>
            <h3 className="text-sm font-bold text-blue-900 mb-4 uppercase tracking-wide">
              Fitness
            </h3>
            <ul className="space-y-2 mb-6">
              <li><Link href="#" className="text-blue-600 hover:underline text-xs">Elliptical Machine</Link></li>
              <li><Link href="#" className="text-blue-600 hover:underline text-xs">Stationary Bike</Link></li>
              <li><Link href="#" className="text-blue-600 hover:underline text-xs">Stepper</Link></li>
              <li><Link href="#" className="text-blue-600 hover:underline text-xs">Treadmill</Link></li>
            </ul>
          </div>
          <div>

            <h3 className="text-sm font-bold text-blue-900 mb-4 uppercase tracking-wide">
              Lawn & Garden
            </h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-blue-600 hover:underline text-xs">Riding Mower</Link></li>
              <li><Link href="#" className="text-blue-600 hover:underline text-xs">Snowblower</Link></li>
              <li><Link href="#" className="text-blue-600 hover:underline text-xs">Wide-Deck Lawn Mower</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Sears Appliance Repair Services */}
      <div className="border-t border-gray-200 py-20">
        <h2 className="text-base font-bold text-blue-900 mb-8 uppercase tracking-wide">
          Sears Appliance Repair Services Near You -- We Repair All Major Appliances
        </h2>

        {/* Top Row of Appliances */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-8">

          {
            services.map(service => (
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 flex items-center justify-center mb-3">
                  <Image src={service.icon} alt={service.title} className="w-12 h-12" />
                </div>
                <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wide">
                  {service.title}
                </h3>
              </div>
            ))
          }

        </div>

        {/* Schedule Link */}
        <div className="mt-8">
          <Link href="#" className="text-blue-600 hover:underline text-sm">
            Schedule all other repairs
          </Link>
        </div>
      </div>
    </div>
  )
}