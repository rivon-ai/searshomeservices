"use client"


import React from 'react'
import Image from 'next/image'
import starIcon from "@/public/sear-page-icons-images/star-icon.svg"
import calendarIcon from "@/public/sear-page-icons-images/calendar-icon.svg"
import userIcon from "@/public/sear-page-icons-images/user-icon.svg"
import settingIcon from "@/public/sear-page-icons-images/settings-icon.svg"

export default function WhyToChoose() {
    return (
        <>
            {/* Why Sears Home Services */}
            <div className="">  
                <h3 className="text-xl font-bold text-blue-950 mb-10 uppercase tracking-wide">Why Sears Home Services?</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Happy Customers */}
                    <div className="text-left">
                        <div className="mb-4">
                            <Image src={starIcon} alt={"star svg"} className="w-16 h-16" />
                        </div>
                        <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">Happy Customers</h3>
                        <p className="text-gray-600 text-xs leading-relaxed">
                            Average of 4,600,000+ homes serviced/year. Over 1,000,000 5 star ratings.
                        </p>
                    </div>

                    {/* Flexible Scheduling */}
                    <div className="text-left">
                        <div className="mb-4">
                            <Image src={calendarIcon} alt={"calendar svg"} className="w-16 h-16" />
                        </div>
                        <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">Flexible Scheduling</h3>
                        <p className="text-gray-600 text-xs leading-relaxed">Available 6 days a week in most areas.</p>
                    </div>

                    {/* Expert Technicians */}
                    <div className="text-left">
                        <div className="mb-4">
                            <Image src={userIcon} alt={"user svg"} className="w-16 h-16" />
                        </div>
                        <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">Expert Technicians</h3>
                        <p className="text-gray-600 text-xs leading-relaxed">
                            2,500+ manufacturer-trained technicians with an average of 10+ years of experience.
                        </p>
                    </div>

                    {/* Quality Parts */}
                    <div className="text-left">
                        <div className="mb-4">
                            <Image src={settingIcon} alt={"setting svg"} className="w-16 h-16" />
                        </div>
                        <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">
                            Quality Parts for Hundreds of Brands
                        </h3>
                        <p className="text-gray-600 text-xs leading-relaxed">
                            Repairs for most major brands, no matter where you bought it.
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}