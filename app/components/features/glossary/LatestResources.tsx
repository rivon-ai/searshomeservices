"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
      <h2 className="text-3xl font-extrabold text-[#002855] mb-10 tracking-tight">
        Latest Repair Resources
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {posts.map((post, index) => (
          <Card
            key={index}
            className="group overflow-hidden border-gray-100 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-900/5 transition-all rounded-2xl"
          >
            <CardContent className="p-0 flex flex-col md:flex-row h-full">
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
              <div className="flex flex-col justify-center p-6 md:p-8 w-full">
                <span className="text-xs text-blue-600 font-bold uppercase tracking-widest mb-3">
                  {post.date}
                </span>
                <h3 className="text-xl font-bold text-[#002855] mb-4 leading-tight group-hover:text-blue-700 transition-colors">
                  <Link href={post.link}>{post.title}</Link>
                </h3>
                <p className="text-gray-500 text-sm line-clamp-2 mb-6 leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="mt-auto">
                  <Button asChild variant="link" className="p-0 h-auto text-blue-600 hover:text-blue-800 font-bold group/btn">
                    <Link href={post.link}>
                      Read Article
                      <span className="ml-1 inline-block transition-transform group-hover/btn:translate-x-1">→</span>
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
