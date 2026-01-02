import React from "react";
import Image, { StaticImageData } from "next/image";
import { Button } from "@/components/ui/button";
import img1 from "@/public/howItWorksImages/image2.webp";
import img2 from "@/public/howItWorksImages/image3.webp";
import img3 from "@/public/howItWorksImages/image4.webp";
import Link from "next/link";

interface Step {
  id: number;
  title: string;
  image: StaticImageData;
  description: string;
  hasButton?: boolean;
}

const stepsData: Step[] = [
  {
    id: 1,
    title: "1. BOOK ONLINE IN LESS THAN 1 MINUTE.",
    image: img1,
    description:
      "Tell us what the problem is, and we'll schedule a local appliance repair technician to fix it as soon as possible—sometimes the same day.",
    hasButton: true,
  },
  {
    id: 2,
    title: "2. YOUR LOCAL TECHNICIAN IS ABOUT TO ARRIVE.",
    image: img2,
    description:
      "We send alerts, so you'll know when our expert repair technician will be at your door.",
  },
  {
    id: 3,
    title: "3. TECH ARRIVAL AND DIAGNOSIS",
    image: img3,
    description:
      "The technician will assess the issue and provide a complete estimate that includes parts, labor, and applicable taxes.",
  },
];

export default function HowItWorks() {
  return (
    <div className="py-8 w-full">
      <h1 className="text-2xl text-blue-950 mb-8 uppercase">
        How It Works
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stepsData.map((step) => (
          <div key={step.id} className="flex flex-col">
            <h3 className="text-blue-950 mb-4 uppercase tracking-wide h-10">
              {step.title}
            </h3>
            <div className="relative mb-4">
              <Image
                src={step.image}
                alt={step.title}
                className="w-full h-auto rounded-lg object-cover"
                style={{ aspectRatio: "16/9" }}
              />
              {step.hasButton && (
                <div className="absolute bottom-4 right-4">
                  <Button className="bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-md px-6 cursor-pointer">
                    <Link href={"/schedule"}>Schedule Now</Link>
                  </Button>
                </div>
              )}
            </div>
            <p className="text-gray-600 text-base leading-relaxed">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
