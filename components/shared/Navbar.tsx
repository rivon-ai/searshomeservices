"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { CiUser } from "react-icons/ci"
import { MdManageSearch, MdOutlineLocalPhone } from "react-icons/md"
import { FiPhone } from "react-icons/fi"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  console.log("Scrolled:", scrolled)

  return (
    <nav className={`sticky z-50 w-full xl:w-[75%] mx-auto ${scrolled ? 'top-2 border bg-white shadow-md rounded-full px-4 py-2 pl-6' : 'top-0 bg-none shadow-none rounded-none'}`}>
      {/* Main Container */}
      <div className="w-full max-w-[1400px] mx-auto flex items-center justify-between">

        {/* Logo */}
        <div className={`w-fit shrink-0 `}>
          <Image
            src="https://www.searshomeservices.com/static/icons/general/shs-logo.svg"
            alt="Sears Home Services Logo"
            width={scrolled ? 110 : 160}
            height={scrolled ? 0 : 0}
            priority
            className={`h-auto w-auto `}
          />
        </div>

        <div className="">
          {/* Top Section - Collapses on scroll */}
          <div
            className={`flex items-center justify-between transition-all duration-300 ${scrolled ? "max-h-0 overflow-hidden py-0" : "max-h-32 py-3"
              }`}
          >

            {/* Top Navigation - Desktop */}
            <div className="hidden md:flex items-center justify-end gap-6 text-sm text-blue-900 flex-1 pl-6">
              <Link href="/" className="hover:text-blue-700 transition-colors">
                Sears Home Advantage
              </Link>

              <div className="flex items-center gap-3">
                <Link href="/login" className="flex items-center gap-1 hover:text-blue-700 transition-colors">
                  <CiUser className="text-lg" />
                  Sign In
                </Link>
                <span className="text-blue-950">|</span>
                <Link href="/signup" className="hover:text-blue-700 transition-colors">
                  Sign Up
                </Link>
              </div>

              <Link href="/order" className="flex items-center gap-1 hover:text-blue-700 transition-colors">
                <MdManageSearch className="text-lg" />
                Appointment Lookup
              </Link>

              <Link
                href="tel:802-552-4364"
                className="flex items-center gap-2 font-bold text-xl hover:text-blue-700 transition-colors"
              >
                <FiPhone className="text-xl" />
                802-552-4364
              </Link>

              <Link href="/schedule" className="bg-blue-800 text-white text-lg hover:bg-blue-700 font-semibold px-10 py-5 cursor-pointer">Schedule Now</Link>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden">
              <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-full">
                  <div className="flex flex-col gap-4 mt-8">
                    <Link
                      href="/"
                      className="text-blue-900 hover:text-blue-700 py-2"
                      onClick={() => setMobileOpen(false)}
                    >
                      Sears Home Advantage
                    </Link>
                    <Link
                      href="/login"
                      className="flex items-center gap-2 text-blue-900 hover:text-blue-700 py-2"
                      onClick={() => setMobileOpen(false)}
                    >
                      <CiUser className="text-lg" />
                      Sign In
                    </Link>
                    <Link
                      href="/signup"
                      className="text-blue-900 hover:text-blue-700 py-2"
                      onClick={() => setMobileOpen(false)}
                    >
                      Sign Up
                    </Link>
                    <Link
                      href="/order"
                      className="flex items-center gap-2 text-blue-900 hover:text-blue-700 py-2"
                      onClick={() => setMobileOpen(false)}
                    >
                      <MdManageSearch className="text-lg" />
                      Appointment Lookup
                    </Link>
                    <Link
                      href="tel:802-552-4364"
                      className="flex items-center gap-2 text-blue-900 hover:text-blue-700 font-semibold py-2"
                      onClick={() => setMobileOpen(false)}
                    >
                      <MdOutlineLocalPhone className="text-lg" />
                      802-552-4364
                    </Link>
                    <Link href="/" className="text-blue-900 hover:text-blue-700 py-2 font-medium">
                      Repair
                    </Link>
                    <Link href="/warranty" className="text-blue-900 hover:text-blue-700 py-2 font-medium">
                      Home Warranty
                    </Link>
                    <Link href="/maintenance" className="text-blue-900 hover:text-blue-700 py-2 font-medium">
                      Tune-Up & Maintain
                    </Link>
                    <Link href="/hvac" className="text-blue-900 hover:text-blue-700 py-2 font-medium">
                      HVAC
                    </Link>
                    <Link href="/parts" className="text-blue-900 hover:text-blue-700 py-2 font-medium">
                      Shop Parts
                    </Link>
                    <Link href="/resources" className="text-blue-900 hover:text-blue-700 py-2 font-medium">
                      Resources
                    </Link>
                    <Link href="/schedule" className="bg-blue-800 text-white hover:bg-blue-700 w-full mt-4 cursor-pointer">Schedule Now</Link>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Bottom Navigation Section */}
          <div className={`flex items-center justify-center gap-8 py-4 text-blue-900 text-sm md:text-base border-gray-100 ${scrolled ? 'bg-white' : ''}`}>
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center justify-center gap-8">
              <Link href="/" className="hover:text-blue-700 transition-colors font-medium">
                Repair
              </Link>
              <Link href="/warranty" className="hover:text-blue-700 transition-colors font-medium">
                Home Warranty
              </Link>
              <Link href="/maintenance" className="hover:text-blue-700 transition-colors font-medium">
                Tune-Up & Maintain
              </Link>
              <Link href="/hvac" className="hover:text-blue-700 transition-colors font-medium">
                HVAC
              </Link>
              <Link href="/parts" className="hover:text-blue-700 transition-colors font-medium">
                Shop Parts
              </Link>
              <button className="hover:text-blue-700 transition-colors font-medium flex items-center gap-1">
                Resources
                <span className="text-xs">▼</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </nav>
  )
}