"use client"
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from '@radix-ui/react-dropdown-menu'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { CiChat1 } from 'react-icons/ci'
import { FaStar } from 'react-icons/fa'
import { IoIosArrowDown } from 'react-icons/io'
import { IoCallOutline } from 'react-icons/io5'
import imagee from '../../../../public/alabamaImage.webp'
import { useParams } from 'next/navigation'

interface HeroSectionProps {
    cities: string[];
    description: string;
}

function CityHeroSection({ cities, description }: HeroSectionProps) {

    const params = useParams();

    return (
        <div className='w-full xl:w-[75%] mx-auto mt-6 '>
            <div className='relative'>
                {/* Customer Reviews Badge */}
                <div className='absolute top-4 left-4 bg-white rounded-lg shadow-md px-4 py-2 flex items-center gap-2 z-10'>
                    <div className='flex items-center gap-1'>
                        {[...Array(5)].map((_, i) => (
                            <FaStar key={i} className='text-yellow-400 w-4 h-4' />
                        ))}
                    </div>
                    <span className='text-blue-600 font-medium text-sm'>177939 Customer Reviews</span>
                </div>

                <Image width={800} height={400} src={imagee} alt="Hero Image" className='w-full h-auto rounded-lg' />

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

            <div>
                <p className='text-gray-500 mt-40'>
                    {description}
                </p>
            </div>

            <div className='grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 space-y-4 lg:space-y-0 gap-8  my-20 pb-10 border-b'>
                {
                    cities.map((city, index) => (
                        index <= 9 &&
                        <div key={index}>
                            <Link href={`/locations/${params.state}/${city.toLowerCase().replace(/\s+/g, '-')}`} className="text-blue-600 text-xl font-semibold hover:underline">
                                {city}
                            </Link>
                        </div>
                    ))
                }
            </div>

            <div className='grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 space-y-4 lg:space-y-0 gap-8 pb-20'>
                {
                    cities.map((city, index) => (
                        index > 9 &&
                        <div key={index}>
                            <Link href={`/locations/${params.state}/${city.toLowerCase().replace(/\s+/g, '-')}`} className="text-blue-600 text-xl font-semibold hover:underline">
                                {city}
                            </Link>
                        </div>
                    ))
                }
            </div>
        </div >
    )
}

export default CityHeroSection
