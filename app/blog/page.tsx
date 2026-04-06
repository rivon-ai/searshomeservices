import React from "react";
import HeroSection from "@/components/features/blog/HeroSection";
import Blogs from "@/components/features/blog/Blogs";
import { blogService } from "@/services/blogService";

export default async function page() {
  const sections = await blogService.getHomepageData();

  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <div className="max-w-[80%] mx-auto py-12">
        <Blogs sections={sections} />
      </div>
    </div>
  );
}
