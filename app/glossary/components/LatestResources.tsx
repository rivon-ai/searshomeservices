"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

interface BlogPost {
  title: string;
  date: string;
  excerpt: string;
  imageUrl: string;
  link: string;
}

interface LatestResourcesProps {
  posts: BlogPost[];
}

export const LatestResources: React.FC<LatestResourcesProps> = ({ posts }) => {
  return (
    <section className="mt-20 border-t border-gray-200 pt-16">
      <h2 className="text-3xl font-bold text-blue-950 mb-8">
        Latest Repair Resources
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {posts.map((post, index) => (
          <article
            key={index}
            className="group flex flex-col md:flex-row gap-6 bg-white rounded-xl overflow-hidden hover:shadow-lg transition-shadow border border-gray-100"
          >
            {/* Image Container */}
            <div className="relative w-full md:w-2/5 h-48 md:h-auto shrink-0 overflow-hidden">
              <Image
                src={post.imageUrl}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
            </div>

            {/* Content Container */}
            <div className="flex flex-col justify-center p-6 md:p-6 md:pl-0 w-full">
              <span className="text-sm text-blue-600 font-semibold mb-2">
                {post.date}
              </span>
              <h3 className="text-xl font-bold text-blue-900 mb-3 leading-tight group-hover:text-blue-700 transition-colors">
                <Link href={post.link}>{post.title}</Link>
              </h3>
              <p className="text-gray-500 text-sm line-clamp-3 mb-4">
                {post.excerpt}
              </p>
              <Link
                href={post.link}
                className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-800"
              >
                Read Article
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
