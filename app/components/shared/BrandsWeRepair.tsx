"use client"


import React from 'react'
import kenmore from "@/public/sear-page-icons-images/kenmore-01.svg"
import whirlpool from "@/public/sear-page-icons-images/whirlpool-01.svg"
import frigidaire from "@/public/sear-page-icons-images/frigidaire-01.svg"
import maytag from "@/public/sear-page-icons-images/maytag-01.svg"
import ge from "@/public/sear-page-icons-images/GE-01.svg"
import kitchenaid from "@/public/sear-page-icons-images/kitchenaid-01.svg"
import electrolux from "@/public/sear-page-icons-images/electrolux-01.svg"
import bosch from "@/public/sear-page-icons-images/bosch-01.svg"
import samsung from "@/public/sear-page-icons-images/Samsung_Orig_Wordmark_BLACK_RGB_1.svg"
import jennAir from "@/public/sear-page-icons-images/jenn-air-01.svg"
import lg from "@/public/sear-page-icons-images/LG-01.svg"
import Image from "next/image"
import Link from 'next/link'


const BRANDS = [
    { name: 'kenmore', src: kenmore },
    { name: 'whirlpool', src: whirlpool },
    { name: 'frigidaire', src: frigidaire },
    { name: 'maytag', src: maytag },
    { name: 'ge', src: ge },
    { name: 'kitchenaid', src: kitchenaid },
    { name: 'jennair', src: jennAir },
    { name: 'lg', src: lg },
    { name: 'electrolux', src: electrolux },
    { name: 'bosch', src: bosch },
    { name: 'samsung', src: samsung },
];

export default function BrandsWeRepair() {
    const BrandLogo = ({ name, src }: { name: string; src: any }) => (
        <Link href={`/repair/${name}`} className="grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all">
            <Image src={src} alt={name} className="w-40 h-32" />
        </Link>
    );

    return (
        <div>
            {/* Brands We Repair */}
            <div className="pt-12">
                <h2 className="text-xl font-bold text-gray-900 mb-4 uppercase tracking-wide">Brands We Repair</h2>

                <p className="text-gray-600 text-sm mb-8">We repair all major brands, no matter where you bought it.</p>

                {/* Brand Logos - Row 1 */}
                <div className="flex flex-wrap items-center justify-center gap-12 mb-8">
                    {BRANDS.slice(0, 6).map((brand) => (
                        <BrandLogo key={brand.name} {...brand} />
                    ))}
                </div>

                {/* Brand Logos - Row 2 */}
                <div className="flex flex-wrap items-center justify-center gap-12 mb-8">
                    {BRANDS.slice(6).map((brand) => (
                        <BrandLogo key={brand.name} {...brand} />
                    ))}
                </div>

                <div className="mt-6">
                    <Link href="/repair/appliance-brand-we-repair" className="text-blue-600 hover:underline text-sm">
                        See the complete list of brands we repair
                    </Link>
                </div>
            </div>
        </div>
    )
}
