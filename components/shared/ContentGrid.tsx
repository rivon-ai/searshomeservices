import React from "react";
import Link from "next/link";

export interface ContentItem {
  title: string;
  description: string;
  href: string;
}

export interface ContentGridProps {
  sectionTitle: string;
  items: ContentItem[];
}

const ContentGrid: React.FC<ContentGridProps> = ({ sectionTitle, items }) => {
  return (
    <section className="w-full">
      <h2 className="text-blue-950 font-bold text-2xl mb-8 lg:mb-10 text-left">
        {sectionTitle}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
        {items.map((item, index) => (
          <div key={index} className="flex flex-col">
            <Link
              href={item.href}
              className="text-blue-950 font-bold text-lg lg:text-xl mb-3 hover:underline block"
            >
              {item.title}
            </Link>
            <p className="text-gray-700 leading-relaxed text-base">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ContentGrid;
