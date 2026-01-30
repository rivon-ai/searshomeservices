"use client";

import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import {
  Combobox,
  ComboboxContent,
  ComboboxItem,
  ComboboxList,
  ComboboxInput,
} from "@/components/ui/combobox";
import { IoCallOutline } from "react-icons/io5";
import { CiChat1 } from "react-icons/ci";
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
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [selectedBrand, setSelectedBrand] = useState<string>("");

  // Get all unique appliances from the data
  const allAppliances = React.useMemo(() => {
    const applianceSet = new Set<string>();
    brandAppliances.forEach((brandData) => {
      brandData.appliances.forEach((app) => {
        applianceSet.add(app.appliance);
      });
    });
    return Array.from(applianceSet).sort();
  }, []);

  // Get brands that support the selected appliance
  const brandsForSelectedAppliance = React.useMemo(() => {
    if (!selectedProduct) return [];

    return brandAppliances
      .filter((brandData) =>
        brandData.appliances.some((app) => app.appliance === selectedProduct)
      )
      .map((brandData) => brandData.brand);
  }, [selectedProduct]);

  // Check if brand selection is required (appliance has multiple brands)
  const isBrandRequired = brandsForSelectedAppliance.length > 0;
  const showBrandCombobox = isBrandRequired;

  // Validate if user can proceed to schedule
  const canProceed = selectedProduct && (!isBrandRequired || selectedBrand);

  // Handle appliance change
  const handleApplianceChange = (value: string | null) => {
    const newAppliance = value || "";
    setSelectedProduct(newAppliance);

    // Reset brand if the new appliance doesn't support the currently selected brand
    if (newAppliance) {
      const brandsForNewAppliance = brandAppliances
        .filter((brandData) =>
          brandData.appliances.some((app) => app.appliance === newAppliance)
        )
        .map((brandData) => brandData.brand);

      if (!brandsForNewAppliance.includes(selectedBrand)) {
        setSelectedBrand("");
      }
    } else {
      setSelectedBrand("");
    }
  };

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
            <h2 className="font-semibold text-3xl text-blue-950 mb-3">{heading}</h2>
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
          Select {showBrandCombobox ? "Appliance and Brand" : "Appliance"}
        </h2>

        {/* Comboboxes and Button */}
        <div className="flex flex-col md:flex-row items-center gap-3 mb-6 w-full">
          {/* Appliance Combobox - Always Shown */}
          <Combobox
            value={selectedProduct}
            onValueChange={handleApplianceChange}
          >
            <ComboboxInput
              placeholder={selectedProduct || "Select Appliance"}
              className="flex-1 h-full py-0.5"
            >
              <ComboboxContent>
                <ComboboxList>
                  {allAppliances.map((appliance: string) => (
                    <ComboboxItem
                      key={appliance}
                      value={appliance}
                      className="capitalize"
                    >
                      {appliance}
                    </ComboboxItem>
                  ))}
                </ComboboxList>
              </ComboboxContent>
            </ComboboxInput>
          </Combobox>

          {/* Brand Combobox - Conditionally Shown */}
          {showBrandCombobox && (
            <Combobox
              value={selectedBrand}
              onValueChange={(value) => setSelectedBrand(value || "")}
            >
              <ComboboxInput
                placeholder={selectedBrand || "Select Brand"}
                className="flex-1 h-full py-0.5"
              >
                <ComboboxContent>
                  <ComboboxList>
                    {brandsForSelectedAppliance.map((brand: string) => (
                      <ComboboxItem
                        key={brand}
                        value={brand}
                        className="capitalize"
                      >
                        {brand}
                      </ComboboxItem>
                    ))}
                  </ComboboxList>
                </ComboboxContent>
              </ComboboxInput>
            </Combobox>
          )}

          {/* Schedule Now Button/Link */}
          {canProceed ? ( 
            <Link
              href={`/schedule?serviceType=${'Repair'}&appliance=${selectedProduct}${selectedBrand ? `&brand=${selectedBrand}` : ""}`}
              className="bg-blue-700 text-white hover:bg-blue-800 cursor-pointer font-semibold text-lg px-8 py-2 flex items-center justify-center rounded-md transition-colors"
            >
              Schedule Now
            </Link>
          ) : (
            <button
              disabled
              className="bg-gray-400 text-white cursor-not-allowed font-semibold text-lg px-8 py-2 flex items-center justify-center rounded-md"
              title={!selectedProduct ? "Please select an appliance" : "Please select a brand"}
            >
              Schedule Now
            </button>
          )}
        </div>

        {/* Contact Options */}
        <div className="flex items-start justify-between  mb-4">
          <Link
            href={"tel:8025524364"}
            className="flex items-center justify-center gap-2 w-full bg-gray-100 py-2 rounded-lg mr-2"
          >
            <IoCallOutline className="w-5 h-5" />
            <span>Call</span>
            <span className="font-bold text-blue-800">(802) 552-4364</span>
          </Link>
          <Link
            href={"/schedule"}
            className="flex items-center justify-center gap-2 w-full bg-gray-100 text-center py-2 rounded-lg mr-2"
          >
            <CiChat1 className="w-6 h-6 " />
            <span>Chat</span>
          </Link>
        </div>

        {/* Warranty Link */}
        <Link
          href={"/"}
          className="text-sm text-blue-600 hover:text-blue-800 font-medium hover:underline transition-colors block"
        >
          Will you be using repair benefits from a Sears or other warranty plan?
        </Link>
      </div >
    </div >
  );
}
