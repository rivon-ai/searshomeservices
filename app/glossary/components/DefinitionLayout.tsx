"use client";

import React from "react";
import Link from "next/link";
import { TermObject } from "../lib/glossaryData";
import ScheduleCard from "../../blog/repair/components/ScheduleCard";
import TableOfContents from "@/app/blog/repair/components/TableOfContents";
import ContentSection from "@/app/blog/repair/components/ContentSection";

interface DefinitionLayoutProps {
  term: TermObject;
}

// Data Definitions
const sections = [
  {
    id: "safety-first",
    title: "Safety First",
    content: (
      <>
        <p className="text-gray-600 mb-4 leading-7">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <div className="my-6 p-4 bg-gray-50 rounded-lg border-l-4 border-blue-500">
          <h4 className="font-semibold text-gray-900 mb-1">Pro Tip</h4>
          <p className="text-sm text-gray-600">
            Always unplug your appliance before attempting any inspection or
            repair to ensure your safety.
          </p>
        </div>
      </>
    ),
  },
  {
    id: "common-tools",
    title: "Common Tools Needed",
    content: <p>Lorem ipsum...</p>,
  },
  {
    id: "identifying-issues",
    title: "Identifying the Issue",
    content: <p>Lorem ipsum...</p>,
  },
  {
    id: "troubleshooting",
    title: "Basic Troubleshooting",
    content: <p>Lorem ipsum...</p>,
  },
  {
    id: "maintenance-tips",
    title: "Maintenance Tips",
    content: <p>Lorem ipsum...</p>,
  },
  {
    id: "professional-help",
    title: "When to Call a Pro",
    content: <p>Lorem ipsum...</p>,
  },
  {
    id: "warranty-info",
    title: "Warranty Information",
    content: <p>Lorem ipsum...</p>,
  },
];

export const DefinitionLayout: React.FC<DefinitionLayoutProps> = ({ term }) => {
  const headings = sections.map((s) => ({ id: s.id, title: s.title }));
  return (
    <main className="min-h-screen bg-gray-50 py-8 lg:py-12">
      {/* Container */}
      <div className="mx-auto max-w-300 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:gap-8 relative">
          {/* Left Column: Table of Contents (25%) */}
          <div className="lg:w-1/4 lg:shrink-0 order-1">
            <TableOfContents headings={headings} />
          </div>

          {/* Center Column: Content (50%) */}
          <div className="lg:w-1/2 grow order-2 mt-6 lg:mt-0">
            <ContentSection sections={sections} />

            
          </div>

          {/* Right Column: Schedule Card (25%) */}
          <div className="lg:w-1/4 lg:shrink-0 order-3 mt-8 lg:mt-0">
            {/* Sticky wrapper is inside ScheduleCard */}
            <ScheduleCard />
          </div>
        </div>
      </div>
    </main>
  );
};
