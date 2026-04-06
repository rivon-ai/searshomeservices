"use client";

import React from "react";
import FloatingLabelInput from "../../shared/FloatingLabelInput";
import { Loader2 } from "lucide-react";
import type { BookingData } from "@/hooks/useScheduleWizard";

interface StepZipCodeProps {
    bookingData: BookingData;
    updateBookingData: (key: keyof BookingData, value: unknown) => void;
    onNext: () => void;
    zipValidationState: "idle" | "loading" | "valid" | "invalid";
    zipError: string;
}

export function StepZipCode({
    bookingData,
    updateBookingData,
    onNext,
    zipValidationState,
    zipError,
}: StepZipCodeProps) {
    const isValidating = zipValidationState === "loading";
    const hasError = zipValidationState === "invalid";

    return (
        <div className="w-full mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
            <div className="space-y-1">
                <h2 className="text-2xl font-semibold text-[#00245B]">
                    Where is the appliance?
                </h2>
            </div>

            <div className="pt-6">
                <div className="group">
                    <FloatingLabelInput
                        type="text"
                        id="zipCode"
                        label="Enter your zip code *"
                        inputMode="numeric"
                        value={bookingData.zipCode || ""}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            // Only allow numeric characters, max 5 digits
                            const value = e.target.value.replace(/\D/g, "").slice(0, 5);
                            updateBookingData("zipCode", value);
                        }}
                        className={hasError ? "text-red-600" : "text-[#00245B]"}
                        maxLength={5}
                        autoFocus
                        disabled={isValidating}
                    />
                    {hasError && zipError && (
                        <span className="text-xs text-red-500 mt-1 block">
                            {zipError}
                        </span>
                    )}
                </div>
            </div>

            <div className="pt-12 px-20 md:px-44 flex flex-col items-center">
                <button
                    onClick={onNext}
                    disabled={isValidating || bookingData.zipCode.length < 5}
                    className="cursor-pointer px-16 py-3 bg-[#0046BE] text-white font-bold rounded-lg hover:bg-blue-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
                >
                    {isValidating && (
                        <Loader2 size={16} className="animate-spin" />
                    )}
                    {isValidating ? "Checking..." : "Continue"}
                </button>
            </div>
        </div>
    );
}
