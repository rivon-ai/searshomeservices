"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { Star, User } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex gap-1 mb-2">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-5 h-5 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-200"
            }`}
        />
      ))}
    </div>
  );
};

export default function RatingSection({
  reviews,
}: {
  reviews: readonly { title: string; rating: number; text: string; author?: string }[];
}) {
  const params = useParams();

  // Mock date to match the design's specific appearance
  const currentDate = "DECEMBER 28, 2025";

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-12 gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-2 uppercase tracking-wide">
            FIVE STAR SERVICE
          </h2>
          <p className="text-gray-500 text-base md:text-lg font-light">
            With more than 1.3 Million 5 Star Reviews, you don't have to take
            our word for it.
          </p>
        </div>
        <Link
          href={`/locations/${params.state}/${params.city}/sears-appliance-repair/${params.location}/reviews`}
          className="text-blue-600 font-semibold hover:underline whitespace-nowrap mb-1"
        >
          View All Reviews
        </Link>
      </div>

      {/* Carousel */}
      <div className="relative px-2">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4 pb-4">
            {reviews.map((review, index) => (
              <CarouselItem
                key={index}
                className="pl-4 md:basis-1/2 lg:basis-1/3"
              >
                <Link
                  href={`/locations/${params.state}/${params.city}/sears-appliance-repair/${params.location}/reviews`}
                  className="block h-full"
                >
                  <Card className="border-none shadow-sm bg-[#F8F9FA] h-full cursor-pointer hover:shadow-md transition-shadow rounded-xl">
                    <CardContent className="p-8 flex flex-col h-full">
                      {/* Title */}
                      <h2 className="text-lg font-semibold text-blue-900 mb-2">
                        {review.title}
                      </h2>

                      {/* Star Rating */}
                      <StarRating rating={review.rating} />

                      {/* Review Text */}
                      <p className="text-gray-600 text-[15px] leading-relaxed mb-8 grow font-light">
                        {review.text}
                      </p>

                      {/* Author & Date */}
                      <div className="flex items-start gap-3 mt-auto pt-6 border-t border-gray-200/60">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
                          <User className="w-6 h-6 text-gray-400 fill-gray-400" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm text-gray-500 font-semibold uppercase tracking-wide">
                            {review.author}
                          </span>
                          <span className="text-xs text-slate-400 uppercase tracking-wider mt-0.5">
                            {currentDate}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Navigation Buttons */}
          <CarouselPrevious className="hidden md:flex absolute -left-5 top-1/2 -translate-y-1/2 bg-white border-none shadow-[0_2px_8px_rgba(0,0,0,0.15)] text-blue-900 hover:bg-white hover:text-blue-700 hover:shadow-lg transition-all duration-200 w-12 h-12 rounded-full z-10 cursor-pointer" />
          <CarouselNext className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 bg-white border-none shadow-[0_2px_8px_rgba(0,0,0,0.15)] text-blue-900 hover:bg-white hover:text-blue-700 hover:shadow-lg transition-all duration-200 w-12 h-12 rounded-full z-10 cursor-pointer" />
        </Carousel>
      </div>
    </div>
  );
}
