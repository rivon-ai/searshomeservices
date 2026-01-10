"use client";

import React from "react";
import { GlossaryNav } from "./components/GlossaryNav";
import { GlossaryHero } from "./components/GlossaryHero";
import { TermGroup } from "./components/TermGroup";
import Link from "next/link";
import LatestResource from "../components/LatestResource";
import GlossaryTerms from "../components/GlossaryTerms";
import { GLOSSARY_TERMS } from "./lib/glossaryData";

// --- Data Preparation ---

// Group terms by letter
const glossaryData: Record<string, { label: string; link: string }[]> = {};

GLOSSARY_TERMS.forEach((term) => {
  if (!glossaryData[term.letter]) {
    glossaryData[term.letter] = [];
  }
  glossaryData[term.letter].push({
    label: term.term,
    link: `/glossary/${term.slug}`,
  });
});

// Mock Recent Terms (using terms from our DB)
const recentTerms = GLOSSARY_TERMS.slice(0, 4).map((term) => ({
  label: term.term,
  link: `/glossary/${term.slug}`,
}));

// --- Main Page Component ---

export default function GlossaryPage() {
  // Sort alphabet keys to ensure order
  const letters = Object.keys(glossaryData).sort();

  return (
    <main className="relative bg-white pb-20">
      <div className="lg:max-w-[80%] mx-auto px-4 lg:px-8 pt-6 lg:pt-10">
        {/* Navigation & Hero */}
        <div className="flex flex-col lg:flex-col-reverse">
          {/* Nav is technically below Hero in DOM for visual hierarchy on desktop if using flex-col-reverse? 
              Wait, the design says nav at top of container. 
              Let's keep standard order: Nav -> Hero. 
          */}
          <GlossaryNav />
          <GlossaryHero recentTerms={recentTerms} />
        </div>

        {/* Main Glossary Content */}
        <div className="mt-12 space-y-12">
          {letters.map((letter) => (
            <TermGroup
              key={letter}
              letter={letter}
              terms={glossaryData[letter].slice(0, 12)}
              showSeeAll={glossaryData[letter].length > 12}
            />
          ))}
        </div>

        <hr className="my-16 border-gray-100" />

        <div className="max-w-[50%] mx-auto space-y-12">
          <LatestResource />

          <GlossaryTerms />
        </div>
      </div>
    </main>
  );
}
