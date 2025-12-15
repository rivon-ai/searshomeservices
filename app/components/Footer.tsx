"use client"


import React from 'react'
import { Instagram, Twitter, Facebook } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

function Footer() {
    return (
        <footer className="w-full border-t py-20">
            <div className="max-w-7xl mx-auto">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    {/* Sears Home Services Column */}
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-4">
                            Sears Home Services
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/contact" className="text-gray-500 hover:underline text-sm">
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="text-gray-500 hover:underline text-sm">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/careers" className="text-gray-500 hover:underline text-sm">
                                    Careers
                                </Link>
                            </li>
                            <li>
                                <Link href="/knowledge-center" className="text-gray-500 hover:underline text-sm">
                                    Knowledge Center
                                </Link>
                            </li>
                            <li>
                                <Link href="/locations" className="text-gray-500 hover:underline text-sm">
                                    Locations
                                </Link>
                            </li>
                            <li>
                                <Link href="/sears-home-advantage" className="text-gray-500 hover:underline text-sm">
                                    Sears Home Advantage
                                </Link>
                            </li>
                            <li>
                                <Link href="/help" className="text-gray-500 hover:underline text-sm">
                                    Help
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Our Services Column */}
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-4">
                            Our Services
                        </h3>
                        <div className="grid grid-cols-2 gap-x-8">
                            <ul className="space-y-2">
                                <li>
                                    <Link href="/services/appliance-repair" className="text-gray-500 hover:underline text-sm">
                                        Appliance Repair
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/services/dishwasher" className="text-gray-500 hover:underline text-sm">
                                        Dishwasher
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/services/dryer" className="text-gray-500 hover:underline text-sm">
                                        Dryer
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/services/refrigerator" className="text-gray-500 hover:underline text-sm">
                                        Refrigerator
                                    </Link>
                                </li>
                            </ul>
                            <ul className="space-y-2">
                                <li>
                                    <Link href="/services/maintenance" className="text-gray-500 hover:underline text-sm">
                                        Maintenance
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/services/home-warranty" className="text-gray-500 hover:underline text-sm">
                                        Home Warranty
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/services/lawn-garden" className="text-gray-500 hover:underline text-sm">
                                        Lawn & Garden
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/services/washer" className="text-gray-500 hover:underline text-sm">
                                        Washer
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Empty Column for spacing */}
                    <div></div>

                    {/* Stay Connected Column */}
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-4">
                            Stay Connected
                        </h3>
                        <div className="flex gap-2 mb-4">
                            <input
                                type="email"
                                placeholder="Your email address"
                                className="flex-1 px-4 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-700"
                            />
                            <Button className="cursor-pointer bg-blue-700 text-white px-6 py-2 rounded font-semibold hover:bg-blue-800 transition-colors text-sm">
                                Sign Up
                            </Button>
                        </div>
                        <p className="text-gray-600 text-xs mb-4 leading-relaxed">
                            Sign up for deals and tips about all that Sears Home Services offers, including appliance repair, DIY repair parts, home warranties and more.
                        </p>
                        <div className="flex gap-4">
                            <Link href="#" className="text-gray-600 hover:text-gray-500">
                                <Instagram size={20} />
                            </Link>
                            <Link href="#" className="text-gray-600 hover:text-gray-500">
                                <Twitter size={20} />
                            </Link>
                            <Link href="#" className="text-gray-600 hover:text-gray-500">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" />
                                </svg>
                            </Link>
                            <Link href="#" className="text-gray-600 hover:text-gray-500">
                                <Facebook size={20} />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Cities Section */}
                <div className="py-20 mb-8">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">
                        Sears Home Services Available In These Cities
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-2">
                        <Link href="/locations/new-york-city" className="text-gray-500 hover:underline text-sm">New York City</Link>
                        <Link href="/locations/los-angeles" className="text-gray-500 hover:underline text-sm">Los Angeles</Link>
                        <Link href="/locations/chicago" className="text-gray-500 hover:underline text-sm">Chicago</Link>
                        <Link href="/locations/houston" className="text-gray-500 hover:underline text-sm">Houston</Link>
                        <Link href="/locations/phoenix" className="text-gray-500 hover:underline text-sm">Phoenix</Link>
                        <Link href="/locations/philadelphia" className="text-gray-500 hover:underline text-sm">Philadelphia</Link>
                        <Link href="/locations/san-antonio" className="text-gray-500 hover:underline text-sm">San Antonio</Link>
                        <Link href="/locations/san-diego" className="text-gray-500 hover:underline text-sm">San Diego</Link>
                        <Link href="/locations/dallas" className="text-gray-500 hover:underline text-sm">Dallas</Link>
                        <Link href="/locations/san-jose" className="text-gray-500 hover:underline text-sm">San Jose</Link>
                        <Link href="/locations/austin" className="text-gray-500 hover:underline text-sm">Austin</Link>
                        <Link href="/locations/jacksonville" className="text-gray-500 hover:underline text-sm">Jacksonville</Link>
                        <Link href="/locations/fort-worth" className="text-gray-500 hover:underline text-sm">Fort Worth</Link>
                        <Link href="/locations/columbus" className="text-gray-500 hover:underline text-sm">Columbus</Link>
                        <Link href="/locations/charlotte" className="text-gray-500 hover:underline text-sm">Charlotte</Link>
                        <Link href="/locations/indianapolis" className="text-gray-500 hover:underline text-sm">Indianapolis</Link>
                        <Link href="/locations/san-francisco" className="text-gray-500 hover:underline text-sm">San Francisco</Link>
                        <Link href="/locations/seattle" className="text-gray-500 hover:underline text-sm">Seattle</Link>
                        <Link href="/locations/denver" className="text-gray-500 hover:underline text-sm">Denver</Link>
                        <Link href="/locations/nashville" className="text-gray-500 hover:underline text-sm">Nashville</Link>
                        <div className="col-span-2 md:col-span-1">
                            <Link href="/locations" className="text-gray-500 hover:underline text-sm font-semibold inline-flex items-center">
                                See all states
                                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Bottom Footer Links */}
                <div className="border-t border-gray-300 pt-6">
                    <div className="flex flex-wrap gap-x-6 gap-y-2 mb-4 text-xs">
                        <Link href="/privacy-policy" className="text-gray-500 hover:underline">Privacy Policy</Link>
                        <Link href="/ca-privacy-policy" className="text-gray-500 hover:underline">CA Privacy Policy</Link>
                        <Link href="/do-not-sell" className="text-gray-500 hover:underline">Do Not Sell or Share My Personal Information</Link>
                        <Link href="/terms-of-use" className="text-gray-500 hover:underline">Terms of Use</Link>
                        <Link href="/mobile-terms" className="text-gray-500 hover:underline">Mobile Terms</Link>
                        <Link href="/license-info" className="text-gray-500 hover:underline">License Info</Link>
                        <Link href="/sitemap" className="text-gray-500 hover:underline">Site Map</Link>
                    </div>
                    <p className="text-gray-600 text-xs">
                        ©2024 Transform SR Brands LLC. All Rights Reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
