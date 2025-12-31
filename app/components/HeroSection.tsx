"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { IoCallOutline } from "react-icons/io5";
import { CiChat1 } from "react-icons/ci";
import imgone from "@/public/image1.webp";
import imgtwo from "@/public/image2.webp";
import imgthree from "@/public/image3.webp";
import imgfour from "@/public/image4.webp";
import { IoIosArrowDown } from "react-icons/io";
import { FaStar } from "react-icons/fa";
import { BrandData, Appliance, brandAppliances } from "@/utils/brandAppliances";

const states = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Puerto Rico",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
];

const WorkSection = [
  {
    heading: "1.BOOK ONLINE IN LESS THAN 1 MINUTE.",
    imgsrc: imgtwo,
    alttext: "Person booking online on laptop",
    description:
      "Tell us what the problem is, and we'll schedule a local appliance repair technician to fix it as soon as possible—sometimes the same day.",
  },
  {
    heading: "2. YOUR LOCAL TECHNICIAN IS ABOUT TO ARRIVE.",
    imgsrc: imgthree,
    alttext: "Technician profile with certification",
    description:
      "We send alerts, so you'll know when our expert repair technician will be at your door.",
  },
  {
    heading: "3. TECH ARRIVAL AND DIAGNOSIS",
    imgsrc: imgfour,
    alttext: "Technician repairing dishwasher",
    description:
      "The technician will assess the issue and provide a complete estimate that includes parts, labor, and applicable taxes.",
  },
];

const scheduleCards = [
  {
    title: "Laundry Appliances",
    discount: "25%*",
    price: "$149.99",
    description:
      "Keep your laundry spinning with cleaning and maintenance for your washer and dryer.",
  },
  {
    title: "Kitchen Appliances",
    discount: "40%*",
    price: "$179.99",
    description:
      "Keep your kitchen humming with cleaning and maintenance for your refrigerator, dishwasher and range.",
  },
  {
    title: "Kitchen & Laundry Appliances",
    discount: "50%*",
    price: "$249.99",
    description:
      "Five appliances, one great price. Includes maintenance and cleaning for three kitchen appliances and two laundry appliances.",
  },
];

