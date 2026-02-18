"use client";

import React, { useState } from "react";
import { ChevronDown, CheckSquare, Square } from "lucide-react";
import FloatingLabelInput from "../../shared/FloatingLabelInput";
import { cn } from "@/utils/cn";
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
    fieldErrors: Record<string, string>;
}

export function SetBooking({ bookingData, updateBookingData, onNext, fieldErrors = {} }: StepProps) {
    const [isStateFocused, setIsStateFocused] = useState(false);

    // Filter UI completeness for the "Book Repair" button
    const isFormIncomplete = !bookingData.firstName || !bookingData.lastName || !bookingData.email || !bookingData.phone || !bookingData.streetAddress || !bookingData.city || !bookingData.state || !bookingData.zipCode;

    // --- ERROR UX: Smooth Scroll & Alert ---
    const errorFields = Object.keys(fieldErrors);
    const hasMultipleErrors = errorFields.length > 1;

    React.useEffect(() => {
        if (errorFields.length > 0) {
            // Define field order for logical scrolling
            const fieldOrder = [
                "firstName",
                "lastName",
                "email",
                "phone",
                "streetAddress",
                "city",
                "state",
                "zipCode"
            ];

            const firstErrorField = fieldOrder.find(field => fieldErrors[field]);
            if (firstErrorField) {
                const element = document.getElementById(firstErrorField);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    // Optional: focus the input after scroll
                    const input = element.querySelector('input');
                    if (input) setTimeout(() => input.focus(), 500);
                }
            }
        }
    }, [fieldErrors]);

    return (
        <div className="w-full mx-auto space-y-8 pb-8 md:pb-20 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
            {hasMultipleErrors && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4 animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <span className="text-red-500 font-bold">!</span>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm text-red-700 font-medium">
                                Please correct the {errorFields.length} errors highlighted below before proceeding.
                            </p>
                        </div>
                    </div>
                </div>
            )}

            <div className="space-y-1">
                <h2 className="text-2xl font-semibold text-[#0046BE]">Just one last thing...</h2>
                <p className="text-gray-500">Please enter your contact information and service address.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 pt-4">
                {/* First Name */}
                <div className="group" id="firstName">
                    <FloatingLabelInput
                        type="text"
                        id="firstName-input"
                        label="First Name *"
                        value={bookingData.firstName}
                        onChange={(e) => updateBookingData("firstName", e.target.value)}
                    />
                    {fieldErrors.firstName && <span className="text-xs text-red-500 mt-1 block">{fieldErrors.firstName}</span>}
                </div>
                {/* Last Name */}
                <div className="group" id="lastName">
                    <FloatingLabelInput
                        type="text"
                        id="lastName-input"
                        label="Last Name *"
                        value={bookingData.lastName}
                        onChange={(e) => updateBookingData("lastName", e.target.value)}
                    />
                    {fieldErrors.lastName && <span className="text-xs text-red-500 mt-1 block">{fieldErrors.lastName}</span>}
                </div>
                {/* Email */}
                <div className="group span-col-2 md:col-span-2" id="email">
                    <FloatingLabelInput
                        type="email"
                        id="email-input"
                        label="Email Address *"
                        value={bookingData.email}
                        onChange={(e) => updateBookingData("email", e.target.value)}
                    />
                    {fieldErrors.email && <span className="text-xs text-red-500 mt-1 block">{fieldErrors.email}</span>}
                </div>
                {/* Phone */}
                <div className="group span-col-2 md:col-span-2" id="phone">
                    <FloatingLabelInput
                        type="tel"
                        id="phone-input"
                        label="Phone Number *"
                        value={bookingData.phone}
                        onChange={(e) => updateBookingData("phone", e.target.value)}
                    />
                    {fieldErrors.phone && <span className="text-xs text-red-500 mt-1 block">{fieldErrors.phone}</span>}
                </div>

                {/* Address */}
                <div className="group" id="streetAddress">
                    <FloatingLabelInput
                        type="text"
                        id="streetAddress-input"
                        label="Address *"
                        value={bookingData.streetAddress}
                        onChange={(e) => updateBookingData("streetAddress", e.target.value)}
                    />
                    {fieldErrors.streetAddress && <span className="text-xs text-red-500 mt-1 block">{fieldErrors.streetAddress}</span>}
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
                <div className="group" id="city">
                    <FloatingLabelInput
                        type="text"
                        id="city-input"
                        label="City *"
                        value={bookingData.city}
                        onChange={(e) => updateBookingData("city", e.target.value)}
                    />
                    {fieldErrors.city && <span className="text-xs text-red-500 mt-1 block">{fieldErrors.city}</span>}
                </div>
                {/* State & Zip */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="group" id="state">
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
                        {fieldErrors.state && <span className="text-xs text-red-500 mt-1 block">{fieldErrors.state}</span>}
                    </div>
                    <div className="group" id="zipCode">
                        <FloatingLabelInput
                            type="text"
                            id="zipCode-input"
                            label="ZIP code *"
                            value={bookingData.zipCode}
                            onChange={(e) => updateBookingData("zipCode", e.target.value)}
                        />
                        {fieldErrors.zipCode && <span className="text-xs text-red-500 mt-1 block">{fieldErrors.zipCode}</span>}
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
                    onClick={onNext}
                    disabled={isFormIncomplete}
                    className="cursor-pointer w-full md:w-auto px-16 py-3 bg-[#FFC220] text-blue-900 font-bold rounded-lg hover:bg-yellow-400 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Book Repair
                </button>
            </div>
        </div>
    );
}
