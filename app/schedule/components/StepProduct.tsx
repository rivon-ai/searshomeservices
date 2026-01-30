"use client";

import React from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { APPLIANCES, BRANDS } from "../data";

interface StepProps {
    bookingData: any;
    updateBookingData: (key: string, value: any) => void;
    onNext: () => void;
}

export function StepProduct({ bookingData, updateBookingData, onNext }: StepProps) {
    return (
        <div className="w-full mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
            <div className="space-y-1">
                <h2 className="text-2xl font-semibold text-[#00245B]">What needs repair?</h2>
                <p className="text-gray-500">Now, choose your brand.</p>
            </div>

            <div className="space-y-4">
                {/* Appliance Select */}
                <div className="relative">
                    <Select
                        value={bookingData.appliance}
                        onValueChange={(val) => updateBookingData("appliance", val)}
                    >
                        <SelectTrigger className="cursor-pointer w-full p-4 h-auto border-gray-300 rounded-lg bg-white text-gray-700 font-medium focus:ring-2 focus:ring-blue-900 focus:outline-none text-base">
                            <SelectValue placeholder="Select an appliance" />
                        </SelectTrigger>
                        <SelectContent>
                            {APPLIANCES.map((appliance) => (
                                <SelectItem key={appliance.value} className="cursor-pointer" value={appliance.value}>
                                    {appliance.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Brand Select */}
                <div className="relative">
                    <Select
                        value={bookingData.brand}
                        onValueChange={(val) => updateBookingData("brand", val)}
                    >
                        <SelectTrigger className="cursor-pointer w-full p-4 h-auto border-gray-300 rounded-lg bg-white text-gray-700 font-medium focus:ring-2 focus:ring-blue-900 focus:outline-none text-base">
                            <SelectValue placeholder="Select a brand" />
                        </SelectTrigger>
                        <SelectContent>
                            {BRANDS.map((brand) => (
                                <SelectItem key={brand.value} className="cursor-pointer" value={brand.value}>
                                    {brand.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="pt-4 px-20 md:px-44 flex flex-col items-center">
                <button
                    onClick={onNext}
                    disabled={!bookingData.appliance || !bookingData.brand}
                    className="cursor-pointer px-16 py-3 bg-[#0046BE] text-white font-bold rounded-lg hover:bg-blue-800 transition-colors"
                >
                    Continue
                </button>
                <p className="text-[#0046BE] text-sm font-medium mt-4 cursor-pointer text-center">
                    Will you be using repair benefits from a Sears or other warranty plan?
                </p>
            </div>
        </div>
    );
}
