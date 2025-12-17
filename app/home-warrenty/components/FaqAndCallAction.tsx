import React from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { FaqAndCallToActionbDataType } from '../page'
import Image from 'next/image';

type FaqAndCallActionProps = {
    FaqAndCallToActionbData: FaqAndCallToActionbDataType
}

export default function FaqAndCallAction({ FaqAndCallToActionbData }: FaqAndCallActionProps) {
    return (
        <section className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
            {/* FAQ Section */}
            <div className="mb-16">
                <div className="flex items-start gap-8">
                    {/* Left Side - Heading */}
                    <div className="w-48 shrink-0">
                        <h2 className="text-4xl font-bold text-gray-900">{FaqAndCallToActionbData.heading}</h2>
                        <p className="mt-4 text-sm text-gray-600 leading-relaxed">
                            {FaqAndCallToActionbData.subheading}
                        </p>
                    </div>

                    {/* Right Side - Accordion */}
                    <div className="flex-1">
                        <Accordion type="single" collapsible className="space-y-4">
                            {FaqAndCallToActionbData.faqItems.map((item, index) => (
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

            {/* Call Us Section */}
            <div className="bg-linear-to-r from-blue-600 to-blue-500 rounded-2xl overflow-hidden">
                <div className="flex items-center justify-center px-12 py-12 gap-16">
                    {/* Left Side - Image */}
                    <div className=" flex justify-end">
                        <Image
                            src={FaqAndCallToActionbData.callToAction.img}
                            alt={FaqAndCallToActionbData.callToAction.imageAlt}
                            className="w-80 h-80 object-cover rounded-2xl"
                        />
                    </div>

                    {/* Right Side - Content */}
                    <div className="text-white w-fit">
                        <h2 className="text-4xl font-bold mb-3">Call Us</h2>
                        <p className="text-blue-100 mb-8 text-lg">
                            Call us, we're ready to help.
                        </p>
                        <button className="bg-linear-to-r from-[#76FFA3] to-[#48FFFF] hover:bg-teal-500 text-gray-900 font-semibold px-8 py-3 rounded-full transition-colors duration-200">
                            Call Now
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}