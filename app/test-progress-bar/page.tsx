"use client";

import React, { useState } from "react";
// Fix import to point to the correct file location
import { AntiGravityProgressBar } from "../components/AntiGravityProgressBar";
import { ArrowLeft, ArrowRight, AlertTriangle } from "lucide-react";

export default function ProgressBarDemoPage() {
    const [currentStep, setCurrentStep] = useState(1);
    const [isError, setIsError] = useState(false);
    const totalSteps = 6;

    const handleNext = () => {
        if (currentStep < totalSteps) {
            setCurrentStep((prev) => prev + 1);
            setIsError(false); // Reset error on change
        }
    };

    const handlePrev = () => {
        if (currentStep > 1) {
            setCurrentStep((prev) => prev - 1);
            setIsError(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-8 space-y-12">
            <div className="text-center space-y-2">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                    Anti-Gravity Progress Bar
                </h1>
                <p className="text-gray-500">
                    Visual verification of the sliding window and animation mechanics.
                </p>
            </div>

            <div className="w-full max-w-2xl p-12 bg-white rounded-2xl shadow-xl border border-gray-100 flex flex-col items-center justify-center min-h-[300px]">
                {/* Component Implementation */}
                <AntiGravityProgressBar
                    currentStep={currentStep}
                    totalSteps={totalSteps}
                    isError={isError}
                    onStepClick={setCurrentStep}
                />
            </div>

            {/* Controls */}
            <div className="flex flex-col items-center gap-6">
                <div className="flex items-center gap-4">
                    <button
                        onClick={handlePrev}
                        disabled={currentStep === 1}
                        className="flex items-center gap-2 px-6 py-3 rounded-full bg-white text-gray-900 border border-gray-200 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
                    >
                        <ArrowLeft size={18} />
                        Previous
                    </button>

                    <button
                        onClick={handleNext}
                        disabled={currentStep === totalSteps}
                        className="flex items-center gap-2 px-6 py-3 rounded-full bg-black text-white hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed shadow-md transition-all font-medium"
                    >
                        Next
                        <ArrowRight size={18} />
                    </button>
                </div>

                <button
                    onClick={() => setIsError(!isError)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${isError
                        ? "bg-red-100 text-red-700 border border-red-200 hover:bg-red-200"
                        : "bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200"
                        }`}
                >
                    <AlertTriangle size={16} />
                    {isError ? "Clear Error" : "Simulate Error"}
                </button>
            </div>

            <div className="text-sm text-gray-400">
                Current State: {currentStep} / {totalSteps} {isError && "(Error)"}
            </div>
        </div>
    );
}
