"use client";

import React from "react";
import Link from "next/link";
import { ChevronLeft, Info, Wrench, CheckCircle2, AlertCircle } from "lucide-react";
import ScheduleCard from "../blog-repair/ScheduleCard";
import { TermObject } from "@/utils/data/glossaryData";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface DefinitionLayoutProps {
  term: TermObject;
}

export const DefinitionLayout: React.FC<DefinitionLayoutProps> = ({ term }) => {
  return (
    <main className="min-h-screen bg-white py-8 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Shadcn Breadcrumbs */}
        <Breadcrumb className="mb-8 font-semibold">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/glossary" className="text-blue-600 hover:text-blue-800 transition-colors">
                  Glossary
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={`/glossary/${term.letter.toLowerCase()}`} className="text-blue-600 hover:text-blue-800 transition-colors">
                  Letter {term.letter}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-gray-500">{term.term}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex flex-col lg:flex-row lg:gap-16 relative">
          {/* Main Content Column */}
          <div className="lg:w-2/3">
            <div className="mb-10">
              <div className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-4 border border-blue-100">
                Official Definition
              </div>
              <h1 className="text-4xl lg:text-5xl font-extrabold text-[#002855] mb-6 tracking-tight">
                {term.term}
              </h1>
              <p className="text-xl text-gray-700 leading-relaxed font-medium">
                {term.definition}
              </p>
            </div>

            <div className="prose prose-blue max-w-none">
              {term.details && (
                <Card className="bg-gray-50 border-gray-100 rounded-2xl mb-10 overflow-hidden shadow-sm">
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

              {/* Dynamic Context Sections */}
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

              {/* Warning/Note Section */}
              <Card className="mt-10 bg-amber-50 border-amber-100 rounded-xl overflow-hidden">
                <CardContent className="p-6 flex gap-4">
                  <AlertCircle className="w-6 h-6 text-amber-600 shrink-0" />
                  <div>
                    <h4 className="font-bold text-amber-900 mb-1 text-sm">Maintenance Advisory</h4>
                    <p className="text-xs text-amber-800 leading-relaxed">
                      Always consult your specific appliance manual before attempting any DIY adjustments related to {term.term.toLowerCase()}.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Sidebar: Schedule Card */}
          <div className="lg:w-1/3 mt-12 lg:mt-0">
            <div className="sticky top-28">
              <Card className="mb-6 bg-blue-900 text-white shadow-xl border-none rounded-2xl overflow-hidden">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-2">Need Help?</h3>
                  <p className="text-sm text-blue-100 mb-6">
                    Our experts are ready to assist with any appliance issues related to <strong>{term.term}</strong>.
                  </p>
                  <Button asChild className="w-full bg-white text-blue-900 hover:bg-blue-50 font-bold py-6 text-lg rounded-xl transition-all">
                    <Link href="/schedule">
                      Schedule Now
                    </Link>
                  </Button>
                </CardContent>
              </Card>
              <ScheduleCard />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
