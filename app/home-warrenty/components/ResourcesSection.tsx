import React from 'react'
import { GlossaryTermsDataType, RecentApplianceSymptomsDataType, ServiceAvailabilityByCityDataType } from '../page'
import Image from 'next/image'

type ResourcesSectionProps = {
    glossaryTermsData: GlossaryTermsDataType,
    recentApplianceSymptomsData: RecentApplianceSymptomsDataType,
    serviceAvailabilityByCityData: ServiceAvailabilityByCityDataType
}

export default function ResourcesSection({ glossaryTermsData, recentApplianceSymptomsData, serviceAvailabilityByCityData }: ResourcesSectionProps) {
    return (
        <section className="px-4 py-16 sm:px-6 lg:px-8">
            <div className='w-full lg:max-w-2xl mx-auto'>

                {/* Protect Resources Section */}
                <div className="mb-20">
                    <h2 className="text-4xl font-bold text-gray-900 mb-8">Protect Resources</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        {glossaryTermsData.resourceHub.articles.map((article, index) => (
                            <div key={index} className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
                                <Image
                                    src={article.img}
                                    alt={article.title}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
                                        {article.title}
                                    </h3>
                                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                                        <span>{article.readTime}</span>
                                        <span>•</span>
                                        <span>{article.date}</span>
                                    </div>
                                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                        {article.excerpt}
                                    </p>
                                    <span className="inline-block text-xs font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded">
                                        {article.category}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center">
                        <button className="bg-linear-to-r from-[#76FFA3] to-[#48FFFF] hover:bg-teal-500/80 text-teal-600 font-semibold px-8 py-3 rounded-full transition-colors">
                            Get Free Quote
                        </button>
                    </div>
                </div>

                {/* Glossary Terms Section */}
                <div className="mb-20">
                    <h2 className="text-4xl font-bold text-gray-900 mb-8">Glossary Terms</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {glossaryTermsData.terms.map((item, index) => (
                            <div key={index} className="border-b border-gray-200 pb-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-3">
                                    {item.term}
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    {item.definition}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Appliance Symptoms Section */}
                <div className="mb-20">
                    <h2 className="text-4xl font-bold text-gray-900 mb-8">Recent Appliance Symptoms</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {recentApplianceSymptomsData.symptoms.map((symptom, index) => (
                            <div key={index} className="border-b border-gray-200 pb-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-3">
                                    {symptom.brand} {symptom.issue}
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    {symptom.solution}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Service Availability Section */}
            <div className="bg-blue-50 rounded-2xl p-10">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">
                    Sears Home Services Available In These Cities
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {serviceAvailabilityByCityData.cities.map((city, index) => (
                        <div key={index}>
                            <a
                                href="#"
                                className="text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline"
                            >
                                {city}
                            </a>
                        </div>
                    ))}
                </div>

                <div className="mt-6">
                    <a
                        href="#"
                        className="text-blue-600 hover:text-blue-800 font-semibold inline-flex items-center gap-1 hover:underline"
                    >
                        See all states
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    )
}