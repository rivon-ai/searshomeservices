"use client";

import React from "react";
import Link from "next/link";
import { SearchBar } from "./SearchBar";
import { TermObject } from "@/utils/data/glossaryData";
import { ArrowRight } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface GlossaryHeroProps {
  recentTerms: TermObject[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  searchResults: TermObject[];
  isSearching: boolean;
  onClearSearch: () => void;
}

export const GlossaryHero: React.FC<GlossaryHeroProps> = ({
  recentTerms,
  searchQuery,
  onSearchChange,
  searchResults,
  isSearching,
  onClearSearch
}) => {
  return (
    <div className="relative w-full bg-[#002855] text-blue-50 py-16 lg:py-28 px-6 lg:px-12 mb-16 rounded-3xl overflow-hidden shadow-2xl">
      {/* Premium Decorative Background */}
      <div className="absolute top-0 right-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[120%] bg-blue-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[40%] h-full bg-blue-400/5 blur-[100px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center lg:items-start lg:justify-between relative z-10 gap-12">
        {/* Left Content */}
        <div className="w-full lg:w-3/5 text-center lg:text-left">
          <h2 className="text-4xl lg:text-7xl font-bold mb-8 text-white tracking-tight leading-tight">
            Home Service <br />
            <span className="text-blue-400 font-extrabold italic">Glossary</span>
          </h2>
          <p className="text-xl text-blue-100/90 max-w-2xl leading-relaxed mb-10 mx-auto lg:mx-0">
            Expert definitions and practical guides for every corner of your home. From HVAC systems to plumbing basics, gain the confidence to maintain your dwelling like a pro.
          </p>

          <SearchBar
            query={searchQuery}
            onQueryChange={onSearchChange}
            results={searchResults}
            isSearching={isSearching}
            onClear={onClearSearch}
            className="lg:max-w-xl mx-auto lg:mx-0"
          />
        </div>

        {/* Right Content - "Expert Tips" or "Featured Terms" */}
        <div className="w-full lg:w-[340px] shrink-0 animate-in fade-in slide-in-from-right-8 duration-1000">
          <Card className="bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-xl rounded-2xl">
            <CardHeader className="">
              <CardTitle className="text-xl font-bold flex items-center gap-2">
                <span className="w-2 h-8 bg-blue-400 rounded-full" />
                Recently Added
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="">
                {recentTerms.map((term, index) => (
                  <li key={index}>
                    <Button
                      asChild
                      variant="ghost"
                      className="w-full justify-between h-auto p-3 rounded-xl hover:bg-white/10 group border border-transparent hover:border-white/10 transition-all text-left block"
                    >
                      <Link href={`/glossary/${term.slug}`} className="flex items-center justify-between">
                        <div className="flex flex-col min-w-0">
                          <span className="font-semibold text-white group-hover:text-blue-300 transition-colors truncate">
                            {term.term}
                          </span>
                          <span className="text-xs text-blue-200/60 line-clamp-1">
                            {term.definition}
                          </span>
                        </div>
                        <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 text-blue-400 transition-all -translate-x-2 group-hover:translate-x-0 shrink-0 ml-2" />
                      </Link>
                    </Button>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
