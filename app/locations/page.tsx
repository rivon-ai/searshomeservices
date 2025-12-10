'use client'
import Link from 'next/link'
import React from 'react'
import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import Footer from '../components/Footer'

const page = () => {


  return (
    <div>
      <Navbar />
      <HeroSection />
      <Footer />
    </div>
  )
}

export default page

{/* <Link href={`/locations/${'1'}`} >
  <button>flkksdjfds</button>
</Link> */}