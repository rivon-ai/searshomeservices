"use client";

import React, { useState } from "react";
import { ChevronDown, CheckSquare, Square } from "lucide-react";
import FloatingLabelInput from "../../../components/FloatingLabelInput";
import { cn } from "@/lib/utils";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface StepProps {
    bookingData: any;
    updateBookingData: (key: string, value: any) => void;
    onNext: () => void;
}

export function SetBooking({ bookingData, updateBookingData, onNext }: StepProps) {
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isStateFocused, setIsStateFocused] = useState(false);

    // Refs for scrolling to error
    const firstNameRef = React.useRef<HTMLInputElement>(null);
    const lastNameRef = React.useRef<HTMLInputElement>(null);
    const emailRef = React.useRef<HTMLInputElement>(null);
    const phoneRef = React.useRef<HTMLInputElement>(null);
    const addressRef = React.useRef<HTMLInputElement>(null);
    const cityRef = React.useRef<HTMLInputElement>(null);
    const zipRef = React.useRef<HTMLInputElement>(null);

    const validate = () => {
        const newErrors: Record<string, string> = {};
        const validationState = {
            isValid: true,
            firstErrorField: null as React.RefObject<HTMLInputElement | null> | null
        };

        // Helper to set error and capture first field
        const setError = (field: string, message: string, ref: React.RefObject<HTMLInputElement | null>) => {
            newErrors[field] = message;
            validationState.isValid = false;
            // Capture the first error encountered
            if (!validationState.firstErrorField) {
                validationState.firstErrorField = ref;
            }
        };

        // 1. First Name
        if (!bookingData.firstName || bookingData.firstName.trim().length < 2) {
            setError("firstName", "First name is required (min 2 chars)", firstNameRef);
        }

        // 2. Last Name
        if (!bookingData.lastName || bookingData.lastName.trim().length < 2) {
            setError("lastName", "Last name is required (min 2 chars)", lastNameRef);
        }

        // 3. Email (Standard RFC 5322 regex pattern for practical use)
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!bookingData.email || !emailRegex.test(bookingData.email)) {
            setError("email", "Please enter a valid email address", emailRef);
        }

        // 4. Phone (Allows 10-15 digits to support country codes)
        const phoneClean = bookingData.phone?.replace(/\D/g, "");
        if (!phoneClean || phoneClean.length < 10 || phoneClean.length > 15) {
            setError("phone", "Please enter a valid phone number (10-15 digits)", phoneRef);
        }

        // 5. Address
        if (!bookingData.streetAddress || bookingData.streetAddress.trim().length < 5) {
            setError("streetAddress", "Please enter a valid street address", addressRef);
        }

        // 6. City
        if (!bookingData.city || bookingData.city.trim().length < 2) {
            setError("city", "City is required", cityRef);
        }

        // 7. Zip Code
        const zipClean = bookingData.zipCode?.replace(/\D/g, "");
        if (!zipClean || zipClean.length !== 5) {
            setError("zipCode", "Zip code must be 5 digits", zipRef);
        }

        setErrors(newErrors);

        if (!validationState.isValid && validationState.firstErrorField && validationState.firstErrorField.current) {
            validationState.firstErrorField.current.focus();
            validationState.firstErrorField.current.scrollIntoView({ behavior: "smooth", block: "center" });
        }

        return validationState.isValid;
    };

    const handleNext = () => {
        if (validate()) {
            onNext();
        }
    };

    // Check if any required field is completely empty for disabled state
    const isFormIncomplete = !bookingData.firstName || !bookingData.lastName || !bookingData.email || !bookingData.phone || !bookingData.streetAddress || !bookingData.city || !bookingData.zipCode;

    const getInputClass = (hasError: boolean) =>
        `w-full py-2 border-b outline-none transition-colors ${hasError ? "border-red-500 placeholder-red-300" : "border-gray-300 focus:border-blue-600"
        }`;

    const getLabelClass = (hasError: boolean) =>
        `block text-xs mb-1 ${hasError ? 'text-red-500' : 'text-gray-500'}`;

    return (
        <div className="w-full mx-auto space-y-8 pb-8 md:pb-20 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
            <div className="space-y-1">
                <h2 className="text-2xl font-semibold text-[#0046BE]">Just one last thing...</h2>
                <p className="text-gray-500">Please enter your contact information and service address.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 pt-4">
                {/* First Name */}
                <div className="group">
                    <FloatingLabelInput
                        ref={firstNameRef}
                        type="text"
                        id="firstName"
                        label="First Name *"
                        value={bookingData.firstName}
                        onChange={(e) => updateBookingData("firstName", e.target.value)}
                    />
                    {errors.firstName && <span className="text-xs text-red-500 mt-1 block">{errors.firstName}</span>}
                </div>
                {/* Last Name */}
                <div className="group">
                    <FloatingLabelInput
                        ref={lastNameRef}
                        type="text"
                        id="lastName"
                        label="Last Name *"
                        value={bookingData.lastName}
                        onChange={(e) => updateBookingData("lastName", e.target.value)}
                    />
                    {errors.lastName && <span className="text-xs text-red-500 mt-1 block">{errors.lastName}</span>}
                </div>
                {/* Email */}
                <div className="group span-col-2 md:col-span-2">
                    <FloatingLabelInput
                        ref={emailRef}
                        type="email"
                        id="email"
                        label="Email Address *"
                        value={bookingData.email}
                        onChange={(e) => updateBookingData("email", e.target.value)}
                    />
                    {errors.email && <span className="text-xs text-red-500 mt-1 block">{errors.email}</span>}
                </div>
                {/* Phone */}
                <div className="group span-col-2 md:col-span-2">
                    <FloatingLabelInput
                        ref={phoneRef}
                        type="tel"
                        id="phone"
                        label="Phone Number *"
                        value={bookingData.phone}
                        onChange={(e) => updateBookingData("phone", e.target.value)}
                    />
                    {errors.phone && <span className="text-xs text-red-500 mt-1 block">{errors.phone}</span>}
                </div>

                {/* Address */}
                <div className="group">
                    <FloatingLabelInput
                        ref={addressRef}
                        type="text"
                        id="streetAddress"
                        label="Address *"
                        value={bookingData.streetAddress}
                        onChange={(e) => updateBookingData("streetAddress", e.target.value)}
                    />
                    {errors.streetAddress && <span className="text-xs text-red-500 mt-1 block">{errors.streetAddress}</span>}
                </div>
                {/* Suite */}
                <div className="group">
                    <FloatingLabelInput
                        type="text"
                        id="suite"
                        label="Suite, Apt., etc..."
                        value={bookingData.suite || ""}
                        onChange={(e) => updateBookingData("suite", e.target.value)}
                    />
                </div>
                {/* City */}
                <div className="group">
                    <FloatingLabelInput
                        ref={cityRef}
                        type="text"
                        id="city"
                        label="City *"
                        value={bookingData.city}
                        onChange={(e) => updateBookingData("city", e.target.value)}
                    />
                    {errors.city && <span className="text-xs text-red-500 mt-1 block">{errors.city}</span>}
                </div>
                {/* State & Zip */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="group">
                        <DropdownMenu onOpenChange={setIsStateFocused}>
                            <DropdownMenuTrigger asChild>
                                <button className="relative w-full text-left py-4 border-none bg-white outline-none h-14 transition-colors cursor-pointer flex items-center justify-between group">
                                    <span className={bookingData.state ? "text-gray-700 font-medium" : "text-gray-400 font-medium"}>
                                        {bookingData.state || "Select State"}
                                    </span>
                                    <ChevronDown size={14} className="text-gray-400" />

                                    {/* Underline - Base */}
                                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gray-200 transition-colors duration-200" />

                                    {/* Underline - Active (Animated) */}
                                    <div
                                        className={cn(
                                            "absolute bottom-0 left-0 right-0 h-[2px] bg-[#0046BE] transition-transform duration-300 ease-in-out origin-center scale-x-0",
                                            isStateFocused && "scale-x-100"
                                        )}
                                    />
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-(--radix-dropdown-menu-trigger-width)">
                                {["NY", "TX", "CA", "FL", "IL"].map((state) => (
                                    <DropdownMenuItem key={state} onSelect={() => updateBookingData("state", state)} className="cursor-pointer">
                                        {state}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <div className="group">
                        <FloatingLabelInput
                            ref={zipRef}
                            type="text"
                            id="zipCode"
                            label="ZIP code *"
                            value={bookingData.zipCode}
                            onChange={(e) => updateBookingData("zipCode", e.target.value)}
                        />
                        {errors.zipCode && <span className="text-xs text-red-500 mt-1 block">{errors.zipCode}</span>}
                    </div>
                </div>
            </div>

            {/* Special Instructions */}
            <div className="pt-4 space-y-4">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => updateBookingData("specialInstructions", !bookingData.specialInstructions)}
                        className="text-gray-400 hover:text-blue-900 focus:outline-none cursor-pointer"
                    >
                        {bookingData.specialInstructions ? <CheckSquare size={24} className="text-[#0046BE]" /> : <Square size={24} />}
                    </button>
                    <span
                        className="text-gray-700 cursor-pointer select-none"
                        onClick={() => updateBookingData("specialInstructions", !bookingData.specialInstructions)}
                    >
                        Add Special Instructions
                    </span>
                </div>

                {bookingData.specialInstructions && (
                    <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                        <textarea
                            className="w-full p-3 border border-gray-300 rounded-md outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-900 transition-all text-sm resize-none"
                            placeholder="Please provide any gate codes, specific directions, or other details..."
                            rows={3}
                            value={bookingData.instructions || ""}
                            onChange={(e) => updateBookingData("instructions", e.target.value)}
                        />
                    </div>
                )}
            </div>

            {/* Footer Text */}
            <div className="text-[10px] text-gray-500 leading-tight space-y-2 pt-4">
                <p>
                    By clicking "Book Repair" below, I consent to receive, at the phone number I provided above, autodialed, pre-recorded, and/or artificial voice offers and promotions via texts and/or calls from Transformco...
                </p>
                <p>
                    I understand that consent is not a condition of purchase... I can also call <span className="text-[#0046BE] font-bold">800-469-4663</span> to schedule.
                </p>
                <p className="text-[#0046BE]">
                    Terms and Privacy Policy
                </p>
            </div>

            <div className="pt-4 pb-12 flex flex-col items-center">
                <button
                    onClick={handleNext}
                    disabled={isFormIncomplete}
                    className="cursor-pointer w-full md:w-auto px-16 py-3 bg-[#FFC220] text-blue-900 font-bold rounded-lg hover:bg-yellow-400 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Book Repair
                </button>
            </div>
        </div>
    );
}
