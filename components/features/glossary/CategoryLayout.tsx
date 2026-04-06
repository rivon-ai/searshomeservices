import React from "react";
import Link from "next/link";
import { TermObject } from "@/utils/data/glossaryData";
import CustomBreadcrumb from "@/components/ui/CustomBreadcrumb";
import { Card, CardContent } from "@/components/ui/card";

interface CategoryLayoutProps {
  letter: string;
  terms: TermObject[];
}

export const CategoryLayout: React.FC<CategoryLayoutProps> = ({
  letter,
  terms,
}) => {
  return (
    <div className="bg-white min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 pt-6 lg:pt-10">
        {/* Custom Navigation Breadcrumbs */}
        <div className="mb-8">
          <CustomBreadcrumb
            items={[
              { label: "Glossary", href: "/glossary" },
              { label: `Letter ${letter}` }
            ]}
          />
        </div>

        <div className="mt-8">
          <div className="flex items-center gap-4 mb-10 border-b border-gray-100 pb-6">
            <div className="w-16 h-16 rounded-2xl bg-[#002855] text-white flex items-center justify-center text-3xl font-bold shadow-lg">
              {letter}
            </div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-extrabold text-[#002855]">
                Glossary Terms
              </h1>
              <p className="text-gray-500 font-medium">
                Viewing all terms starting with the letter "{letter}"
              </p>
            </div>
          </div>

          {terms.length === 0 ? (
            <div className="py-20 text-center bg-gray-50 rounded-3xl border border-dashed border-gray-200">
              <p className="text-gray-400 text-lg font-medium">
                No terms currently indexed for this category.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {terms.map((term) => (
                <Link key={term.slug} href={`/glossary/${term.slug}`} className="group">
                  <Card className="h-full border-gray-100 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-900/5 transition-all rounded-2xl overflow-hidden">
                    <CardContent className="p-5">
                      <span className="text-lg font-bold text-gray-700 group-hover:text-[#002855] leading-tight block">
                        {term.metaData?.termName || term.term || term.title}
                      </span>
                      <p className="text-sm text-gray-400 mt-2 line-clamp-2 group-hover:text-gray-500">
                        {term.description || term.definition}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
