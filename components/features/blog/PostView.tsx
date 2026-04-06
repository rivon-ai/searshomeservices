import React from "react";
import { notFound } from "next/navigation";
import TableOfContents from "@/components/features/blog-repair/TableOfContents";
import ScheduleCard from "@/components/features/blog-repair/ScheduleCard";
import ContentSection from "@/components/features/blog-repair/ContentSection";
import BlogBreadcrumbs, { BreadcrumbItem } from "@/components/features/blog/BlogBreadcrumbs";
import { blogService } from "@/services/blogService";
import { getCategoryUrl } from "@/utils/blogUtils";

interface PostViewProps {
  slug: string;
}

export default async function PostView({ slug }: PostViewProps) {
  // Fetch the actual post data
  const post = await blogService.getPostBySlug(slug);

  // Strict 404 fallback: if the post doesn't exist, we must return Next.js notFound
  if (!post) {
    notFound();
  }

  // The backend should return contentSections. Fallback to empty array if missing.
  const sections = post.contentSections || [];

  // Generate headings for the TableOfContents based on the sections
  const headings = sections.map((s) => ({ id: s.id, title: s.title }));

  // Build breadcrumb items
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: post.parentCategory, href: `/blog/${post.parentCategory}` },
    { label: post.category, href: getCategoryUrl(post.parentCategory, post.category) },
    { label: post.title }
  ];

  return (
    <main className="min-h-screen bg-gray-50 py-8 lg:py-12">
      {/* Container */}
      <div className="mx-auto max-w-[80%] px-4 sm:px-6 lg:px-8">
        <BlogBreadcrumbs items={breadcrumbItems} />

        <div className="flex flex-col lg:flex-row lg:gap-8 relative">
          {/* Left Column: Table of Contents (25%) */}
          <div className="lg:w-1/4 lg:shrink-0 order-1">
            <TableOfContents headings={headings} />
          </div>

          {/* Center Column: Content (50%) */}
          <div className="lg:w-1/2 grow order-2 mt-6 lg:mt-0">
            {sections.length > 0 ? (
              <ContentSection 
                sections={sections} 
                heroTitle={post.title}
                heroImage={post.image}
                introText={post.excerpt}
                breadcrumbs={null}
              />
            ) : (
              <div 
                className="prose max-w-none prose-lg text-gray-600"
                dangerouslySetInnerHTML={{ __html: post.excerpt || "No content available." }} 
              />
            )}
          </div>

          {/* Right Column: Schedule Card (25%) */}
          <div className="lg:w-1/4 lg:shrink-0 order-3 mt-8 lg:mt-0">
            {/* Sticky wrapper is inside ScheduleCard */}
            <ScheduleCard />
          </div>
        </div>
      </div>
    </main>
  );
}
