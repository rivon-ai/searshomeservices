"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import {
    getWizardOptions,
    validateZipCode,
    getSchedule,
    getServicePricing,
    createAppointment,
} from "@/services/appointmentService";
import { validations } from "@/utils/validations";
import type {
    WizardOptions,
    ScheduleDay,
    ApplianceOption,
} from "@/types/repairTypes";

// ---------------------------------------------------------------------------
// Booking form data — all fields the wizard collects across its 5 steps.
// `appliance` stores the API id (e.g. "washer"), not the display label.
// `instructions` maps to the backend's `specialInstructions` field on POST.
// ---------------------------------------------------------------------------
export interface BookingData {
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
    suite: string;
    city: string;
    state: string;
    specialInstructions: boolean;
    instructions: string;
}

const INITIAL_DATA: BookingData = {
    appliance: "",
    brand: "",
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
    instructions: "",
};

type ZipValidationState = "idle" | "loading" | "valid" | "invalid";

export function useScheduleWizard() {
    const searchParams = useSearchParams();

    // ── Wizard navigation ────────────────────────────────────────────────────
    const [currentStep, setCurrentStep] = useState(1);

    // ── Form data ────────────────────────────────────────────────────────────
    const [bookingData, setBookingData] = useState<BookingData>(INITIAL_DATA);

    // ── Submission ───────────────────────────────────────────────────────────
    const [createdAppointmentId, setCreatedAppointmentId] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState("");
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

    // ── API data ─────────────────────────────────────────────────────────────
    const [wizardOptions, setWizardOptions] = useState<WizardOptions | null>(null);
    const [schedule, setSchedule] = useState<ScheduleDay[]>([]);
    const [serviceFee, setServiceFee] = useState("");

    // ── Async loading states ─────────────────────────────────────────────────
    const [isLoadingOptions, setIsLoadingOptions] = useState(false);
    const [isLoadingSchedule, setIsLoadingSchedule] = useState(false);
    const [isLoadingFee, setIsLoadingFee] = useState(false);
    const [zipValidationState, setZipValidationState] = useState<ZipValidationState>("idle");
    const [zipError, setZipError] = useState("");

    // ── Initialise from URL search params (e.g. /schedule?appliance=washer) ──
    useEffect(() => {
        const applianceParam = searchParams.get("appliance") ?? "";
        const brandParam = searchParams.get("brand") ?? "";

        if (applianceParam || brandParam) {
            setBookingData((prev) => ({
                ...prev,
                appliance: prev.appliance || applianceParam,
                brand: prev.brand || brandParam,
            }));
        }
    }, [searchParams]);

    // ── Load wizard options on mount ─────────────────────────────────────────
    useEffect(() => {
        let cancelled = false;

        const load = async () => {
            setIsLoadingOptions(true);
            try {
                const options = await getWizardOptions();
                if (!cancelled) setWizardOptions(options);
            } catch (err) {
                console.error("[useScheduleWizard] Failed to load options:", err);
            } finally {
                if (!cancelled) setIsLoadingOptions(false);
            }
        };

        load();
        return () => { cancelled = true; };
    }, []);

    // ── Helper: resolve appliance label from id for display purposes ─────────
    const getApplianceLabel = useCallback(
        (id: string): string => {
            if (!wizardOptions) return id;
            const match = wizardOptions.appliances.find(
                (a: ApplianceOption) => a.id === id
            );
            return match ? match.label : id;
        },
        [wizardOptions]
    );

    // ──────────────────────────────────────────────────────────────────────────
    // Form field updater
    // ──────────────────────────────────────────────────────────────────────────
    const updateBookingData = useCallback(
        (key: keyof BookingData, value: unknown) => {
            setBookingData((prev) => ({ ...prev, [key]: value }));
            // Clear individual field error as the user corrects it
            if (fieldErrors[key]) {
                setFieldErrors((prev) => {
                    const updated = { ...prev };
                    delete updated[key];
                    return updated;
                });
            }
        },
        [fieldErrors]
    );

    // ──────────────────────────────────────────────────────────────────────────
    // Async operations
    // ──────────────────────────────────────────────────────────────────────────

    /** Validates zip via the backend. Autofills city + state on success. */
    const runZipValidation = useCallback(async (zip: string) => {
        setZipValidationState("loading");
        setZipError("");
        try {
            const result = await validateZipCode(zip);
            if (result.valid && result.city && result.state) {
                setZipValidationState("valid");
                // Autofill city and state for Step 5
                setBookingData((prev) => ({
                    ...prev,
                    zipCode: result.zip,
                    city: result.city!,
                    state: result.state!,
                }));
                return true;
            } else {
                setZipValidationState("invalid");
                setZipError(result.message);
                return false;
            }
        } catch (err) {
            console.error("[useScheduleWizard] Zip validation error:", err);
            setZipValidationState("invalid");
            setZipError("Could not validate zip code. Please try again.");
            return false;
        }
    }, []);

    /** Loads the 14-day schedule. Called lazily when the user enters Step 3. */
    const loadSchedule = useCallback(async () => {
        if (!bookingData.zipCode || !bookingData.appliance) return;
        setIsLoadingSchedule(true);
        try {
            const days = await getSchedule(bookingData.zipCode, bookingData.appliance);
            setSchedule(days);
        } catch (err) {
            console.error("[useScheduleWizard] Failed to load schedule:", err);
        } finally {
            setIsLoadingSchedule(false);
        }
    }, [bookingData.zipCode, bookingData.appliance]);

    /** Loads the diagnostic fee. Called lazily when the user enters Step 4. */
    const loadPricing = useCallback(async () => {
        if (!bookingData.zipCode || !bookingData.appliance) return;
        setIsLoadingFee(true);
        try {
            const pricing = await getServicePricing(
                bookingData.zipCode,
                bookingData.appliance
            );
            setServiceFee(pricing.formatted);
        } catch (err) {
            console.error("[useScheduleWizard] Failed to load pricing:", err);
            // Fall back to a safe display value — do not block the user
            setServiceFee("$129.00");
        } finally {
            setIsLoadingFee(false);
        }
    }, [bookingData.zipCode, bookingData.appliance]);

    // ──────────────────────────────────────────────────────────────────────────
    // Step validation
    // ──────────────────────────────────────────────────────────────────────────
    const isStepValid = useCallback(
        (step: number): boolean => {
            switch (step) {
                case 1:
                    return !!bookingData.appliance && !!bookingData.brand;
                case 2:
                    return zipValidationState === "valid";
                case 3:
                    return !!bookingData.serviceDate && !!bookingData.serviceTime;
                case 4:
                    return true; // Informational step — always passable
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
        },
        [bookingData, zipValidationState]
    );

    const getMaxReachableStep = useCallback(() => {
        for (let step = 1; step <= 5; step++) {
            if (!isStepValid(step)) return step;
        }
        return 6;
    }, [isStepValid]);

    // ──────────────────────────────────────────────────────────────────────────
    // Final step validation (field-level errors for Step 5)
    // ──────────────────────────────────────────────────────────────────────────
    const validateFinalStep = (): boolean => {
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

    // ──────────────────────────────────────────────────────────────────────────
    // Navigation
    // ──────────────────────────────────────────────────────────────────────────
    const handleNext = async () => {
        // Step 2 — async zip validation before advancing
        if (currentStep === 2) {
            const isValid = await runZipValidation(bookingData.zipCode);
            if (!isValid) return;
            setCurrentStep(3);
            loadSchedule(); // Lazy-load schedule now that we have zip + appliance
            return;
        }

        // Step 3 → Step 4 — lazy-load pricing
        if (currentStep === 3) {
            if (!bookingData.serviceDate || !bookingData.serviceTime) return;
            setCurrentStep(4);
            loadPricing();
            return;
        }

        // Step 5 — submit the booking
        if (currentStep === 5) {
            if (!validateFinalStep()) return;

            setIsSubmitting(true);
            setSubmitError("");
            try {
                const payload = {
                    appliance: bookingData.appliance,
                    brand: bookingData.brand,
                    zipCode: bookingData.zipCode,
                    serviceDate: bookingData.serviceDate,
                    serviceTime: bookingData.serviceTime,
                    serviceType: "repair" as const,
                    customer: {
                        firstName: bookingData.firstName,
                        lastName: bookingData.lastName,
                        email: bookingData.email,
                        phone: bookingData.phone,
                    },
                    address: {
                        streetAddress: bookingData.streetAddress,
                        suite: bookingData.suite || undefined,
                        city: bookingData.city,
                        state: bookingData.state,
                    },
                    specialInstructions: bookingData.instructions ?? "",
                };

                const response = await createAppointment(payload);
                setCreatedAppointmentId(response.appointment.id);
                setCurrentStep(6);
            } catch (err) {
                console.error("[useScheduleWizard] Booking submission failed:", err);
                setSubmitError("Failed to book appointment. Please try again.");
            } finally {
                setIsSubmitting(false);
            }
            return;
        }

        // All other steps — validate and advance
        const maxStep = getMaxReachableStep();
        if (currentStep < 5 && currentStep <= maxStep) {
            setCurrentStep((prev) => prev + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 1 && currentStep < 6) {
            setCurrentStep((prev) => prev - 1);
        }
    };

    const handleStepClick = (step: number) => {
        if (currentStep === 6) return;
        const maxReachable = getMaxReachableStep();
        if (step <= maxReachable && step < 6) {
            setCurrentStep(step);
        }
    };

    // ──────────────────────────────────────────────────────────────────────────
    // Public API
    // ──────────────────────────────────────────────────────────────────────────
    return {
        // Navigation
        currentStep,
        handleNext,
        handleBack,
        handleStepClick,
        isStepValid,
        getMaxReachableStep,

        // Form state
        bookingData,
        updateBookingData,
        fieldErrors,

        // Submission state
        createdAppointmentId,
        isLoading: isSubmitting,
        error: submitError,

        // API data
        wizardOptions,
        schedule,
        serviceFee,
        getApplianceLabel,

        // Async loading flags
        isLoadingOptions,
        isLoadingSchedule,
        isLoadingFee,
        zipValidationState,
        zipError,
    };
}
