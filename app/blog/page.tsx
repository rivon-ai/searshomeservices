import React from "react";
import HeroSection from "../components/blog/HeroSection";
import Blogs from "../components/blog/Blogs";

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
