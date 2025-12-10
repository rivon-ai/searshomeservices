import React from 'react'
import Image from 'next/image'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { IoCallOutline } from 'react-icons/io5';
import { CiChat1 } from 'react-icons/ci';
import imgone from '@/public/image1.webp'
import imgtwo from '@/public/image2.webp'
import imgthree from '@/public/image3.webp'
import imgfour from '@/public/image4.webp'
import { IoIosArrowDown } from 'react-icons/io';
import { FaStar } from 'react-icons/fa';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Star, Calendar, User, Wrench } from 'lucide-react';
import { Wind, Tractor } from 'lucide-react';

const states = [
    "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "Florida",
    "Georgia",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Puerto Rico",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming",
];



const WorkSection = [
    {
        heading: "1.BOOK ONLINE IN LESS THAN 1 MINUTE.",
        imgsrc: imgtwo,
        alttext: "Person booking online on laptop",
        description: "Tell us what the problem is, and we'll schedule a local appliance repair technician to fix it as soon as possible—sometimes the same day.",
    },
    {
        heading: "2. YOUR LOCAL TECHNICIAN IS ABOUT TO ARRIVE.",
        imgsrc: imgthree,
        alttext: "Technician profile with certification",
        description: "We send alerts, so you'll know when our expert repair technician will be at your door.",
    },
    {
        heading: "3. TECH ARRIVAL AND DIAGNOSIS",
        imgsrc: imgfour,
        alttext: "Technician repairing dishwasher",
        description: "The technician will assess the issue and provide a complete estimate that includes parts, labor, and applicable taxes.",
    }
]

const scheduleCards = [
    {
        title: "Laundry Appliances",
        discount: "25%*",
        price: "$149.99",
        description: "Keep your laundry spinning with cleaning and maintenance for your washer and dryer."
    },
    {
        title: "Kitchen Appliances",
        discount: "40%*",
        price: "$179.99",
        description: "Keep your kitchen humming with cleaning and maintenance for your refrigerator, dishwasher and range."
    },
    {
        title: "Kitchen & Laundry Appliances",
        discount: "50%*",
        price: "$249.99",
        description: "Five appliances, one great price. Includes maintenance and cleaning for three kitchen appliances and two laundry appliances."
    }
]

function HeroSection() {
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

                <Image src={imgone} alt="Hero Image" className='w-full h-auto rounded-lg' />

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
                        <h1 className='font-bold text-3xl text-blue-950 mb-3'>National team, Local service</h1>
                        <p className='text-gray-600 text-base leading-relaxed'>
                            We serve all major cities and more with thousands of technicians and consultants in the field every day.
                        </p>
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

            <div className='grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 space-y-4 lg:space-y-0 gap-8 mt-40 mb-20'>
                {
                    states.map((state, index) => (
                        <div key={index}>
                            <Link href={`/locations/${state.toLowerCase().replace(/\s+/g, '-')}`} className="text-blue-600 text-xl font-semibold hover:underline">
                                {state}
                            </Link>
                        </div>
                    ))
                }
            </div>
        </div >

    )
}   

export default HeroSection


// <div className="mt-36">
//     {/* Expert Appliance Repair Section */}
//     <section className="mb-16">
//         <h1 className="text-2xl font-bold text-blue-900 mb-6 uppercase tracking-wide">
//             EXPERT APPLIANCE REPAIR & HOME SERVICES
//         </h1>

//         <div className="space-y-4 text-gray-500 leading-relaxed">
//             <p>
//                 We're the nation's largest appliance repair service provider. Our technicians repair and maintain most major appliance brands, makes and models, no matter where you bought them.
//             </p>

//             <p>
//                 Sears Home Services also provides{' '}
//                 <a href="#" className="text-blue-600 hover:underline">HVAC repair</a>, replacement and maintenance services across the country. Additionally, we offer home cleaning services such as carpet and air duct cleaning.
//             </p>

//             <p>
//                 Sears Home Services delivers solutions for your entire home with our Sears Protect{' '}
//                 <a href="#" className="text-blue-600 hover:underline">home warranty</a> plans.
//             </p>
//         </div>

//         {/* Our Services Subsection */}
//         <div className="mt-12">
//             <h2 className="text-xl font-bold text-blue-900 mb-6">Our Services</h2>

