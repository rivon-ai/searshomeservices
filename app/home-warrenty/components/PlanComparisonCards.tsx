import React from 'react'
import { ComparisonPlanData } from '../page'
import Image from 'next/image'
import Link from 'next/link'

type PlanComparisonCardsProps = {
    comparisonCardsData: ComparisonPlanData
}

export default function PlanComparisonCards({ comparisonCardsData }: PlanComparisonCardsProps) {
    return (
        <section className="w-full bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-900 mb-4">
                        {comparisonCardsData.heading}
                    </h2>
                    <p className="text-base sm:text-lg text-gray-700">
                        {comparisonCardsData.subheading}
                    </p>
                </div>

                {/* Plans Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {comparisonCardsData.plans.map((plan, index) => (
                        <div
                            key={index}
                            className={`relative rounded-2xl p-6 flex flex-col items-center py-8 ${plan.isFeatured
                                ? 'bg-blue-600 text-white shadow-2xl scale-103'
                                : 'bg-white text-gray-900 shadow-lg'
                                } transition-transform hover:scale-101`}
                        >
                            {/* Most Popular Badge */}
                            {plan.isFeatured && (
                                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-4 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                    Most popular
                                </div>
                            )}

                            {/* Icon */}
                            <div className="mb-10">
                                <div className={`w-10 h-10 ${plan.isFeatured ? 'text-white' : 'text-blue-600'}`}>
                                    <Image
                                        src={plan.icon}
                                        alt={plan.title}
                                        width={40}
                                        height={40}
                                    />
                                </div>
                            </div>

                            {/* Title */}
                            <h3 className={`text-lg font-bold mb-6 ${plan.isFeatured ? 'text-white' : 'text-blue-600'}`}>
                                {plan.title}
                            </h3>

                            {/* Value */}
                            <div className="mb-2">
                                <span className={`text-6xl font-bold ${plan.isFeatured ? 'text-white' : 'text-gray-900'}`}>
                                    {plan.value}
                                </span>
                            </div>

                            {/* Subtitle */}
                            <p className={`text-sm font-semibold mb-6 ${plan.isFeatured ? 'text-white' : 'text-gray-900'}`}>
                                {plan.subtitle}
                            </p>

                            {/* Divider for featured plan */}
                            {plan.isFeatured && (
                                <div className="border-t border-white/30 mb-6"></div>
                            )}

                            {/* Features List */}
                            <ul className="space-y-3 mb-8 grow">
                                {plan.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-start gap-2">
                                        <svg
                                            className={`w-5 h-5 mt-0.5 shrink-0 ${plan.isFeatured ? 'text-white' : 'text-blue-600'
                                                }`}
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        <span className={`text-sm ${plan.isFeatured ? 'text-white' : 'text-gray-700'}`}>
                                            {feature}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            {/* CTA Button */}
                            <Link
                                href={'/plans'}
                                className={`text-center w-full py-3 rounded-full font-semibold text-base transition-colors cursor-pointer ${plan.isFeatured
                                    ? 'bg-linear-to-r from-[#76FFA3] to-[#48FFFF] text-teal-600 hover:bg-teal-500 cursor-pointer'
                                    : 'bg-white text-blue-600 border-2 border-teal-400 hover:bg-teal-50 '
                                    }`}
                            >
                                {plan.ctaText}
                            </Link>
                        </div>
                    ))}
                </div>
                {/* Top Row - Process Steps */}
                <div className="mt-20 mb-10">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-12">
                        {comparisonCardsData.headingTwo}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {comparisonCardsData.steps.map((step, index) => (
                            <div
                                key={index}
                                className={`${index === 0 ? 'bg-gray-200' : 'bg-gray-100'} rounded-2xl p-8 hover:shadow-lg transition-shadow`}
                            >
                                <h2 className="text-xl font-bold text-gray-900 mb-3">
                                    {step.title}
                                </h2>
                                <p className="text-base text-gray-700">
                                    {step.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>


        </section>
    )
}