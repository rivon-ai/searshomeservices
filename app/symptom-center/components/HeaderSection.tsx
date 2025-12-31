"use client"


import Image from 'next/image'
import React, { useState } from 'react'
import heroImage from '@/public/symptom-center/heroImage.webp'
import { CheckCircle } from 'lucide-react'
import applianceIssues from '@/data/appliance_issues_full.json'

export default function HeaderSection() {

    const [issues , setIssues] = useState(0)

    const totalIssue = applianceIssues.reduce((count, acc) => {
        return count + acc.issues.length
    }, 0)
    
    console.log(totalIssue)

    return (
        <div>
            {/* header-section */}
            <section className="relative w-full h-64 overflow-hidden">
                {/* Background Image */}
                {/* Background Image */}
                <Image
                    alt="symptom center page hero banner"
                    className="object-cover absolute"
                    src={heroImage}
                    style={{ position: 'absolute', height: '100%', width: '100%', inset: '0px', objectPosition: '0% 30%', color: 'transparent' }}
                />

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-linear-to-r from-black/75 to-black/30" />

                {/* Content Overlay */}
                <div className="relative z-10 h-full flex items-center">
                    <div className="container mx-auto px-6 lg:px-12">
                        <div className="max-w-2xl">
                            {/* Main Heading */}
                            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                                Welcome to the<br />
                                Symptom Center
                            </h1>

                            {/* Subheading */}
                            <p className="text-white text-lg mb-6">
                                We're here to help you find a solution
                            </p>

                            {/* Stats/Features */}
                            <div className="flex flex-wrap gap-6 text-white">
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="w-5 h-5 shrink-0" />
                                    <span className="text-sm font-medium">13M+ 5-Star Reviews</span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <CheckCircle className="w-5 h-5 shrink-0" />
                                    <span className="text-sm font-medium">4M+ homes repaired a year</span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <CheckCircle className="w-5 h-5 shrink-0" />
                                    <span className="text-sm font-medium">2,500 licensed, local experts</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}