//             <h3 className="text-lg font-bold text-blue-900 mb-4">Appliance Repair</h3>

//             <p className="text-gray-500 mb-6 leading-relaxed">
//                 Sears Home Services Technicians perform more than 7 million repairs annually and we have thousands of appliance experts employed nationwide. We're the #1 appliance repair service in the country, delivering guaranteed quality and workmanship.
//             </p>

//             <p className="text-gray-500 mb-4">Our technicians repair these types of home appliances:</p>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-2 mb-6 ml-8">
//                 <div>
//                     <p className="text-gray-500">Refrigerators</p>
//                     <p className="text-gray-500">Washers & Dryers</p>
//                     <p className="text-gray-500">Wall Ovens</p>
//                 </div>
//                 <div>
//                     <p className="text-gray-500">Stoves & Ranges</p>
//                     <p className="text-gray-500">Freezers</p>
//                     <p className="text-gray-500">Ice Makers</p>
//                 </div>
//                 <div>
//                     <p className="text-gray-500">Dishwashers</p>
//                     <p className="text-gray-500">Microwaves</p>
//                     <p className="text-gray-500">Gas Grills</p>
//                 </div>
//             </div>

//             <p className="text-gray-500 mb-4 leading-relaxed">
//                 Sear Home Services repairs all major brands of appliances including Kenmore, Whirlpool, Frigidaire, Maytag, Amana, GE, Samsung, LG and more.
//             </p>

//             <p className="text-gray-500 leading-relaxed">
//                 We also provide professional{' '}
//                 <a href="#" className="text-blue-600 hover:underline">appliance maintenance</a>{' '}
//                 service to help keep all your products in top shape and lasting longer.
//             </p>
//         </div>
//     </section>

//     {/* HVAC Repair & Maintenance Section */}
//     <section className="mb-16">
//         <h2 className="text-xl font-bold text-blue-900 mb-6">HVAC Repair & Maintenance</h2>

//         <div className="space-y-4 text-gray-500 leading-relaxed">
//             <p>
//                 Sears Home Services is the best solution for home HVAC repair, providing top-quality expertise and service for all your heating and cooling needs.
//             </p>

//             <p>
//                 Our HVAC system repair is designed to keep your home comfortable year-round, with skilled technicians who can diagnose and fix any issue quickly and efficiently.
//             </p>

//             <p>
//                 To keep your heating and cooling systems running smoothly, we offer professional HVAC maintenance checks. We recommend having a furnace checkup at the start of heating season and an AC tune-up at the start of air conditioning season.
//             </p>
//         </div>
//     </section>

//     {/* Home Warranty Section */}
//     <section className="mb-16">
//         <h2 className="text-xl font-bold text-blue-900 mb-6">Home Warranty</h2>

//         <div className="space-y-4 text-gray-500 leading-relaxed">
//             <p>
//                 With one of our affordable home warranty plans, you'll worry less about the cost or stress of unexpected appliance or home-system repairs. Available in most zip codes nationwide, we're here to help with monthly plans starting at very low prices.
//             </p>

//             <p>
//                 <a href="#" className="text-blue-600 hover:underline">Sears Protect</a>{' '}
//                 is the only nationwide provider that employs its own service experts - technicians who undergo extensive training. That means you don't have to spend hours searching for the best, asking around or getting quotes.
//             </p>
//         </div>
//     </section>

//     {/* Why Choose Section */}
//     <section className="border-t border-gray-300 pt-12">
//         <h2 className="text-xl font-bold text-blue-900 mb-6">Why Choose Sears Home Services?</h2>

//         <ul className="space-y-2 mb-6 ml-6">
//             <li className="text-gray-500 list-disc">Certified, insured techs</li>
//             <li className="text-gray-500 list-disc">Satisfaction guarantee</li>
//             <li className="text-gray-500 list-disc">National reach, local techs</li>
//         </ul>

//         <p className="text-gray-500 leading-relaxed">
//             Whether you need HVAC service or your dryer isn't heating, we have appliance repair technicians ready to fix the problem.
//         </p>
//     </section>
// </div>

// <div className="py-20 bg-white">
//     <div className="border-t border-gray-300 pt-8">
//         <h2 className="text-2xl font-bold text-blue-900 mb-8 uppercase tracking-wide">
//             FREQUENTLY ASKED QUESTIONS
//         </h2>

