"use client"

import React from 'react'
import { Instagram, Twitter, Facebook } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function FooterTwo() {
    return (
        <footer className="w-full bg-white border-t">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 py-12 lg:py-16">
                    {/* Sears Home Services Column */}
                    <div>
                        <h2 className="text-xl font-bold text-gray-700 mb-4">
                            Sears Home Services
                        </h2>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/contact" className="text-blue-900">
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="text-blue-900">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/careers" className="text-blue-900">
                                    Careers
                                </Link>
                            </li>
                            <li>
                                <Link href="/knowledge-center" className="text-blue-900">
                                    Knowledge Center
                                </Link>
                            </li>
                            <li>
                                <Link href="/locations" className="text-blue-900">
                                    Locations
                                </Link>
                            </li>
                            <li>
                                <Link href="/sears-home-advantage" className="text-blue-900">
                                    Sears Home Advantage
                                </Link>
                            </li>
                            <li>
                                <Link href="/help" className="text-blue-900">
                                    Help
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Our Services Column */}
                    <div>
                        <h2 className="text-xl font-bold text-gray-700 mb-4">
                            Our Services
                        </h2>
                        <div className="space-y-3">
                            <div>
                                <Link href="/services/appliance-repair" className="text-blue-900">
                                    Appliance Repair
                                </Link>
                            </div>
                            <div>
                                <Link href="/services/dishwasher" className="text-blue-900">
                                    Dishwasher
                                </Link>
                            </div>
                            <div>
                                <Link href="/services/dryer" className="text-blue-900">
                                    Dryer
                                </Link>
                            </div>
                            <div>
                                <Link href="/services/refrigerator" className="text-blue-900">
                                    Refrigerator
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Second Services Column */}
                    <div className="lg:block hidden">
                        <h2 className="text-xl font-bold text-gray-700 mb-4 opacity-0">
                            Services
                        </h2>
                        <div className="space-y-3">
                            <div>
                                <Link href="/services/maintenance" className="text-blue-900">
                                    Maintenance
                                </Link>
                            </div>
                            <div>
                                <Link href="/services/home-warranty" className="text-blue-900">
                                    Home Warranty
                                </Link>
                            </div>
                            <div>
                                <Link href="/services/lawn-garden" className="text-blue-900">
                                    Lawn & Garden
                                </Link>
                            </div>
                            <div>
                                <Link href="/services/washer" className="text-blue-900">
                                    Washer
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Second Services Column */}
                    <div className="lg:hidden">
                        <div className="space-y-3">
                            <div>
                                <Link href="/services/maintenance" className="text-blue-900">
                                    Maintenance
                                </Link>
                            </div>
                            <div>
                                <Link href="/services/home-warranty" className="text-blue-900">
                                    Home Warranty
                                </Link>
                            </div>
                            <div>
                                <Link href="/services/lawn-garden" className="text-blue-900">
                                    Lawn & Garden
                                </Link>
                            </div>
                            <div>
                                <Link href="/services/washer" className="text-blue-900">
                                    Washer
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Stay Connected Column */}
                    <div>
                        <h2 className="text-xl font-bold text-gray-700 mb-4">
                            Stay Connected
                        </h2>
                        <div className="mb-4 relative">
                                <Input
                                    type="email"
                                    placeholder="Your email address"
                                    className="p-3 border rounded-full focus:border-blue-600 text-black"
                                />
                                <Button className="cursor-pointer bg-linear-to-r from-[#76FFA3] to-[#48FFFF] font-semibold text-black px-3 py-2 rounded-full absolute top-0 right-0 h-full hover:bg-teal-600">
                                    Sign Up
                                </Button>
                        </div>
                        <p className="text-gray-700 text-xs mb-4 leading-relaxed">
                            Sign up for deals and tips about all that Sears Home Services offers, including appliance repair, DIY repair parts, home warranties and more.
                        </p>
                        
                    </div>
                </div>

                {/* Bottom Footer Links */}
                <div className="border-t border-gray-200 py-6">
                    <div className="flex flex-wrap gap-x-4 gap-y-2 mb-3 text-xs">
                        <Link href="/privacy-policy" className="text-gray-700">Privacy Policy</Link>
                        <Link href="/ca-privacy-policy" className="text-gray-700">CA Privacy Policy</Link>
                        <Link href="/do-not-sell" className="text-gray-700">Do Not Sell or Share My Personal Information</Link>
                        <Link href="/terms-of-use" className="text-gray-700">Terms of Use</Link>
                        <Link href="/mobile-terms" className="text-gray-700">Mobile Terms</Link>
                        <Link href="/license-info" className="text-gray-700">License Info</Link>
                        <Link href="/sitemap" className="text-gray-700">Site Map</Link>
                    </div>
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <p className="text-gray-600 text-xs">
                            ©2025 Transform SR Brands LLC. All Rights Reserved.
                        </p>
                        <div className="flex gap-3">
                            <Link href="#" className="text-gray-600 hover:text-gray-900">
                                <Instagram size={18} />
                            </Link>
                            <Link href="#" className="text-gray-600 hover:text-gray-900">
                                <Twitter size={18} />
                            </Link>
                            <Link href="#" className="text-gray-600 hover:text-gray-900">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z" />
                                </svg>
                            </Link>
                            <Link href="#" className="text-gray-600 hover:text-gray-900">
                                <Facebook size={18} />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}