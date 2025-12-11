"use client"
import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from '@radix-ui/react-dropdown-menu'
import { CiChat1 } from 'react-icons/ci'
import { FaStar } from 'react-icons/fa'
import { IoIosArrowDown } from 'react-icons/io'
import { IoCallOutline } from 'react-icons/io5'
import Image from 'next/image'
import img from '@/public/alabamaImage.webp'
import { Calendar, Wrench, FileCheck, Star, User } from 'lucide-react';
import { Refrigerator, WashingMachine, Wind, Microwave, Droplet, Flame, Snowflake } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import { useParams } from 'next/navigation'
import { MdStars } from 'react-icons/md'


const StarRating = ({ rating }: { rating: number }) => {
    return (
        <div className="flex gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
                <Star
                    key={i}
                    className={`w-5 h-5 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                        }`}
                />
            ))}
        </div>
    );
};

const resources = [
    {
        image: "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=400&h=300&fit=crop",
        title: "Deciphering Samsung Clothes Dryer Error Codes",
        readTime: "5 min read",
        difficulty: "Dec 09",
        description: "Find the most common Samsung clothes dryer error codes and their solutions. Get professional help...",
        category: "Dryer"
    },
    {
        image: "https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=400&h=300&fit=crop",
        title: "Troubleshooting Garage Door Opener Power Issues",
        readTime: "3 min read",
        difficulty: "Dec 09",
        description: "Sears Home Services specializes in troubleshooting power issues in garage door openers. Get the help...",
        category: "Garage Door Opener"
    },
    {
        image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=400&h=300&fit=crop",
        title: "How Can I Prepare for Rolling Blackouts?",
        readTime: "9 min read",
        difficulty: "Dec 09",
        description: "Prepare for rolling blackouts with these expert tips from Sears Home Services.",
        category: "Generator"
    },
    {
        image: "https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=400&h=300&fit=crop",
        title: "8 Steps to Install a Wood Fence",
        readTime: "13 min read",
        difficulty: "Dec 09",
        description: "Get expert advice and learn about the 8 steps you need to follow to install a wood fence.",
        category: "Fencing"
    }
];

const reviews = [
    {
        title: "Top Notch Service",
        rating: 5,
        text: "Cesar was very thorough and professional in dealing with the plumbing issue with our Refrigerator. My wife and I were very satisfied with his work.",
        author: "MARK A. OOLTEWAH, TN"
    },
    {
        title: "Excellent!",
        rating: 5,
        text: "Clayton was very friendly, professional and thorough! He took care of my problem in no time and let us know what to expect. I really appreciate his work and his demeanor. Thanks so...",
        author: "NANCY M. PALMYRA, MO"
    },
    {
        title: "VERY PROFESSIONAL, AND KNO...",
        rating: 5,
        text: "WE FOUND OUT THAT IT WAS CHEAPER TO BUY A NEW REFRIDGERATOR, THAN TO GET THIS ONE FIXED, OUTSIDE OF THAT MR. JEFF WAS VERY COURTUS....",
        author: "PAMELA B. PASADENA, MD"
    }
];

const glossaryTerms = [
    {
        title: "What is the drum of the washing machine?",
        description: "The drum is the core part of the washer that holds your laundry and enables the cleaning process...."
    },
    {
        title: "What is a 608 Certification?",
        description: "The 608 Certification, regulated by the Environmental Protection Agency (EPA), is required for HVA..."
    },
    {
        title: "What is a Compressor?",
        description: "A compressor is a mechanical device that increases the pressure of a gas by reducing its volume...."
    },
    {
        title: "What is a Condenser?",
        description: "A condenser is a component of HVAC and refrigeration systems, responsible for releasing absorbed..."
    }
];

const symptoms = [
    {
        title: "Payne central air not working",
        description: "When your Payne central air conditioner won't turn on or isn't cooling, check for power problem..."
    },
    {
        title: "ICP central air not working",
        description: "When your ICP central air conditioner won't turn on or isn't cooling, check for power problem..."
    },
    {
        title: "Heil central air not working",
        description: "When your Heil central air conditioner won't turn on or isn't cooling, check for power problem..."
    },
    {
        title: "Carrier central air not working",
        description: "When your Carrier central air conditioner won't turn on or isn't cooling, check for power problem..."
    },
    {
        title: "Comfortmaker central air not working",
        description: "When your Comfortmaker central air conditioner won't turn on or isn't cooling, check for power..."
    },
    {
        title: "Ruud central air not working",
        description: "When your Ruud central air conditioner won't turn on or isn't cooling, check for power problem..."
    }
];

