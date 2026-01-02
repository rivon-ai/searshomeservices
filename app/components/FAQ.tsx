import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

interface FAQItem {
  question: string;
  answer: string[];
}

const faqData: FAQItem[] = [
  {
    question: "How fast can I schedule my repair appointment?",
    answer: [
      "You can schedule a repair appointment in many areas on the same day or next day.",
      "We plan out our service technicians routes one day in advance. When an opening in a service route exists on the same day that you attempt to schedule service, you’ll be offered that time slot for service.",
      "If all time slots on all routes in your area are already filled for the day you attempt to schedule service, you’ll be offered a time slot the next day if one exists.",
      "If same day or next day service isn’t available in your area, you’ll be offered the first available repair appointment and any subsequent time slots.",
    ],
  },
  {
    question: "How much does it cost to have a technician come out?",
    answer: [
      "Sears Home Services charges a diagnostic fee which varies based on your service area and the type of appliance or HVAC system needing repair. This diagnostic fee typically ranges from $90 to $150 for most areas and is only charged on the day of service.",
      "On the day of the visit, the technician will assess the issue and provide a complete repair estimate that includes parts, labor, and applicable taxes. If you proceed with the recommended repair, the diagnostic fee will be waived.",
      "If you decide not to proceed with the repair, you'll only be responsible for paying the diagnostic fee, which covers the technician’s assessment and visit. This transparent pricing approach ensures that you’re fully informed of all costs before any work is done, so you can make the decision that’s right for you.",
    ],
  },
  {
    question: "What hours are your call center agents available?",
    answer: [
      "Our call center agents are available Monday through Friday from 6:00 AM to 10:30 PM CST and on Saturday and Sunday from 7:00 AM to 9:00 PM CST. These representatives can assist you with scheduling, checking the status of a service order, rescheduling appointments, and answering any questions about your service.",
    ],
  },
  {
    question:
      "What’s included with professional appliance maintenance service?",
    answer: [
      "Our Clean & Maintain professional maintenance service is a comprehensive tune-up for your appliance. During the visit, the technician will inspect the overall condition of your appliance, clean areas that directly affect its performance, check visible electrical wiring, and test and adjust the controls to ensure everything is working properly.",
      "We also inspect all major components and functions of the appliance or to ensure there are no hidden issues that could lead to future breakdowns.",
      "After the service, the technician will discuss any problems found and recommend next steps if needed.",
    ],
  },
];

export default function FAQ() {
  return (
    <div className="">
      <h1 className="text-2xl font-semibold text-blue-950 mb-6 uppercase">
        Frequently Asked Questions
      </h1>

      <Accordion type="single" collapsible className="w-full mb-8">
        {faqData.map((item, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-lg text-gray-500 text-left cursor-pointer">
              <h2>{item.question}</h2>
            </AccordionTrigger>
            <AccordionContent className="text-gray-700 text-base leading-relaxed">
              {item.answer.map((paragraph, i) => (
                <p key={i} className="mb-4 last:mb-0">
                  {paragraph}
                </p>
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <p className="text-gray-600 text-sm md:text-base">
        <span className="font-semibold text-gray-400">Ready to get your appliance or HVAC system working perfectly again?</span>
        <a href="#" className="text-blue-600 hover:underline">
          Schedule your repair today
        </a>
        at Sears Home Services or call
        <span className="font-semibold text-gray-400">1-800-4-MY-HOME</span> to speak with our
        customer service team.
      </p>
    </div>
  );
}
