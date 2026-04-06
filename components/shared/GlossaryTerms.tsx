"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const defaultTerms = [
  {
    title: "What is the drum of the washing machine?",
    description:
      "The drum is the core part of the washer that holds your laundry and enables the cleaning process through rotation, agitation, and rinsing.",
  },
  {
    title: "What is a 608 Certification?",
    description:
      "The 608 Certification, mandated by the Environmental Protection Agency (EPA), is required for HVAC technicians to legally handle refrigerants. It ensures technicians understand refrigerant types, environmental impact, and proper handling techniques.",
  },
  {
    title: "What is a Compressor?",
    description:
      "A compressor is a mechanical device that increases the pressure of a gas by reducing its volume, essential in various systems including refrigerators, air conditioners, and HVAC units for cooling and refrigeration processes.",
  },
  {
    title: "What is a Condenser?",
    description:
      "A condenser is a component of HVAC and refrigeration systems, responsible for releasing absorbed heat from the refrigerant into the surrounding air.",
  },
];

interface GlossaryItem {
  title: string;
  description: string;
}

interface GlossaryTermsProps {
  items?: GlossaryItem[];
}

export default function GlossaryTerms({ items }: GlossaryTermsProps) {
  const terms = items || defaultTerms;

  if (terms.length === 0) return null;

  return (
    <div className="w-full">
      <h2 className="text-3xl font-extrabold text-[#002855] mb-12 tracking-tight">
        Glossary Terms
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {terms.map((term: GlossaryItem, index: number) => (
          <Card key={index} className="shadow-none hover:border-blue-200 hover:shadow-xl hover:shadow-blue-900/5 transition-all rounded-2xl overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-bold text-[#002855] leading-tight group-hover:text-blue-700 transition-colors">
                {term.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500 text-sm leading-relaxed line-clamp-4">
                {term.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
