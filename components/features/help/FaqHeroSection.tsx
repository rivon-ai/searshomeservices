import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface FAQItem {
  question: string;
  href: string;
}

interface FaqHeroSectionProps {
  categorySlug?: string;
  slug?: string;
  title?: string;
  updatedDate?: string;
  content?: React.ReactNode;
  additionalFaqs?: FAQItem[];
}

const formatText = (text: string) => {
  return text
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
};

export default function FaqHeroSection({
  categorySlug,
  slug,
  title,
  updatedDate,
  content,
  additionalFaqs = [],
}: FaqHeroSectionProps) {
  const categoryName = categorySlug ? formatText(categorySlug) : "";
  const slugName = slug ? truncateText(formatText(slug), 30) : "";

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 font-sans text-blue-950">
      {/* Breadcrumb */}
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/help">Help Center</BreadcrumbLink>
          </BreadcrumbItem>
          {categorySlug && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href={`/help/${categorySlug}`}>
                  {categoryName}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </>
          )}
          {slug && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-gray-900 font-normal">
                  {slugName}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </>
          )}
        </BreadcrumbList>
      </Breadcrumb>

      {/* Hero Title Box */}
      <div className="bg-[#0046be] text-white p-8 md:p-12 rounded-2xl mb-8 shadow-sm">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
          {title}
        </h1>
        {updatedDate && (
          <div className="text-sm opacity-90">Updated {updatedDate}</div>
        )}
      </div>

      {/* Content Body */}
      <div className="text-lg leading-relaxed text-blue-950 mb-12">
        {content}
      </div>

      {/* Feedback Section */}
      <div className="flex flex-col items-center justify-center mb-20">
        <h3 className="text-xl font-bold mb-6">Was this content helpful?</h3>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-8 py-2.5 rounded-full border border-teal-400 text-blue-950 font-semibold hover:bg-teal-50 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5 text-teal-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V2.75a.75.75 0 01.75-.75 2.25 2.25 0 012.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.287 9.483 4.122 9 5.01 9h.905c.445 0 .72.498.523.898a9.09 9.09 0 01-.27.602m.525 8.25h-.525"
              />
            </svg>
            Yes
          </button>
          <button className="flex items-center gap-2 px-8 py-2.5 rounded-full border border-teal-400 text-blue-950 font-semibold hover:bg-teal-50 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5 text-teal-500 scale-y-[-1]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V2.75a.75.75 0 01.75-.75 2.25 2.25 0 012.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.287 9.483 4.122 9 5.01 9h.905c.445 0 .72.498.523.898a9.09 9.09 0 01-.27.602m.525 8.25h-.525"
              />
            </svg>
            No
          </button>
        </div>
      </div>

      {/* Additional Policy Features FAQ */}
      {additionalFaqs.length > 0 && (
        <div className="border-t border-gray-100 pt-12">
          <h2 className="text-3xl font-bold mb-8">
            Additional Policy Features FAQ
          </h2>
          <div className="flex flex-col">
            {additionalFaqs.map((faq, index) => (
              <Link
                key={index}
                href={faq.href}
                className="group flex justify-between items-center py-6 border-b border-gray-100 hover:no-underline"
              >
                <span className="text-lg font-semibold group-hover:text-blue-700 pr-8">
                  {faq.question}
                </span>
                <span className="text-blue-950 font-bold text-xl group-hover:text-blue-700 decoration-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
