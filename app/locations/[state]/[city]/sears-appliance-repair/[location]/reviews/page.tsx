import React from 'react'
import ReviewsList from './components/ReviewList';
import RatingSummary from './components/RatingSummary';


interface Review {
  id: string;
  date: string;
  customerName: string;
  rating: number;
  reviewBody: string;
  response?: string;
}

const sampleReviews: Review[] = [
  {
    id: "1752458453432",
    date: "July 13, 2025",
    customerName: "Eric A.",
    rating: 5,
    reviewBody: "Customer service response - We appreciate the 5 star rating! It's fantastic to know you had such a positive experience. We're always here to help you in the future!",
    response: "We appreciate the 5 star rating! It's fantastic to know you had such a positive experience. We're always here to help you in the future!"
  },
  {
    id: "1752458243729",
    date: "June 29, 2025",
    customerName: "Richard R.",
    rating: 5,
    reviewBody: "Richard was very punctual and it took him about 30 minutes to replace the dispenser on the dishwasher. He was friendly and efficient.",
    response: "Thank you for your feedback, Richard! We're happy to hear that our technician was punctual, friendly, and efficient in replacing the dishwasher dispenser."
  },
  {
    id: "1752458194296",
    date: "June 26, 2025",
    customerName: "Alex.",
    rating: 5,
    reviewBody: "Donald was awesome! Incredibly helpful and knowledgeable.",
    response: "Thank you for your feedback, Alex! We're happy to hear that Donald was incredibly helpful and knowledgeable."
  },
  {
    id: "1752458453434",
    date: "July 8, 2025",
    customerName: "Michael R.",
    rating: 4,
    reviewBody: "Very satisfied with the repair service. The technician diagnosed the problem with my washing machine quickly and had it fixed the same day.",
  },
  {
    id: "1752458453435",
    date: "June 15, 2025",
    customerName: "Jennifer L.",
    rating: 5,
    reviewBody: "Outstanding service! Our oven stopped working right before a family gathering, and they were able to send someone out the next day.",
    response: "We're so glad we could help you in time for your gathering! Thank you for choosing Sears Home Services."
  },
    {
    id: "1752458453432",
    date: "July 13, 2025",
    customerName: "Eric A.",
    rating: 5,
    reviewBody: "Customer service response - We appreciate the 5 star rating! It's fantastic to know you had such a positive experience. We're always here to help you in the future!",
    response: "We appreciate the 5 star rating! It's fantastic to know you had such a positive experience. We're always here to help you in the future!"
  },
  {
    id: "1752458243729",
    date: "June 29, 2025",
    customerName: "Richard R.",
    rating: 5,
    reviewBody: "Richard was very punctual and it took him about 30 minutes to replace the dispenser on the dishwasher. He was friendly and efficient.",
    response: "Thank you for your feedback, Richard! We're happy to hear that our technician was punctual, friendly, and efficient in replacing the dishwasher dispenser."
  },
  {
    id: "1752458194296",
    date: "June 26, 2025",
    customerName: "Alex.",
    rating: 5,
    reviewBody: "Donald was awesome! Incredibly helpful and knowledgeable.",
    response: "Thank you for your feedback, Alex! We're happy to hear that Donald was incredibly helpful and knowledgeable."
  },
  {
    id: "1752458453434",
    date: "July 8, 2025",
    customerName: "Michael R.",
    rating: 4,
    reviewBody: "Very satisfied with the repair service. The technician diagnosed the problem with my washing machine quickly and had it fixed the same day.",
  },
  {
    id: "1752458453435",
    date: "June 15, 2025",
    customerName: "Jennifer L.",
    rating: 5,
    reviewBody: "Outstanding service! Our oven stopped working right before a family gathering, and they were able to send someone out the next day.",
    response: "We're so glad we could help you in time for your gathering! Thank you for choosing Sears Home Services."
  },
    {
    id: "1752458453432",
    date: "July 13, 2025",
    customerName: "Eric A.",
    rating: 5,
    reviewBody: "Customer service response - We appreciate the 5 star rating! It's fantastic to know you had such a positive experience. We're always here to help you in the future!",
    response: "We appreciate the 5 star rating! It's fantastic to know you had such a positive experience. We're always here to help you in the future!"
  },
  {
    id: "1752458243729",
    date: "June 29, 2025",
    customerName: "Richard R.",
    rating: 5,
    reviewBody: "Richard was very punctual and it took him about 30 minutes to replace the dispenser on the dishwasher. He was friendly and efficient.",
    response: "Thank you for your feedback, Richard! We're happy to hear that our technician was punctual, friendly, and efficient in replacing the dishwasher dispenser."
  },
  {
    id: "1752458194296",
    date: "June 26, 2025",
    customerName: "Alex.",
    rating: 5,
    reviewBody: "Donald was awesome! Incredibly helpful and knowledgeable.",
    response: "Thank you for your feedback, Alex! We're happy to hear that Donald was incredibly helpful and knowledgeable."
  },
  {
    id: "1752458453434",
    date: "July 8, 2025",
    customerName: "Michael R.",
    rating: 4,
    reviewBody: "Very satisfied with the repair service. The technician diagnosed the problem with my washing machine quickly and had it fixed the same day.",
  },
  {
    id: "1752458453435",
    date: "June 15, 2025",
    customerName: "Jennifer L.",
    rating: 5,
    reviewBody: "Outstanding service! Our oven stopped working right before a family gathering, and they were able to send someone out the next day.",
    response: "We're so glad we could help you in time for your gathering! Thank you for choosing Sears Home Services."
  },
    {
    id: "1752458453432",
    date: "July 13, 2025",
    customerName: "Eric A.",
    rating: 5,
    reviewBody: "Customer service response - We appreciate the 5 star rating! It's fantastic to know you had such a positive experience. We're always here to help you in the future!",
    response: "We appreciate the 5 star rating! It's fantastic to know you had such a positive experience. We're always here to help you in the future!"
  },
  {
    id: "1752458243729",
    date: "June 29, 2025",
    customerName: "Richard R.",
    rating: 5,
    reviewBody: "Richard was very punctual and it took him about 30 minutes to replace the dispenser on the dishwasher. He was friendly and efficient.",
    response: "Thank you for your feedback, Richard! We're happy to hear that our technician was punctual, friendly, and efficient in replacing the dishwasher dispenser."
  },
  {
    id: "1752458194296",
    date: "June 26, 2025",
    customerName: "Alex.",
    rating: 5,
    reviewBody: "Donald was awesome! Incredibly helpful and knowledgeable.",
    response: "Thank you for your feedback, Alex! We're happy to hear that Donald was incredibly helpful and knowledgeable."
  },
  {
    id: "1752458453434",
    date: "July 8, 2025",
    customerName: "Michael R.",
    rating: 4,
    reviewBody: "Very satisfied with the repair service. The technician diagnosed the problem with my washing machine quickly and had it fixed the same day.",
  },
  {
    id: "1752458453435",
    date: "June 15, 2025",
    customerName: "Jennifer L.",
    rating: 5,
    reviewBody: "Outstanding service! Our oven stopped working right before a family gathering, and they were able to send someone out the next day.",
    response: "We're so glad we could help you in time for your gathering! Thank you for choosing Sears Home Services."
  },
    {
    id: "1752458453432",
    date: "July 13, 2025",
    customerName: "Eric A.",
    rating: 5,
    reviewBody: "Customer service response - We appreciate the 5 star rating! It's fantastic to know you had such a positive experience. We're always here to help you in the future!",
    response: "We appreciate the 5 star rating! It's fantastic to know you had such a positive experience. We're always here to help you in the future!"
  },
  {
    id: "1752458243729",
    date: "June 29, 2025",
    customerName: "Richard R.",
    rating: 5,
    reviewBody: "Richard was very punctual and it took him about 30 minutes to replace the dispenser on the dishwasher. He was friendly and efficient.",
    response: "Thank you for your feedback, Richard! We're happy to hear that our technician was punctual, friendly, and efficient in replacing the dishwasher dispenser."
  },
  {
    id: "1752458194296",
    date: "June 26, 2025",
    customerName: "Alex.",
    rating: 5,
    reviewBody: "Donald was awesome! Incredibly helpful and knowledgeable.",
    response: "Thank you for your feedback, Alex! We're happy to hear that Donald was incredibly helpful and knowledgeable."
  },
  {
    id: "1752458453434",
    date: "July 8, 2025",
    customerName: "Michael R.",
    rating: 4,
    reviewBody: "Very satisfied with the repair service. The technician diagnosed the problem with my washing machine quickly and had it fixed the same day.",
  },
  {
    id: "1752458453435",
    date: "June 15, 2025",
    customerName: "Jennifer L.",
    rating: 5,
    reviewBody: "Outstanding service! Our oven stopped working right before a family gathering, and they were able to send someone out the next day.",
    response: "We're so glad we could help you in time for your gathering! Thank you for choosing Sears Home Services."
  }
];

export default function page() {
  return (
    <div className='w-[75%] mx-auto flex justify-between'>

      <ReviewsList reviews={sampleReviews} />

    </div>
  )
}