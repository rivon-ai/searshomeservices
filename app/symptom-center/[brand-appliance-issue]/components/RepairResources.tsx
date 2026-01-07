import React from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

interface blogPosts {
  id: number;
  title: string;
  description: string;
  readTime: string;
  date: string;
  imageUrl: string | StaticImageData;
  imageAlt: string;
  productLink: {
    text: string;
    url: string;
  };
}
interface glossaryData {
  title: string;
  description: string;
  link: string;
}

interface componentProps {
  blogPosts: blogPosts[];
  appliance: string;
  glossaryData: glossaryData[];
}

export default function RepairResources({
  blogPosts,
  appliance,
  glossaryData,
}: componentProps) {
  return (
    <>
      <div className="w-[50%] mx-auto">
        {/* Protect Resources Section */}
        <div className="mb-20">
          {/* Section Title */}
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Repair {appliance} Resources
          </h2>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {blogPosts.map((article, index) => (
              <div
                key={index}
                className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-sm transition-shadow"
              >
                {/* Image */}
                <div className="relative w-full h-48">
                  {article.imageUrl ? (
                    <Image
                      src={article.imageUrl}
                      alt={article.title}
                      fill
                      className="object-cover"
                    />
                  ) : null}
                </div>
                {/* Content */}
                <div className="p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-3 leading-tight">
                    {article.title}
                  </h2>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                    <span>{article.readTime}</span>
                    <span>•</span>
                    <span>{article.date}</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {article.description}
                  </p>
                  <Link
                    href={`/blog/repair/${appliance}`}
                    className=" text-xs font-medium text-blue-600 "
                  >
                    {appliance}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {glossaryData.length > 0 ? (
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
                  <div className=" leading-6 line-clamp-3 mb-8 lg:mb-4">
                    <p className=" text-md leading-6 font-normal">
                      {term.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
}
