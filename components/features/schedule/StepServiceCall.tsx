"use client";

import React from "react";
import { Loader2 } from "lucide-react";

interface StepServiceCallProps {
    onNext: () => void;
    serviceFee: string;
    isLoading: boolean;
}

export function StepServiceCall({
    onNext,
    serviceFee,
    isLoading,
}: StepServiceCallProps) {
    return (
        <div className="w-full mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
            <div className="space-y-1">
                <h2 className="text-2xl font-semibold text-[#00245B]">
                    Service Call
                </h2>

                <div className="text-lg text-gray-800">
                    {isLoading ? (
                        <span className="inline-flex items-center gap-2 text-gray-400">
                            <Loader2 size={16} className="animate-spin" />
                            Loading fee...
                        </span>
                    ) : (
                        <>
                            <span className="font-semibold text-[#00245B]">
                                {serviceFee} fee
                            </span>{" "}
                            for repair diagnostic; fully waived if you proceed with the
                            repair.
                        </>
                    )}
                </div>

                <h2 className="text-xl font-semibold text-[#00245B] pt-4">
                    No charge until the day of service
                </h2>

                <p className="text-[#0046BE] font-medium cursor-pointer">
                    Have a Sears or other warranty?{" "}
                    <span className="underline">Click here</span>
                </p>
            </div>

            <div className="pt-8">
                <button
                    onClick={onNext}
                    disabled={isLoading}
                    className="cursor-pointer px-8 py-3 bg-[#0046BE] text-white font-bold rounded-lg hover:bg-blue-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                    Accept and Continue
                </button>
            </div>
        </div>
    );
}