//         <Accordion type="single" collapsible className="w-full">
//             <AccordionItem value="item-1" className="border-b border-gray-300">
//                 <AccordionTrigger className="text-left text-xl text-gray-500 hover:no-underline py-6 cursor-pointer">
//                     How fast can I schedule my repair appointment?
//                 </AccordionTrigger>
//                 <AccordionContent className="text-gray-700 pb-6 leading-relaxed">
//                     We offer same-day and next-day appointments based on availability in your area.
//                     You can schedule your repair appointment online or by calling our customer service team.
//                     Our goal is to get a qualified technician to your home as quickly as possible to resolve your appliance issues.
//                 </AccordionContent>
//             </AccordionItem>

//             <AccordionItem value="item-2" className="border-b border-gray-300">
//                 <AccordionTrigger className="text-left text-xl text-gray-500 hover:no-underline py-6 cursor-pointer">
//                     How much does it cost to have a technician come out?
//                 </AccordionTrigger>
//                 <AccordionContent className="text-gray-700 pb-6 leading-relaxed">
//                     The cost varies depending on the type of appliance and the nature of the repair needed.
//                     We charge a diagnostic fee for the technician to come out and assess the issue.
//                     If you proceed with the repair, this fee is typically applied toward the total cost.
//                     Our technicians will provide you with a detailed estimate before beginning any work.
//                 </AccordionContent>
//             </AccordionItem>

//             <AccordionItem value="item-3" className="border-b border-gray-300">
//                 <AccordionTrigger className="text-left text-xl text-gray-500 hover:no-underline py-6 cursor-pointer">
//                     What hours are your call center agents available?
//                 </AccordionTrigger>
//                 <AccordionContent className="text-gray-700 pb-6 leading-relaxed">
//                     Our customer service team is available 7 days a week to assist you with scheduling
//                     and answering any questions you may have. You can reach us by phone during extended hours,
//                     and you can also schedule appointments online 24/7 for your convenience.
//                 </AccordionContent>
//             </AccordionItem>

//             <AccordionItem value="item-4" className="border-b border-gray-300">
//                 <AccordionTrigger className="text-left text-xl text-gray-500 hover:no-underline py-6 cursor-pointer">
//                     What's included with professional appliance maintenance service?
//                 </AccordionTrigger>
//                 <AccordionContent className="text-gray-700 pb-6 leading-relaxed">
//                     Our professional appliance maintenance service includes a thorough inspection of your appliance,
//                     cleaning of key components, testing to ensure optimal performance, and minor adjustments as needed.
//                     Regular maintenance can help extend the life of your appliances, improve efficiency, and prevent
//                     costly breakdowns. Our technicians will also provide recommendations for any potential issues they identify.
//                 </AccordionContent>
//             </AccordionItem>
//         </Accordion>

//         <div className="mt-8 pt-6 text-gray-700 leading-relaxed">
//             <p>
//                 <span className="font-semibold">Ready to get your appliance or HVAC system working perfectly again?</span>{' '}
//                 Schedule your repair today at Sears Home Services or call{' '}
//                 <a href="tel:1-800-4-MY-HOME" className="text-blue-600 hover:underline font-semibold">
//                     1-800-4-MY-HOME
//                 </a>{' '}
//                 to speak with our customer service team.
//             </p>
//         </div>
//     </div>
// </div>

// <div className="py-20 bg-white">
//     <div className="border-t border-gray-300 pt-8">
//         <h2 className="text-2xl font-bold text-blue-900 mb-12 uppercase tracking-wide">
//             HOW IT WORKS
//         </h2>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {
//                 /* Work Steps */
//                 WorkSection.map((step, index) => (
//                     <div key={index} className="mb-12">
//                         <h3 className="text-base font-bold text-blue-900 mb-4 uppercase">
//                             {step.heading}
//                         </h3>
//                         <div className="mb-4 rounded-lg overflow-hidden">
//                             <Image
//                                 src={step.imgsrc}
//                                 alt={step.alttext}
//                                 className="w-full h-48 object-cover"
//                             />
//                         </div>
//                         <p className="text-gray-700 text-sm leading-relaxed">
//                             {step.description}
//                         </p>
//                     </div>
//                 ))
//             }
//         </div>
//         <div className='flex justify-center w-full'>
//             <Button className="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-6 py-2 rounded cursor-pointer">
//                 Schedule Now
//             </Button>
//         </div>

