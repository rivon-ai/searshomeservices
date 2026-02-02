"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { SummarySidebar } from "../components/SummarySidebar";
import { AntiGravityProgressBar } from "../components/AntiGravityProgressBar";
import { DynamicFormContainer } from "../components/DynamicFormContainer";
import { createAppointment } from "../services/appointmentService";
import { BookingSuccess } from "./components/BookingSuccess"; // Import new component

import { APPLIANCES, BRANDS, DATES } from "./data";

function SchedulerContent() {
    const searchParams = useSearchParams();
    const applianceParam = searchParams.get("appliance") || "";
    const brandParam = searchParams.get("brand") || "";

    // --- STATE ---
    const [currentStep, setCurrentStep] = useState(1);
    const [createdAppointmentId, setCreatedAppointmentId] = useState<string | null>(null);
    const [bookingData, setBookingData] = useState({
        appliance: applianceParam,
        brand: brandParam,
        issue: "",
        zipCode: "",
        serviceDate: "",
        serviceTime: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        streetAddress: "",
        suite: "",
        city: "",
        state: "",
        specialInstructions: false,
        instructions: ""
    });

    // --- HANDLERS ---

    // Validation Helper
    const isStep1Valid = !!bookingData.appliance && !!bookingData.brand;
    const isStep2Valid = isStep1Valid && !!bookingData.zipCode && bookingData.zipCode.length >= 5;
    const isStep3Valid = isStep2Valid && !!bookingData.serviceDate;
    const isStep4Valid = isStep3Valid; // Service Call is info-only, always valid to proceed if reached
    const isStep5Valid = isStep4Valid && !!bookingData.firstName && !!bookingData.lastName && !!bookingData.email && !!bookingData.phone && !!bookingData.streetAddress && !!bookingData.city && !!bookingData.state && !!bookingData.zipCode;

    // Determine the furthest step user can click
    const getMaxReachableStep = () => {
        if (!isStep1Valid) return 1;
        if (!isStep2Valid) return 2;
        if (!isStep3Valid) return 3;
        if (!isStep4Valid) return 4;
        if (!isStep5Valid) return 5;
        return 6; // Allow reaching success if done
    };

    const handleNext = async () => {
        const maxStep = getMaxReachableStep();

        // Handle Final Step Submission
        if (currentStep === 5) {
            try {
                // @ts-ignore
                const appointment = await createAppointment(bookingData);
                setCreatedAppointmentId(appointment.id);
                // Move to Success Screen
                setCurrentStep(6);
            } catch (error) {
                console.error("Failed to book appointment", error);
                alert("Failed to book appointment. Please try again.");
            }
            return;
        }

        if (currentStep < 5 && currentStep < maxStep + 1) {
            if (currentStep === 1 && !isStep1Valid) return;
            if (currentStep === 2 && !isStep2Valid) return;
            if (currentStep === 3 && !isStep3Valid) return;

            setCurrentStep((prev) => prev + 1);
        } else if (currentStep < 5 && currentStep === maxStep && ((currentStep === 1 && isStep1Valid) || (currentStep === 2 && isStep2Valid) || (currentStep === 3 && isStep3Valid) || currentStep === 4)) {
            setCurrentStep((prev) => prev + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 1 && currentStep < 6) { // Don't allow back from Success
            setCurrentStep((prev) => prev - 1);
        }
    };

    const handleStepClick = (step: number) => {
        if (currentStep === 6) return; // Disable navigation when in success
        const maxReachable = getMaxReachableStep();

        if (step <= maxReachable && step < 6) { // Don't allow clicking step 6 directly
            setCurrentStep(step);
        }
    }

    const updateBookingData = (key: keyof typeof bookingData, value: any) => {
        setBookingData((prev) => ({
            ...prev,
            [key]: value
        }));
    };

    // Update state if params change or on initial load (optional, but good for consistency)
    useEffect(() => {
        if (applianceParam || brandParam) {
            setBookingData(prev => ({
                ...prev,
                appliance: prev.appliance || applianceParam,
                brand: prev.brand || brandParam
            }));
        }
    }, [applianceParam, brandParam]);

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
