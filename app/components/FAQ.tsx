import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items?: FAQItem[];
}

export default function FAQ({ items }: FAQProps) {
  const data = items && items.length > 0 ? items : [];

  if (data.length === 0) return null;

  return (
    <div className="">
      <h3 className="text-2xl font-medium text-blue-950 mb-6 uppercase">
        Frequently Asked Questions
      </h3>

      <Accordion type="single" collapsible className="w-full mb-8">
        {data.map((item, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-lg text-gray-500 text-left cursor-pointer">
              <h2>{item.question}</h2>
            </AccordionTrigger>
            <AccordionContent className="text-gray-700 text-base leading-relaxed">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <p className="text-gray-600 text-sm md:text-base">
        <span className="font-medium text-gray-400">
          Ready to get your appliance or HVAC system working perfectly again?
        </span>{" "}
        <Link href="/schedule" className="text-blue-600 hover:underline">
          Schedule your repair today
        </Link>{" "}
        at Sears Home Services or call{" "}
        <span className="font-semibold text-gray-400">1-800-4-MY-HOME</span> to
        speak with our customer service team.
      </p>
    </div>
  );
}
