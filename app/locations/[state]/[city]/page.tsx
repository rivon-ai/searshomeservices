'use client'
import Footer from '@/app/components/Footer';
import Navbar from '@/app/components/Navbar';
import { useParams } from 'next/navigation'
import React from 'react'
import MainSection from './components/MainSection';

const page = () => {
    const params = useParams();

    return (
        <div>
            <MainSection cities={[]} state={params.state as string} description={''} />
        </div>
    )
}

export default page