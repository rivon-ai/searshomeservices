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
import imagee from '@/public/alabamaImage.webp'
import image2 from '@/public/image1.webp'
import { useParams } from 'next/navigation'
import { MdStars } from 'react-icons/md'
import { Star, User } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface HeroSectionProps {
    cities: string[];
    state: string;
    description: string;
}

const reviews = [
    {
        title: "5 star",
        rating: 5,
        text: "Tech was very nice found problem very quick. On a scale 1-10 he was a 20 plus",
        author: "FLOYD M, ELKHART, IN",
        date: "OCTOBER 18, 2025"
    },
    {
        title: "Fixed Washer",
        rating: 5,
        text: "Did everything fairly quick and everything good now. Appreciate all the help!",
        author: "EDUARDO P, BRISTOL, IN",
        date: "SEPTEMBER 23, 2025"
    },
    {
        title: "Ruth Iannarelli",
        rating: 5,
        text: "The service man was friendly and informative. Very professional and pleasant.",
        author: "RUTH R, ELKHART, IN",
        date: "SEPTEMBER 04, 2025"
    },
    {
        title: "Excellent Service",
        rating: 5,
        text: "Amazing experience from start to finish. The technician was knowledgeable and efficient. Highly recommend!",
        author: "JOHN D, SOUTH BEND, IN",
        date: "AUGUST 15, 2025"
    },
    {
        title: "Great Job",
        rating: 5,
        text: "Fixed my refrigerator quickly and professionally. Very satisfied with the service provided.",
        author: "MARY S, GOSHEN, IN",
        date: "JULY 28, 2025"
    }
];

function MainSection({ cities, description, state }: HeroSectionProps) {

    const params = useParams();
    const city = params.city;
    const states = params.state;
    console.log("Params in CityHeroSection:", params);
    console.log("City in CityHeroSection:", states);

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

                <Image width={700} height={400} src={imagee} alt="Hero Image" className='w-full h-auto rounded-lg' />

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

            <div className="pt-48 bg-white pb-20">
                <h2 className="text-2xl font-bold text-blue-950 mb-6 uppercase tracking-wide">
                    SERVICES AVAILABLE IN {params.city?.toString().toUpperCase()}
                </h2>

                <div className="space-y-4 text-gray-700 text-sm leading-relaxed mb-6">
                    <p>
                        Are you looking for home services in Elkhart? We've got you covered! Whether you need appliance repair, heating and air conditioning service, or carpet cleaning, we have experts in your area.
                    </p>

                    <p>
                        Schedule your{' '}
                        <a href="#" className="text-blue-600 hover:underline">
                            repair service
                        </a>{' '}
                        appointment today!
                    </p>

                    <p>
                        Here's what one of our technicians says about working for Sears Home Services:
                    </p>

                    <p>
                        As a local technician with over 15 years of experience in Elkhart, Indiana, I've had the pleasure of helping countless neighbors with their home appliances. This city has a unique charm, and I find joy in ensuring that the community's appliances run smoothly, whether it's fixing a stubborn fridge or tuning up a heating system. It's not just about the repair; it's about connecting with people and providing reliable, timely service. If you ever find yourself in need of quick and dependable{' '}
                        <a href="#" className="text-blue-600 hover:underline">
                            appliance repair near me
                        </a>
                        , know that we're just a call or text away, ready to assist.
                    </p>
                </div>

                <div className="mt-8">
                    <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden max-w-md">
                        <div className="relative h-52">
                            <Image
                                src={image2}
                                alt="Technician repairing washing machine"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <div className="p-6 flex flex-col items-center">
                            <h3 className="text-lg font-bold text-blue-900 mb-3 text-start!">
                                Sears Appliance Repair
                            </h3>

                            <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                                No matter where you bought it, we can fix it.
                            </p>

                            <Button
                                variant="outline"
                                className="cursor-pointer border-2 border-blue-700 text-blue-700 hover:bg-blue-50 font-semibold px-6 py-2 rounded"
                            >
                                Read More
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className='py-20 '>
                <h1 className="text-2xl font-bold text-blue-950 mb-6 uppercase tracking-wide">
                    Location near {params.city?.toString().toUpperCase()}
                </h1>
                <div className='xl:pl-34'>
                    <div className='relative pt-6'>
                        <div className='max-w-xs p-4 pt-8 border border-gray-300 rounded-lg mb-6 hover:shadow-[0_0_10px_rgba(0,0,0,0.25)] cursor-pointer transition-shadow'>
                            <h1 className="text-xl font-bold text-blue-950 mb-6 uppercase">SEARS APPLIANCES REPAIR {params.city?.toString().toUpperCase()}</h1>
                            <p className='text-blue-900'>
                                154 28B W Hively Ave, Pierre Moran Mall, Elkhart, Indiana 46517
                            </p>
                        </div>
                        <div className="absolute top-0 left-16 bg-white flex items-center gap-2 text-blue-950 font-semibold w-fit border border-gray-300 px-4 py-2 rounded-md">
                            <MdStars /> Top Locations
                        </div>
                    </div>
                </div>
            </div>

            <div className="pb-20 bg-white">
                <div className="border-t border-gray-300 pt-16">
                    <h2 className="text-2xl font-bold text-blue-900 mb-4 uppercase tracking-wide">
                        FIVE STAR SERVICE
                    </h2>

                    <p className="text-gray-700 text-sm mb-10 leading-relaxed">
                        With more than 1.3 Million{' '}
                        <a href="#" className="text-blue-600 hover:underline">
                            5 Star Reviews
                        </a>
                        , you don't have to take our word for it.
                    </p>

                    <Carousel
                        opts={{
                            align: "start",
                            loop: true,
                        }}
                        className="w-full"
                    >
                        <CarouselContent className="-ml-28 flex gap-8">
                            {reviews.map((review, index) => (
                                <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3 p-2">
                                    <div className="bg-gray-50 rounded-lg p-6 h-full flex flex-col min-h-80 cursor-pointer hover:shadow-[0_0_10px_rgba(0,0,0,0.25)]">
                                        <h3 className="text-base font-bold text-gray-900 mb-3">
                                            {review.title}
                                        </h3>

                                        <div className="flex gap-1 mb-4">
                                            {[...Array(review.rating)].map((_, i) => (
                                                <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                                            ))}
                                        </div>

                                        <p className="text-gray-700 leading-relaxed mb-6 grow">
                                            {review.text}
                                        </p>

                                        <div className="flex items-start gap-3 pt-4 border-t border-gray-200">
                                            <User className="w-8 h-8 text-gray-400 shrink-0" />
                                            <div>
                                                <p className="text-gray-600 text-xs italic font-medium">
                                                    {review.author}
                                                </p>
                                                <p className="text-gray-500 text-sm italic">
                                                    {review.date}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>

                        <CarouselPrevious className="hidden md:flex -left-4 bg-white border-2 border-gray-300 hover:bg-gray-50  size-12 cursor-pointer"/>
                        <CarouselNext className="hidden md:flex -right-4 bg-white border-2 border-gray-300 hover:bg-gray-50 size-12 cursor-pointer" />
                    </Carousel>
                </div>
            </div>


        </div >
    )
}

export default MainSection