const locations = [
    {
        name: "Sears Appliance Repair",
        address: "1000 E 41st, Austin, Texas 78751",
        isTopLocation: true
    },
    {
        name: "Sears Appliance Repair",
        address: "2901 S Capitol of Texas Highway, Austin, Texas 78746",
        isTopLocation: false
    },
    {
        name: "Sears Appliance Repair",
        address: "12625 N I-H 35, Austin, Texas 78753",
        isTopLocation: false
    }
]

function page() {
    const params = useParams();
    return (
        <div className='w-full xl:w-[75%] mx-auto mt-6'>
            <div className='relative max-w-[1200px]  mx-auto'>
                {/* Customer Reviews Badge */}
                <div className='absolute top-4 left-4 bg-white rounded-lg shadow-md px-4 py-2 flex items-center gap-2 z-10'>
                    <div className='flex items-center gap-1'>
                        {[...Array(5)].map((_, i) => (
                            <FaStar key={i} className='text-yellow-400 w-4 h-4' />
                        ))}
                    </div>
                    <span className='text-blue-600 font-medium text-sm'>177939 Customer Reviews</span>
                </div>

                <Image src={img} alt="Hero Image" className='w-full h-auto rounded-lg' />

                {/* Main Content Card */}
                <div className='absolute top-[80%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-2xl p-8 max-w-2xl w-[90%]'>

                    {/* Blue Banner */}
                    <div className='bg-blue-700 text-white px-4 py-2 rounded-t-lg -mx-8 -mt-8 mb-6'>
                        <p className='text-center text-sm md:text-base'>
                            <span className='font-semibold'>Need us fast?</span> <span className='italic'>Schedule now for same/next day service.</span>
                        </p>
                    </div>

                    {/* Heading */}
                    <div className='mb-6'>
                        <h1 className='font-bold text-3xl text-blue-950 mb-3'>Appliance Repair & HVAC System Services in Alabama</h1>
                        <p className='text-gray-600 text-base leading-relaxed'>
                            We sWe serve all major cities in the US including Alabama for appliance repair and HVAC system services.                        </p>
                        <p className='text-gray-600 text-base'>Schedule service your way</p>
                    </div>

                    {/* Dropdown and Button */}
                    <div className='flex flex-col md:flex-row items-stretch gap-3 mb-6 w-full'>
                        <DropdownMenu>
                            <DropdownMenuTrigger className="flex justify-between items-center bg-white border-2 border-gray-300 rounded-lg px-4 py-2 font-medium text-gray-700 cursor-pointer hover:border-gray-400 transition-colors flex-1">
                                <span>Select Appliance</span>
                                <IoIosArrowDown className="ml-2" />
                            </DropdownMenuTrigger>

                            <DropdownMenuContent
                                className="w-full min-w-[300px] bg-white border border-gray-300 rounded-lg shadow-md mt-1"
                                align="start" // aligns left edge with trigger
                            >
                                <DropdownMenuLabel>Select Appliance Type</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Refrigerator</DropdownMenuItem>
                                <DropdownMenuItem>Washer</DropdownMenuItem>
                                <DropdownMenuItem>Dryer</DropdownMenuItem>
                                <DropdownMenuItem>Dishwasher</DropdownMenuItem>
                                <DropdownMenuItem>Oven/Range</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>


                        <Button className='bg-blue-700 text-white hover:bg-blue-800 cursor-pointer font-semibold text-lg px-8 py-5 rounded-md transition-colors'>
                            Schedule Now
                        </Button>
                    </div>

                    {/* Contact Options */}
                    <div className='flex items-start justify-between  mb-4'>
                        <Link href={"/page"} className='flex items-center justify-center gap-2 w-full bg-gray-100 py-2 rounded-lg mr-2'>
                            <IoCallOutline className='w-5 h-5' />
                            <span>Call</span>
                            <span className='font-bold text-blue-800'>(802) 552-4364</span>
                        </Link>
                        <Link href={"/page"} className='flex items-center justify-center gap-2 w-full bg-gray-100 text-center py-2 rounded-lg mr-2'>
                            <CiChat1 className='w-6 h-6 ' />
                            <span>Chat</span>
                        </Link>
                    </div>

                    {/* Warranty Link */}
                    <Link href={"/page"} className='text-sm text-blue-600 hover:text-blue-800 font-medium hover:underline transition-colors block'>
                        Will you be using repair benefits from a Sears or other warranty plan?
                    </Link>
                </div>
            </div>

            {locations &&
                <div className="border-b pb-20 pt-48 bg-white">
                    {/* Header */}
                    <h2 className="text-2xl font-bold text-blue-900 mb-8 uppercase tracking-wide">
                        LOCATIONS
                    </h2>

                    {/* Locations Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {locations.map((location, index) => (
                                <Link
                                    key={index}
                                    className="border border-gray-300 rounded-lg p-6 hover:shadow-[0_0_10px_rgba(0,0,0,0.25)] transition-shadow duration-300 bg-white relative"
                                    href={`/locations/${params.state}/${params.city}/sears-appliance-repair/${location.address.toLowerCase().replace(/,/g, "").replace(/\s+/g, "-").replace(/--+/g, "-").replace(/^-+|-+$/g, "")}`}
                                >
                                    {/* Top Location Badge */}
                                    {location.isTopLocation && (
                                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                            <div className="bg-white flex items-center gap-2 text-blue-950 font-semibold w-fit border border-gray-300 px-4 py-2 rounded-md">
                                                <MdStars />
                                                <span className="text-sm">
                                                    Top Location
                                                </span>
                                            </div>
                                        </div>
                                    )}

                                    {/* Location Name */}
                                    <h3 className="text-lg font-bold text-blue-900 mb-3 mt-2 hover:text-blue-700 cursor-pointer flex flex-col gap-1">
                                        <span>{params.city ? ` ${params.city.toString().toUpperCase()}` : ''}</span>
                                        <span className="text-sm">{location.name}</span>
                                    </h3>

                                    {/* Address */}
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                        {location.address}
                                    </p>
                                </Link>
                        ))}
                    </div>
                </div>
            }

            <div className="py-20 bg-white">
                <h2 className="text-xl font-bold text-blue-900 mb-6 uppercase tracking-wide">
                    APPLIANCE REPAIR YOU CAN COUNT ON IN FORESTDALE, ALABAMA
                </h2>

                <div className="space-y-4 text-gray-700 text-sm leading-relaxed mb-8">
                    <p>
                        When a home appliance breaks down, quick action matters. At Sears Home Services, we deliver dependable{' '}
                        <Link href="#" className="text-blue-600 hover:underline">
                            appliance repair
                        </Link>{' '}
                        throughout Forestdale, Alabama. Whether it's a malfunctioning oven, a leaking washer, or a fridge that's lost its chill — we're here to help with fast, expert service.
                    </p>

                    <p>
                        With a focus on quality, convenience, and customer care, our local team brings{' '}
                        <Link href="#" className="text-blue-600 hover:underline">
                            appliance repair services
                        </Link>{' '}
                        directly to your door — no guesswork, no hassle.
                    </p>
                </div>

                <div className="mb-8">
                    <h3 className="text-lg font-bold text-blue-900 mb-4">
                        What We Repair in Forestdale
                    </h3>

                    <p className="text-gray-700 text-sm leading-relaxed mb-4">
                        Our technicians are trained to resolve a wide range of appliance problems. From performance issues to part replacements, we're equipped for both standard and specialty repairs, including:
                    </p>

                    <ul className="space-y-2 ml-6">
                        <li className="text-gray-700 text-sm leading-relaxed">
                            <span className="font-semibold">Refrigerator repair:</span> Cooling failures, ice maker issues, and broken seals
                        </li>
                        <li className="text-gray-700 text-sm leading-relaxed">
                            <span className="font-semibold">Dishwasher repair:</span> Water drainage, leaks, and poor cleaning cycles
                        </li>
                        <li className="text-gray-700 text-sm leading-relaxed">
                            <span className="font-semibold">Washing machine & dryer repair:</span> Drum problems, spinning failures, and temperature faults
                        </li>
                        <li className="text-gray-700 text-sm leading-relaxed">
                            <span className="font-semibold">Range, oven & cooktop repair:</span> Burners not lighting, uneven heating, or control panel errors
                        </li>
                        <li className="text-gray-700 text-sm leading-relaxed">
                            <span className="font-semibold">HVAC & furnace service:</span>{' '}
                            <Link href="#" className="text-blue-600 hover:underline">
                                Inconsistent airflow
                            </Link>
                            , thermostat issues, and ignition failures;
                        </li>
                    </ul>

                    <p className="text-gray-700 text-sm leading-relaxed mt-3 ml-6">
                        We work on all major appliance brands, including GE, Samsung, Whirlpool, LG, KitchenAid, Frigidaire, Kenmore, and others — plus high-performance models like Bosch, Electrolux, and Jenn-Air.
                    </p>
                </div>

                <div className="mb-8">
                    <h3 className="text-lg font-bold text-blue-900 mb-4">
                        Why Sears is the Right Choice for Appliance Repair
                    </h3>

                    <p className="text-gray-700 text-sm leading-relaxed mb-4">
                        Unlike generic appliance repair services, we deliver a tailored experience backed by:
                    </p>

                    <ul className="space-y-2 ml-6">
                        <li className="text-gray-700 text-sm leading-relaxed">
                            Skilled, certified technicians
                        </li>
                        <li className="text-gray-700 text-sm leading-relaxed">
                            Clear, upfront estimates with no surprise fees
                        </li>
                        <li className="text-gray-700 text-sm leading-relaxed">
                            Same-day or next-day appointment availability in many cases
                        </li>
                        <li className="text-gray-700 text-sm leading-relaxed">
                            Nationally trusted service, delivered locally
                        </li>
                        <li className="text-gray-700 text-sm leading-relaxed">
                            Work covered by warranty and our Satisfaction Guarantee
                        </li>
                    </ul>

                    <p className="text-gray-700 text-sm leading-relaxed mt-4">
                        Our goal? To restore your appliances efficiently and affordably — the first time.
                    </p>
                </div>
            </div>

            <div className=" bg-white">
                {/* How It Works Header */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-blue-900 mb-6">
                        How It Works: Our Simple 3-Step Process
                    </h2>

                    {/* Step 1 */}
                    <div className="mb-6">
                        <h3 className="text-lg font-bold text-blue-900 mb-2">
                            1. Schedule Service
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            Book online or call — flexible time slots and local availability make it easy to get started.
                        </p>
                    </div>

                    {/* Step 2 */}
                    <div className="mb-6">
                        <h3 className="text-lg font-bold text-blue-900 mb-2">
                            2. Get a Diagnosis
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            A technician will arrive at your home, inspect the issue, and explain exactly what is needed.
                        </p>
                    </div>

                    {/* Step 3 */}
                    <div className="mb-6">
                        <h3 className="text-lg font-bold text-blue-900 mb-2">
                            3. Complete the Repair
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            We'll get your appliance back up and running using high-quality replacement parts — quickly and reliably.
                        </p>
                    </div>
                </div>

                {/* Testimonial */}
                <div className="mb-10">
                    <h3 className="text-lg font-bold text-blue-900 mb-3">
                        A Word from Our Local Sears Home Services Technician
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                        As a technician with over 15 years of experience right here in Forestdale, Alabama, I've come to truly appreciate the value of reliable and efficient home services. There's nothing quite like the satisfaction of fixing a stubborn appliance and seeing the relief on a customer's face. Our community deserves quality services, and that's what we strive to deliver every day. Whether it's a finicky fridge or a worn-out washer, we're here to put things back on track. If you're searching for <span className="font-semibold">home appliance repair near me</span>, look no further than our dedicated team at Sears Home Services. We understand the unique needs of our Forestdale neighbors and are committed to providing top-notch service with a personal touch.
                    </p>
                </div>

                {/* Main Title */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-blue-900 mb-4">
                        Schedule Appliance Repair in Forestdale, Alabama
                    </h2>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                        Don't let a malfunctioning appliance disrupt your home life. Choose Sears Appliance Repair in Forestdale for dependable, local service — whether you're in the city center, uptown, or suburban neighborhoods — we're nearby and ready to help.
                    </p>
                    <p className="text-gray-600 text-sm leading-relaxed">
                        <a href="#" className="text-blue-600 hover:underline">Book your appliance repair now</a> or call us at <span className="font-semibold">1-802-613-1926</span> to speak with a representative. We're often available the same day in neighborhoods across Forestdale.
                    </p>
                </div>

                {/* How It Works Section */}
                <div className="border-t border-gray-200 pt-10">
                    <h2 className="text-xl font-bold text-blue-900 mb-8 uppercase tracking-wide">
                        How It Works
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Easy Scheduling */}
                        <div className="text-center">
                            <div className="flex justify-center mb-4">
                                <div className="w-16 h-16 flex items-center justify-center">
                                    <Calendar className="w-12 h-12 text-blue-600" strokeWidth={1.5} />
                                </div>
                            </div>
                            <h3 className="text-sm font-bold text-blue-900 mb-3 uppercase tracking-wide">
                                Easy Scheduling
                            </h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Book online in less than a minute.
                            </p>
                        </div>

                        {/* Diagnostic Fee */}
                        <div className="text-center">
                            <div className="flex justify-center mb-4">
                                <div className="w-16 h-16 flex items-center justify-center">
                                    <Wrench className="w-12 h-12 text-blue-600" strokeWidth={1.5} />
                                </div>
                            </div>
                            <h3 className="text-sm font-bold text-blue-900 mb-3 uppercase tracking-wide">
                                Diagnostic Fee
                            </h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Apply your diagnostic fee to the costs of repair.
                            </p>
                        </div>

                        {/* Expert Technicians */}
                        <div className="text-center">
                            <div className="flex justify-center mb-4">
                                <div className="w-16 h-16 flex items-center justify-center">
                                    <FileCheck className="w-12 h-12 text-blue-600" strokeWidth={1.5} />
                                </div>
                            </div>
                            <h3 className="text-sm font-bold text-blue-900 mb-3 uppercase tracking-wide">
                                Expert Technicians
                            </h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Save up to $150 on your repair if you enroll in a home warranty.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="py-20 bg-white">
                {/* Common Repair Services */}
                <div className="mb-16">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">
                        Learn about our most common repair services
                    </h2>
                    <ul className="space-y-2">
                        <li>
                            <Link href="#" className="text-blue-600 hover:underline text-sm">
                                Oven Repair Service
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="text-blue-600 hover:underline text-sm">
                                Refrigerator Repair Service
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="text-blue-600 hover:underline text-sm">
                                Dishwasher Repair Service
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="text-blue-600 hover:underline text-sm">
                                Washing Machine Repair Service
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="text-blue-600 hover:underline text-sm">
                                Dryer Repair Service
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Why Sears Home Services */}
                <div className="border-t border-gray-200 pt-12 mb-16">
                    <h2 className="text-xl font-bold text-blue-900 mb-10 uppercase tracking-wide">
                        Why Sears Home Services?
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Happy Customers */}
                        <div className="text-left">
                            <div className="mb-4">
                                <Star className="w-10 h-10 text-yellow-400 fill-yellow-400" strokeWidth={1.5} />
                            </div>
                            <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">
                                Happy Customers
                            </h3>
                            <p className="text-gray-600 text-xs leading-relaxed">
                                Average of 4,600,000+ homes serviced/year. Over 1,000,000 5 star ratings.
                            </p>
                        </div>

                        {/* Flexible Scheduling */}
                        <div className="text-left">
                            <div className="mb-4">
                                <Calendar className="w-10 h-10 text-blue-600" strokeWidth={1.5} />
                            </div>
                            <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">
                                Flexible Scheduling
                            </h3>
                            <p className="text-gray-600 text-xs leading-relaxed">
                                Available 6 days a week in most areas.
                            </p>
                        </div>

                        {/* Expert Technicians */}
                        <div className="text-left">
                            <div className="mb-4">
                                <User className="w-10 h-10 text-blue-600" strokeWidth={1.5} />
                            </div>
                            <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">
                                Expert Technicians
                            </h3>
                            <p className="text-gray-600 text-xs leading-relaxed">
                                2,500+ manufacturer-trained technicians with an average of 10+ years of experience.
                            </p>
                        </div>

                        {/* Quality Parts */}
                        <div className="text-left">
                            <div className="mb-4">
                                <Wrench className="w-10 h-10 text-blue-600" strokeWidth={1.5} />
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

                {/* Brands We Repair */}
                <div className="border-t border-gray-200 pt-12">
                    <h2 className="text-xl font-bold text-gray-900 mb-4 uppercase tracking-wide">
                        Brands We Repair
                    </h2>

                    <p className="text-gray-600 text-sm mb-8">
                        We repair all major brands, no matter where you bought it.
                    </p>

                    {/* Brand Logos - Row 1 */}
                    <div className="flex flex-wrap items-center justify-center gap-12 mb-8">
                        <div className="grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all">
                            <span className="text-2xl font-serif text-gray-700">Kenmore</span>
                        </div>
                        <div className="grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all">
                            <span className="text-2xl font-bold text-gray-700">Whirlpool</span>
                        </div>
                        <div className="grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all">
                            <span className="text-xl font-bold text-gray-700 tracking-wider">FRIGIDAIRE</span>
                        </div>
                        <div className="grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all">
                            <span className="text-2xl font-bold text-gray-700">MAYTAG</span>
                        </div>
                        <div className="grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all">
                            <span className="text-2xl font-serif text-gray-700">GE</span>
                        </div>
                        <div className="grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all">
                            <span className="text-xl font-bold text-gray-700">KitchenAid</span>
                        </div>
                    </div>

                    {/* Brand Logos - Row 2 */}
                    <div className="flex flex-wrap items-center justify-center gap-12 mb-8">
                        <div className="grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all">
                            <span className="text-xl font-bold text-gray-700 tracking-wider">JENN-AIR</span>
                        </div>
                        <div className="grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all">
                            <span className="text-2xl font-bold text-gray-700">LG</span>
                        </div>
                        <div className="grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all">
                            <span className="text-xl text-gray-700">Electrolux</span>
                        </div>
                        <div className="grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all">
                            <span className="text-xl font-bold text-gray-700">BOSCH</span>
                        </div>
                        <div className="grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all">
                            <span className="text-xl font-bold text-gray-700 tracking-wider">SAMSUNG</span>
                        </div>
                    </div>

                    <div className="mt-6">
                        <Link href="#" className="text-blue-600 hover:underline text-sm">
                            See the complete list of brands we repair
                        </Link>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-16 bg-white">
                {/* Header */}
                <div className="mb-12">
                    <h2 className="text-3xl font-bold text-blue-900 mb-3 uppercase tracking-wide">
                        FIVE STAR SERVICE
                    </h2>
                    <p className="text-gray-600 text-base">
                        With more than 1.3 Million 5 Star Reviews, you don't have to take our word for it.
                    </p>
                </div>

                {/* Carousel */}
                <div className="relative ">
                    <Carousel
                        opts={{
                            align: "start",
                            loop: true,
                        }}
                        className="w-full"
                    >
                        <CarouselContent className="-ml-4">
                            {reviews.map((review, index) => (
                                <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3 p-2">
                                    <Card className="border-0 shadow-none bg-gray-50 h-full cursor-pointer hover:shadow-[0_0_10px_rgba(0,0,0,0.25)]">
                                        <CardContent className="p-6 flex flex-col h-full">
                                            {/* Title */}
                                            <h3 className="text-lg font-semibold text-blue-900 mb-3">
                                                {review.title}
                                            </h3>

                                            {/* Star Rating */}
                                            <StarRating rating={review.rating} />

                                            {/* Review Text */}
                                            <p className="text-gray-700 text-sm leading-relaxed mb-6 grow">
                                                {review.text}
                                            </p>

                                            {/* Author */}
                                            <div className="flex items-center gap-2 mt-auto pt-4 border-t border-gray-200">
                                                <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                                                    <User className="w-5 h-5 text-gray-500" />
                                                </div>
                                                <span className="text-sm text-gray-600 italic">
                                                    {review.author}
                                                </span>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </CarouselItem>
                            ))}
                        </CarouselContent>

                        {/* Navigation Buttons */}
                        <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 bg-white border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-colors cursor-pointer size-10" />
                        <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 bg-white border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-colors cursor-pointer size-10" />
                    </Carousel>
                </div>
            </div>

            <div className="bg-white">
                {/* Learn More About Our Services */}
                <div className="border-t border-gray-200 pt-8 mb-16">
                    <h2 className="text-lg font-bold text-blue-900 mb-8 uppercase tracking-wide">
                        Learn More About Our Services
                    </h2>

                    <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
                        {/* Appliances Column */}
                        <div>
                            <h3 className="text-sm font-bold text-blue-900 mb-4 uppercase tracking-wide">
                                Appliances
                            </h3>
                            <ul className="space-y-2">
                                <li><Link href="#" className="text-blue-600 hover:underline text-xs">Cooktop</Link></li>
                                <li><Link href="#" className="text-blue-600 hover:underline text-xs">Double Oven</Link></li>
                                <li><Link href="#" className="text-blue-600 hover:underline text-xs">Freezer</Link></li>
                                <li><Link href="#" className="text-blue-600 hover:underline text-xs">Gas Grill</Link></li>
                                <li><Link href="#" className="text-blue-600 hover:underline text-xs">Microwave</Link></li>
                                <li><Link href="#" className="text-blue-600 hover:underline text-xs">Range Hood</Link></li>
                                <li><Link href="#" className="text-blue-600 hover:underline text-xs">Oven</Link></li>
                                <li><Link href="#" className="text-blue-600 hover:underline text-xs">Trash Compactor</Link></li>
                                <li><Link href="#" className="text-blue-600 hover:underline text-xs">Washer Dryer Combo</Link></li>
                            </ul>
                        </div>

                        {/* Second Appliances Column */}
                        <div>
                            <h3 className="text-sm font-bold text-blue-900 mb-4 uppercase tracking-wide opacity-0">
                                Appliances
                            </h3>
                            <ul className="space-y-2">
                                <li><Link href="#" className="text-blue-600 hover:underline text-xs">Dishwasher</Link></li>
                                <li><Link href="#" className="text-blue-600 hover:underline text-xs">Dryer</Link></li>
                                <li><Link href="#" className="text-blue-600 hover:underline text-xs">Garbage Disposal</Link></li>
                                <li><Link href="#" className="text-blue-600 hover:underline text-xs">Ice Maker</Link></li>
                                <li><Link href="#" className="text-blue-600 hover:underline text-xs">Range</Link></li>
                                <li><Link href="#" className="text-blue-600 hover:underline text-xs">Refrigerator</Link></li>
                                <li><Link href="#" className="text-blue-600 hover:underline text-xs">Stacked Laundry</Link></li>
                                <li><Link href="#" className="text-blue-600 hover:underline text-xs">Washer</Link></li>
                            </ul>
                        </div>

                        {/* Cooling & Heating Column */}
                        <div>
                            <h3 className="text-sm font-bold text-blue-900 mb-4 uppercase tracking-wide">
                                Cooling & Heating
                            </h3>
                            <ul className="space-y-2">
                                <li><Link href="#" className="text-blue-600 hover:underline text-xs">Boiler</Link></li>
                                <li><Link href="#" className="text-blue-600 hover:underline text-xs">Furnace</Link></li>
                                <li><Link href="#" className="text-blue-600 hover:underline text-xs">Gas Furnace</Link></li>
                                <li><Link href="#" className="text-blue-600 hover:underline text-xs">HVAC</Link></li>
                                <li><Link href="#" className="text-blue-600 hover:underline text-xs">Heat Pump</Link></li>
                                <li><Link href="#" className="text-blue-600 hover:underline text-xs">Humidifier & Dehumidifier</Link></li>
                                <li><Link href="#" className="text-blue-600 hover:underline text-xs">Water Heater</Link></li>
                            </ul>
                        </div>

                        {/* Fitness & Lawn Column */}
                        <div>
                            <h3 className="text-sm font-bold text-blue-900 mb-4 uppercase tracking-wide">
                                Fitness
                            </h3>
                            <ul className="space-y-2 mb-6">
                                <li><Link href="#" className="text-blue-600 hover:underline text-xs">Elliptical Machine</Link></li>
                                <li><Link href="#" className="text-blue-600 hover:underline text-xs">Stationary Bike</Link></li>
                                <li><Link href="#" className="text-blue-600 hover:underline text-xs">Stepper</Link></li>
                                <li><Link href="#" className="text-blue-600 hover:underline text-xs">Treadmill</Link></li>
                            </ul>
                        </div>
                        <div>

                            <h3 className="text-sm font-bold text-blue-900 mb-4 uppercase tracking-wide">
                                Lawn & Garden
                            </h3>
                            <ul className="space-y-2">
                                <li><Link href="#" className="text-blue-600 hover:underline text-xs">Riding Mower</Link></li>
                                <li><Link href="#" className="text-blue-600 hover:underline text-xs">Snowblower</Link></li>
                                <li><Link href="#" className="text-blue-600 hover:underline text-xs">Wide-Deck Lawn Mower</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Sears Appliance Repair Services */}
                <div className="border-t border-gray-200 pt-12">
                    <h2 className="text-base font-bold text-blue-900 mb-8 uppercase tracking-wide">
                        Sears Appliance Repair Services Near You -- We Repair All Major Appliances
                    </h2>

                    {/* Top Row of Appliances */}
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-8">
                        {/* Refrigerator */}
                        <div className="flex flex-col items-center text-center">
                            <div className="w-16 h-16 flex items-center justify-center mb-3">
                                <Refrigerator className="w-12 h-12 text-blue-600" strokeWidth={1.5} />
                            </div>
                            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wide">
                                Refrigerator
                            </h3>
                        </div>

                        {/* Washer */}
                        <div className="flex flex-col items-center text-center">
                            <div className="w-16 h-16 flex items-center justify-center mb-3">
                                <WashingMachine className="w-12 h-12 text-blue-600" strokeWidth={1.5} />
                            </div>
                            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wide">
                                Washer
                            </h3>
                        </div>

                        {/* Dryer */}
                        <div className="flex flex-col items-center text-center">
                            <div className="w-16 h-16 flex items-center justify-center mb-3">
                                <Wind className="w-12 h-12 text-blue-600" strokeWidth={1.5} />
                            </div>
                            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wide">
                                Dryer
                            </h3>
                        </div>

                        {/* Dishwasher */}
                        <div className="flex flex-col items-center text-center">
                            <div className="w-16 h-16 flex items-center justify-center mb-3">
                                <svg className="w-12 h-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <rect x="4" y="3" width="16" height="18" rx="1" />
                                    <line x1="4" y1="8" x2="20" y2="8" />
                                    <circle cx="7" cy="5.5" r="0.5" fill="currentColor" />
                                    <circle cx="9" cy="5.5" r="0.5" fill="currentColor" />
                                    <circle cx="11" cy="5.5" r="0.5" fill="currentColor" />
                                </svg>
                            </div>
                            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wide">
                                Dishwasher
                            </h3>
                        </div>

                        {/* Range */}
                        <div className="flex flex-col items-center text-center">
                            <div className="w-16 h-16 flex items-center justify-center mb-3">
                                <svg className="w-12 h-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <rect x="4" y="4" width="16" height="16" rx="1" />
                                    <circle cx="8" cy="9" r="1.5" />
                                    <circle cx="16" cy="9" r="1.5" />
                                    <circle cx="8" cy="15" r="1.5" />
                                    <circle cx="16" cy="15" r="1.5" />
                                </svg>
                            </div>
                            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wide">
                                Range
                            </h3>
                        </div>
                    </div>

                    {/* Bottom Row of Appliances */}
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-8">
                        {/* Oven */}
                        <div className="flex flex-col items-center text-center">
                            <div className="w-16 h-16 flex items-center justify-center mb-3">
                                <svg className="w-12 h-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <rect x="5" y="6" width="14" height="12" rx="1" />
                                    <line x1="5" y1="10" x2="19" y2="10" />
                                    <circle cx="8" cy="8" r="0.5" fill="currentColor" />
                                    <circle cx="11" cy="8" r="0.5" fill="currentColor" />
                                    <circle cx="14" cy="8" r="0.5" fill="currentColor" />
                                </svg>
                            </div>
                            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wide">
                                Oven
                            </h3>
                        </div>

                        {/* HVAC */}
                        <div className="flex flex-col items-center text-center">
                            <div className="w-16 h-16 flex items-center justify-center mb-3">
                                <Flame className="w-12 h-12 text-blue-600" strokeWidth={1.5} />
                            </div>
                            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wide">
                                HVAC
                            </h3>
                        </div>

                        {/* Freezer */}
                        <div className="flex flex-col items-center text-center">
                            <div className="w-16 h-16 flex items-center justify-center mb-3">
                                <Snowflake className="w-12 h-12 text-blue-600" strokeWidth={1.5} />
                            </div>
                            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wide">
                                Freezer
                            </h3>
                        </div>

                        {/* Water Heater */}
                        <div className="flex flex-col items-center text-center">
                            <div className="w-16 h-16 flex items-center justify-center mb-3">
                                <Droplet className="w-12 h-12 text-blue-600" strokeWidth={1.5} />
                            </div>
                            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wide">
                                Water Heater
                            </h3>
                        </div>

                        {/* Cooktop */}
                        <div className="flex flex-col items-center text-center">
                            <div className="w-16 h-16 flex items-center justify-center mb-3">
                                <svg className="w-12 h-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <rect x="4" y="8" width="16" height="10" rx="1" />
                                    <circle cx="8" cy="11" r="1" />
                                    <circle cx="16" cy="11" r="1" />
                                    <circle cx="8" cy="15" r="1" />
                                    <circle cx="16" cy="15" r="1" />
                                </svg>
                            </div>
                            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wide">
                                Cooktop
                            </h3>
                        </div>
                    </div>

                    {/* Schedule Link */}
                    <div className="mt-8">
                        <Link href="#" className="text-blue-600 hover:underline text-sm">
                            Schedule all other repairs
                        </Link>
                    </div>
                </div>
            </div>

            <div className="w-[70%] mx-auto py-20">
                {/* Header */}
                <h2 className="text-3xl font-bold text-center text-blue-900 mb-12">
                    Repair Resources
                </h2>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {resources.map((resource, index) => (
                        <div key={index} className="border border-t-0 flex flex-col h-full shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                            {/* Image */}
                            <div className="relative overflow-hidden rounded-t-lg">
                                <img
                                    src={resource.image}
                                    alt={resource.title}
                                    className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                                />
                            </div>

                            {/* Content */}
                            <div className="bg-white p-6 rounded-b-lg  border-gray-200">
                                <h3 className="text-xl font-semibold text-blue-900 mb-3 hover:text-blue-700 cursor-pointer">
                                    {resource.title}
                                </h3>

                                <div className="flex items-center gap-3 text-sm text-gray-600 mb-3">
                                    <span>{resource.readTime}</span>
                                    <span>•</span>
                                    <span>{resource.difficulty}</span>
                                </div>

                                <p className="text-gray-700 text-sm leading-relaxed mb-4">
                                    {resource.description}
                                </p>

                                <div className="text-sm text-blue-600 font-medium">
                                    {resource.category}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Schedule All Other Repairs Link */}
                <div className="mt-8 text-center">
                    <a
                        href="#"
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline"
                    >
                        Schedule all other repairs
                    </a>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 py-12 bg-white">
                {/* Glossary Terms Section */}
                <div className="mb-16">
                    <h2 className="text-2xl font-bold text-blue-900 mb-8">
                        Glossary Terms
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                        {glossaryTerms.map((term, index) => (
                            <div key={index}>
                                <h3 className="text-base font-semibold text-blue-900 mb-2 hover:text-blue-700 cursor-pointer">
                                    {term.title}
                                </h3>
                                <p className="text-sm text-gray-700 leading-relaxed">
                                    {term.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Common Appliance Symptoms Section */}
                <div>
                    <h2 className="text-2xl font-bold text-blue-900 mb-8">
                        Common Appliance Symptoms
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                        {symptoms.map((symptom, index) => (
                            <div key={index}>
                                <h3 className="text-base font-semibold text-blue-900 mb-2 hover:text-blue-700 cursor-pointer">
                                    {symptom.title}
                                </h3>
                                <p className="text-sm text-gray-700 leading-relaxed">
                                    {symptom.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default page
