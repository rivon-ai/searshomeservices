import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import React from "react";
import MainSection from "@/components/features/locations/CityMainSection";

export default function page() {
  return (
    <div>
      <MainSection cities={[]} description={""} />
    </div>
  );
}
