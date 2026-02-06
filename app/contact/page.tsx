import React from 'react'
import FaqAccordition from "../components/contact/FaqAccordition"
import Imagesection from '../components/contact/ImageSection'

export default function page() {
  return (
<div className='w-[75%] mx-auto'>
      <Imagesection />
      <FaqAccordition />
    </div>
  )
}