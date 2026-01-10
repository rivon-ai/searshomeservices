"use client";

import React from "react";
import { Link } from "react-scroll";
import clsx from "clsx";

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export const GlossaryNav = () => {
  return (
    <nav className="relative z-10 w-full mb-8 lg:mb-12">
      {/* 
        Mobile (< lg): Absolute column on the right. 
        Desktop (>= lg): Flex row centered.
      */}
      <ul
        className={clsx(
          "flex flex-col gap-1 absolute right-0 top-0",
          "lg:relative lg:flex-row lg:flex-wrap lg:justify-center lg:w-full lg:gap-2 lg:right-auto lg:top-auto",
        )}
      >
        {alphabet.map((letter) => (
          <li key={letter} className="shrink-0">
            <Link
              to={`${letter}-section`}
              smooth={true}
              offset={-100}
              duration={500}
              className={clsx(
                "block w-8 h-8 lg:w-10 lg:h-10 text-center content-center",
                "text-sm lg:text-base font-semibold",
                "text-blue-900 hover:bg-blue-100 transition-colors border border-blue-950/30",
                "cursor-pointer rounded-sm",
              )}
            >
              {letter}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
