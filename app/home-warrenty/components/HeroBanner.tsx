import Image, { StaticImageData } from 'next/image';
import React from 'react'
import { FaCheckCircle } from 'react-icons/fa';
import { HeroBannerData } from '../page';

type HeroBannerSectionProps = {
    heroBannerData: HeroBannerData;
};

export default function HeroBanner({ heroBannerData }: HeroBannerSectionProps) {
    return (
        <section className="relative w-full h-[500px] sm:h-[600px] lg:h-[500px] overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0">
                <Image
                    src={heroBannerData.image}
                    alt="Hero Banner"
                    fill
                    className="object-cover"
                    priority
                />
                {/* Dark Overlay */}
                {heroBannerData && (
                    <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/50 to-transparent"></div>
                )}
            </div>

            {/* Content */}
            <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
                <div className="max-w-2xl">
                    {/* Heading */}
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                        {heroBannerData.heading}
                    </h1>

                    {/* Subheading */}
                    <p className="text-base sm:text-lg text-white mb-4 leading-relaxed">
                        {heroBannerData.subheading}
                    </p>

                    {/* Body Text */}
                    <p className="text-base sm:text-lg text-white mb-8 leading-relaxed">
                        {heroBannerData.bodyText}
                    </p>

                    {/* CTA Button */}
                    <button className="bg-linear-to-r from-[#76FFA3] to-[#48FFFF] hover:bg-teal-500 text-teal-800 font-bold text-base sm:text-lg px-8 py-3 rounded-full transition-colors duration-300 mb-8">
                        {heroBannerData.ctaText}
                    </button>

                    {/* Trust Badges */}
                    <div className="flex flex-wrap gap-4 sm:gap-6 items-center">
                        {heroBannerData.trustBadges.map((badge: any, index: number) => (
                            <div key={index} className="flex items-center gap-2 text-white">
                                <FaCheckCircle className="text-white text-sm shrink-0" />
                                <span className="text-sm font-medium">{badge}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}