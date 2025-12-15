import { Card } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import repairImg from "@/public/about/repairSVG.svg"
import maintainImg from "@/public/about/maintenanceSVG.svg"

export default function CardSection() {
    return (
        <div className='pb-20 border-b mt-40'>
            <Card className='flex flex-col md:flex-row items-center justify-between bg-gray-100 p-4 py-8 border-none rounded-md '>
                <div className='flex flex-col gap-2'>
                    <Image src={repairImg} alt="repair svg" className='w-16 h-16' />
                    <Link href={`/repair`} className='text-blue-500 text-xl font-semibold'>
                        Applicane Repair
                    </Link>
                    <p>Our technicians fix any appliance, regardless of where you bought it.</p>
                </div>

                <div className='flex flex-col gap-2'>
                    <Image src={maintainImg} alt="repair svg" className='w-16 h-16' />
                    <Link href={`/repair`} className='text-blue-500 text-xl font-semibold'>
                        Maintain
                    </Link>
                    <p>We extend life of all your HVAc, appliances, and lawn and garden tools.</p>
                </div>
            </Card>
        </div>
    )
}
