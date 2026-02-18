"use client";

import React, { useEffect, useState } from 'react';
import { Menu, ChevronDown, Phone } from 'lucide-react';
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
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { LuPhone } from "react-icons/lu";
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';

const upperLink = [
    { name: "Shop Parts", href: "https://www.searspartsdirect.com/" },
    { name: "Sears Home Advantage", href: "https://searshomeadvantage.shopyourway.com/" },
    { name: "Sign In", href: "/signin" },
    { name: "Sign Up", href: "/signup" },
    { name: "Appointment Lookup", href: "/order" }
]

const options = [
    { name: "Repair", href: "/repair" },
    { name: "Home Warrenty", href: "/home-warrenty" },
    { name: "Time-up & Maintain", href: "/maintain" },
    { name: "HVAC", href: "/repair/hvac-repair-service" },
    {
        name: "Resources",
        href: "/authors",
        submenu: [
            { name: "Resource Center", href: "/blog" },
            { name: "Glossary", href: "/glossary" },
            { name: "Help", href: "/help" },
            { name: "Symptom Center", href: "/symptom-center" },
        ]
    },
]

const contactLinks = [
    { name: "802-552-4364", href: "tel:802-552-4364" },
    { name: "Schedule Now", href: "/schedule" },
]


export default function SearsHeader() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isResourcesOpen, setIsResourcesOpen] = useState(false);
    const pathname = usePathname()

    return (
        <header className={`bg-white sticky top-0 z-30 opacity-90 border-b ${pathname.startsWith('/auth') ? "hidden" : ""}`} >

            {/* Desktop Top Bar */}
            <div className='hidden lg:block w-full border-b'>
                <div className='container mx-auto px-4 text-blue-900 font-semibold flex justify-between items-center text-sm py-2'>
                    <div className='flex items-center gap-4'>
                        {upperLink.slice(0, 2).map((link, idx) => (
                            <Link key={idx} href={link.href} className="hover:underline">
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    <div className='flex items-center gap-4'>
                        {upperLink.slice(2).map((link, idx) => (
                            <React.Fragment key={idx}>
                                {link.name === "Sign Up" && <span className="text-gray-300">|</span>}
                                <Link href={link.href} className="hover:underline">
                                    {link.name}
                                </Link>
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Navigation */}
            <div className="container mx-auto px-4 py-3 lg:py-4">
                <div className='flex justify-between items-center'>
                    {/* Logo */}
                    <Link href="/" className="shrink-0">
                        <Image
                            src={navImage}
                            alt="Sears Logo"
                            className="h-8 w-auto lg:h-12"
                            priority
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className='hidden lg:flex items-center gap-6'>
                        {options.map((option, idx) => {
                            if (!option.submenu) {
                                return (
                                    <Link key={idx} href={option.href} className='text-blue-900 font-medium hover:text-blue-700 transition-colors'>
                                        {option.name}
                                    </Link>
                                )
                            } else {
                                return (
                                    <DropdownMenu key={idx} open={isResourcesOpen} onOpenChange={setIsResourcesOpen}>
                                        <DropdownMenuTrigger className="outline-none flex items-center gap-1 text-blue-900 font-medium hover:text-blue-700 transition-colors cursor-pointer">
                                            {option.name} <ChevronDown size={16} />
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className='rounded-xl border-gray-100 shadow-lg mt-2 p-2'>
                                            <DropdownMenuLabel className="px-2 py-1.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">{option.name}</DropdownMenuLabel>
                                            <DropdownMenuSeparator className="my-1 bg-gray-100" />
                                            {option.submenu.map((subItem, subIdx) => (
                                                <DropdownMenuItem key={subIdx} className='cursor-pointer rounded-lg hover:text-blue-700 hover:bg-blue-50 focus:bg-blue-50 focus:text-blue-700' asChild>
                                                    <Link
                                                        href={subItem.href}
                                                        className='w-full'
                                                        onClick={() => setIsResourcesOpen(false)}
                                                    >
                                                        {subItem.name}
                                                    </Link>
                                                </DropdownMenuItem>
                                            ))}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                )
                            }
                        })}
                    </div>

                    {/* Desktop CTA & Contact */}
                    <div className='hidden lg:flex items-center gap-6'>
                        {contactLinks.map((contact, idx) => (
                            contact.name === "Schedule Now" ? (
                                <Link key={idx} href={contact.href} className='bg-gradient-to-r from-[#76FFA3] to-[#48FFFF] text-[#0A2E2A] px-5 py-2.5 rounded-full font-bold hover:shadow-md transition-shadow'>
                                    {contact.name}
                                </Link>
                            ) : (
                                <div key={idx} className='flex items-center gap-2'>
                                    <div className="bg-gray-100 p-2 rounded-full">
                                        <LuPhone className="text-lg text-blue-900" />
                                    </div>
                                    <Link href={contact.href} className='text-lg font-bold text-blue-900 hover:underline'>
                                        {contact.name}
                                    </Link>
                                </div>
                            )
                        ))}
                    </div>

                    {/* Mobile Menu Trigger */}
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="lg:hidden text-blue-900">
                                <Menu className="h-6 w-6" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-[300px] sm:w-[350px] overflow-y-auto">
                            <SheetHeader className="mb-6 text-left">
                                <SheetTitle>
                                    <Image
                                        src={navImage}
                                        alt="Sears Logo"
                                        className="h-8 w-auto"
                                    />
                                </SheetTitle>
                            </SheetHeader>

                            <div className="flex flex-col gap-6">
                                {/* Mobile Main Links */}
                                <div className="flex flex-col gap-1">
                                    {options.map((option, idx) => (
                                        !option.submenu ? (
                                            <Link
                                                key={idx}
                                                href={option.href}
                                                className="py-3 text-lg font-medium text-blue-900 border-b border-gray-100 last:border-0"
                                            >
                                                {option.name}
                                            </Link>
                                        ) : (
                                            <Accordion type="single" collapsible key={idx} className="border-b border-gray-100 last:border-0">
                                                <AccordionItem value={`item-${idx}`} className="border-b-0">
                                                    <AccordionTrigger className="text-lg font-medium text-blue-900 py-3 hover:no-underline">
                                                        {option.name}
                                                    </AccordionTrigger>
                                                    <AccordionContent>
                                                        <div className="flex flex-col gap-2 pl-4 pb-2">
                                                            {option.submenu.map((sub, subIdx) => (
                                                                <Link
                                                                    key={subIdx}
                                                                    href={sub.href}
                                                                    className="py-2 text-base text-gray-600 hover:text-blue-700"
                                                                >
                                                                    {sub.name}
                                                                </Link>
                                                            ))}
                                                        </div>
                                                    </AccordionContent>
                                                </AccordionItem>
                                            </Accordion>
                                        )
                                    ))}
                                </div>

                                {/* Mobile CTA */}
                                <div className="flex flex-col gap-4">
                                    <Link
                                        href="/schedule"
                                        className='bg-gradient-to-r from-[#76FFA3] to-[#48FFFF] text-[#0A2E2A] py-3 rounded-full font-bold text-center shadow-sm'
                                    >
                                        Schedule Now
                                    </Link>
                                    <Link
                                        href="tel:802-552-4364"
                                        className='flex items-center justify-center gap-2 py-3 border border-gray-200 rounded-full font-bold text-blue-900 hover:bg-gray-50'
                                    >
                                        <LuPhone className="h-5 w-5" />
                                        802-552-4364
                                    </Link>
                                </div>

                                {/* Mobile Secondary Links */}
                                <div className="mt-4 pt-6 border-t border-gray-100 flex flex-col gap-3">
                                    {upperLink.map((link, idx) => (
                                        <Link
                                            key={idx}
                                            href={link.href}
                                            className="text-sm font-medium text-gray-500 hover:text-blue-900"
                                        >
                                            {link.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header >
    );
}
