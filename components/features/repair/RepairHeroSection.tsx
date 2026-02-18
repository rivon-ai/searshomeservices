import ImageScheduleCard from "@/components/shared/Image&ScheduleCard";
import React from "react";
import img from "@/public/image1.webp";
import ApplianceServicesNearYou from "./ApplianceServicesNearYou";
import LearnMore from "./LearnMore";
import ExpertApplianceRepair from "./ExpertApplianceRepair";
import HowItWorks from "@/components/shared/HowItWorksSVG";
import BrandsWeRepair from "@/components/shared/BrandsWeRepair";
import WhyToChoose from "@/components/shared/WhyToChoose";
import KitchenRepairExperts from "./KitchenRepairExperts";
import DealCards from "@/components/shared/DealCards";
import FAQ from "@/components/shared/FAQ";
import RatingSection from "@/components/shared/RatingSection"
import LatestResource from "@/components/shared/LatestResource";
import GlossaryTerms from "@/components/shared/GlossaryTerms";
import CommonSymptoms from "@/components/shared/CommonSymptoms";

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

export default function RepairHeroSection() {
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

      <div className="pt-28 pb-12 border-b ">
        <ExpertApplianceRepair />
      </div>

      <div className="pb-10 border-b">
        <ApplianceServicesNearYou />
      </div>

      <div className="pb-10 border-b ">
        <LearnMore />
      </div>

      <div className="pb-10 border-b">
        <HowItWorks />
      </div>

      <div className="pb-10 border-b">
        <BrandsWeRepair />
      </div>

      <div className="pb-10 border-b">
        <WhyToChoose />
      </div>

      <div className="pb-10 border-b">
        <KitchenRepairExperts />
      </div>

      <div className="pb-10 border-b">
        <DealCards />
      </div>

      <div className="pb-10 border-b">
        <RatingSection reviews={reviews} />
      </div>

      <div className="pb-10 border-b">
        <FAQ />
      </div>

      <div className="pb-10 max-w-[50%] mx-auto">
        <LatestResource />
      </div>

      <div className="pb-10 max-w-[50%] mx-auto">
        <GlossaryTerms />
      </div>

      <div className="pb-10 max-w-[50%] mx-auto">
        <CommonSymptoms />
      </div>
    </div>
  );
}
