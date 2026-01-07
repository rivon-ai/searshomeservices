"use client";

import ImageScheduleCard from "@/components/Image&ScheduleCard";
import React from "react";
import img from "@/public/image1.webp";
import ExpertRepairAndHomeServices from "./ExpertRepair&HomeServices";
import FAQ from "./FAQ";
import HowItWorks from "./HowItWorksImageComp";
import WhyToChoose from "@/components/WhyToChoose";
import MaintainenceCards from "./MaintainenceCards";
import SchdeluProfessionalMaintenance from "./SchdeluProfessionalMaintenance";
import SearsHomeServicesCards from "./SearsHomeServicesCards";
import DealCards from "./DealCards";
import RatingSection from "@/components/RatingSection";
import LatestResource from "./LatestResource";
import CommonSymptoms from "./CommonSymptoms";
import GlossaryTerms from "./GlossaryTerms";

const reviews = [
  {
    title: "Top Notch Service",
    rating: 5,
    text: "Cesar was very thorough and professional in dealing with the plumbing issue with our Refrigerator. My wife and I were very satisfied with his work.",
    author: "MARK A. OOLTEWAH, TN",
  },
  {
    title: "Excellent!",
    rating: 5,
    text: "Clayton was very friendly, professional and thorough! He took care of my problem in no time and let us know what to expect. I really appreciate his work and his demeanor. Thanks so...",
    author: "NANCY M. PALMYRA, MO",
  },
  {
    title: "VERY PROFESSIONAL, AND KNO...",
    rating: 5,
    text: "WE FOUND OUT THAT IT WAS CHEAPER TO BUY A NEW REFRIDGERATOR, THAN TO GET THIS ONE FIXED, OUTSIDE OF THAT MR. JEFF WAS VERY COURTUS....",
    author: "PAMELA B. PASADENA, MD",
  },
  {
    title: "VERY lskdjf, AND KNO...",
    rating: 5,
    text: "WE FOUND OUT THAT IT WAS CHEAPER TO BUY A NEW REFRIDGERATOR, THAN TO GET THIS ONE FIXED, OUTSIDE OF THAT MR. JEFF WAS VERY COURTUS....",
    author: "PAMELA A. PASADENA, MD",
  },
];

export default function HeroSection() {
  return (
    <div className="flex flex-col gap-10">
      <ImageScheduleCard
        heroImage={img}
        reviewsCount={5}
        showBanner={true}
        bannerText={{
          boldInfo: "5+ Years of Experience",
          italicInfo: "in appliance repair",
        }}
        heading="Book Your Appointment Today"
        description="We're in your neighborhood and we'll fix it, no matter where you bought it. Schedule service your way"
      />

      <div className="mt-28 border-b">
        <ExpertRepairAndHomeServices />
      </div>

      <div className="pb-10 border-b">
        <FAQ />
      </div>

      <div className="pb-10 border-b">
        <HowItWorks />
      </div>

      <div className="pb-10 border-b">
        <WhyToChoose />
        <p className="text-gray-500 mt-4">
          When you're looking for "appliance repair near me" you can count of
          Sears Home Services to be there with fast and reliable appliance
          repair service.
        </p>
      </div>

      <div className="pb-10 border-b">
        <MaintainenceCards />
      </div>

      <div className="pb-10 border-b">
        <SchdeluProfessionalMaintenance />
      </div>

      <div className="pb-10 border-b">
        <SearsHomeServicesCards />
      </div>

      <div className="pb-10 border-b">
        <DealCards />
      </div>

      <div className="pb-10 border-b">
        <RatingSection reviews={reviews} />
      </div>

      <div className="pb-10 border-b max-w-[50%] mx-auto">
        <LatestResource />
      </div>

      <div className="pb-10 border-b max-w-[50%] mx-auto">
        <GlossaryTerms />
      </div>

      <div className="pb-10 max-w-[50%] mx-auto">
        <CommonSymptoms />
      </div>
    </div>
  );
}