//     </div>
// </div>

// <div className="py-20 bg-white">
//     <div className="border-t border-gray-300 pt-8">
//         <h2 className="text-2xl font-bold text-blue-900 mb-12 uppercase tracking-wide">
//             WHY CHOOSE SEARS HOME SERVICES
//         </h2>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
//             {/* Happy Customers */}
//             <div className="flex flex-col items-start">
//                 <div className="mb-4 relative">
//                     <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center">
//                         <Star className="w-8 h-8 text-blue-700 fill-none stroke-2" />
//                     </div>
//                     <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-yellow-300 flex items-center justify-center">
//                         <Star className="w-3 h-3 text-yellow-600 fill-yellow-600" />
//                     </div>
//                 </div>
//                 <h3 className="text-base font-bold text-blue-900 mb-3 uppercase">
//                     HAPPY CUSTOMERS
//                 </h3>
//                 <p className="text-gray-700 text-sm leading-relaxed">
//                     Average of 4,000,000+ homes serviced/year. Over 1,000,000 5-star ratings.
//                 </p>
//             </div>

//             {/* Flexible Scheduling */}
//             <div className="flex flex-col items-start">
//                 <div className="mb-4">
//                     <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center">
//                         <Calendar className="w-8 h-8 text-blue-700 stroke-2" />
//                     </div>
//                 </div>
//                 <h3 className="text-base font-bold text-blue-900 mb-3 uppercase">
//                     FLEXIBLE SCHEDULING
//                 </h3>
//                 <p className="text-gray-700 text-sm leading-relaxed">
//                     Available 6 days a week in most areas.
//                 </p>
//             </div>

//             {/* Expert Technicians */}
//             <div className="flex flex-col items-start">
//                 <div className="mb-4">
//                     <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center">
//                         <User className="w-8 h-8 text-blue-700 stroke-2" />
//                     </div>
//                 </div>
//                 <h3 className="text-base font-bold text-blue-900 mb-3 uppercase">
//                     EXPERT TECHNICIANS
//                 </h3>
//                 <p className="text-gray-700 text-sm leading-relaxed">
//                     2,500+ manufacturer-trained technicians with an average of 10+ years of experience.
//                 </p>
//             </div>

//             {/* Quality Parts */}
//             <div className="flex flex-col items-start">
//                 <div className="mb-4">
//                     <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center">
//                         <Wrench className="w-8 h-8 text-blue-700 stroke-2" />
//                     </div>
//                 </div>
//                 <h3 className="text-base font-bold text-blue-900 mb-3 uppercase">
//                     QUALITY PARTS FOR HUNDREDS OF BRANDS
//                 </h3>
//                 <p className="text-gray-700 text-sm leading-relaxed">
//                     Repairs for most major brands, no matter where you bought it.
//                 </p>
//             </div>
//         </div>

//         <p className="text-gray-700 text-sm leading-relaxed text-center mt-8">
//             When you're looking for "appliance repair near me" you can count of Sears Home Services to be there with fast and reliable appliance repair service.
//         </p>
//     </div>
// </div>

// <div className="border-t py-20">
//     <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* HVAC Maintenance Card */}
//         <div className="bg-white rounded-lg shadow-md p-8 flex flex-col">
//             <div className="flex items-start gap-4 mb-4">
//                 <div className="w-12 h-12 bg-blue-50 rounded flex items-center justify-center shrink-0">
//                     <Wind className="w-7 h-7 text-blue-700 stroke-2" />
//                 </div>
//                 <h3 className="text-xl font-bold text-blue-900 uppercase tracking-wide">
//                     HVAC MAINTENANCE
//                 </h3>
//             </div>

//             <div className="grow">
//                 <p className="text-gray-700 text-sm leading-relaxed mb-2">
//                     Regular annual maintenance is important to make sure your hvac stays in peak performance shape. If your hvac is broken, please visit our{' '}
//                     <a href="#" className="text-blue-600 hover:underline">
//                         hvac service repair
//                     </a>{' '}
//                     page.
//                 </p>
//                 <a href="#" className="text-blue-600 hover:underline text-sm">
//                     Learn more about hvac maintenance
//                 </a>
//             </div>

