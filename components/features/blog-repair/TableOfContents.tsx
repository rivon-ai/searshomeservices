"use client";

import React, { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { Menu, X, ChevronRight } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Utility for cleaner class merging
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface Heading {
  id: string;
  title: string;
}

interface TableOfContentsProps {
  headings: Heading[];
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>("");

  // Close mobile menu when a link is clicked
  const handleLinkClick = (id: string) => {
    setActiveId(id);
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Sticky Header */}
      <div className="lg:hidden sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 px-4 py-3 flex items-center justify-between shadow-sm">
        <span className="font-semibold text-gray-800 text-sm">
          Table of Contents
        </span>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-1.5 hover:bg-gray-100 rounded-md transition-colors"
          aria-label="Toggle Table of Contents"
        >
          {isOpen ? (
            <X size={20} className="text-gray-600" />
          ) : (
            <Menu size={20} className="text-gray-600" />
          )}
        </button>
      </div>

      {/* Mobile Collapsible Dropdown */}
      <div
        className={cn(
          "lg:hidden fixed left-0 w-full bg-white z-40 border-b border-gray-100 shadow-lg transition-all duration-300 ease-in-out overflow-hidden",
          isOpen
            ? "top-[53px] max-h-[80vh] opacity-100"
            : "top-[53px] max-h-0 opacity-0 pointer-events-none",
        )}
      >
        <nav className="p-4 flex flex-col space-y-2 max-h-[70vh] overflow-y-auto">
          {headings.map((heading) => (
            <Link
              key={heading.id}
              to={heading.id}
              spy={true}
              smooth={true}
              offset={-100} // Matches sticky header height + some buffer
              duration={500}
              onSetActive={() => setActiveId(heading.id)}
              onClick={() => handleLinkClick(heading.id)}
              className={cn(
                "block px-4 py-3 text-sm rounded-lg transition-all duration-200 cursor-pointer",
                activeId === heading.id
                  ? "bg-blue-50 text-blue-600 font-medium translate-x-1"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
              )}
            >
              {heading.title}
            </Link>
          ))}
        </nav>
      </div>

      {/* Desktop Sticky Sidebar */}
      <aside className="hidden lg:block sticky top-[120px] max-h-[calc(100vh-140px)] overflow-y-auto pr-4 custom-scrollbar">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 px-3">
          On this page
        </h3>
        <nav className="relative flex flex-col space-y-1">
          {/* Active indicator line - could be enhanced with framer-motion for sliding effect */}
          <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gray-100 rounded-full" />

          {headings.map((heading) => (
            <Link
              key={heading.id}
              to={heading.id}
              spy={true}
              smooth={true}
              offset={-120}
              duration={500}
              onSetActive={() => setActiveId(heading.id)}
              className={cn(
                "group relative pl-4 py-2 text-sm leading-relaxed transition-all duration-200 cursor-pointer border-l-2 -ml-[2px]",
                activeId === heading.id
                  ? "border-blue-600 text-blue-600 font-medium"
                  : "border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300",
              )}
            >
              {heading.title}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}
