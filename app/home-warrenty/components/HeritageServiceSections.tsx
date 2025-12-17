import React from 'react'

import { heritageHumanProofDataType, serviceProcessKeyFeaturesDataType, techCredibilityDataType } from '../page'

type HeritageServiceSectionsProps = {
    heritageHumanProofData: heritageHumanProofDataType,
    serviceProcessKeyFeaturesData: serviceProcessKeyFeaturesDataType,
    techCredibilityData: techCredibilityDataType
}

export default function HeritageServiceSections({ heritageHumanProofData, serviceProcessKeyFeaturesData, techCredibilityData }: HeritageServiceSectionsProps) {
    return (
        <div>
            {/* Heritage Section - Image 1 */}
            <section className="w-full bg-white py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-bold text-blue-900 mb-4">
                        {heritageHumanProofData.heading}
                    </h2>
                    <p className="text-base sm:text-lg text-gray-700 mb-8 max-w-3xl">
                        {heritageHumanProofData.subheading}
                    </p>

                    {/* Video Embed */}
                    <div className="relative aspect-video rounded-3xl overflow-hidden shadow-xl">
                        <iframe
                            width="100%"
                            height="100%"
                            src="https://www.youtube.com/embed/CRLd_dG95Gs"
                            title="Heritage Video"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="absolute inset-0"
                        ></iframe>
                    </div>
                </div>
            </section>

            {/* Service Process Section - Image 2 */}
            <section className="w-full bg-white py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                        {/* Left Column - How It Works */}
                        <div>
                            <h2 className="text-sm font-bold text-blue-600 mb-8 tracking-wide">
                                {serviceProcessKeyFeaturesData.leftColumn.heading}
                            </h2>
                            <div className="space-y-8">
                                {serviceProcessKeyFeaturesData.leftColumn.items.map((item, index) => (
                                    <div key={index} className="flex gap-4">
                                        <div className="shrink-0 w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                                            <span className="text-xl font-bold text-teal-600">
                                                {item.number}
                                            </span>
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-lg font-bold text-gray-900 mb-2">
                                                {item.title}
                                            </h4>
                                            <p className="text-sm text-gray-700">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Column - Things to Know */}
                        <div>
                            <h2 className="text-sm font-bold text-blue-600 mb-8 tracking-wide">
                                {serviceProcessKeyFeaturesData.rightColumn.heading}
                            </h2>
                            <div className="space-y-8">
                                {serviceProcessKeyFeaturesData.rightColumn.items.map((item, index) => (
                                    <div key={index} className="flex gap-4">
                                        <div className="shrink-0 w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                                            <svg className="w-6 h-6 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-lg font-bold text-gray-900 mb-2">
                                                {item.title}
                                            </h4>
                                            <p className="text-sm text-gray-700">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* CTA Block */}
                    <div className="bg-blue-600 rounded-3xl p-12 text-center text-white">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                            {serviceProcessKeyFeaturesData.ctaBlock.heading}
                        </h2>
                        <p className="text-lg mb-8 text-blue-100 max-w-3xl mx-auto">
                            {serviceProcessKeyFeaturesData.ctaBlock.subheading}
                        </p>
                        <button className="bg-linear-to-r from-[#76FFA3] to-[#48FFFF] hover:bg-teal-500 text-gray-900 font-bold text-base px-10 py-3 rounded-full transition-colors">
                            {serviceProcessKeyFeaturesData.ctaBlock.ctaText}
                        </button>
                    </div>
                </div>
            </section>

            {/* Tech Credibility Section - Image 3 */}
            <section className="w-full bg-linear-to-r from-[#76FFA3] to-[#48FFFF] py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Left - Content */}
                        <div>
                            <p className="text-sm font-semibold text-gray-800 mb-2">
                                {techCredibilityData.top.heading}
                            </p>
                            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                                {techCredibilityData.top.subheading}
                            </h2>
                            <p className="text-base text-gray-800 mb-6 leading-relaxed">
                                {techCredibilityData.top.bodyText}
                            </p>
                            <ul className="space-y-3">
                                {techCredibilityData.top.bulletPoints.map((point, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <svg className="w-6 h-6 text-purple-600 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        <span className="text-base text-gray-900 font-semibold">
                                            {point}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Right - Video */}
                        <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl">
                            <iframe
                                width="100%"
                                height="100%"
                                src="https://www.youtube.com/embed/45S5kHo3XQk"
                                title="Tech Video"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="absolute inset-0"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}