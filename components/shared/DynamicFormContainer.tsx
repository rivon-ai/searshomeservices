"use client";

import React from "react";
import { StepProduct } from "@/components/features/schedule/StepProduct";
import { StepZipCode } from "@/components/features/schedule/StepZipCode";
import { StepDateTime } from "@/components/features/schedule/StepDateTime";
import { StepServiceCall } from "@/components/features/schedule/StepServiceCall";
import { SetBooking } from "@/components/features/schedule/SetBooking";
import type {
    ApplianceOption,
    BrandsByAppliance,
    StateOption,
    ScheduleDay,
} from "@/types/repairTypes";
import type { BookingData } from "@/hooks/useScheduleWizard";

interface DynamicFormContainerProps {
    currentStep: number;
    onNext: () => void;
    bookingData: BookingData;
    updateBookingData: (key: keyof BookingData, value: unknown) => void;
    fieldErrors: Record<string, string>;
    // API data
    appliances: ApplianceOption[];
    brandsByAppliance: BrandsByAppliance;
    states: StateOption[];
    schedule: ScheduleDay[];
    serviceFee: string;
    // Loading flags
    isLoadingOptions: boolean;
    isLoadingSchedule: boolean;
    isLoadingFee: boolean;
    zipValidationState: "idle" | "loading" | "valid" | "invalid";
    zipError: string;
}

export function DynamicFormContainer({
    currentStep,
    onNext,
    bookingData,
    updateBookingData,
    fieldErrors,
    appliances,
    brandsByAppliance,
    states,
    schedule,
    serviceFee,
    isLoadingOptions,
    isLoadingSchedule,
    isLoadingFee,
    zipValidationState,
    zipError,
}: DynamicFormContainerProps) {

    if (currentStep === 1) {
        return (
            <StepProduct
                bookingData={bookingData}
                updateBookingData={updateBookingData}
                onNext={onNext}
                appliances={appliances}
                brandsByAppliance={brandsByAppliance}
                isLoading={isLoadingOptions}
            />
        );
    }

    if (currentStep === 2) {
        return (
            <StepZipCode
                bookingData={bookingData}
                updateBookingData={updateBookingData}
                onNext={onNext}
                zipValidationState={zipValidationState}
                zipError={zipError}
            />
        );
    }

    if (currentStep === 3) {
        return (
            <StepDateTime
                bookingData={bookingData}
                updateBookingData={updateBookingData}
                onNext={onNext}
                schedule={schedule}
                isLoading={isLoadingSchedule}
            />
        );
    }

    if (currentStep === 4) {
        return (
            <StepServiceCall
                onNext={onNext}
                serviceFee={serviceFee}
                isLoading={isLoadingFee}
            />
        );
    }

    if (currentStep === 5) {
        return (
            <SetBooking
                bookingData={bookingData}
                updateBookingData={updateBookingData}
                onNext={onNext}
                fieldErrors={fieldErrors}
                states={states}
            />
        );
    }

    return null;
}
