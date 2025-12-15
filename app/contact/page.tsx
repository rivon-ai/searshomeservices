import React from 'react'
import FaqAccordition from "./components/FaqAccordition"
import Imagesection from './components/ImageSection'

export default function page() {
  return (
<div className='w-[75%] mx-auto'>
      <Imagesection />
      <FaqAccordition />
    </div>
  )
}