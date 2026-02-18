"use client";

import React, { Suspense } from "react";
import { SummarySidebar } from "@/components/shared/SummarySidebar";
import { AntiGravityProgressBar } from "@/components/shared/AntiGravityProgressBar";
import { DynamicFormContainer } from "@/components/shared/DynamicFormContainer";
import { BookingSuccess } from "@/components/features/schedule/BookingSuccess";
import { useScheduleWizard } from "../../hooks/useScheduleWizard";

import { APPLIANCES, BRANDS, DATES } from "./data";

function SchedulerContent() {
    const {
        currentStep,
        bookingData,
        createdAppointmentId,
        updateBookingData,
        handleNext,
        handleBack,
        handleStepClick,
        fieldErrors
    } = useScheduleWizard();

    // --- SUCCESS VIEW (Step 6) ---
    if (currentStep === 6) {
        return (
            <div className="flex h-screen w-full md:w-[70%] lg:w-[50%] mx-auto bg-white mb-20 px-4 md:px-0">
                {createdAppointmentId && <BookingSuccess appointmentId={createdAppointmentId} />}
            </div>
        );
    }

    // --- STANDARD WIZARD VIEW ---
    return (
        <div className="flex h-screen w-full md:w-[95%] lg:w-[80%] mx-auto bg-white overflow-hidden">
            {/* 1. LEFT SIDEBAR (Summary) */}
            <div className="w-80 h-full shrink-0 hidden md:block border-r border-transparent">
                <SummarySidebar
                    currentStep={currentStep}
                    bookingData={bookingData}
                    updateBookingData={updateBookingData}
                    onBack={handleBack}
                    appliances={APPLIANCES}
                    brands={BRANDS}
                    dates={DATES}
                />
            </div>

            {/* 2. RIGHT MAIN CONTENT AREA */}
            <div className="flex-1 flex flex-col h-full overflow-y-auto">

                {/* TOP HEADER: Progress Bar */}
                <div className="w-full bg-white pt-4 pb-2">
                    <AntiGravityProgressBar
                        currentStep={currentStep}
                        totalSteps={5}
                        onStepClick={handleStepClick}
                    />
                </div>

                {/* MAIN CONTENT: Dynamic Form */}
                <div className="flex-1 p-8 md:p-4 overflow-y-auto scrollbar-hide">
                    <DynamicFormContainer
                        currentStep={currentStep}
                        onNext={handleNext}
                        bookingData={bookingData}
                        updateBookingData={updateBookingData}
                        fieldErrors={fieldErrors}
                    />
                </div>

            </div>
        </div>
    );
}

export default function SchedulerPage() {
    return (
        <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading...</div>}>
            <SchedulerContent />
        </Suspense>
    );
}
