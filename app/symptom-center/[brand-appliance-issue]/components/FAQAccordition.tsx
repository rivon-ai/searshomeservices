"use client"

import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@radix-ui/react-accordion'
import React from 'react'

interface faqItems {
    question: string
    answer: string
}

interface compProps{
    faqItems: faqItems[]
}

export default function FAQAccordition( {faqItems } : compProps) {
    return (
        <div className='max-w-[50%] mx-auto'>
            {/* FAQ Section */}
            <div className="mb-16">
                <div className="gap-8">
                    {/* Left Side - Heading */}
                    <div className="shrink-0 pb-6">
                        <h2 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
                      
                    </div>

                    {/* Right Side - Accordion */}
                    <div className="flex-1">
                        <Accordion type="single" collapsible className="space-y-4">
                            {faqItems.map((item, index) => (
                                <AccordionItem
                                    key={index}
                                    value={`item-${index}`}
                                    className="bg-white"
                                >
                                    <AccordionTrigger className="text-left py-5 hover:no-underline cursor-pointer">
                                        <span className="text-base font-medium text-gray-900 pr-4">
                                            {item.question}
                                        </span>
                                    </AccordionTrigger>
                                    <AccordionContent className="text-gray-600 pb-5 text-sm leading-relaxed">
                                        {item.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </div>
            </div>
        </div>
    )
}