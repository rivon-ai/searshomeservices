import React from 'react'
import Imagesection from '../components/about/Imagesection'
import CardSection from '../components/about/CardSection'
import SearsServicesTextComponent from '../components/about/SearsServicesTextComponent'

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
