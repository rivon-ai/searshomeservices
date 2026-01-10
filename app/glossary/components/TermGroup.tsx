"use client";

import React from "react";
import Link from "next/link";
import clsx from "clsx";

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
        {/* Main Heading for the Section: text-blue-950 */}
        <h2 className="text-3xl font-bold text-blue-950">{letter}</h2>
        {showSeeAll && (
          <Link
            href={`/glossary/${letter.toLowerCase()}`}
            className="text-sm font-semibold text-blue-600 hover:text-blue-800 flex items-center"
          >
            See All <span className="ml-1">&gt;</span>
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-3">
        {terms.map((term, index) => (
          <Link
            key={index}
            href={term.link}
            className={clsx(
              "block p-3 rounded-lg hover:bg-blue-50 transition-colors group",
              "border border-transparent hover:border-blue-100",
            )}
          >
            <span className="text-gray-600 font-medium group-hover:text-blue-700">
              {term.label}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};
