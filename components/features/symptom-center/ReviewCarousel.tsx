"use client"

import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

interface Testimonial {
    id: number;
    title: string;
    rating: number; // 1-5 stars
    review: string;
    customerName: string;
    location: string;
}

const StarRating = ({ rating }: { rating: number }) => {
    return (
        <div className="flex gap-1">
            {[...Array(5)].map((_, index) => (
                <svg
                    key={index}
                    className={`w-5 h-5 ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            ))}
        </div>
    );
};

interface ReviewCarouselProps {
    testimonials: Testimonial[];
}

export default function ReviewCarousel({ testimonials }: ReviewCarouselProps) {
    return (
        <section className="w-full py-16">
            <div className="py-4 ">

                {/* Testimonials */}
                <div>
                    <h2 className="text-2xl font-bold  mb-4">
                        What our customers say about us
                    </h2>
                    <p className="text-base sm:text-lg text-gray-700 mb-12">
                        With more than 1.3 Million 5 Star Reviews, you don't have to take our word for it
                    </p>

                    {/* Testimonials Carousel */}
                    <Carousel
                        opts={{
                            align: "start",
                            loop: true,
                        }}
                        className="w-full"
                    >
                        <CarouselContent className="-ml-4 px-2">
                            {testimonials.map((testimonial, index) => (
                                <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3 py-4">
                                    <div className="bg-white rounded-2xl p-6 shadow-md h-full flex flex-col">
                                        {/* Title from first few words of quote */}
                                        <h4 className="text-lg font-bold text-gray-900 mb-3">
                                            {testimonial.title}
                                        </h4>

                                        {/* Star Rating */}
                                        <div className="mb-4">
                                            <StarRating rating={testimonial.rating} />
                                        </div>

                                        {/* review */}
                                        <p className="text-sm text-gray-700 mb-6 grow leading-relaxed">
                                            {testimonial.review}
                                        </p>

                                        {/* Author */}
                                        <div className="border-t border-gray-200 pt-4">
                                            <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">
                                                {testimonial.customerName} <br />
                                                {testimonial.location}
                                            </p>
                                        </div>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        {
                            testimonials.length > 3
                            &&
                            <div className="flex justify-center gap-2 mt-8">
                                <CarouselPrevious className="relative left-0 translate-y-0 bg-white hover:bg-gray-100 border-2 border-gray-300" />
                                <CarouselNext className="relative right-0 translate-y-0 bg-white hover:bg-gray-100 border-2 border-gray-300" />
                            </div>
                        }

                    </Carousel>
                </div>
            </div>
        </section>
    )
}

