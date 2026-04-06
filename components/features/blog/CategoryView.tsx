import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import HeroGrid from "@/components/features/blog-repair/HeroGrid";
import ArticleListItem from "@/components/features/blog-repair/ArticleListItem";
import StickySidebar from "@/components/features/blog-repair/StickySidebar";
import BlogPagination from "@/components/features/blog-repair/BlogPagination";
import BlogBreadcrumbs, { BreadcrumbItem } from "@/components/features/blog/BlogBreadcrumbs";
import { blogService } from "@/services/blogService";

interface CategoryViewProps {
  category: string;
  applianceFilter?: string;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function CategoryView({ category, applianceFilter, searchParams }: CategoryViewProps) {
  // Await Next.js 15 searchParams Promise
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const pageParam = resolvedSearchParams.page;
  const page = typeof pageParam === 'string' ? parseInt(pageParam, 10) : 1;

  // Fetch paginated posts
  const { articles, pagination } = await blogService.getPosts({
    category,
    appliance: applianceFilter,
    page,
    limit: 10,
  });

  const heroArticles = articles.slice(0, 4);
  const feedArticles = articles.slice(4);

  // Format the title dynamically
  const displayCategory = category.charAt(0).toUpperCase() + category.slice(1);
  const title = applianceFilter 
    ? `${displayCategory} - ${applianceFilter.charAt(0).toUpperCase() + applianceFilter.slice(1)} Resources`
    : `${displayCategory} Guides & Tips`;

  // Construct baseUrl for pagination
  const baseUrl = applianceFilter
    ? `/blog/${category}/${applianceFilter}-resources`
    : `/blog/${category}`;

  // Build breadcrumb items
  const breadcrumbItems: BreadcrumbItem[] = [
    { 
      label: category, 
      href: applianceFilter ? `/blog/${category}` : undefined 
    }
  ];

  if (applianceFilter) {
    breadcrumbItems.push({ label: applianceFilter });
  }

  return (
    <>
      <div className="min-h-screen font-sans bg-gray-50">
        {/* Container */}
        <div className="mx-auto lg:max-w-[80%] py-12">
          {/* Header Section */}
          <header className="mb-8">
            <BlogBreadcrumbs items={breadcrumbItems} />

            <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">
              {title}
            </h2>
            <p className="mt-2 text-lg text-gray-600 max-w-2xl">
              Expert advice to help you troubleshoot, repair, and maintain your
              home appliances.
            </p>
          </header>

          {/* Asymmetrical Hero Grid */}
          <div className="">
            <HeroGrid articles={heroArticles} />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[80%]">
        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-8 lg:gap-12 relative">
          {/* Left Column: Article Feed */}
          <main className="flex flex-col gap-8">
            {feedArticles.length > 0 ? (
              <div className="space-y-8">
                {feedArticles.map((article) => (
                  <ArticleListItem key={article.id} article={article} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                No articles available for this section yet.
              </div>
            )}

            {/* Pagination Component */}
            <BlogPagination 
              currentPage={pagination?.page || 1} 
              totalPages={pagination?.totalPages || 1} 
              baseUrl={baseUrl} 
            />
          </main>

          {/* Right Column: Sticky Sidebar */}
          <div className="relative">
            <StickySidebar />
          </div>
        </div>
      </div>
    </>
  );
}
