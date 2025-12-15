"use client"

import { FileCheck, Wrench } from "lucide-react"
import { useParams } from "next/navigation"
import { MdStars } from "react-icons/md"
import Link from "next/link"

interface LocationsProps {
  locations: {
    name: string
    address: string
    isTopLocation?: boolean
  }[]
}

export default function Locations({ locations }: LocationsProps) {
  const params = useParams()

  console.log("at locations component Params:", params)
  console.log("at locations component Locations:", locations)
  if (!params || !locations || locations.length === 0) {
    return null
  }

  const state = params.state as string
  const city = params.city as string

  if (!state || !city) {
    return null
  }

  return (
    <>
      <div className="pt-48 bg-white">
        {/* Header */}
        <h2 className="text-2xl font-bold text-blue-900 mb-8 uppercase tracking-wide">LOCATIONS</h2>

        {/* Locations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {locations?.map((location, index) => (
            <Link
              key={index}
              className="border border-gray-300 rounded-lg p-6 hover:shadow-[0_0_10px_rgba(0,0,0,0.25)] transition-shadow duration-300 bg-white relative"
              href={`/locations/${state}/${city}/sears-appliance-repair/${location.address
                .toLowerCase()
                .replace(/,/g, "")
                .replace(/\s+/g, "-")
                .replace(/--+/g, "-")
                .replace(/^-+|-+$/g, "")}`}
            >
              {/* Top Location Badge */}
              {location.isTopLocation && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="bg-white flex items-center gap-2 text-blue-950 font-semibold w-fit border border-gray-300 px-4 py-2 rounded-md">
                    <MdStars />
                    <span className="text-sm">Top Location</span>
                  </div>
                </div>
              )}

              {/* Location Name */}
              <h3 className="text-lg font-bold text-blue-900 mb-3 mt-2 hover:text-blue-700 cursor-pointer flex flex-col gap-1">
                <span>{city ? city.toString().toUpperCase() : ""}</span>
                <span className="text-sm">{location.name}</span>
              </h3>

              {/* Address */}
              <p className="text-sm text-gray-600 leading-relaxed">{location.address}</p>
            </Link>
          ))}
        </div>
        <div className="pt-20 bg-white">
          <h2 className="text-xl font-bold text-blue-900 mb-6 uppercase tracking-wide">
            APPLIANCE REPAIR YOU CAN COUNT ON IN FORESTDALE, {state}
          </h2>

          <div className="space-y-4 text-gray-700 text-sm leading-relaxed mb-8">
            <p>
              When a home appliance breaks down, quick action matters. At Sears Home Services, we deliver dependable{" "}
              <Link href="#" className="text-blue-600 hover:underline">
                appliance repair
              </Link>{" "}
              throughout Forestdale, {state}. Whether it's a malfunctioning oven, a leaking washer, or a fridge that's
              lost its chill — we're here to help with fast, expert service.
            </p>

            <p>
              With a focus on quality, convenience, and customer care, our local team brings{" "}
              <Link href="#" className="text-blue-600 hover:underline">
                appliance repair services
              </Link>{" "}
              directly to your door — no guesswork, no hassle.
            </p>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-bold text-blue-900 mb-4">What We Repair in Forestdale</h3>

            <p className="text-gray-700 text-sm leading-relaxed mb-4">
              Our technicians are trained to resolve a wide range of appliance problems. From performance issues to part
              replacements, we're equipped for both standard and specialty repairs, including:
            </p>

            <ul className="space-y-2 ml-6">
              <li className="text-gray-700 text-sm leading-relaxed">
                <span className="font-semibold">Refrigerator repair:</span> Cooling failures, ice maker issues, and
                broken seals
              </li>
              <li className="text-gray-700 text-sm leading-relaxed">
                <span className="font-semibold">Dishwasher repair:</span> Water drainage, leaks, and poor cleaning
                cycles
              </li>
              <li className="text-gray-700 text-sm leading-relaxed">
                <span className="font-semibold">Washing machine & dryer repair:</span> Drum problems, spinning failures,
                and temperature faults
              </li>
              <li className="text-gray-700 text-sm leading-relaxed">
                <span className="font-semibold">Range, oven & cooktop repair:</span> Burners not lighting, uneven
                heating, or control panel errors
              </li>
              <li className="text-gray-700 text-sm leading-relaxed">
                <span className="font-semibold">HVAC & furnace service:</span>{" "}
                <Link href="#" className="text-blue-600 hover:underline">
                  Inconsistent airflow
                </Link>
                , thermostat issues, and ignition failures;
              </li>
            </ul>

            <p className="text-gray-700 text-sm leading-relaxed mt-3 ml-6">
              We work on all major appliance brands, including GE, Samsung, Whirlpool, LG, KitchenAid, Frigidaire,
              Kenmore, and others — plus high-performance models like Bosch, Electrolux, and Jenn-Air.
            </p>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-bold text-blue-900 mb-4">Why Sears is the Right Choice for Appliance Repair</h3>

            <p className="text-gray-700 text-sm leading-relaxed mb-4">
              Unlike generic appliance repair services, we deliver a tailored experience backed by:
            </p>

            <ul className="space-y-2 ml-6">
              <li className="text-gray-700 text-sm leading-relaxed">Skilled, certified technicians</li>
              <li className="text-gray-700 text-sm leading-relaxed">Clear, upfront estimates with no surprise fees</li>
              <li className="text-gray-700 text-sm leading-relaxed">
                Same-day or next-day appointment availability in many cases
              </li>
              <li className="text-gray-700 text-sm leading-relaxed">Nationally trusted service, delivered locally</li>
              <li className="text-gray-700 text-sm leading-relaxed">
                Work covered by warranty and our Satisfaction Guarantee
              </li>
            </ul>

            <p className="text-gray-700 text-sm leading-relaxed mt-4">
              Our goal? To restore your appliances efficiently and affordably — the first time.
            </p>
          </div>
        </div>

        
      </div>
    </>
  )
}