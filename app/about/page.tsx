import React from 'react'
import Imagesection from './components/Imagesection'
import CardSection from './components/CardSection'
import SearsServicesTextComponent from './components/SearsServicesTextComponent'

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
