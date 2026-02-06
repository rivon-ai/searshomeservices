"use client";

import React from "react";
import { GlossaryNav } from "../components/features/glossary/GlossaryNav";
import { GlossaryHero } from "../components/features/glossary/GlossaryHero";
import { TermGroup } from "../components/features/glossary/TermGroup";
import LatestResource from "../components/shared/LatestResource";
import GlossaryTerms from "../components/shared/GlossaryTerms";
import { useGlossary } from "../hooks/useGlossary";

export default function GlossaryPage() {
  const {
    searchQuery,
    setSearchQuery,
    searchResults,
    isSearching,
    groupedTerms,
    recentTerms,
    clearSearch
  } = useGlossary();

  const letters = Object.keys(groupedTerms).sort();

  return (
    <main className="bg-white pb-20 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 pt-6 lg:pt-10">
        {/* Hero Section with Search */}
        <GlossaryHero
          recentTerms={recentTerms}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          searchResults={searchResults}
          isSearching={isSearching}
          onClearSearch={clearSearch}
        />

        {/* Sticky Alphabet Navigation */}
        <GlossaryNav />

        {/* Main Glossary Content */}
        <div className="mt-12 space-y-20">
          {letters.map((letter) => (
            <TermGroup
              key={letter}
              letter={letter}
              terms={groupedTerms[letter].slice(0, 12).map(t => ({
                label: t.term,
                link: `/glossary/${t.slug}`
              }))}
              showSeeAll={groupedTerms[letter].length > 12}
            />
          ))}
        </div>

        <hr className="my-16 border-gray-100" />

        <div className="max-w-4xl mx-auto space-y-12">
          <LatestResource />
          <GlossaryTerms />
        </div>
      </div>
    </main>
  );
}
