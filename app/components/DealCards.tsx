import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function DealCards() {
  const backgroundUrl =
    "https://www.searshomeservices.com/cftassets/6a1dTJcQCBwlc7LbRMzy6h/32682b09d8317e08a3356fcb6317eada/fdc9ee57cf49e740547d5f02c796e233.jpg?w=600&q=90&fm=webp";

  const cardClip = "clip-path-[polygon(100%_0,100%_72%,96%_83%,92%_90%,85%_96%,76%_99%,64%_100%,0_100%,0_0)]";

  return (
    <div className="py-4 px-8 w-full">
      <div
        className="rounded-2xl bg-cover bg-center overflow-hidden flex flex-col md:grid md:grid-cols-2 relative min-h-[300px]"
        style={{ backgroundImage: `url('${backgroundUrl}')` }}
      >
        {/* Left Side - Dark Blue Card */}
        <div className="bg-[#003980] text-white py-2 px-6 flex flex-col justify-center h-full">
          <h2 className="text-3xl mb-6">
            <span className="font-semibold text-[#ffc220]">Come Work</span> for
            Us!
          </h2>
          <p className="text-base mb-8 leading-relaxed">
            We are currently hiring Appliance Services Technicians in locations
            across the country. If you have the skills to repair Washers,
            Dryers, Ovens, Dishwashers, Refrigerators or HVAC equipment, we'd
            like to talk with you.
          </p>
          <div>
            <Link
              href="https://sjobs.brassring.com/TGnewUI/Search/Home/Home?partnerid=455&siteid=185#home"
              target="_blank"
            >
              <Button className="bg-[#ffc220] hover:bg-yellow-500 text-blue-900 font-bold px-8 py-6 rounded-lg text-lg w-full md:w-auto">
                Apply Now
              </Button>
            </Link>
          </div>
        </div>

        {/* Right Side - Transparent/Image Background Card */}
        <div className="flex items-center p-4">
          <div className="text-white p-8 flex flex-col justify-center bg-blue-900/80 h-fit rounded-2xl [clip-path:polygon(100%_0,100%_60%,99.6%_68%,98.6%_76%,96.8%_83%,94.2%_89%,91%_93.5%,86.5%_96.5%,80.5%_98.5%,72%_99.6%,62%_100%,0_100%,0_0)]">
            <h2 className="text-xl mb-6">
              Sears Home Services
              <span className="font-semibold">
                Authorized Provider Companies
              </span>
            </h2>
            <p className="text-xl italic mb-8">
              Join our national network of companies
            </p>
            <div className="">
              <Link
                href="https://lc-sywrelay-providernetwork.s3.us-east-2.amazonaws.com/1099/home.html"
                target="_blank"
              >
                <Button className="bg-[#ffc220] hover:bg-yellow-500 text-blue-900 font-bold px-8 py-6 rounded-lg text-lg w-full md:w-auto">
                  Join Here
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
