import React from "react";
import Image from "next/image";

interface BlogPost {
  title?: string;
  description?: string;
  link?: string;
  image?: string;
  date?: string;
  readTime?: string;
  category?: string;
  categoryLink?: string;
}

interface RepairResource {
  title: string;
  description?: string;
  link: string;
  imageUrl?: string;
  imageAlt?: string;
  readTime?: string;
  date?: string;
  category?: string;
  categoryLink?: string;
  secondaryCategory?: string;
  secondaryCategoryLink?: string;
}

interface RepairResourcesProps {
  blogPosts?: BlogPost[];
  appliance?: string;
  title?: string;
}

export function RepairResources({
  blogPosts = [],
  appliance,
  title = "Repair Resources",
}: RepairResourcesProps) {
  // Transform scraped blog posts to match RepairResource interface
  const resourcesToDisplay: RepairResource[] = blogPosts.map((post) => ({
    title: post.title || "Appliance Repair Tip",
    description:
      post.description ||
      `Learn more about ${appliance || "appliance"} repair.`,
    link: post.link || "#",
    imageUrl: post.image,
    imageAlt: post.title || "Blog post image",
    readTime: post.readTime || "5 min read",
    date: post.date || "Recently Updated",
    category: post.category || appliance || "Repair",
    categoryLink: post.categoryLink || "#",
  }));

  // If no blog posts provided, show a message or return null
  if (resourcesToDisplay.length === 0) {
    return null;
  }

  return (
    <div className="mb-6 md:mb-10">
      <hr className="mb-6 md:mb-10" />
      <div className="">
        <h2 className="text-[#003d82] text-4xl mb-4 px-4 lg:px-0 lg:mb-8">
          {title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6">
          {resourcesToDisplay.map((resource, index) => (
            <div key={index} className="flex flex-col h-full py-4 px-4 md:px-0">
              {/* Image */}
              <div className="mb-6 relative w-full h-53">
                <a
                  href={resource.link}
                  className="hover:text-inherit focus:text-inherit hover:no-underline focus:no-underline"
                >
                  <div className="relative w-full h-full">
                    {resource.imageUrl ? (
                      <Image
                        alt={resource.imageAlt || "Resource image"}
                        loading="lazy"
                        decoding="async"
                        className="object-cover rounded-2xl absolute h-full w-full"
                        src={resource.imageUrl}
                        width={500}
                        height={300}
                        unoptimized={true}
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 rounded-2xl flex items-center justify-center text-gray-400">
                        No Image
                      </div>
                    )}
                  </div>
                </a>
              </div>

              {/* Content */}
              <div className="flex flex-col md:justify-between md:max-h-52 md:h-full">
                <div>
                  {/* Title */}
                  <div className="mb-1">
                    <a
                      href={resource.link}
                      className="hover:no-underline focus:no-underline"
                    >
                      <p className="text-xl leading-8 text-[#003d82] font-semibold">
                        {resource.title}
                      </p>
                    </a>
                  </div>

                  {/* Meta data - Read time and Date */}
                  {(resource.readTime || resource.date) && (
                    <p className="w-full items-center mt-4 md:mt-0 leading-8 text-xs text-gray-500">
                      {resource.readTime && (
                        <span className="wrap-break-word">
                          {resource.readTime}
                        </span>
                      )}
                      {resource.date && (
                        <span className="ml-2 before:content-['•'] before:mr-2 wrap-break-word">
                          {resource.date}
                        </span>
                      )}
                    </p>
                  )}

                  {/* Description */}
                  {resource.description && (
                    <div className="text-[#1a1a1a] leading-6 line-clamp-3 mt-0">
                      <p className="text-[#1a1a1a] text-md leading-6 font-normal">
                        {resource.description}
                      </p>
                    </div>
                  )}

                  {/* Categories */}
                  {resource.category && (
                    <p className="font-medium text-xs w-full items-center mt-2 leading-4 text-gray-500">
                      <span className="wrap-break-word">
                        <a
                          className="break-all text-[#0066cc] text-xs"
                          href={resource.categoryLink || "#"}
                        >
                          {resource.category}
                        </a>
                      </span>
                      {resource.secondaryCategory && (
                        <span className="ml-2 before:content-['•'] before:mr-2 wrap-break-word">
                          <a
                            className="break-all text-[#0066cc] text-xs"
                            href={resource.secondaryCategoryLink || "#"}
                          >
                            {resource.secondaryCategory}
                          </a>
                        </span>
                      )}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
