import React from 'react'
import Imagesection from '@/components/features/about/Imagesection'
import CardSection from '@/components/features/about/CardSection'
import SearsServicesTextComponent from '@/components/features/about/SearsServicesTextComponent'

function page() {
  return (
    <div className='w-[75%] mx-auto'>
      <Imagesection />
      <CardSection />
      <SearsServicesTextComponent />
    </div>
  )
}

export default page
