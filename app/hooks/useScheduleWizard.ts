"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createAppointment } from "@/lib/appointmentService";
import { validations } from "@/lib/validations";
import { brandAppliances } from "@/utils/brandAppliances";

export interface BookingData {
    appliance: string;
    brand: string;
    issue: string;
    zipCode: string;
    serviceDate: string;
    serviceTime: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    streetAddress: string;
    suite: string;
    city: string;
    state: string;
    specialInstructions: boolean;
    instructions: string;
}

const INITIAL_DATA: BookingData = {
    appliance: "",
    brand: "",
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
};

export function useScheduleWizard() {
    const router = useRouter();
    const searchParams = useSearchParams();
    
    const [currentStep, setCurrentStep] = useState(1);
    const [bookingData, setBookingData] = useState<BookingData>(INITIAL_DATA);
    const [createdAppointmentId, setCreatedAppointmentId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

    // Initialize from search params
    useEffect(() => {
        const applianceParam = searchParams.get("appliance") || "";
        const brandParam = searchParams.get("brand") || "";
        
        if (applianceParam || brandParam) {
            setBookingData(prev => ({
                ...prev,
                appliance: prev.appliance || applianceParam,
                brand: prev.brand || brandParam
            }));
        }
    }, [searchParams]);

    const updateBookingData = useCallback((key: keyof BookingData, value: any) => {
        setBookingData(prev => ({ ...prev, [key]: value }));
        // Clear field error when user starts typing
        if (fieldErrors[key]) {
            setFieldErrors(prev => {
                const updated = { ...prev };
                delete updated[key];
                return updated;
            });
        }
    }, [fieldErrors]);

    // Step Validation Logic
    const isStepValid = useCallback((step: number) => {
        switch (step) {
            case 1:
                return !!bookingData.appliance && !!bookingData.brand;
            case 2:
                return !!bookingData.zipCode && bookingData.zipCode.length >= 5;
            case 3:
                return !!bookingData.serviceDate;
            case 4:
                return true; // Info step
            case 5:
                return (
                    !!bookingData.firstName &&
                    !!bookingData.lastName &&
                    !!bookingData.email &&
                    !!bookingData.phone &&
                    !!bookingData.streetAddress &&
                    !!bookingData.city &&
                    !!bookingData.state &&
                    !!bookingData.zipCode
                );
            default:
                return false;
        }
    }, [bookingData]);

    const validateFinalStep = () => {
        const errors: Record<string, string> = {};
        
        const firstNameErr = validations.validateName(bookingData.firstName, "First name");
        const lastNameErr = validations.validateName(bookingData.lastName, "Last name");
        const emailErr = validations.validateEmail(bookingData.email, true);
        const phoneErr = validations.validatePhone(bookingData.phone);
        const addressErr = validations.validateAddress(bookingData.streetAddress);
        const cityErr = validations.validateCity(bookingData.city);
        const stateErr = validations.validateState(bookingData.state);
        const zipErr = validations.validateZipCode(bookingData.zipCode);

        if (firstNameErr) errors.firstName = firstNameErr;
        if (lastNameErr) errors.lastName = lastNameErr;
        if (emailErr) errors.email = emailErr;
        if (phoneErr) errors.phone = phoneErr;
        if (addressErr) errors.streetAddress = addressErr;
        if (cityErr) errors.city = cityErr;
        if (stateErr) errors.state = stateErr;
        if (zipErr) errors.zipCode = zipErr;

        setFieldErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const getMaxReachableStep = useCallback(() => {
        if (!isStepValid(1)) return 1;
        if (!isStepValid(2)) return 2;
        if (!isStepValid(3)) return 3;
        if (!isStepValid(4)) return 4;
        if (!isStepValid(5)) return 5;
        return 6;
    }, [isStepValid]);

    const handleNext = async () => {
        const maxStep = getMaxReachableStep();

        if (currentStep === 5) {
            if (!validateFinalStep()) return;
            
            setIsLoading(true);
            setError("");
            try {
                const appointment = await createAppointment(bookingData);
                setCreatedAppointmentId(appointment.id);
                setCurrentStep(6);
            } catch (err) {
                console.error("Failed to book appointment", err);
                setError("Failed to book appointment. Please try again.");
            } finally {
                setIsLoading(false);
            }
            return;
        }

        if (currentStep < 5 && currentStep <= maxStep) {
            setCurrentStep(prev => prev + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 1 && currentStep < 6) {
            setCurrentStep(prev => prev - 1);
        }
    };

    const handleStepClick = (step: number) => {
        if (currentStep === 6) return;
        const maxReachable = getMaxReachableStep();
        if (step <= maxReachable && step < 6) {
            setCurrentStep(step);
        }
    };

    return {
        currentStep,
        bookingData,
        createdAppointmentId,
        isLoading,
        error,
        fieldErrors,
        updateBookingData,
        handleNext,
        handleBack,
        handleStepClick,
        isStepValid,
        getMaxReachableStep
    };
}