//             <div className="mt-6 flex justify-end">
//                 <Button className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-semibold px-6 py-2 rounded">
//                     Schedule Now
//                 </Button>
//             </div>
//         </div>

//         {/* Riding Mower Maintenance Card */}
//         <div className="bg-white rounded-lg shadow-md p-8 flex flex-col">
//             <div className="flex items-start gap-4 mb-4">
//                 <div className="w-12 h-12 bg-blue-50 rounded flex items-center justify-center shrink-0">
//                     <Tractor className="w-7 h-7 text-blue-700 stroke-2" />
//                 </div>
//                 <h3 className="text-xl font-bold text-blue-900 uppercase tracking-wide">
//                     RIDING MOWER MAINTENANCE
//                 </h3>
//             </div>

//             <div className="grow">
//                 <p className="text-gray-700 text-sm leading-relaxed mb-2">
//                     Regular annual maintenance is important to make sure your riding mower stays in peak performance shape. If your mower is broken, please visit our{' '}
//                     <a href="#" className="text-blue-600 hover:underline">
//                         riding mower repair
//                     </a>{' '}
//                     page.
//                 </p>
//                 <a href="#" className="text-blue-600 hover:underline text-sm">
//                     Learn more about riding mower maintenance
//                 </a>
//             </div>

//             <div className="mt-6 flex justify-end">
//                 <Button className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-semibold px-6 py-2 rounded">
//                     Schedule Now
//                 </Button>
//             </div>
//         </div>
//     </div>
// </div>

// <div className="py-20 bg-white border-t">
//     <div className=" border-gray-300 pt-8">
//         <h2 className="text-2xl font-bold text-blue-900 mb-3 uppercase tracking-wide">
//             SCHEDULE PROFESSIONAL APPLIANCE MAINTENANCE
//         </h2>
//         <p className="text-gray-700 text-sm mb-10 leading-relaxed">
//             Extend the life of your appliances with routine maintenance & save when you bundle.
//         </p>

//         <div className="w-[90%] mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 mb-6">

//             {
//                 /* Schedule Cards */
//                 scheduleCards.map((card, index) => (
//                     <div key={index} className="bg-white rounded-lg shadow-lg border border-gray-200 px-4 py-8 flex flex-col">
//                         <div className="flex justify-center mb-4">
//                             <div className="w-20 h-20 rounded-full bg-linear-to-br from-cyan-300 to-green-400 flex flex-col items-center justify-center">
//                                 <span className="text-black font-bold text-sm">SAVE</span>
//                                 <span className="text-black font-bold text-lg">{card.discount}</span>
//                             </div>
//                         </div>
//                         <h3 className="text-center text-blue-900 font-bold text-base uppercase mb-2">
//                             {card.title}
//                         </h3>
//                         <p className="text-center text-blue-900 font-bold text-3xl mb-4">
//                             {card.price}
//                         </p>
//                         <div className="border-t border-gray-200 pt-4 mb-6 grow">
//                             <p className="text-gray-700 text-sm leading-relaxed text-center">
//                                 {card.description}
//                             </p>
//                         </div>
//                         <Button className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 rounded">
//                             Add Clean & Maintain
//                         </Button>
//                     </div>
//                 ))
//             }

//         </div>

//         <div className="mt-6">
//             <p className="text-gray-500 leading-relaxed">
//                 <span className="mr-2 font-bold text-xl">•</span>
//                 Tax and all parts and labor for repairs (if needed) are extra. Savings are obtained with multiple appliance packages vs. the individual regular price of $99.99 each.
//             </p>
//         </div>
//     </div>
// </div>

// <div className="border-t py-20">
//     <div className="max-w-7xl mx-auto">
//         {/* Header Section */}
//         <div className="mb-12">
//             <h1 className="text-3xl font-bold text-gray-900 mb-3 tracking-tight">
//                 SEARS HOME SERVICES
//             </h1>
//             <p className="text-gray-600 text-base">
//                 We're more than just repairs. Discover all the services we offer for your home:
//             </p>
//         </div>

