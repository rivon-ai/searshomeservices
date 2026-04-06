import React from "react";
import type { StaticImageData } from "next/image";
import Link from "next/link";

interface BlogPost {
  id?: number;
  title?: string;
  description?: string;
  link?: string;
  image?: string;
  imageUrl?: string | StaticImageData;
  imageAlt?: string;
  date?: string;
  readTime?: string;
  category?: string;
  categoryLink?: string;
  productLink?: {
    text: string;
    url: string;
  };
}

interface GlossaryTerm {
  title: string;
  description: string;
  link: string;
}

interface RepairResourcesProps {
  blogPosts?: BlogPost[];
  glossaryData?: GlossaryTerm[];
  appliance?: string;
  title?: string;
}

export function RepairResources({
  blogPosts = [],
  glossaryData = [],
  appliance,
  title,
}: Readonly<RepairResourcesProps>) {
  // If no blog posts provided, return null
  if (blogPosts.length === 0) {
    return null;
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:max-w-[70%] lg:max-w-[60%]">
      <section className="mb-20">
        <h3 className="text-2xl font-bold text-[#002855] mb-6">
          {title || `Repair ${appliance || ""} Resources`}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {blogPosts.map((article, index) => (
            <Link 
              key={article.id || index} 
              href={article.link || ""} 
              className="group flex flex-col h-full bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-all"
            >
              {(article.imageUrl || article.image) && (
                <div className="bg-gray-100 aspect-video overflow-hidden">
                  <img 
                    src={typeof (article.imageUrl || article.image) === 'string' ? (article.imageUrl || article.image) as string : ''} 
                    alt={article.imageAlt || article.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                </div>
              )}
              <div className="p-5 flex flex-col grow">
                <div className="flex items-center gap-2 text-xs font-bold text-blue-800 mb-2 uppercase tracking-wider">
                  {article.category && <span>{article.category}</span>}
                </div>
                <h4 className="font-bold text-gray-700 mb-3 group-hover:text-blue-900 leading-snug">
                  {article.title}
                </h4>
                <div className="mt-auto flex items-center gap-2 text-xs font-medium text-gray-500">
                  {article.date && <span>{article.date}</span>}
                  {article.date && article.readTime && <span>&middot;</span>}
                  {article.readTime && <span>{article.readTime}</span>}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Glossary Terms Section */}
      {glossaryData && glossaryData.length > 0 && (
        <div className="mx-4 lg:max-w-149 lg:mx-auto my-12 lg:mt-0 lg:mb-10">
          <h2 className="text-2xl font-semibold">Glossary Terms</h2>
          <div className="mt-9">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
              {glossaryData.map((term, index) => (
                <div key={index} className="flex flex-col h-full">
                  <div className="text-xl font-semibold leading-8 mt-0 lg:mt-4 mb-3">
                    <Link
                      href={term.link}
                      className="focus:no-underline"
                      target="_self"
                    >
                      <span className="text-xl font-medium leading-8 line-clamp-2">
                        {term.title}
                      </span>
                    </Link>
                  </div>
                  <div className="leading-6 line-clamp-3 mb-8 lg:mb-4">
                    <p className="text-md leading-6 font-normal">
                      {term.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
