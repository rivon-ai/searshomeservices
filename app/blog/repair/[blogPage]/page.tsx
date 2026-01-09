import React from "react";
import TableOfContents from "../components/TableOfContents";
import ScheduleCard from "../components/ScheduleCard";
import ContentSection from "../components/ContentSection";

// Data Definition
const headings = [
  { id: "safety-first", title: "Safety First" },
  { id: "common-tools", title: "Common Tools Needed" },
  { id: "identifying-issues", title: "Identifying the Issue" },
  { id: "troubleshooting", title: "Basic Troubleshooting" },
  { id: "maintenance-tips", title: "Maintenance Tips" },
  { id: "professional-help", title: "When to Call a Pro" },
  { id: "warranty-info", title: "Warranty Information" },
];

export default function BlogRepairPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-8 lg:py-12">
      {/* Container */}
      <div className="mx-auto max-w-300 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:gap-8 relative">
          {/* Left Column: Table of Contents (25%) */}
          {/* Mobile: Sticky Top (handled inside component). Desktop: Sticky Left. */}
          <div className="lg:w-1/4 lg:shrink-0 order-1">
            {/* Note: The TOC component handles its own sticky positioning for both mobile and desktop */}
            <TableOfContents headings={headings} />
          </div>

          {/* Center Column: Content (50%) */}
          <div className="lg:w-1/2 grow order-2 mt-6 lg:mt-0">
            <ContentSection headings={headings} />
          </div>

          {/* Right Column: Schedule Card (25%) */}
          <div className="lg:w-1/4 lg:shrink-0 order-3 mt-8 lg:mt-0">
            {/* Sticky wrapper for desktop is inside ScheduleCard or handled here if needed. 
                 ScheduleCard has internal 'sticky' class. */}
            <ScheduleCard />
          </div>
        </div>
      </div>
    </main>
  );
}
