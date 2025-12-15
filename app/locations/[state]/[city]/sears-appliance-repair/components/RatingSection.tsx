'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel'
import { Star, User } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React from 'react'


const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex gap-1 mb-3">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-5 h-5 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            }`}
        />
      ))}
    </div>
  );
};

export default function RatingSection({ reviews }: { reviews: { title: string; rating: number; text: string; author: string }[] }) {
  const params = useParams()
  return (
    <div className="max-w-7xl mx-auto px-4 py-16 bg-white">
      {/* Header */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-blue-900 mb-3 uppercase tracking-wide">
          FIVE STAR SERVICE
        </h2>
        <p className="text-gray-600 text-base">
          With more than 1.3 Million 5 Star Reviews, you don't have to take our word for it.
        </p>
      </div>

      {/* Carousel */}
      <div className="relative ">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {reviews.map((review, index) => (
              <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3 p-2">
                <Link href={`/locations/${params.state}/${params.city}/sears-appliance-repair/${params.location}/reviews`} >
                  <Card className="border-0 shadow-none bg-gray-50 h-full cursor-pointer hover:shadow-[0_0_10px_rgba(0,0,0,0.25)]">
                    <CardContent className="p-6 flex flex-col h-full">
                      {/* Title */}
                      <h3 className="text-lg font-semibold text-blue-900 mb-3">
                        {review.title}
                      </h3>

                      {/* Star Rating */}
                      <StarRating rating={review.rating} />

                      {/* Review Text */}
                      <p className="text-gray-700 text-sm leading-relaxed mb-6 grow">
                        {review.text}
                      </p>

                      {/* Author */}
                      <div className="flex items-center gap-2 mt-auto pt-4 border-t border-gray-200">
                        <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                          <User className="w-5 h-5 text-gray-500" />
                        </div>
                        <span className="text-sm text-gray-600 italic">
                          {review.author}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Navigation Buttons */}
          <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 bg-white border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-colors cursor-pointer size-10" />
          <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 bg-white border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-colors cursor-pointer size-10" />
        </Carousel>
      </div>
    </div>
  )
}