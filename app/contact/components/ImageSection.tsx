'use client'

import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from '@radix-ui/react-dropdown-menu'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { CiChat1 } from 'react-icons/ci'
import { FaStar } from 'react-icons/fa'
import { IoIosArrowDown } from 'react-icons/io'
import { IoCallOutline } from 'react-icons/io5'
import aboutImage from "@/public/about/aboutimage.webp"
import { Calendar } from 'lucide-react'

export default function Imagesection() {
    return (
        <div className='relative'>

            <Image src={aboutImage} alt="Hero Image" className='w-full h-auto rounded-lg' />

            {/* Main Content Card */}
            <div className='absolute top-[85%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-2xl p-8 max-w-lg w-[90%]'>

                <div className='flex flex-col gap-2'>
                    <h2 className='text-xl font-semibold'>
                        About Sears Home Services
                    </h2>
                    <span>
                        Call on our technicians to get the job done right on the first visit.
                    </span>
                    <Button className='flex items-center gap-2 w-fit bg-blue-700 text-white hover:bg-blue-800 cursor-pointer font-semibold text-lg px-8 py-5 rounded-md transition-colors'>
                        <Calendar className='size-6' /> <span>Schedule Now</span>
                    </Button>
                </div>
            </div>
        </div>
    )
}