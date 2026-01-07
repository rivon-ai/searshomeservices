"use client";

import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { IoCallOutline } from "react-icons/io5";
import { CiChat1 } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";
import { FaStar } from "react-icons/fa";
import { BrandData, Appliance, brandAppliances } from "@/utils/brandAppliances";

interface ImageScheduleCardProps {
  heroImage?: StaticImageData | string;
  reviewsCount?: number;
  showBanner?: boolean;
  bannerText?: {
    boldInfo: string;
    italicInfo: string;
  };
  heading?: string;
  subHeading?: string;
  description?: string;
}

export default function ImageScheduleCard({
  heroImage,
  reviewsCount,
  showBanner,
  bannerText,
  heading,
  subHeading,
  description,
}: ImageScheduleCardProps) {
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [selectedProduct, setSelectedProduct] = useState<string>("");

  // Helper to get selected brand data
  const currentBrandData = brandAppliances.find(
    (b) => b.brand === selectedBrand,
  );
  const currentBrandApps: Appliance[] = currentBrandData?.appliances || [];

  return (
    <div className="relative">
      {/* Customer Reviews Badge */}
      {reviewsCount !== undefined && (
        <div className="absolute top-4 left-4 bg-white rounded-lg shadow-md px-4 py-2 flex items-center gap-2 z-10">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className="text-yellow-400 w-4 h-4" />
            ))}
          </div>
          <span className="text-blue-600 font-medium text-sm">
            {reviewsCount} Customer Reviews
          </span>
        </div>
      )}

      {heroImage && (
        <Image
          src={heroImage}
          alt="Hero Image"
          className="w-full h-auto rounded-lg"
          width={1200}
          height={600}
          unoptimized={typeof heroImage === "string"}
        />
      )}

      {/* Main Content Card */}
      <div className="absolute top-[80%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-2xl p-8 max-w-2xl w-[90%]">
        {/* Blue Banner */}
        {showBanner && bannerText && (
          <div className="bg-blue-700 text-white px-4 py-2 rounded-t-lg -mx-8 -mt-8 mb-6">
            <p className="text-center text-sm md:text-base">
              <span className="font-semibold">{bannerText.boldInfo}</span>{" "}
              <span className="italic">{bannerText.italicInfo}</span>
            </p>
          </div>
        )}

        {/* Heading */}
        <div className="mb-6">
          {heading && (
            <h2 className="font-bold text-3xl text-blue-950 mb-3">{heading}</h2>
          )}
          {subHeading && (
            <p className="text-gray-600 text-base leading-relaxed">
              {subHeading}
            </p>
          )}
          {description && (
            <p className="text-gray-600 text-base">{description}</p>
          )}
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
          Will you be using repair benefits from a Sears or other warranty plan?
        </Link>
      </div>
    </div>
  );
}
