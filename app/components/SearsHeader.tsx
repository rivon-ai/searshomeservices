"use client"

import React, { useState } from 'react';
import { Menu, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import navImage from '@/public/searsLogo.svg'
import Image from 'next/image';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LuPhone } from "react-icons/lu";

const upperLink = [
    { name: "Shop Parts", href: "https://www.searspartsdirect.com/" },
    { name: "Sears Home Advantage", href: "https://searshomeadvantage.shopyourway.com/" },
    { name: "Sign In", href: "/signin" },
    { name: "Sign Up", href: "/signup" },
    { name: "Appointment Lookup", href: "https://www.searshomeservices.com/orders" }

]

const options = [
    { name: "Repair", href: "https://www.searspartsdirect.com/repair" },
    { name: "Home Warrenty", href: "https://www.searspartsdirect.com/home-warrenty" },
    { name: "Time-up & Maintain", href: "https://www.searspartsdirect.com/maintain" },
    { name: "HVAC", href: "https://www.searspartsdirect.com/repair/hvac-repair-service" },
    {
        name: "Resources",
        href: "https://www.searshomeservices.com/authors",
        submenu: [
            { name: "Resource Center", href: "https://www.searshomeservices.com/blog" },
            { name: "Glossary", href: "https://www.searshomeservices.com/glossary" },
            { name: "Help", href: "https://www.searshomeservices.com/help" },
            { name: "Symptom Center", href: "https://www.searshomeservices.com/symptom-center" },
        ]
    },
]

const contactLinks = [
    { name: "802-552-4364", href: "tel:802-552-4364" },
    { name: "Schedule Now", href: "https://www.searshomeservices.com/scheduler" },
]


export default function SearsHeader() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isResourcesOpen, setIsResourcesOpen] = useState(false);

    return (
        <header className="bg-white sticky top-0 z-30 opacity-90">

            {/* top-Section  */}
            <div className='w-full border-b'>
                <div className='w-[75%] mx-auto text-blue-900 font-semibold flex justify-between items-center text-sm py-2'>
                    <div className='flex items-center gap-2'>
                        <Link href="https://www.searspartsdirect.com/">
                            Shop Parts
                        </Link>
                        <Link href={"https://searshomeadvantage.shopyourway.com/"}>
                            Sears Home Advantage
                        </Link>
                    </div>

                    <div className='flex items-center gap-2'>
                        <Link href="/signin">
                            Sign In
                        </Link>
                        <span>|</span>
                        <Link href="/signup">
                            Sign Up
                        </Link>
                        <Link href={"https://www.searshomeservices.com/orders"}>
                            Appointment Lookup
                        </Link>
                    </div>
                </div>
            </div>

            {/* bottom section */}
            <div>
                <div className='w-[75%] mx-auto flex justify-between items-center py-4'>
                    {/* Logo */}
                    <div>
                        <Link href="/">
                            <Image
                                src={navImage}
                                alt="Sears Logo"
                                className="h-12 w-auto"
                            />
                        </Link>
                    </div>
                    <div className='flex items-center gap-2'>
                        {
                            options.map((option, idx) => {
                                if (!option.submenu) {
                                    return (
                                        <Link key={idx} href={option.href} className='hover:bg-gray-200 text-blue-800 px-1 rounded-sm'>
                                            {option.name}
                                        </Link>
                                    )
                                } else {
                                    return (
                                        <DropdownMenu key={idx} >
                                            <DropdownMenuTrigger>
                                                <span className='hover:bg-gray-200 text-blue-800 px-1 rounded-sm flex items-center gap-1 cursor-pointer'>
                                                    {option.name} <ChevronDown size={12} />
                                                </span>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent className='rounded-md'>
                                                <DropdownMenuLabel>{option.name} Options</DropdownMenuLabel>
                                                <DropdownMenuSeparator />
                                                {option.submenu.map((subItem, subIdx) => (
                                                    <DropdownMenuItem key={subIdx} className='hover:text-blue-800 hover:bg-gray-200'>
                                                        <Link href={subItem.href}>{subItem.name}</Link>
                                                    </DropdownMenuItem>
                                                ))}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    )
                                }
                            }
                            )}
                    </div>
                    <div className='flex items-center gap-2.5'>
                        {contactLinks.map((contact, idx) => (
                            contact.name === "Schedule Now" ? (
                                <Link key={idx} href={contact.href} className='bg-linear-to-r from-[#76FFA3] to-[#48FFFF] text-[#0A2E2A] px-3 py-2 rounded-full font-medium'>
                                    {contact.name}
                                </Link>
                            ) : (
                                <div className='flex items-center gap-1.5'>
                                    <LuPhone className="text-xl text-gray-800" />
                                    <Link key={idx} href={contact.href} className='text-xl font-semibold text-gray-800 underline'>
                                        {contact.name}
                                    </Link>
                                </div>
                            )
                        ))}
                    </div>
                </div>
            </div>

        </header >
    );
}