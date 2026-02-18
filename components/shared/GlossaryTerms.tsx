"use client";

import React from "react";
import { ScrapedNode } from "@/utils/brand-appliance-parser";
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

interface GlossaryTermsProps {
  nodes?: ScrapedNode[];
}

export default function GlossaryTerms({ nodes }: GlossaryTermsProps) {
  let terms = defaultTerms;

  if (nodes && nodes.length > 0) {
    terms = [];
    let currentTerm: { title: string; description: string } | null = null;
    let lastContent = "";

    nodes.forEach((node) => {
      const content = node.content ? node.content.trim() : "";
      if (!content || content === lastContent) return;
      lastContent = content;

      const attrs = (node.attributes as any) || {};
      const className = attrs.class || "";
      const isBold = className.includes("font-bold") || className.includes("font-semibold");
      const isHeaderTag = ["h3", "h4", "h5", "h6", "strong", "b"].includes(node.tag);
      const isStyledBold = isBold && content.length < 150;
      const isQuestion = content.endsWith("?") && content.length < 150;
      const isTitle = isHeaderTag || isQuestion || isStyledBold;

      if (isTitle) {
        if (currentTerm && currentTerm.title === content) return;
        if (currentTerm) terms.push(currentTerm);
        currentTerm = { title: content, description: "" };
      } else if (currentTerm && content !== currentTerm.title) {
        currentTerm.description += (currentTerm.description ? " " : "") + content;
      }
    });

    if (currentTerm) terms.push(currentTerm);
  }

  if (terms.length === 0 && nodes && nodes.length > 0) {
    return (
      <div className="w-full">
        <h2 className="text-3xl font-extrabold text-[#002855] mb-12 tracking-tight">
          Glossary Terms
        </h2>
        <div className="prose max-w-none">
          {nodes.map((n, i) => (
            <Card key={i} className="mb-4 border-gray-100 shadow-sm">
              <CardContent className="p-4 text-gray-600">
                {n.tag.startsWith("h") || n.tag === "strong" ? (
                  <strong className="text-[#002855]">{n.content}</strong>
                ) : (
                  n.content
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (terms.length === 0) return null;

  return (
    <div className="w-full">
      <h2 className="text-3xl font-extrabold text-[#002855] mb-12 tracking-tight">
        Glossary Terms
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {terms.map((term: { title: string; description: string }, index: number) => (
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
