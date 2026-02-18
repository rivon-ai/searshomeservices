"use client"


import React from 'react'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import Calendar from "@/public/sear-page-icons-images/calendar-icon.svg"
import comment from "@/public/sear-page-icons-images/comment-icon.svg"
import handHome from "@/public/sear-page-icons-images/handHome-icon.svg"

export default function HowItWorks() {
    const params = useParams();
    return (
        < div className=" bg-white" >

            <div className="mb-8">
                <h2 className="text-2xl font-bold text-blue-900 mb-6">How It Works: Our Simple 3-Step Process</h2>

                {/* Step 1 */}
                <div className="mb-6">
                    <h3 className="text-lg font-bold text-blue-900 mb-2">1. Schedule Service</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                        Book online or call — flexible time slots and local availability make it easy to get started.
                    </p>
                </div>

                {/* Step 2 */}
                <div className="mb-6">
                    <h3 className="text-lg font-bold text-blue-900 mb-2">2. Get a Diagnosis</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                        A technician will arrive at your home, inspect the issue, and explain exactly what is needed.
                    </p>
                </div>

                {/* Step 3 */}
                <div className="mb-6">
                    <h3 className="text-lg font-bold text-blue-900 mb-2">3. Complete the Repair</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                        We'll get your appliance back up and running using high-quality replacement parts — quickly and
                        reliably.
                    </p>
                </div>
            </div>

            {/* Testimonial */}
            <div className="mb-10">
                <h3 className="text-lg font-bold text-blue-900 mb-3">
                    A Word from Our Local Sears Home Services Technician
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                    As a technician with over 15 years of experience right here in Forestdale, {params.state}, I've come to truly
                    appreciate the value of reliable and efficient home services. There's nothing quite like the satisfaction
                    of fixing a stubborn appliance and seeing the relief on a customer's face. Our community deserves quality
                    services, and that's what we strive to deliver every day. Whether it's a finicky fridge or a worn-out
                    washer, we're here to put things back on track. If you're searching for{" "}
                    <span className="font-semibold">home appliance repair near me</span>, look no further than our dedicated
                    team at Sears Home Services. We understand the unique needs of our Forestdale neighbors and are committed
                    to providing top-notch service with a personal touch.
                </p>
            </div>

            {/* Main Title */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-blue-900 mb-4">Schedule Appliance Repair in Forestdale, {params.state}</h2>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    Don't let a malfunctioning appliance disrupt your home life. Choose Sears Appliance Repair in Forestdale
                    for dependable, local service — whether you're in the city center, uptown, or suburban neighborhoods —
                    we're nearby and ready to help.
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">
                    <a href="#" className="text-blue-600 hover:underline">
                        Book your appliance repair now
                    </a>{" "}
                    or call us at <span className="font-semibold">1-802-613-1926</span> to speak with a representative. We're
                    often available the same day in neighborhoods across Forestdale.
                </p>
            </div>

            {/* How It Works Section */}
            <div className="border-t border-gray-200 pt-10">
                <h2 className="text-xl font-bold text-blue-900 mb-8 uppercase tracking-wide">How It Works</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Easy Scheduling */}
                    <div className="text-center">
                        <div className="flex justify-center mb-4">
                            <div className="w-16 h-16 flex items-center justify-center">
                                <Image src={Calendar} alt={"calendar svg"} className="w-16 h-16" />
                            </div>
                        </div>
                        <h3 className="text-sm font-bold text-blue-900 mb-3 uppercase tracking-wide">Easy Scheduling</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">Book online in less than a minute.</p>
                    </div>

                    {/* Diagnostic Fee */}
                    <div className="text-center">
                        <div className="flex justify-center mb-4">
                            <div className="w-16 h-16 flex items-center justify-center">
                                <Image src={comment} alt={"comment svg"} className="w-16 h-16" />
                            </div>
                        </div>
                        <h3 className="text-sm font-bold text-blue-900 mb-3 uppercase tracking-wide">Diagnostic Fee</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            Apply your diagnostic fee to the costs of repair.
                        </p>
                    </div>

                    {/* Expert Technicians */}
                    <div className="text-center">
                        <div className="flex justify-center mb-4">
                            <div className="w-16 h-16 flex items-center justify-center">
                                <Image src={handHome} alt={"handHome svg"} className="w-16 h-16" />
                            </div>
                        </div>
                        <h3 className="text-sm font-bold text-blue-900 mb-3 uppercase tracking-wide">Expert Technicians</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            Save up to $150 on your repair if you enroll in a home warranty.
                        </p>
                    </div>
                </div>
            </div>
        </ div>
    )
}

