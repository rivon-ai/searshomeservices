import Image, { StaticImageData } from 'next/image';
import React from 'react'
import { HeroBannerData } from '../page';

type HeroBannerSectionProps = {
    heroBannerData: HeroBannerData;
};

export default function HeroBanner({ heroBannerData }: HeroBannerSectionProps) {
    return (
        <section className="relative w-full h-[500px] sm:h-[500px] lg:h-[600px] overflow-hidden">
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
                <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/50 to-transparent"></div>
            </div>

            {/* Content */}
            <div className="relative h-full w-[80%] mx-auto flex items-center">
                <div className="w-full">
                    {/* Heading */}
                    <div className="w-260">
                        <h2 className="text-7xl font-bold text-white mb-8 leading-[1.1] tracking-tight">
                            {heroBannerData.heading}
                        </h2>
                    </div>

                    {/* Subheading */}
                    <div className="w-220">
                        <p className="text-lg sm:text-xl text-white mb-6 font-medium leading-relaxed">
                            {heroBannerData.subheading}
                        </p>

                        {/* Body Text / Additional Benefit */}
                        <p className="text-lg sm:text-xl text-white mb-10 font-medium">
                            {heroBannerData.bodyText}
                        </p>

                        {/* CTA Button */}
                        <button className="bg-linear-to-r from-[#76FFA3] to-[#48FFFF] hover:opacity-90 text-[#003D3D] font-bold text-lg px-10 py-4 rounded-full transition-all duration-300 mb-10 shadow-lg">
                            {heroBannerData.ctaText}
                        </button>

                        {/* Trust Badges */}
                        <div className="flex gap-x-8 gap-y-4 items-center">
                            {heroBannerData.trustBadges.map((badge: any, index: number) => (
                                <div key={index} className="flex items-center gap-2 text-white">
                                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="text-white text-base shrink-0 opacity-90" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"></path>
                                    </svg>
                                    <span className="text-xs font-semibold tracking-wide">{badge}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
