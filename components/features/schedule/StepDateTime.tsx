"use client";

import React from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import type { ScheduleDay } from "@/types/repairTypes";
import type { BookingData } from "@/hooks/useScheduleWizard";

interface StepDateTimeProps {
    bookingData: BookingData;
    updateBookingData: (key: keyof BookingData, value: unknown) => void;
    onNext: () => void;
    schedule: ScheduleDay[];
    isLoading: boolean;
}

/** Formats an ISO date string ("2026-04-01") to a short display label ("Wed, Apr 1") */
function formatDateLabel(isoDate: string): string {
    const date = new Date(isoDate + "T00:00:00");
    return date.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
    });
}

export function StepDateTime({
    bookingData,
    updateBookingData,
    onNext,
    schedule,
    isLoading,
}: StepDateTimeProps) {
    // ── Skeleton while schedule is loading ───────────────────────────────────
    if (isLoading) {
        return (
            <div className="w-full mx-auto space-y-6 animate-pulse">
                <div className="space-y-1">
                    <div className="h-7 w-72 bg-gray-200 rounded" />
                    <div className="h-4 w-80 bg-gray-100 rounded" />
                </div>
                <div className="flex gap-3 pt-4 px-12">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="flex flex-col gap-2 flex-1">
                            <div className="h-4 bg-gray-100 rounded" />
                            <div className="h-12 bg-gray-200 rounded" />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="w-full mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
            <div className="space-y-1">
                <h2 className="text-2xl font-semibold text-[#00245B]">
                    Please select the date and time that works best
                </h2>
                <p className="text-gray-500 text-sm">
                    On the day of service, we&apos;ll send a message to let you know when
                    your technician is on the way.
                </p>
            </div>

            {schedule.length === 0 ? (
                <p className="text-gray-400 text-sm pt-4">
                    No available dates found for your area. Please try a different zip code.
                </p>
            ) : (
                <div className="pt-4 px-12">
                    <Carousel opts={{ align: "start" }} className="w-full">
                        <CarouselContent className="-ml-2 md:-ml-4">
                            {schedule.map((day) => (
                                <CarouselItem
                                    key={day.date}
                                    className="pl-2 md:pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4"
                                >
                                    <div className="flex flex-col gap-2 p-1">
                                        <span className="text-center text-sm font-medium text-[#00245B] whitespace-nowrap">
                                            {formatDateLabel(day.date)}
                                        </span>

                                        {day.slots.map((slot) => {
                                            const isSelected =
                                                bookingData.serviceDate === day.date &&
                                                bookingData.serviceTime === slot.id;

                                            return (
                                                <button
                                                    key={slot.id}
                                                    disabled={!slot.available}
                                                    onClick={() => {
                                                        updateBookingData("serviceDate", day.date);
                                                        updateBookingData("serviceTime", slot.id);
                                                    }}
                                                    className={`w-full py-3 border rounded-md text-sm font-bold transition-all whitespace-nowrap shadow-sm cursor-pointer ${
                                                        !slot.available
                                                            ? "bg-gray-100 border-gray-200 text-gray-300 cursor-not-allowed"
                                                            : isSelected
                                                            ? "bg-[#0046BE] border-[#0046BE] text-white"
                                                            : "bg-white border-gray-200 text-[#00245B] hover:border-blue-300 hover:bg-blue-50"
                                                    }`}
                                                >
                                                    {slot.label}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="cursor-pointer" />
                        <CarouselNext className="cursor-pointer" />
                    </Carousel>
                </div>
            )}

            <div className="pt-8 flex flex-col items-center">
                <button
                    onClick={onNext}
                    disabled={!bookingData.serviceDate || !bookingData.serviceTime}
                    className="cursor-pointer px-16 py-3 bg-[#0046BE] text-white font-bold rounded-lg hover:bg-blue-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Continue
                </button>
            </div>
        </div>
    );
}