//         {/* Services Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {/* Home Warranty Card */}
//             <div className="bg-gray-50 rounded-lg p-8 flex flex-col items-center text-center">
//                 <div className="mb-6">
//                     <svg
//                         className="w-16 h-16"
//                         viewBox="0 0 64 64"
//                         fill="none"
//                         xmlns="http://www.w3.org/2000/svg"
//                     >
//                         <path
//                             d="M32 8L12 20V36C12 46 20 54 32 56C44 54 52 46 52 36V20L32 8Z"
//                             stroke="#003d7a"
//                             strokeWidth="2"
//                             fill="white"
//                         />
//                         <path
//                             d="M24 32L30 38L42 26"
//                             stroke="#003d7a"
//                             strokeWidth="2.5"
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                         />
//                     </svg>
//                 </div>
//                 <h3 className="text-lg font-bold text-gray-900 mb-4 tracking-tight">
//                     HOME WARRANTY
//                 </h3>
//                 <p className="text-gray-600 text-sm mb-8 grow">
//                     Protect your home's appliances and systems
//                 </p>
//                 <button className="w-full py-3 px-6 border-2 border-blue-700 text-blue-700 rounded font-semibold hover:bg-blue-700 hover:text-white transition-colors">
//                     Learn More
//                 </button>
//             </div>

//             {/* Appliance Parts Card */}
//             <div className="bg-gray-50 rounded-lg p-8 flex flex-col items-center text-center">
//                 <div className="mb-6">
//                     <svg
//                         className="w-16 h-16"
//                         viewBox="0 0 64 64"
//                         fill="none"
//                         xmlns="http://www.w3.org/2000/svg"
//                     >
//                         <rect
//                             x="14"
//                             y="14"
//                             width="36"
//                             height="36"
//                             rx="4"
//                             stroke="#003d7a"
//                             strokeWidth="2"
//                             fill="white"
//                         />
//                         <path
//                             d="M28 24L32 32L28 40M36 24L32 32L36 40"
//                             stroke="#ffd700"
//                             strokeWidth="3"
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             fill="#ffd700"
//                         />
//                         <circle cx="32" cy="32" r="12" fill="#ffd700" opacity="0.3" />
//                     </svg>
//                 </div>
//                 <h3 className="text-lg font-bold text-gray-900 mb-4 tracking-tight">
//                     APPLIANCE PARTS
//                 </h3>
//                 <p className="text-gray-600 text-sm mb-8 grow">
//                     Shop 3 million+ parts. Lookup 50,000 manuals
//                 </p>
//                 <button className="w-full py-3 px-6 border-2 border-blue-700 text-blue-700 rounded font-semibold hover:bg-blue-700 hover:text-white transition-colors">
//                     Learn More
//                 </button>
//             </div>

//             {/* Home Cleaning Card */}
//             <div className="bg-gray-50 rounded-lg p-8 flex flex-col items-center text-center">
//                 <div className="mb-6">
//                     <svg
//                         className="w-16 h-16"
//                         viewBox="0 0 64 64"
//                         fill="none"
//                         xmlns="http://www.w3.org/2000/svg"
//                     >
//                         <path
//                             d="M32 10L28 24H36L32 10Z"
//                             fill="#003d7a"
//                         />
//                         <rect
//                             x="28"
//                             y="22"
//                             width="8"
//                             height="28"
//                             fill="#003d7a"
//                         />
//                         <ellipse
//                             cx="32"
//                             cy="50"
//                             rx="16"
//                             ry="6"
//                             fill="#ffd700"
//                         />
//                         <path
//                             d="M20 48C20 48 24 52 32 52C40 52 44 48 44 48"
//                             stroke="#ffd700"
//                             strokeWidth="2"
//                             strokeLinecap="round"
//                         />
//                     </svg>
//                 </div>
//                 <h3 className="text-lg font-bold text-gray-900 mb-4 tracking-tight">
//                     HOME CLEANING
//                 </h3>
//                 <p className="text-gray-600 text-sm mb-8 grow">
//                     Air duct, carpet and upholstery cleaning experts
//                 </p>
//                 <button className="w-full py-3 px-6 border-2 border-blue-700 text-blue-700 rounded font-semibold hover:bg-blue-700 hover:text-white transition-colors">
//                     Learn More
//                 </button>
//             </div>
//         </div>
//     </div>
// </div>