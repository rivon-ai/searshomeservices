import React from "react";
import Link from "next/link";
import { Info, Wrench, CheckCircle2, AlertCircle, Phone } from "lucide-react";
import ScheduleCard from "../blog-repair/ScheduleCard";
import TableOfContents from "../blog-repair/TableOfContents";
import CustomBreadcrumb from "@/components/ui/CustomBreadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export interface GlossarySubSection {
  heading: string;
  level: number;
  body: string;
  bullets?: string[];
}

export interface GlossarySection {
  heading: string;
  anchor: string;
  level: number;
  body: string;
  subSections?: GlossarySubSection[];
}

export interface GlossaryDataPayload {
  slug: string;
  seoTitle?: string;
  seoDescription?: string;
  letter: string;
  term: string;
  title?: string;
  description: string;
  metaData?: {
    termName?: string;
    letter?: string;
    readTime?: string;
    updatedDate?: string;
    author?: string;
    category?: string;
  };
  keyTakeaways?: string[];
  tableOfContents?: { label: string; anchor: string }[];
  sections?: GlossarySection[];
  cta?: {
    title?: string;
    phone?: string;
  };
  relatedArticles?: any[];
  relatedGlossaryTerms?: any[];
  recentSymptoms?: any[];
  details?: string; // fallback
}

interface DefinitionLayoutProps {
  term: GlossaryDataPayload;
}

