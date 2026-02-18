import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import blogSectionsData from "@/data/blog-sections.json";

// Define types based on the JSON structure
interface Tag {
  label: string;
  url: string;
}

interface BlogPost {
  isFeatured: boolean;
  title: string;
  url: string;
  image: string;
  readTime: string;
  date: string;
  description: string;
  tags: Tag[];
}

interface BlogSection {
  title: string;
  link: string;
  posts: BlogPost[];
}

export default function Blogs() {
  const sections: BlogSection[] = blogSectionsData;

  return (
    <div className="bg-white pb-10">
      {sections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="px-4 py-10 xl:px-8">
          <div className="mx-auto max-w-7xl">
            {/* Section Header */}
            <div className="flex flex-row items-end justify-between xl:items-center mb-6">
              <div>
                <h3 className="my-0 text-3xl font-semibold capitalize text-blue-900">
                  {section.title}
                </h3>
              </div>
              <div className="shrink-0 px-3 py-2">
                <Link
                  href={section.link}
                  className="flex text-md font-medium leading-6 text-blue-600 hover:underline hover:underline-offset-4"
                >
                  <span className="mr-2 cursor-pointer">See All</span>
                  <ArrowRight className="h-6 w-6" />
                </Link>
              </div>
            </div>

            {/* Grid Layout */}
            <section className="flex flex-col justify-evenly overflow-visible mt-6">
              <div className="grid grid-cols-1 gap-10 xl:grid-cols-2">
                {/* Featured Post (Left Column) */}
                {section.posts
                  .filter((p) => p.isFeatured)
                  .map((post, idx) => (
                    <div key={idx} className="mb-6 xl:col-span-1 xl:row-span-3">
                      <article className="rounded-none">
                        <div className="flex flex-col justify-between">
                          <Link
                            href={post.url}
                            className="text-md font-medium leading-6 text-blue-900 hover:underline hover:underline-offset-4"
                          >
                            <div className="relative mb-6 h-[280px] w-full xl:h-[385px]">
                              <Image
                                src={post.image}
                                alt={post.title}
                                fill
                                className="rounded-lg object-cover"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              />
                            </div>
                          </Link>
                          <div>
                            <div className="mb-1">
                              <Link
                                href={post.url}
                                className="hover:no-underline focus:no-underline"
                              >
                                <h2 className="text-3xl font-semibold leading-8 text-blue-900 xl:text-4xl">
                                  {post.title}
                                </h2>
                              </Link>
                            </div>
                            <p className="mt-4 w-full items-center text-xs font-medium leading-6 text-gray-500 md:mt-0">
                              <span className="wrap-break-word">
                                {post.readTime}
                              </span>
                              <span className="ml-2 wrap-break-word">
                                {post.date}
                              </span>
                            </p>
                            <div className="mt-2 text-md font-normal leading-6 text-gray-600 line-clamp-3">
                              <p>{post.description}</p>
                            </div>
                            <p className="mt-2 w-full items-center text-xs font-medium leading-4 text-gray-500">
                              {post.tags.map((tag, tIdx) => (
                                <span key={tIdx} className="mr-2">
                                  {tag.url !== "N/A" ? (
                                    <Link
                                      href={tag.url}
                                      className="wrap-break-word text-blue-600 text-xs hover:underline"
                                    >
                                      {tag.label}
                                    </Link>
                                  ) : (
                                    <span className="wrap-break-word text-blue-600 text-xs">
                                      {tag.label}
                                    </span>
                                  )}
                                </span>
                              ))}
                            </p>
                          </div>
                        </div>
                      </article>
                    </div>
                  ))}

                {/* List Posts (Right Column) */}
                <div className="xl:col-span-1 xl:col-start-2">
                  {section.posts
                    .filter((p) => !p.isFeatured)
                    .map((post, idx) => (
                      <div
                        key={idx}
                        className="mb-6 border-b border-gray-200 py-6 last:border-0 last:mb-0 xl:pt-0"
                      >
                        <article className="rounded-none">
                          <div className="flex flex-col gap-4 xl:flex-row xl:gap-6">
                            <div className="shrink-0">
                              <Link
                                href={post.url}
                                className="text-md font-medium leading-6 text-blue-900 hover:underline hover:underline-offset-4"
                              >
                                <div className="relative h-[180px] w-full xl:h-[140px] xl:w-[180px]">
                                  <Image
                                    src={post.image}
                                    alt={post.title}
                                    fill
                                    className="rounded-lg object-cover"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                  />
                                </div>
                              </Link>
                            </div>
                            <div className="flex flex-col justify-between">
                              <div>
                                <div className="mb-1">
                                  <Link
                                    href={post.url}
                                    className="hover:no-underline focus:no-underline"
                                  >
                                    <h4 className="text-xl font-semibold leading-8 text-blue-900">
                                      {post.title}
                                    </h4>
                                  </Link>
                                </div>
                                <p className="mt-4 w-full items-center text-xs font-medium leading-6 text-gray-500 md:mt-0">
                                  <span className="wrap-break-word">
                                    {post.readTime}
                                  </span>
                                  <span className="ml-2 wrap-break-word">
                                    {post.date}
                                  </span>
                                </p>
                                <div className="mt-2 text-md font-normal leading-6 text-gray-600 line-clamp-2">
                                  <p>{post.description}</p>
                                </div>
                                <p className="mt-2 w-full items-center text-xs font-medium leading-4 text-gray-500">
                                  {post.tags.map((tag, tIdx) => (
                                    <span key={tIdx} className="mr-2">
                                      {tag.url !== "N/A" ? (
                                        <Link
                                          href={tag.url}
                                          className="break-all text-blue-600 text-xs hover:underline"
                                        >
                                          {tag.label}
                                        </Link>
                                      ) : (
                                        <span className="break-all text-blue-600 text-xs">
                                          {tag.label}
                                        </span>
                                      )}
                                    </span>
                                  ))}
                                </p>
                              </div>
                            </div>
                          </div>
                        </article>
                      </div>
                    ))}
                </div>
              </div>
            </section>
          </div>
        </div>
      ))}
    </div>
  );
}
