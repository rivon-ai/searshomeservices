"use client"


import React from 'react'
import bing from "@/public/sear-page-icons-images/bing-bp-icon.svg"
import yelp from "@/public/sear-page-icons-images/yelp-bp-icon.svg"
import google from "@/public/sear-page-icons-images/google-bp-icon.svg"
import facebook from "@/public/sear-page-icons-images/facebook-bp-icon.svg"
import Link from 'next/link'
import Image from 'next/image'

const sites = [
    {
        icon: bing,
    },
    {
        icon: yelp,
    },
    {
        icon: google,
    },
    {
        icon: facebook,
    }
]

export default function RatingSites() {
    return (
        <section className="pt-20 bg-white border-t">

            {/* Header */}
            <header>
                <h2 className="text-2xl font-bold text-gray-900 mb-12 uppercase tracking-wide">
                    CONNECT WITH RATINGS WEBSITES
                </h2>
            </header>

            {/* Icons Grid */}
            <nav className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                {
                    sites.map(site => (
                        <div className="flex justify-center">
                            <Link
                                href="#"
                                className="inline-flex items-center gap-2 grayscale-100 hover:grayscale-0 duration-300 transition-all"
                                aria-label="Visit our Bing profile"
                            >
                                <Image src={site.icon} alt='svg' className='w-20 h-12' />
                            </Link>
                        </div>
                    ))
                }

            </nav>

        </section>
    )
}