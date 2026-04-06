import React from "react";
import Link from "next/link";
import Image from "next/image";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { getCategoryUrl } from "@/utils/blogUtils";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface Article {
  id: string;
  title: string;
  image: string;
  category: string;
  parentCategory: string;
  date: string;
  readTime: string;
  excerpt: string;
  slug: string;
}

interface HeroGridProps {
  articles: Article[];
}

export default function HeroGrid({ articles }: HeroGridProps) {
  if (!articles || articles.length === 0) return null;

  const featured = articles[0];
  const topArticles = articles.slice(1, 4);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
      {/* Featured Article (Left Column) */}
      <div className="flex flex-col gap-4">
        <Link
          href={`/blog/${featured.slug}`}
          className="group block w-full aspect-16/10 relative rounded-lg overflow-hidden"
        >
          <div className="relative w-full aspect-16/10 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
            {featured.image ? (
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                unoptimized
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />
            ) : (
              <span className="text-gray-400">Image not available</span>
            )}
          </div>
        </Link>

        <div className="flex flex-col gap-2">
          <Link href={`/blog/${featured.slug}`} className="group">
            <h2 className="text-2xl font-bold text-[#0f2d52] leading-tight group-hover:text-blue-600 transition-colors">
              {featured.title}
            </h2>
          </Link>

          <div className="flex items-center text-gray-500 text-sm gap-2">
            <span>{featured.readTime}</span>
            <span>•</span>
            <span>{featured.date}</span>
          </div>

          <p className="text-gray-600 line-clamp-2">{featured.excerpt}</p>

          <div className="flex gap-3 text-sm font-medium mt-1">
            <Link 
              href={getCategoryUrl(featured.parentCategory, featured.category)} 
              className="text-[#386df2] hover:underline"
            >
              {featured.category}
            </Link>
          </div>
        </div>
      </div>

      {/* Top Articles Stack (Right Column) */}
      <div className="flex flex-col gap-8">
        {topArticles.map((article) => (
          <div key={article.id} className="flex gap-8 items-start border-b pb-4">
            <Link
              href={`/blog/${article.slug}`}
              className="relative w-[180px] aspect-16/10 shrink-0 rounded-lg overflow-hidden group"
            >
              <div className="relative w-full h-full bg-gray-100 flex items-center justify-center">
                {article.image ? (
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <span className="text-gray-400 text-xs">No image</span>
                )}
              </div>
            </Link>

            <div className="flex flex-col gap-1">
              <Link href={`/blog/${article.slug}`}>
                <h2 className="text-lg font-bold text-[#0f2d52] leading-snug hover:text-blue-600 transition-colors">
                  {article.title}
                </h2>
              </Link>

              <div className="flex items-center text-gray-500 text-xs gap-2 mb-1">
                <span>{article.readTime}</span>
                <span>•</span>
                <span>{article.date}</span>
              </div>

              <p className="text-sm text-gray-600 line-clamp-2 mb-1">
                {/* Explicitly showing excerpt if space allows, looks like the reference does show some text for side items? 
                     Actually reference image 0 right side items DONT show excerpts, just Title + Meta + Category.
                     I will verify Image 0 again. Image 0 shows: Title, Meta, Excerpt/Desc (yes, "Several factors can impact..."), and Category Link. */}
                {article.excerpt}
              </p>

              <Link
                href={getCategoryUrl(article.parentCategory, article.category)}
                className="text-sm text-[#386df2] hover:underline font-medium"
              >
                {article.category}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
