import React from "react";
import Image from "next/image";
import Link from "next/link";

interface LinkCardProps {
  swap: boolean;
  imageSrc: string;
  imageAlt: string;
  title: string;
  subtitle?: string;
  description: string;
  linkText?: string;
  linkHref: string;
  isReversed?: boolean; // Option to swap image/text sides
}

export default function LinkCards({
  swap,
  imageSrc,
  imageAlt,
  title,
  subtitle,
  description,
  linkText = "Learn More",
  linkHref,
  isReversed = false,
}: LinkCardProps) {
  return (
    <div className="w-full max-w-300 mx-auto px-4 py-12 md:py-20">
      <div
        className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-16 ${
          swap ? "lg:flex-row-reverse" : ""
        }`}
      >
        {/* Image Section */}
        <div className="w-full lg:w-1/2">
          <div className="relative w-full overflow-hidden rounded-4xl">
            <img
              src={imageSrc}
              alt={imageAlt}
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="w-full lg:w-1/2 flex flex-col items-start text-left">
          <h2 className="text-3xl lg:text-4xl font-bold text-blue-950 mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-lg text-gray-500 mb-6 font-medium leading-relaxed">
              {subtitle}
            </p>
          )}
          <div className="prose prose-lg text-gray-600 mb-8 leading-relaxed">
            <p>{description}</p>
          </div>
          <Link
            href={linkHref}
            className="inline-flex items-center justify-center px-8 py-3 text-base font-bold text-blue-950 bg-white border-2 border-teal-300 rounded-full hover:bg-teal-50 transition-colors duration-200"
          >
            {linkText}
          </Link>
        </div>
      </div>
    </div>
  );
}
