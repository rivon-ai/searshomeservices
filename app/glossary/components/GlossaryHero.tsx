"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface GlossaryHeroProps {
  recentTerms: Array<{ label: string; link: string }>;
}

export const GlossaryHero: React.FC<GlossaryHeroProps> = ({ recentTerms }) => {
  return (
    <div className="relative w-full bg-blue-900/95 text-blue-50 py-12 lg:py-20 px-6 lg:px-12 mb-12 rounded-xl overflow-hidden">
      <div className="max-w-300 mx-auto flex flex-col lg:flex-row items-center lg:items-start lg:justify-between relative z-10">
        {/* Left Content */}
        <div className="w-full lg:w-1/2 mb-10 lg:mb-0">
          <h2 className="text-2xl lg:text-5xl font-semibold mb-6 text-white tracking-tight">
            Glossary
          </h2>
          <p className="text-lg text-blue-100 max-w-xl leading-relaxed">
            Your go-to resource for understanding key terms and concepts. Here, you'll find clear definitions and practical explanations to help you maintain, repair, and improve your home with confidence.
          </p>
        </div>

        {/* Right Content - "Recently Added" Card */}
        <div className="w-full lg:w-88 bg-white rounded-lg shadow-xl p-6 lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2 text-gray-800">
          <h2 className="text-2xl font-semibold text-blue-950 mb-4 border-b border-gray-100 pb-2">
            Recently Added
          </h2>
          <ul className="space-y-3">
            {recentTerms.map((term, index) => (
              <li key={index}>
                <Link
                  href={term.link}
                  className="group flex items-center justify-between hover:text-blue-600 transition-colors"
                >
                  <span className="font-medium text-gray-700 group-hover:text-blue-600">
                    {term.label}
                  </span>
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-500/20 skew-x-12 translate-x-1/4 pointer-events-none" />
    </div>
  );
};