function HeroSection() {
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [selectedProduct, setSelectedProduct] = useState<string>("");

  // Helper to get selected brand data
  const currentBrandData = brandAppliances.find(
    (b) => b.brand === selectedBrand,
  );
  const currentBrandApps: Appliance[] = currentBrandData?.appliances || [];

  return (
    <div className="w-full xl:w-[75%] mx-auto mt-6 ">
      <div className="relative">
        {/* Customer Reviews Badge */}
        <div className="absolute top-4 left-4 bg-white rounded-lg shadow-md px-4 py-2 flex items-center gap-2 z-10">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className="text-yellow-400 w-4 h-4" />
            ))}
          </div>
          <span className="text-blue-600 font-medium text-sm">
            177939 Customer Reviews
          </span>
        </div>

        <Image
          src={imgone}
          alt="Hero Image"
          className="w-full h-auto rounded-lg"
        />

        {/* Main Content Card */}
        <div className="absolute top-[80%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-2xl p-8 max-w-2xl w-[90%]">
          {/* Blue Banner */}
          <div className="bg-blue-700 text-white px-4 py-2 rounded-t-lg -mx-8 -mt-8 mb-6">
            <p className="text-center text-sm md:text-base">
              <span className="font-semibold">Need us fast?</span>{" "}
              <span className="italic">
                Schedule now for same/next day service.
              </span>
            </p>
          </div>

          {/* Heading */}
          <div className="mb-6">
            <h1 className="font-bold text-3xl text-blue-950 mb-3">
              National team, Local service
            </h1>
            <p className="text-gray-600 text-base leading-relaxed">
              We serve all major cities and more with thousands of technicians
              and consultants in the field every day.
            </p>
            <p className="text-gray-600 text-base">Schedule service your way</p>
          </div>
          <h2 className="text-xl font-semibold mb-2">
            Select Brand and Appliance
          </h2>

          {/* Dropdown and Button */}
          <div className="flex flex-col md:flex-row items-stretch gap-3 mb-6 w-full">
            {/* Brand Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex justify-between items-center bg-white border-2 border-gray-300 rounded-lg px-4 py-2 font-medium text-gray-700 cursor-pointer hover:border-gray-400 transition-colors flex-1">
                <span className="capitalize">{selectedBrand || "Brand"}</span>
                <IoIosArrowDown className="ml-2" />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-full min-w-[200px] bg-white border border-gray-300 rounded-lg shadow-md mt-1 max-h-[300px] overflow-y-auto"
                align="start"
              >
                <DropdownMenuLabel>Brand</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {brandAppliances.map((brandData: BrandData) => (
                  <DropdownMenuItem
                    key={brandData.brand}
                    onClick={() => {
                      const brandName = brandData.brand;
                      setSelectedBrand(brandName);
                      // Reset product logic
                      const newBrandApps = brandData.appliances || [];
                      const currentProductStillValid = newBrandApps.some(
                        (a) => a.appliance === selectedProduct,
                      );

                      if (!currentProductStillValid) {
                        if (newBrandApps.length > 0) {
                          setSelectedProduct(newBrandApps[0].appliance);
                        } else {
                          setSelectedProduct("");
                        }
                      }
                    }}
                    className="cursor-pointer capitalize"
                  >
                    {brandData.brand}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Appliance Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex justify-between items-center bg-white border-2 border-gray-300 rounded-lg px-4 py-2 font-medium text-gray-700 cursor-pointer hover:border-gray-400 transition-colors flex-1">
                <span className="capitalize">
                  {selectedProduct || "Appliance"}
                </span>
                <IoIosArrowDown className="ml-2" />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-full min-w-[200px] bg-white border border-gray-300 rounded-lg shadow-md mt-1 max-h-[300px] overflow-y-auto"
                align="start"
              >
                <DropdownMenuLabel>Appliance</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {currentBrandApps.length > 0 ? (
                  currentBrandApps.map((option: Appliance, index: number) => (
                    <DropdownMenuItem
                      key={index}
                      onClick={() => setSelectedProduct(option.appliance)}
                      className="cursor-pointer capitalize"
                    >
                      {option.appliance}
                    </DropdownMenuItem>
                  ))
                ) : (
                  <DropdownMenuItem className="cursor-pointer" disabled>
                    {selectedBrand
                      ? "No appliances found"
                      : "Select a brand first"}
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button className="bg-blue-700 text-white hover:bg-blue-800 cursor-pointer font-semibold text-lg px-8 py-5 rounded-md transition-colors">
              Schedule Now
            </Button>
          </div>

          {/* Contact Options */}
          <div className="flex items-start justify-between  mb-4">
            <Link
              href={"/page"}
              className="flex items-center justify-center gap-2 w-full bg-gray-100 py-2 rounded-lg mr-2"
            >
              <IoCallOutline className="w-5 h-5" />
              <span>Call</span>
              <span className="font-bold text-blue-800">(802) 552-4364</span>
            </Link>
            <Link
              href={"/page"}
              className="flex items-center justify-center gap-2 w-full bg-gray-100 text-center py-2 rounded-lg mr-2"
            >
              <CiChat1 className="w-6 h-6 " />
              <span>Chat</span>
            </Link>
          </div>

          {/* Warranty Link */}
          <Link
            href={"/page"}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium hover:underline transition-colors block"
          >
            Will you be using repair benefits from a Sears or other warranty
            plan?
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 space-y-4 lg:space-y-0 gap-8 mt-40 mb-20">
        {states.map((state, index) => (
          <div key={index}>
            <Link
              href={`/locations/${state.toLowerCase().replace(/\s+/g, "-")}`}
              className="text-blue-600 text-xl font-semibold hover:underline"
            >
              {state}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HeroSection;
