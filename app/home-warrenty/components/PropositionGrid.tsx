import React from 'react'
import { FeatureGridData } from '../page'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

    
type PropositionGridProps = {
    featureGridData: FeatureGridData
}
export default function PropositionGrid({ featureGridData }: PropositionGridProps) {
    return (
        <section className="w-full bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-900 mb-4">
                        {featureGridData.heading}
                    </h2>
                    <p className="text-base sm:text-lg text-gray-700">
                        {featureGridData.subheading}
                    </p>
                </div>

                {/* Feature Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {featureGridData.items.map((item, index) => (
                        <div key={index} className="flex flex-col items-start">
                            {/* Icon */}
                            <div className="mb-4">
                                <div className="w-12 h-12 flex items-center justify-center">
                                    <Image
                                        src={item.icon}
                                        alt={item.title}
                                        width={44}
                                        height={44}
                                        className="text-blue-500"
                                    />
                                </div>
                            </div>

                            {/* Title */}
                            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                                {item.title}
                            </h2>

                            {/* Description */}
                            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* CTA Button */}
                <div className="text-center">
                    <Link href={"#"} className="bg-linear-to-r from-[#76FFA3] to-[#48FFFF] py-4 px-5 rounded-full cursor-pointer text-blue-900 font-semibold">
                        {featureGridData.ctaText}
                    </Link>
                </div>
            </div>
        </section>
    )
}