export const DefinitionLayout: React.FC<DefinitionLayoutProps> = ({ term }) => {
  // Defensive fallback for missing letter in API payload
  const fallbackLetter = term.metaData?.letter || term.letter || (term.metaData?.termName || term.term || term.title || "A").charAt(0).toUpperCase();

  const hasTOC = term.tableOfContents && term.tableOfContents.length > 0;

  return (
    <main className="min-h-screen bg-white pb-8 lg:pb-16 font-normal">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">


        <div className="flex flex-col lg:flex-row lg:gap-8 ">
          {/* Left TOC Column */}
          {hasTOC && (
            <div className="lg:w-1/4 lg:shrink-0 order-1">
              <div className="sticky top-34">
                <TableOfContents
                  headings={term.tableOfContents!.map(toc => ({
                    id: toc.anchor.replace('#', ''),
                    title: toc.label
                  }))}
                />
              </div>
            </div>
          )}


          {/* Main Content Column */}
          <div className={`grow order-2 mt-6 lg:mt-0 min-w-0 ${hasTOC ? "lg:w-1/2" : "lg:w-2/3"}`}>

            {/* Custom Navigation Breadcrumbs */}
            <div className="mb-2 mt-4">
              <CustomBreadcrumb
                items={[
                  { label: "Glossary", href: "/glossary" },
                  { label: `Letter ${fallbackLetter}`, href: `/glossary/${fallbackLetter.toLowerCase()}` },
                  { label: term.metaData?.termName || term.term || term.title || "" }
                ]}
              />
            </div>

            <div className="mb-10 min-w-0">
              <div className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-4 border border-blue-100">
                Official Definition
              </div>
              <h1 className="text-4xl lg:text-5xl font-extrabold text-[#002855] mb-6 tracking-tight">
                {term.metaData?.termName || term.term || term.title}
              </h1>

              {/* Metadata Row */}
              {term.metaData && (
                <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-6 font-medium">
                  {term.metaData.category && (
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs font-bold tracking-wide uppercase">
                      {term.metaData.category}
                    </span>
                  )}
                  {term.metaData.readTime && <span>{term.metaData.readTime}</span>}
                  {term.metaData.readTime && <span>&middot;</span>}
                  {term.metaData.updatedDate && <span>{term.metaData.updatedDate}</span>}
                  {term.metaData.updatedDate && term.metaData.author && <span>&middot;</span>}
                  {term.metaData.author && <span>By {term.metaData.author}</span>}
                </div>
              )}

              <p className="text-xl text-gray-700 leading-relaxed font-medium">
                {term.description}
              </p>
            </div>

            <div className="prose prose-blue max-w-none">

              {/* Key Takeaways */}
              {term.keyTakeaways && term.keyTakeaways.length > 0 && (
                <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 mb-10">
                  <h3 className="text-lg font-bold text-blue-900 mt-0 mb-4">Key Takeaways</h3>
                  <ul className="mb-0 space-y-2 list-disc pl-5 text-blue-900">
                    {term.keyTakeaways.map((takeaway: string, idx: number) => (
                      <li key={`takeaway-${idx}-${takeaway.slice(0, 20)}`} className="leading-relaxed">{takeaway}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Sections Generation */}
              {term.sections && term.sections.length > 0 ? (
                <div className="space-y-12">
                  {term.sections.map((section: GlossarySection, idx: number) => (
                    <div key={section.anchor || `section-${idx}`} id={section.anchor?.replace('#', '')} className="scroll-mt-32">
                      <h2 className="text-3xl font-bold text-[#002855] mb-4">
                        {section.heading}
                      </h2>
                      {section.body && (
                        <p className="text-lg text-gray-800 leading-relaxed mb-6 whitespace-pre-wrap">
                          {section.body}
                        </p>
                      )}

                      {/* Subsections */}
                      {section.subSections && section.subSections.length > 0 && (
                        <div className="space-y-8 mt-8">
                          {section.subSections.map((sub: GlossarySubSection, sIdx: number) => (
                            <div key={sub.heading || `sub-${sIdx}`}>
                              <h3 className="text-xl font-bold text-[#002855] mb-3">
                                {sub.heading}
                              </h3>
                              {sub.body && (
                                <p className="text-lg text-gray-800 leading-relaxed mb-4 whitespace-pre-wrap">
                                  {sub.body}
                                </p>
                              )}
                              {sub.bullets && sub.bullets.length > 0 && (
                                <ul className="list-disc pl-6 space-y-2 text-lg text-gray-800">
                                  {sub.bullets.map((bullet: string, bIdx: number) => (
                                    <li key={`bullet-${bIdx}-${bullet.slice(0, 15)}`} className="leading-relaxed">{bullet}</li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                /* Fallback for old schema without sections */
                <>
                  {term.details && (
                    <Card className="bg-gray-50 border-gray-100 rounded-2xl mb-10 overflow-hidden shadow-sm mt-10">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-xl font-bold text-[#002855] flex items-center gap-2">
                          <Info className="w-5 h-5 text-blue-500" />
                          Deep Dive
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                          {term.details}
                        </p>
                      </CardContent>
                    </Card>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
                    <Card className="border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow rounded-xl overflow-hidden">
                      <CardContent className="p-6">
                        <h4 className="font-bold text-[#002855] mb-3 flex items-center gap-2">
                          <Wrench className="w-4 h-4 text-blue-500" />
                          Common Usage
                        </h4>
                        <p className="text-sm text-gray-600">
                          Typically referenced during routine maintenance and system diagnostics for modern home appliances.
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow rounded-xl overflow-hidden">
                      <CardContent className="p-6">
                        <h4 className="font-bold text-[#002855] mb-3 flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                          Pro Insight
                        </h4>
                        <p className="text-sm text-gray-600">
                          Understanding this term helps in communicating more effectively with repair technicians during service calls.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </>
              )}

              {/* Warning/Note Section */}
              <Card className="mt-12 bg-amber-50 border-amber-100 rounded-xl overflow-hidden">
                <CardContent className="p-6 flex gap-4">
                  <AlertCircle className="w-6 h-6 text-amber-600 shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-amber-900 mb-1 text-sm">Maintenance Advisory</h4>
                    <p className="text-sm text-amber-800 leading-relaxed">
                      Always consult your specific appliance manual before attempting any DIY adjustments related to {term.term.toLowerCase()}.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Schedule Card */}
              <div className="mt-10">
                <ScheduleCard />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className={`lg:shrink-0 order-3 mt-8 lg:mt-0 lg:w-1/4`}>
            <div className="sticky top-60 space-y-6">

              {/* Dynamic CTA / Schedule Card */}
              <Card className="bg-blue-900 text-white shadow-xl border-none rounded-xl overflow-hidden">
                <CardContent className="p-6 py-2">
                  <h3 className="text-lg font-bold mb-3 leading-tight">
                    {term.cta?.title || "Need Help?"}
                  </h3>
                  <p className="text-sm text-blue-100 mb-6 font-medium">
                    Our experts are ready to assist with any appliance issues related to {term.term}.
                  </p>

                  {term.cta?.phone && (
                    <a href={`tel:${term.cta.phone}`} className="flex items-center justify-center gap-2 w-full bg-blue-800 hover:bg-blue-700 text-white font-bold py-4 text-base rounded-xl transition-all mb-3">
                      <Phone className="w-4 h-4" />
                      {term.cta.phone}
                    </a>
                  )}

                  <Button asChild className="w-full bg-white text-blue-900 hover:bg-gray-100 font-bold py-6 text-lg rounded-xl transition-all">
                    <Link href="/schedule">
                      Schedule Service
                    </Link>
                  </Button>
                </CardContent>
              </Card>


            </div>
          </div>
        </div>
      </div>

      {/* Footer Grids - Full Width Area */}
      {(term.relatedGlossaryTerms || term.relatedArticles || term.recentSymptoms) && (
        <div className="border-t border-gray-100 mt-16 pt-16 bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16 pb-16 md:max-w-[50%] lg:max-w-2xl">

            {/* Related Articles */}
            {term.relatedArticles && term.relatedArticles.length > 0 && (
              <section>
                <h3 className="text-2xl font-bold text-[#002855] mb-6">Related Resources</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {term.relatedArticles.map((a, idx) => (
                    <Link key={a.href || `article-${idx}`} href={a.href} className="group flex flex-col h-full bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-all">
                      {a.image && (
                        <div className="bg-gray-100 aspect-video overflow-hidden">
                          <img src={a.image} alt={a.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        </div>
                      )}
                      <div className="p-5 flex flex-col grow">
                        <div className="flex items-center gap-2 text-xs font-bold text-blue-800 mb-2 uppercase tracking-wider">
                          {a.category && <span>{a.category}</span>}
                        </div>
                        <h4 className="font-bold text-gray-700 mb-3 group-hover:text-blue-900 leading-snug">
                          {a.title}
                        </h4>
                        <div className="mt-auto flex items-center gap-2 text-xs font-medium text-gray-500">
                          {a.date && <span>{a.date}</span>}
                          {a.date && a.readTime && <span>&middot;</span>}
                          {a.readTime && <span>{a.readTime}</span>}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Related Glossary Terms */}
            {term.relatedGlossaryTerms && term.relatedGlossaryTerms.length > 0 && (
              <section>
                <h3 className="text-2xl font-bold text-[#002855] mb-6">Related Glossary Terms</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {term.relatedGlossaryTerms.map((t, idx) => (
                    <Link key={t.href || t.title || `related-${idx}`} href={t.href} className="group h-full">
                      <Card className="h-full border-gray-200 hover:border-blue-300 hover:shadow-md transition-all rounded-xl">
                        <CardContent className="p-5 flex flex-col h-full">
                          <h4 className="font-bold text-gray-700 mb-2 group-hover:text-blue-900">{t.title}</h4>
                          <p className="text-sm text-gray-600 line-clamp-3">{t.definition}</p>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Recent Symptoms */}
            {term.recentSymptoms && term.recentSymptoms.length > 0 && (
              <section>
                <h3 className="text-2xl font-bold text-[#002855] mb-6">Recent Troubleshooting Guides</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {term.recentSymptoms.map((s, idx) => (
                    <Link key={s.href || s.title || `symptom-${idx}`} href={s.href} className="group">
                      <Card className="h-full border-gray-200 hover:border-blue-300 hover:shadow-md transition-all rounded-xl bg-white">
                        <CardContent className="p-5">
                          <h4 className="font-bold text-gray-900 mb-2 group-hover:text-blue-900">{s.title}</h4>
                          <p className="text-sm text-gray-600 line-clamp-3">{s.description}</p>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </section>
            )}


          </div>
        </div>
      )}
    </main>
  );
};
