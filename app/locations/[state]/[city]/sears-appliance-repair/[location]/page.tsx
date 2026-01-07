"use client";
import React from "react";

import {
  Calendar,
  Droplet,
  FileCheck,
  Flame,
  Refrigerator,
  Snowflake,
  Star,
  User,
  WashingMachine,
  Wind,
  Wrench,
} from "lucide-react";
import img from "@/public/alabamaImage.webp";
import { Phone, Clock, MapPin, Home, Square, Grid } from "lucide-react";
import ImageSection from "../components/ImageSection";
import RatingSection from "../../../../../../components/RatingSection";
import HowItWorks from "../components/HowItWorksSection";
import WhyToChoose from "../../../../../../components/WhyToChoose";
import BrandsWeRepair from "../../../../../components/BrandsWeRepair";
import LearnMore from "../components/LearnMore";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import RepairResources from "../components/RepairResources";
import TermsAndApplianceSymptom from "../components/TermsAndApplianceSymptom";
import RatingSites from "../components/RatingSites";

const reviews = [
  {
    title: "5 star",
    rating: 5,
    text: "Tech was very nice found problem very quick. On a scale 1-10 he was a 20 plus",
    author: "FLOYD M, ELKHART, IN",
    date: "OCTOBER 18, 2025",
  },
  {
    title: "Fixed Washer",
    rating: 5,
    text: "Did everything fairly quick and everything good now. Appreciate all the help!",
    author: "EDUARDO P, BRISTOL, IN",
    date: "SEPTEMBER 23, 2025",
  },
  {
    title: "Ruth Iannarelli",
    rating: 5,
    text: "The service man was friendly and informative. Very professional and pleasant.",
    author: "RUTH R, ELKHART, IN",
    date: "SEPTEMBER 04, 2025",
  },
  {
    title: "Excellent Service",
    rating: 5,
    text: "Amazing experience from start to finish. The technician was knowledgeable and efficient. Highly recommend!",
    author: "JOHN D, SOUTH BEND, IN",
    date: "AUGUST 15, 2025",
  },
  {
    title: "Great Job",
    rating: 5,
    text: "Fixed my refrigerator quickly and professionally. Very satisfied with the service provided.",
    author: "MARY S, GOSHEN, IN",
    date: "JULY 28, 2025",
  },
];

const symptoms = [
  {
    title: "Payne central air not working",
    description:
      "When your Payne central air conditioner won't turn on or isn't cooling, check for power problem...",
  },
  {
    title: "ICP central air not working",
    description:
      "When your ICP central air conditioner won't turn on or isn't cooling, check for power problem...",
  },
  {
    title: "Heil central air not working",
    description:
      "When your Heil central air conditioner won't turn on or isn't cooling, check for power problem...",
  },
  {
    title: "Carrier central air not working",
    description:
      "When your Carrier central air conditioner won't turn on or isn't cooling, check for power problem...",
  },
  {
    title: "Comfortmaker central air not working",
    description:
      "When your Comfortmaker central air conditioner won't turn on or isn't cooling, check for power...",
  },
  {
    title: "Ruud central air not working",
    description:
      "When your Ruud central air conditioner won't turn on or isn't cooling, check for power problem...",
  },
];

const resources = [
  {
    image:
      "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=400&h=300&fit=crop",
    title: "Deciphering Samsung Clothes Dryer Error Codes",
    readTime: "5 min read",
    difficulty: "Dec 09",
    description:
      "Find the most common Samsung clothes dryer error codes and their solutions. Get professional help...",
    category: "Dryer",
  },
  {
    image:
      "https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=400&h=300&fit=crop",
    title: "Troubleshooting Garage Door Opener Power Issues",
    readTime: "3 min read",
    difficulty: "Dec 09",
    description:
      "Sears Home Services specializes in troubleshooting power issues in garage door openers. Get the help...",
    category: "Garage Door Opener",
  },
  {
    image:
      "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=400&h=300&fit=crop",
    title: "How Can I Prepare for Rolling Blackouts?",
    readTime: "9 min read",
    difficulty: "Dec 09",
    description:
      "Prepare for rolling blackouts with these expert tips from Sears Home Services.",
    category: "Generator",
  },
  {
    image:
      "https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=400&h=300&fit=crop",
    title: "8 Steps to Install a Wood Fence",
    readTime: "13 min read",
    difficulty: "Dec 09",
    description:
      "Get expert advice and learn about the 8 steps you need to follow to install a wood fence.",
    category: "Fencing",
  },
];
const glossaryTerms = [
  {
    title: "What is the drum of the washing machine?",
    description:
      "The drum is the core part of the washer that holds your laundry and enables the cleaning process....",
  },
  {
    title: "What is a 608 Certification?",
    description:
      "The 608 Certification, regulated by the Environmental Protection Agency (EPA), is required for HVA...",
  },
  {
    title: "What is a Compressor?",
    description:
      "A compressor is a mechanical device that increases the pressure of a gas by reducing its volume....",
  },
  {
    title: "What is a Condenser?",
    description:
      "A condenser is a component of HVAC and refrigeration systems, responsible for releasing absorbed...",
  },
];

