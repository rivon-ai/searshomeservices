"use client";

import React from "react";
import { StepProduct } from "../schedule/components/StepProduct";
import { StepZipCode } from "../schedule/components/StepZipCode";
import { StepDateTime } from "../schedule/components/StepDateTime";
import { StepServiceCall } from "../schedule/components/StepServiceCall";
import { SetBooking } from "../schedule/components/SetBooking";

interface BookingData {
    appliance: string;
    brand: string;
    zipCode: string;
    serviceDate: string;
    serviceTime: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    streetAddress: string;
    city: string;
    state: string;
    specialInstructions?: boolean;
    instructions?: string;
}

interface DynamicFormContainerProps {
    currentStep: number;
    onNext: () => void;
    bookingData: BookingData;
    updateBookingData: (key: keyof BookingData, value: any) => void;
}

export function DynamicFormContainer({
    currentStep,
    onNext,
    bookingData,
    updateBookingData,
}: DynamicFormContainerProps) {

    // --- RENDER COMPONENT VIA STEP ---

    if (currentStep === 1) {
        return <StepProduct bookingData={bookingData} updateBookingData={updateBookingData as (key: string, value: any) => void} onNext={onNext} />;
    }

    if (currentStep === 2) {
        return <StepZipCode bookingData={bookingData} updateBookingData={updateBookingData as (key: string, value: any) => void} onNext={onNext} />;
    }

    if (currentStep === 3) {
        return <StepDateTime bookingData={bookingData} updateBookingData={updateBookingData as (key: string, value: any) => void} onNext={onNext} />;
    }

    if (currentStep === 4) {
        return <StepServiceCall onNext={onNext} />;
    }

    if (currentStep === 5) {
        return <SetBooking bookingData={bookingData} updateBookingData={updateBookingData as (key: string, value: any) => void} onNext={onNext} />;
    }

    return null;
}
