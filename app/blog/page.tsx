import React from "react";
import HeroSection from "./components/HeroSection";
import Blogs from "./components/Blogs";

export default function page() {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <div className="max-w-[80%] mx-auto py-12">
        <Blogs />
      </div>
    </div>
  );
}
