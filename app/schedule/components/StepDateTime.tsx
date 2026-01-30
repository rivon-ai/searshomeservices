"use client";

import React from "react";
import { Check } from "lucide-react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { DATES } from "../data";

interface StepProps {
    bookingData: any;
    updateBookingData: (key: string, value: any) => void;
    onNext: () => void;
}

export function StepDateTime({ bookingData, updateBookingData, onNext }: StepProps) {
    // Dates from shared config
    const dates = DATES;

    return (
        <div className="w-full mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
            <div className="space-y-1">
                <h2 className="text-2xl font-semibold text-[#00245B]">Please select the date and time that works best</h2>
                <p className="text-gray-500 text-sm">On the day of service, we'll send a message to let you know when your technician is on the way.</p>
            </div>

            {/* Date Carousel */}
            <div className="pt-4 px-12">
                <Carousel
                    opts={{
                        align: "start",
                    }}
                    className="w-full"
                >
                    <CarouselContent className="-ml-2 md:-ml-4">
                        {dates.map((date) => {
                            const isSelected = bookingData.serviceDate === date.label;
                            return (
                                <CarouselItem key={date.id} className="pl-2 md:pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4">
                                    <div className="flex flex-col gap-2 p-1">
                                        <span className="text-center text-sm font-medium text-[#00245B] whitespace-nowrap">{date.label}</span>
                                        <button
                                            onClick={() => {
                                                updateBookingData("serviceDate", date.label);
                                                updateBookingData("serviceTime", "8 AM - 5 PM");
                                            }}
                                            className={`w-full py-3 border rounded-md text-sm font-bold transition-all whitespace-nowrap shadow-sm cursor-pointer ${isSelected
                                                ? "bg-[#0046BE] border-[#0046BE] text-white"
                                                : "bg-white border-gray-200 text-[#00245B] hover:border-blue-300 hover:bg-blue-50"
                                                }`}
                                        >
                                            8 AM-5 PM
                                        </button>
                                    </div>
                                </CarouselItem>
                            )
                        })}
                    </CarouselContent>
                    <CarouselPrevious className="cursor-pointer" />
                    <CarouselNext className="cursor-pointer" />
                </Carousel>
            </div>

            <div className="pt-8 flex flex-col items-center">
                <button
                    onClick={onNext}
                    disabled={!bookingData.serviceDate}
                    className="cursor-pointer px-16 py-3 bg-[#0046BE] text-white font-bold rounded-lg hover:bg-blue-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Continue
                </button>
            </div>
        </div>
    );
}
