import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import HeroGrid from "./components/HeroGrid";
import ArticleListItem from "./components/ArticleListItem";
import StickySidebar from "./components/StickySidebar";
import BlogPagination from "./components/BlogPagination";
import type { Article } from "./components/HeroGrid";

// Dummy Data
const dummyArticles: Article[] = [
  {
    id: "1",
    title: "How to Troubleshoot a Refrigerator That Won't Cool",
    // Kitchen/Fridge
    image:
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2070&auto=format&fit=crop",
    category: "Refrigerator",
    date: "Oct 12, 2023",
    readTime: "8 min read",
    slug: "troubleshoot-refrigerator",
    excerpt:
      "Is your fridge feeling warm? Before you call a pro, try these simple troubleshooting steps to identify common cooling issues and potentially fix them yourself.",
  },
  {
    id: "2",
    title: "5 Signs Your Washing Machine Needs Repair Immediately",
    // Laundry
    image:
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=2070&auto=format&fit=crop",
    category: "Washer",
    date: "Oct 10, 2023",
    readTime: "5 min read",
    slug: "washer-signs-repair",
    excerpt:
      "Ignoring strange noises or leaks can lead to costly water damage. Learn the critical signs that indicate your washing machine needs urgent attention.",
  },
  {
    id: "3",
    title: "The Ultimate Guide to Oven Maintenance",
    // Oven
    image:
      "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?q=80&w=2070&auto=format&fit=crop",
    category: "Oven",
    date: "Oct 08, 2023",
    readTime: "6 min read",
    slug: "oven-maintenance-guide",
    excerpt:
      "Keep your oven baking evenly and efficiently with these essential maintenance tips that every homeowner should know.",
  },
  {
    id: "4",
    title: "Why Is My Dishwasher Not Draining?",
    // Modern Kitchen
    image:
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=2070&auto=format&fit=crop",
    category: "Dishwasher",
    date: "Oct 05, 2023",
    readTime: "4 min read",
    slug: "dishwasher-not-draining",
    excerpt:
      "A standing pool of water in your dishwasher is never a good sign. We explain the common causes of drainage issues and how to clear clogs.",
  },
  {
    id: "5",
    title: "Dryer Taking Too Long? It Might Be a Vent Issue",
    // Laundry Room
    image:
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=2070&auto=format&fit=crop",
    category: "Dryer",
    date: "Oct 01, 2023",
    readTime: "5 min read",
    slug: "dryer-vent-issues",
    excerpt:
      "If your clothes are still damp after a full cycle, the problem might not be the dryer itself but a clogged vent. Here's how to check and clean it safely.",
  },
  {
    id: "6",
    title: "Top 10 Appliance Brands for Reliability in 2024",
    // Kitchen Interior
    image:
      "https://images.unsplash.com/photo-1504148455328-c376907d081c?q=80&w=2070&auto=format&fit=crop",
    category: "Guides",
    date: "Sep 28, 2023",
    readTime: "10 min read",
    slug: "reliable-appliance-brands",
    excerpt:
      "Planning a kitchen upgrade? We've analyzed repair data and customer reviews to bring you the most reliable appliance brands on the market today.",
  },
  {
    id: "7",
    title: "DIY vs Professional Repair: When to Make the Call",
    // Repair Tools
    image:
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2070&auto=format&fit=crop",
    category: "General",
    date: "Sep 25, 2023",
    readTime: "7 min read",
    slug: "diy-vs-pro-repair",
    excerpt:
      "Save money safely. We break down which appliance repairs are safe for DIYers and which ones require the expertise and tools of a professional technician.",
  },
  {
    id: "8",
    title: "How to Clean Your HVAC System for Better Air Quality",
    // HVAC / Air
    image:
      "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?q=80&w=2070&auto=format&fit=crop",
    category: "HVAC",
    date: "Sep 20, 2023",
    readTime: "6 min read",
    slug: "hvac-cleaning-guide",
    excerpt:
      "Improve your home's air quality and system efficiency with regular HVAC cleaning. Discover what filters to use and how often to replace them.",
  },
  {
    id: "9",
    title: "Extending the Lifespan of Your Garage Door Opener",
    // Garage
    image:
      "https://images.unsplash.com/photo-1504148455328-c376907d081c?q=80&w=2070&auto=format&fit=crop",
    category: "Garage",
    date: "Sep 15, 2023",
    readTime: "5 min read",
    slug: "garage-door-lifespan",
    excerpt:
      "Your garage door opener is a workhorse. Learn the simple lubrication and inspection steps that can add years to its operational life.",
  },
  {
    id: "10",
    title: "Strange Noises? Decoding Your Furnace's Sounds",
    // Furnace / Fire
    image:
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=2070&auto=format&fit=crop",
    category: "Heating",
    date: "Sep 10, 2023",
    readTime: "4 min read",
    slug: "furnace-noises-decoded",
    excerpt:
      "Bangs, clanks, and whistles—your furnace is trying to tell you something. We explicitly decode common furnace sounds and what they mean for your system.",
  },
];

export default function BlogRepairPage() {
  const heroArticles = dummyArticles.slice(0, 4);
  const feedArticles = dummyArticles.slice(4);

  return (
    <>
      <div className="min-h-screen font-sans bg-gray-50">
        {/* Container */}
        <div className="mx-auto lg:max-w-[80%] py-8">
          {/* Header Section */}
          <header className="mb-8">
            {/* Breadcrumbs */}
            <nav
              className="flex items-center text-sm text-gray-500 mb-4"
              aria-label="Breadcrumb"
            >
              <ol className="flex items-center space-x-2">
                <li>
                  <Link
                    href="/"
                    className="hover:text-blue-600 flex items-center transition-colors"
                  >
                    <Home size={16} />
                  </Link>
                </li>
                <li>
                  <ChevronRight size={14} className="text-gray-400" />
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="hover:text-blue-600 transition-colors"
                  >
                    Resource Center
                  </Link>
                </li>
                <li>
                  <ChevronRight size={14} className="text-gray-400" />
                </li>
                <li className="text-gray-900 font-medium cursor-default">
                  Repair
                </li>
              </ol>
            </nav>

            <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">
              Repair Guides & Tips
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
            <div className="space-y-8">
              {feedArticles.map((article) => (
                <ArticleListItem key={article.id} article={article} />
              ))}
            </div>

            <BlogPagination />
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