const faqs = [
  {
    question: "What types of appliances do you service in Lincoln, Nebraska?",
    answer:
      "Sears Home Services repairs and maintains all types of home appliances including refrigerators, ovens, stoves, dishwashers, trash compactors, washing machines and clothes dryers. No matter where you bought it, we'll repair or maintain all of your appliances.",
  },
  {
    question: "Which types of HVAC systems do you repair and maintain?",
    answer:
      "Our HVAC technicians service all types of home heating and cooling systems including central air conditioners, heat pumps, and furnaces in Lincoln and the surrounding areas. No matter the type or brand of your system, our skilled technicians can ensure it runs smoothly year-round.",
  },
  {
    question: "How quickly can I get a repair appointment in Lincoln?",
    answer:
      "Sears Home Services offers same-day and next-day appliance and HVAC repair appointments in many areas. If you're experiencing a heating or cooling issue or have an appliance failure, you can call us for prompt service or schedule an appointment online, and we'll have an expert technician at your home in no time.",
  },
  {
    question: "Are your repair technicians certified?",
    answer:
      "Yes. All our repair technicians in Lincoln are factory-certified, insured, and background-checked.",
  },
];

export default function page() {
  return (
    <div className="w-full xl:w-[75%] mx-auto mt-6">
      <ImageSection img={img} />

      <div className="flex justify-between gap-4 pt-48">
        <div className="bg-white w-[80%]">
          <h2 className="text-xl font-bold text-blue-900 mb-6 uppercase tracking-wide">
            APPLIANCE REPAIR YOU CAN COUNT ON IN FORESTDALE, ALABAMA
          </h2>

          <div className="space-y-4 text-gray-700 text-sm leading-relaxed mb-8">
            <p>
              When a home appliance breaks down, quick action matters. At Sears
              Home Services, we deliver dependable{" "}
              <Link href="#" className="text-blue-600 hover:underline">
                appliance repair
              </Link>{" "}
              throughout Forestdale, Alabama. Whether it's a malfunctioning
              oven, a leaking washer, or a fridge that's lost its chill — we're
              here to help with fast, expert service.
            </p>

            <p>
              With a focus on quality, convenience, and customer care, our local
              team brings{" "}
              <Link href="#" className="text-blue-600 hover:underline">
                appliance repair services
              </Link>{" "}
              directly to your door — no guesswork, no hassle.
            </p>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-bold text-blue-900 mb-4">
              What We Repair in Forestdale
            </h3>

            <p className="text-gray-700 text-sm leading-relaxed mb-4">
              Our technicians are trained to resolve a wide range of appliance
              problems. From performance issues to part replacements, we're
              equipped for both standard and specialty repairs, including:
            </p>

            <ul className="space-y-2 ml-6">
              <li className="text-gray-700 text-sm leading-relaxed">
                <span className="font-semibold">Refrigerator repair:</span>{" "}
                Cooling failures, ice maker issues, and broken seals
              </li>
              <li className="text-gray-700 text-sm leading-relaxed">
                <span className="font-semibold">Dishwasher repair:</span> Water
                drainage, leaks, and poor cleaning cycles
              </li>
              <li className="text-gray-700 text-sm leading-relaxed">
                <span className="font-semibold">
                  Washing machine & dryer repair:
                </span>{" "}
                Drum problems, spinning failures, and temperature faults
              </li>
              <li className="text-gray-700 text-sm leading-relaxed">
                <span className="font-semibold">
                  Range, oven & cooktop repair:
                </span>{" "}
                Burners not lighting, uneven heating, or control panel errors
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
              We work on all major appliance brands, including GE, Samsung,
              Whirlpool, LG, KitchenAid, Frigidaire, Kenmore, and others — plus
              high-performance models like Bosch, Electrolux, and Jenn-Air.
            </p>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-bold text-blue-900 mb-4">
              Why Sears is the Right Choice for Appliance Repair
            </h3>

            <p className="text-gray-700 text-sm leading-relaxed mb-4">
              Unlike generic appliance repair services, we deliver a tailored
              experience backed by:
            </p>

            <ul className="space-y-2 ml-6">
              <li className="text-gray-700 text-sm leading-relaxed">
                Skilled, certified technicians
              </li>
              <li className="text-gray-700 text-sm leading-relaxed">
                Clear, upfront estimates with no surprise fees
              </li>
              <li className="text-gray-700 text-sm leading-relaxed">
                Same-day or next-day appointment availability in many cases
              </li>
              <li className="text-gray-700 text-sm leading-relaxed">
                Nationally trusted service, delivered locally
              </li>
              <li className="text-gray-700 text-sm leading-relaxed">
                Work covered by warranty and our Satisfaction Guarantee
              </li>
            </ul>

            <p className="text-gray-700 text-sm leading-relaxed mt-4">
              Our goal? To restore your appliances efficiently and affordably —
              the first time.
            </p>
          </div>
        </div>

        {
          <div className="w-full max-w-sm ">
            <Card className="p-6 bg-gray-300 border rounded-lg flex flex-col gap-3">
              <h1 className="text-white font-bold">Location</h1>
              <span className="text-black font-semibold"></span>
              <h1 className="text-white font-bold">Contact</h1>
              <div className="text-blac flex items-center gap-2 font-semibold">
                {" "}
                Or Call{" "}
                <Link href="tel:512-337-4522" className="text-black">
                  {" "}
                  512-337-4522{" "}
                </Link>
              </div>
            </Card>
          </div>
        }
      </div>

      <RatingSection reviews={reviews} />

      <HowItWorks />

      <WhyToChoose />

      <BrandsWeRepair />

      <RatingSection reviews={reviews} />

      <LearnMore />

      <RatingSites />

      <section className="py-20">
        {/* Top Divider */}
        <hr className="border-t border-gray-300 mb-12" />

        {/* CTA Banner */}
        <div className="bg-linear-to-r from-blue-900 to-blue-800 rounded-2xl px-6 relative overflow-hidden">
          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative z-10">
            {/* Left Content */}
            <div>
              <h2 className="text-4xl font-bold text-yellow-400 mb-4">
                Sears Appliance Repair in Lincoln
              </h2>
              <p className="text-white text-lg mb-6">
                Simply call or click the "Schedule Now" button to book a repair
                appointment.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="#"
                  className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-8 py-3 rounded-md transition-colors inline-block"
                >
                  Schedule Now
                </Link>
                <span className="text-white text-lg">or</span>
                <Link
                  href="tel:402-513-3456"
                  className="text-yellow-400 hover:text-yellow-300 font-semibold text-lg transition-colors"
                >
                  call 402-513-3456
                </Link>
              </div>
            </div>

            {/* Right Content - Decorative Icons */}
            <div className="py-4">
              <div className="relative hidden lg:flex justify-center items-center">
                {/* Central Calendar Icon */}
                <div className="absolute z-20">
                  <div className="p-4">
                    <Calendar
                      className="w-16 h-16 text-white"
                      strokeWidth={1.5}
                    />
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-1">
                      <span className="text-white text-2xl font-bold">1</span>
                    </div>
                  </div>
                </div>

                {/* Surrounding Icons */}
                <div className="relative w-96 h-[280px]">
                  {/* Star - Top */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
                    <Star className="w-8 h-8 text-white opacity-40" />
                  </div>

                  {/* Home - Top Right */}
                  <div className="absolute top-8 right-8">
                    <Home className="w-8 h-8 text-white opacity-40" />
                  </div>

                  {/* Square - Right */}
                  <div className="absolute top-1/2 right-0 transform -translate-y-1/2">
                    <Square className="w-8 h-8 text-white opacity-40" />
                  </div>

                  {/* Grid - Bottom Right */}
                  <div className="absolute bottom-16 right-12">
                    <Grid className="w-8 h-8 text-white opacity-40" />
                  </div>

                  {/* Calendar - Bottom */}
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
                    <Calendar className="w-8 h-8 text-white opacity-40" />
                  </div>

                  {/* MapPin - Bottom Left */}
                  <div className="absolute bottom-8 left-8">
                    <MapPin className="w-8 h-8 text-white opacity-40" />
                  </div>

                  {/* Clock - Left */}
                  <div className="absolute top-1/2 left-0 transform -translate-y-1/2">
                    <Clock className="w-8 h-8 text-white opacity-40" />
                  </div>

                  {/* Phone - Top Left */}
                  <div className="absolute top-16 left-12">
                    <Phone className="w-8 h-8 text-white opacity-40" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Divider */}
        <hr className="border-t border-gray-300 mt-12" />
      </section>

      <RepairResources resources={resources} />

      <TermsAndApplianceSymptom
        glossaryTerms={glossaryTerms}
        symptoms={symptoms}
      />
    </div>
  );
}
