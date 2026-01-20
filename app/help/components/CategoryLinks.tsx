"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

export interface LinkData {
  text: string;
  href: string;
}

interface CategoryLinksProps {
  title?: string;
  items?: LinkData[];
  imageSrc?: string;
  imageAlt?: string;
  SwapLayout?: boolean;
}

export default function CategoryLinks({
  title,
  items = [],
  imageSrc,
  imageAlt,
  SwapLayout,
}: CategoryLinksProps) {
  return (
    <div className="pb-8 lg:py-20 max-w-[80%]">
      <div className="">
        <h3 className="text-blue-950 font-semibold text-xl lg:text-2xl mb-4 lg:mt-0 lg:mb-2 text-left mt-12">
          {title}
        </h3>
      </div>

      <div className="grid grid-cols-1 gap-10 items-start lg:grid-cols-2">
        <div
          className={`mt-6 mb-6 lg:mb-10 flex flex-col justify-center order-2 ${SwapLayout ? "lg:order-2" : "lg:order-1"}`}
        >
          {items.map((item, index) => (
            <section key={index}>
              <div className="text-lg font-semibold leading-8 mt-0">
                <Link
                  href={item.href}
                  target="_self"
                  className="hover:no-underline flex-1 block"
                >
                  <div className="flex items-center justify-between hover:bg-blue-50 transition-colors duration-300 ease-in-out cursor-pointer py-4 px-2 -mx-2 rounded-md group">
                    <span className="text-lg lg:text-lg font-semibold leading-8 line-clamp-2 pr-4 transition-colors">
                      {item.text}
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                      data-slot="icon"
                      className="w-6 h-6 shrink-0 ml-2 group-hover:text-blue-700"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </Link>
                <hr className="" />
              </div>
            </section>
          ))}
        </div>
        <div
          className={`py-6 relative w-full h-auto order-1 ${SwapLayout ? "lg:order-1" : "lg:order-2"}`}
        >
            <img
              alt={imageAlt}
              loading="lazy"
              decoding="async"
              className="rounded-2xl w-full h-auto object-cover"
              src={imageSrc}
            />
        </div>
      </div>
    </div>
  );
}
