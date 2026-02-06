"use client";

import React, { useState } from "react";
import imgone from "@/public/image1.webp";
import imgtwo from "@/public/howItWorksImages/image2.webp";
import imgthree from "@/public/howItWorksImages/image3.webp";
import imgfour from "@/public/howItWorksImages/image4.webp";
import { IoIosArrowDown } from "react-icons/io";
import { FaStar } from "react-icons/fa";
import { BrandData, Appliance, brandAppliances } from "@/utils/brandAppliances";
import ImageScheduleCard from "../../../components/Image&ScheduleCard";
import Link from "next/link";

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
      <ImageScheduleCard
        heroImage={imgone}
        reviewsCount={5}
        showBanner={true}
        bannerText={{
          boldInfo: "5+ Years of Experience",
          italicInfo: "in appliance repair",
        }}
        heading="Book Your Appointment Today"
        description="We're in your neighborhood and we'll fix it, no matter where you bought it. Schedule service your way"
      />

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
