import Link from "next/link";
import { Calendar, Wrench, Star, User } from "lucide-react";
import Locations from "./components/Locations";
import RatingSection from "../../../../../components/RatingSection";
import LearnMore from "./components/LearnMore";
import ImageSection from "./components/ImageSection";
import img from "@/public/alabamaImage.webp";
import BrandsWeRepair from "../../../../components/BrandsWeRepair";
import WhyToChoose from "../../../../../components/WhyToChoose";
import RepairResources from "./components/RepairResources";
import TermsAndApplianceSymptom from "./components/TermsAndApplianceSymptom";
import HowItWorks from "./components/HowItWorksSection";

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

const locations = [
  {
    name: "Sears Appliance Repair",
    address: "1000 E 41st, Austin, Texas 78751",
    isTopLocation: true,
  },
  {
    name: "Sears Appliance Repair",
    address: "2901 S Capitol of Texas Highway, Austin, Texas 78746",
    isTopLocation: false,
  },
  {
    name: "Sears Appliance Repair",
    address: "12625 N I-H 35, Austin, Texas 78753",
    isTopLocation: false,
  },
];

export default function page() {
  return (
    <div className="w-full xl:w-[75%] mx-auto mt-6">
      <ImageSection img={img} />

      <Locations locations={locations} />

      <HowItWorks />

      {/* Common Repair Services */}
      <div className="py-20 bg-white">
        <div className="mb-16">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Learn about our most common repair services
          </h2>
          <ul className="space-y-2">
            <li>
              <Link href="#" className="text-blue-600 hover:underline text-sm">
                Oven Repair Service
              </Link>
            </li>
            <li>
              <Link href="#" className="text-blue-600 hover:underline text-sm">
                Refrigerator Repair Service
              </Link>
            </li>
            <li>
              <Link href="#" className="text-blue-600 hover:underline text-sm">
                Dishwasher Repair Service
              </Link>
            </li>
            <li>
              <Link href="#" className="text-blue-600 hover:underline text-sm">
                Washing Machine Repair Service
              </Link>
            </li>
            <li>
              <Link href="#" className="text-blue-600 hover:underline text-sm">
                Dryer Repair Service
              </Link>
            </li>
          </ul>
        </div>

        <WhyToChoose />
        <BrandsWeRepair />
      </div>

      <RatingSection reviews={reviews} />

      <LearnMore />

      <RepairResources resources={resources} />

      <TermsAndApplianceSymptom
        glossaryTerms={glossaryTerms}
        symptoms={symptoms}
      />
    </div>
  );
}
