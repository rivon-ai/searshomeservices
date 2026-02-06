"use client";

import React from "react";
import { Link } from "react-scroll";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export const GlossaryNav = () => {
  return (
    <nav className="w-full py-4 bg-white/80 backdrop-blur-md border-b border-gray-100 mb-8 -mx-4 px-4 lg:mx-0 lg:px-0">
      <div className="max-w-7xl mx-auto">
        <ul className="flex flex-wrap justify-center gap-1.5 lg:gap-2">
          {alphabet.map((letter) => (
            <li key={letter} className="shrink-0">
              <Button
                asChild
                variant="outline"
                size="sm"
                className={cn(
                  "w-8 h-8 lg:w-10 lg:h-10 p-0 font-bold rounded-lg transition-all",
                  "text-[#002855] border-gray-200 hover:bg-[#002855] hover:text-white hover:border-[#002855] shadow-sm hover:shadow-md"
                )}
              >
                <Link
                  to={`${letter}-section`}
                  smooth={true}
                  offset={-120}
                  duration={500}
                  className="cursor-pointer flex items-center justify-center w-full h-full"
                >
                  {letter}
                </Link>
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};
