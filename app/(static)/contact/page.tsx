import React from 'react'
import FaqAccordition from "@/components/features/contact/FaqAccordition"
import Imagesection from '@/components/features/contact/ImageSection'

export default function page() {
  return (
    <div className='w-[75%] mx-auto'>
      <Imagesection />
      <FaqAccordition />
    </div>
  )
}