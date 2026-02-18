import Link from "next/link";
import React from "react";

export default function BrandComparisonSection({
    otherBrandLinks,
    symptom,
}: {
    otherBrandLinks: { title: string; link: string }[];
    symptom: string;
}) {
    
  return (
    <div className="p-4 my-4 bg-gray-100 rounded-lg">
      <h2 className="text-3xl font-bold mb-4">
        These Brands May Also Experience {symptom} Symptoms
      </h2>
      <div className="flex flex-wrap gap-2">
        {otherBrandLinks.map((link, i) => (
          <Link
            key={i}
            href={link.link}
            className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm hover:bg-gray-300"
          >
            {link.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
