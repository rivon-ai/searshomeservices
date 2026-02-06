"use client";

import React from "react";
import { Element } from "react-scroll";
import { Home, ChevronRight } from "lucide-react";

export interface SectionData {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface ContentSectionProps {
  breadcrumbs?: React.ReactNode;
  hero?: React.ReactNode;
  intro?: React.ReactNode;
  sections: SectionData[];
}

export default function ContentSection({
  breadcrumbs,
  hero,
  intro,
  sections,
}: ContentSectionProps) {
  return (
    <div className="flex flex-col w-full">
      {/* Breadcrumbs */}
      {breadcrumbs || (
        <nav
          className="flex items-center text-sm text-gray-500 mb-6"
          aria-label="Breadcrumb"
        >
          <ol className="flex items-center space-x-2">
            <li>
              <a href="/" className="hover:text-blue-600 flex items-center">
                <Home size={16} />
              </a>
            </li>
            <li>
              <ChevronRight size={16} className="text-gray-400" />
            </li>
            <li>
              <a href="/blog" className="hover:text-blue-600">
                Blog
              </a>
            </li>
            <li>
              <ChevronRight size={16} className="text-gray-400" />
            </li>
            <li className="text-gray-900 font-medium overflow-hidden text-ellipsis whitespace-nowrap max-w-[150px] sm:max-w-none">
              Appliance Repair Guide
            </li>
          </ol>
        </nav>
      )}

      {/* Hero */}
      {hero ? (
        hero
      ) : (
        <div className="relative w-full h-[300px] mb-10 rounded-2xl overflow-hidden shadow-md">
          <img
            src="https://images.unsplash.com/photo-1581092921461-eab62e97a780?q=80&w=2070&auto=format&fit=crop"
            alt="Appliance Repair Technician"
            className="object-cover w-full h-full hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white max-w-2xl leading-tight">
              Complete Guide to Home Appliance Repair & Maintenance
            </h1>
          </div>
        </div>
      )}

      {/* Intro Text */}
      {intro ? (
        intro
      ) : (
        <div className="prose prose-lg px-2 max-w-none text-gray-600 mb-12 leading-relaxed">
          <p>
            Keeping your home appliances running smoothly doesn't just save you
            money on replacements—it ensures your household runs efficiently
            every day. In this comprehensive guide, we cover everything from
            basic troubleshooting to knowing when it's time to call a
            professional.
          </p>
        </div>
      )}

      {/* Sections */}
      <div className="space-y-16">
        {sections.map((section, index) => (
          <Element
            key={section.id}
            name={section.id}
            className="scroll-mt-[140px] lg:scroll-mt-[140px]"
          >
            <div className="px-2">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 text-sm font-bold mr-3">
                  {index + 1}
                </span>
                {section.title}
              </h2>

              <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                {section.content}
              </div>
            </div>
          </Element>
        ))}
      </div>

      {/* Footer / Conclusion */}
      <div className="mt-16 pt-8 border-t border-gray-100 px-2">
        <p className="text-gray-500 italic text-center">
          Was this guide helpful?{" "}
          <span className="text-blue-600 cursor-pointer underline hover:text-blue-700">
            Share it with a friend
          </span>
          .
        </p>
      </div>
    </div>
  );
}
