import React from 'react'
import { TrustAndLegacyDataType } from '../page'
import Image from 'next/image'

type TrustAndLegacyProps = {
    brandTrustData: TrustAndLegacyDataType
}

export default function TrustAndLegacy({ brandTrustData }: TrustAndLegacyProps) {
    return (
        <section className="w-full bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Top Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                    {/* Left - Text Content */}
                    <div className="flex flex-col justify-center">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                            {brandTrustData.left.heading}
                        </h2>
                        <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-8">
                            {brandTrustData.left.bodyText}
                        </p>
                    </div>

                    {/* Right - Brand Logos */}
                    <div className="flex items-center justify-center">
                        <div className="grid grid-cols-2 gap-8 w-full max-w-md">
                            {brandTrustData.left.brands.map((brand, index) => (
                                <div key={index} className="flex items-center justify-center p-4">
                                    <Image
                                        src={brand}
                                        alt={brand.toString()}
                                        className="h-16 w-auto"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left - Video Embed */}
                    <div className="relative w-full">
                        <div className="relative aspect-video rounded-2xl overflow-hidden bg-linear-to-br from-blue-800 via-blue-600 to-blue-500 shadow-xl">
                            {/* Video Thumbnail/Embed */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                {/* YouTube Embed - Correct Way */}
                                <iframe
                                    width="100%"
                                    height="100%"
                                    src="https://www.youtube.com/embed/ksyOwTfK7qI?si=i3eK3bIZph08DEp_"
                                    title="Sears Protect Video"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="absolute inset-0"
                                ></iframe>
                            </div>
                        </div>
                    </div>

                    {/* Right - Text Content */}
                    <div className="flex flex-col justify-center">
                        <h2 className="text-3xl font-semibold mb-6">
                            {brandTrustData.right.heading}
                        </h2>
                        <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                            {brandTrustData.right.bodyText}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}