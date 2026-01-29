"use client";

import React, { useState } from "react";
import FloatingLabelInput from "../../../components/FloatingLabelInput";

interface StepProps {
    bookingData: any;
    updateBookingData: (key: string, value: any) => void;
    onNext: () => void;
}

export function StepZipCode({ bookingData, updateBookingData, onNext }: StepProps) {
    const [error, setError] = useState("");

    const handleNext = () => {
        if (!bookingData.zipCode || bookingData.zipCode.length < 5) {
            setError("Please enter a valid 5-digit zip code.");
            return;
        }
        onNext();
    };

    return (
        <div className="w-full mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
            <div className="space-y-1">
                <h2 className="text-2xl font-semibold text-[#00245B]">Where is the appliance?</h2>
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
                            const value = e.target.value.replace(/\D/g, "").slice(0, 5);
                            updateBookingData("zipCode", value);
                            if (error) setError("");
                        }}
                        className={error ? "text-red-600" : "text-[#00245B]"}
                        maxLength={5}
                        autoFocus
                    />
                    {error && <span className="text-xs text-red-500 mt-1 block">{error}</span>}
                </div>
            </div>

            <div className="pt-12 px-20 md:px-44 flex flex-col items-center">
                <button
                    onClick={handleNext}
                    className="cursor-pointer px-16 py-3 bg-[#0046BE] text-white font-bold rounded-lg hover:bg-blue-800 transition-colors"
                >
                    Continue
                </button>
            </div>
        </div>
    );
}
