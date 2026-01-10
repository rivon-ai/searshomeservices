"use client";

import React from "react";
import Link from "next/link";
import { GlossaryNav } from "./GlossaryNav";
import { TermObject } from "../lib/glossaryData";

interface CategoryLayoutProps {
  letter: string;
  terms: TermObject[];
}

export const CategoryLayout: React.FC<CategoryLayoutProps> = ({
  letter,
  terms,
}) => {
  return (
    <div className="bg-white pb-20">
      <div className="max-w-300 mx-auto px-4 lg:px-8 pt-6 lg:pt-10">

        <div className="mt-12">
          <h1 className="text-3xl lg:text-4xl font-bold text-blue-950 mb-8 border-b border-gray-100 pb-4">
            Glossary Terms: <span className="text-blue-600">{letter}</span>
          </h1>

          {terms.length === 0 ? (
            <p className="text-gray-500 text-lg">
              No terms found for this letter.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {terms.map((term) => (
                <Link
                  key={term.slug}
                  href={`/glossary/${term.slug}`} // Linking to Definition Page
                  className="block p-4 rounded-lg bg-white border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all group"
                >
                  <span className="text-lg font-medium text-gray-700 group-hover:text-blue-700">
                    {term.term}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
