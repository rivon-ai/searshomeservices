import React from "react";
import { GlossaryNav } from "@/components/features/glossary/GlossaryNav";
import { GlossaryHero } from "@/components/features/glossary/GlossaryHero";
import { TermGroup } from "@/components/features/glossary/TermGroup";
import LatestResource from "@/components/shared/LatestResource";
import GlossaryTerms from "@/components/shared/GlossaryTerms";
import { getAllGlossaryTerms } from "@/services/glossaryService";

export interface GroupedTerms {
  [letter: string]: any[];
}

export default async function GlossaryPage() {

  // 1. Fetch data on the Server
  const terms = await getAllGlossaryTerms() || [];

  // 2. Map and filter valid terms
  const validTerms = terms.filter(t => t.description || t.definition || t.title);
  const mappedTerms = validTerms.map(t => ({
    ...t,
    term: t.metaData?.termName || t.title,
    letter: t.metaData?.letter || t.letter || (t.title ? t.title.charAt(0).toUpperCase() : "A")
  }));

  // 3. Alphabetically Sort & Group
  const grouped: GroupedTerms = {};
  mappedTerms.forEach((term) => {
    const firstChar = term.letter || (term.term ? term.term.charAt(0) : "");
    if (!firstChar) return;

    const letter = firstChar.toUpperCase();
    if (!grouped[letter]) grouped[letter] = [];
    grouped[letter].push(term);
  });

  const groupedTerms: GroupedTerms = {};
  Object.keys(grouped)
    .sort((a, b) => a.localeCompare(b))
    .forEach((letter) => {
      groupedTerms[letter] = [...grouped[letter]].sort((a, b) =>
        a.term.localeCompare(b.term)
      );
    });

  const letters = Object.keys(groupedTerms).sort();
  const recentTerms = mappedTerms.slice(0, 4);

  return (
    <main className="bg-white pb-20 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 pt-6 lg:pt-10">
        {/* Hero Section with Search */}
        {/* We pass the full pre-mapped terms array down so the client-side search can instantly filter it */}
        <GlossaryHero
          recentTerms={recentTerms}
          allTerms={mappedTerms}
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

        <div className="mx-auto space-y-12 md:max-w-[70%] lg:max-w-[60%]">
          <LatestResource />
          <GlossaryTerms />
        </div>
      </div>
    </main>
  );
}
