import Navbar from '@/app/components/Navbar'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from '@radix-ui/react-dropdown-menu'
import { Link } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { CiChat1 } from 'react-icons/ci'
import { FaStar } from 'react-icons/fa'
import { IoIosArrowDown } from 'react-icons/io'
import { IoCallOutline } from 'react-icons/io5'
import imagee from '../../../../public/anniston.webp'
import Footer from '@/app/components/Footer'
import image2 from '../../../../public/image1.webp'

function page() {
    return (
        <div>
            <Navbar />
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

                    <Image width={900} height={600} src={imagee} alt="Hero Image" className='w-full h-auto rounded-lg' />

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
            </div>
            <div className="w-full xl:w-[75%] mx-auto mt-40">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 uppercase tracking-wide">
                        SERVICES AVAILABLE IN ANNISTON
                    </h2>

                    {/* Introduction Text */}
                    <div className="mb-6 text-gray-700 text-sm leading-relaxed space-y-4">
                        <p>
                            Are you looking for home services in Anniston? We've got you covered! Whether you need appliance repair, heating and air conditioning service, or carpet cleaning, we have experts in your area.
                        </p>

                        <p>
                            Schedule your{' '}
                            <Link href="/repair-service" className="text-blue-700 hover:underline font-semibold">
                                repair service
                            </Link>{' '}
                            appointment today!
                        </p>

                        <p>
                            Here's what one of our technicians says about working for Sears Home Services:
                        </p>

                        <p>
                            As a technician with over 15 years of experience, I've seen it all here in Anniston, AL. There's something special about serving a community you know so well. From the clanging of a stubborn washing machine to the hum of a perfectly repaired fridge, every job is unique. I take pride in offering reliable and efficient service, ensuring your appliances run smoothly. If youâ€™re in need of{' '}
                            <Link href="/appliance-repair-near-me" className="text-blue-700 hover:underline font-semibold">
                                appliance repair near me
                            </Link>
                            , know that Iâ€™m committed to bringing the best service right to your doorstep.
                        </p>
                    </div>

                    {/* Service Card */}
                    <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-sm mt-8">
                        {/* Image */}
                        <div className="relative w-full h-56">
                            <img
                                src={image2.src}
                                alt="Sears Appliance Repair Technician"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Card Content */}
                        <div className="p-6">
                            <h3 className="text-lg font-bold text-blue-900 mb-3">
                                Sears Appliance Repair
                            </h3>
                            <p className="text-gray-600 text-sm mb-6">
                                No matter where you bought it, we can fix it.
                            </p>
                            <Link
                                href="/appliance-repair"
                                className="inline-block px-6 py-2 border-2 border-blue-700 text-blue-700 rounded font-semibold hover:bg-blue-700 hover:text-white transition-colors text-sm"
                            >
                                Read More
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default page
