"use client"


import React from 'react'
import kenMore from "@/public/sear-page-icons-images/kenmore-01.svg"
import whirpool from "@/public/sear-page-icons-images/whirlpool-01.svg"
import fridigate from "@/public/sear-page-icons-images/frigidaire-01.svg"
import mayTag from "@/public/sear-page-icons-images/maytag-01.svg"
import ge from "@/public/sear-page-icons-images/GE-01.svg"
import kitchenAid from "@/public/sear-page-icons-images/kitchenaid-01.svg"
import electrolux from "@/public/sear-page-icons-images/electrolux-01.svg"
import bosch from "@/public/sear-page-icons-images/bosch-01.svg"
import samsung from "@/public/sear-page-icons-images/Samsung_Orig_Wordmark_BLACK_RGB_1.svg"
import jennAir from "@/public/sear-page-icons-images/jenn-air-01.svg"
import LG from "@/public/sear-page-icons-images/LG-01.svg"
import Image from "next/image"
import Link from 'next/link'


export default function BrandsWeRepair() {
    return (
        <div>
            {/* Brands We Repair */}
            <div className="pt-12">
                <h2 className="text-xl font-bold text-gray-900 mb-4 uppercase tracking-wide">Brands We Repair</h2>

                <p className="text-gray-600 text-sm mb-8">We repair all major brands, no matter where you bought it.</p>

                {/* Brand Logos - Row 1 */}
                <div className="flex flex-wrap items-center justify-center gap-12 mb-8">
                    <div className="grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all">
                        <Image src={kenMore} alt={"star svg"} className="w-40 h-32" />
                    </div>
                    <div className="grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all">
                        <Image src={whirpool} alt={"star svg"} className="w-40 h-32" />
                    </div>
                    <div className="grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all">
                        <Image src={fridigate} alt={"star svg"} className="w-40 h-32" />
                    </div>
                    <div className="grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all">
                        <Image src={mayTag} alt={"star svg"} className="w-40 h-32" />
                    </div>
                    <div className="grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all">
                        <Image src={ge} alt={"star svg"} className="w-40 h-32" />
                    </div>
                    <div className="grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all">
                        <Image src={kitchenAid} alt={"star svg"} className="w-40 h-32" />
                    </div>
                </div>

                {/* Brand Logos - Row 2 */}
                <div className="flex flex-wrap items-center justify-center gap-12 mb-8">
                    <div className="grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all">
                        <Image src={jennAir} alt={"star svg"} className="w-40 h-32" />
                    </div>
                    <div className="grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all">
                        <Image src={LG} alt={"star svg"} className="w-40 h-32" />
                    </div>

                    <div className="grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all">
                        <Image src={electrolux} alt={"star svg"} className="w-40 h-32" />
                    </div>
                    <div className="grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all">
                        <Image src={bosch} alt={"star svg"} className="w-40 h-32" />
                    </div>
                    <div className="grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all">
                        <Image src={samsung} alt={"star svg"} className="w-40 h-32" />
                    </div>
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