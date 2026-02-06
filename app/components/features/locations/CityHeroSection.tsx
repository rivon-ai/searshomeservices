"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { CiChat1 } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { IoCallOutline } from "react-icons/io5";
import imagee from "@/public/alabamaImage.webp";
import { useParams } from "next/navigation";
import ImageScheduleCard from "../../../components/Image&ScheduleCard";

interface HeroSectionProps {
  cities: string[];
  description: string;
}

function CityHeroSection({ cities, description }: HeroSectionProps) {
  const params = useParams();
  const city = params.city;
  const state = params.state;
  console.log("Params in CityHeroSection:", params);
  console.log("City in CityHeroSection:", state);

  return (
    <div className="w-full xl:w-[75%] mx-auto mt-6 ">
      <ImageScheduleCard
        heroImage={imagee}
        reviewsCount={5}
        showBanner={true}
        bannerText={{
          boldInfo: "5+ Years of Experience",
          italicInfo: "in appliance repair",
        }}
        heading="Book Your Appointment Today"
        description="We're in your neighborhood and we'll fix it, no matter where you bought it. Schedule service your way"
      />

      <div>
        <p className="text-gray-500 mt-40">{description}</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 space-y-4 lg:space-y-0 gap-8  my-20 pb-10 border-b">
        {cities.map(
          (city, index) =>
            index <= 9 && (
              <div key={index}>
                <Link
                  href={`/locations/${params.state}/${city}`}
                  className="text-blue-600 text-xl font-semibold hover:underline"
                >
                  {city}
                </Link>
              </div>
            ),
        )}
      </div>

      <div></div>

      <div className="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 space-y-4 lg:space-y-0 gap-8 pb-20">
        {cities.map(
          (city, index) =>
            index > 9 && (
              <div key={index}>
                <Link
                  href={`/locations/${params.state}/${city}`}
                  className="text-blue-600 text-xl font-semibold hover:underline"
                >
                  {city}
                </Link>
              </div>
            ),
        )}
      </div>
    </div>
  );
}

export default CityHeroSection;
