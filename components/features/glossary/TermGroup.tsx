"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils/cn";

interface Term {
  label: string;
  link: string;
}

interface TermGroupProps {
  letter: string;
  terms: Term[];
  showSeeAll?: boolean;
}

export const TermGroup: React.FC<TermGroupProps> = ({
  letter,
  terms,
  showSeeAll,
}) => {
  return (
    <div id={`${letter}-section`} className="mb-12 scroll-mt-24">
      <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-2">
        <h2 className="text-3xl font-bold text-[#002855]">{letter}</h2>
        {showSeeAll && (
          <Button asChild variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800 font-bold group">
            <Link href={`/glossary/${letter.toLowerCase()}`}>
              See All
              <ChevronRight className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        )}
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-4">
        {terms.map((term, index) => (
          <Link
            key={index}
            href={term.link}
            className={cn(
              "block p-3.5 rounded-xl hover:bg-blue-50 transition-all group",
              "border border-transparent hover:border-blue-100 shadow-none hover:shadow-sm"
            )}
          >
            <span className="text-gray-600 font-semibold group-hover:text-blue-700 block transition-colors">
              {term.label}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};
