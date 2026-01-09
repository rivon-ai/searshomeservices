import React from "react";
import Link from "next/link";
import Image from "next/image";
import type { Article } from "./HeroGrid";

interface ArticleListItemProps {
  article: Article;
}

export default function ArticleListItem({ article }: ArticleListItemProps) {
  return (
    <div className="flex flex-col md:flex-row gap-6 py-2">
      {/* Image Thumbnail */}
      <Link
        href={`/blog/${article.slug}`}
        className="relative w-full md:w-[280px] aspect-[16/10] shrink-0 rounded-lg overflow-hidden group"
      >
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </Link>

      {/* Content Area */}
      <div className="flex flex-col gap-2">
        <Link href={`/blog/${article.slug}`} className="group">
          <h2 className="text-xl font-bold text-[#0f2d52] leading-snug group-hover:text-blue-600 transition-colors">
            {article.title}
          </h2>
        </Link>

        <div className="flex items-center text-gray-500 text-xs gap-2">
          <span>{article.readTime}</span>
          <span>•</span>
          <span>{article.date}</span>
        </div>

        <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
          {article.excerpt}
        </p>

        <div className="mt-1">
          <Link
            href="#"
            className="text-sm text-[#386df2] hover:underline font-medium"
          >
            {article.category}
          </Link>
        </div>
      </div>
    </div>
  );
}
