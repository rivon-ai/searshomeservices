"use client";

import React, { useState } from "react";
import { ArrowLeft, Pencil, CheckCircle, ChevronDown, Check } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "./ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

interface BookingData {
    appliance: string;
    brand: string;
    zipCode: string;
    serviceDate: string;
    serviceTime: string;
    firstName: string;
}

interface Option {
    value: string;
    label: string;
}

interface DateOption {
    id: string;
    label: string;
}

interface SummarySidebarProps {
    currentStep: number;
    bookingData: BookingData;
    updateBookingData: (key: any, value: any) => void;
    onBack: () => void;
    appliances: Option[];
    brands: Option[];
    dates: DateOption[];
}

export function SummarySidebar({
    currentStep,
    bookingData,
    updateBookingData,
    onBack,
    appliances,
    brands,
    dates
}: SummarySidebarProps) {
    const [editingField, setEditingField] = useState<"appliance" | "brand" | "date" | null>(null);
    const [tempValue, setTempValue] = useState<string>("");
    const [isSuccess, setIsSuccess] = useState(false);

    const handleEdit = (field: "appliance" | "brand" | "date") => {
        setEditingField(field);
        setIsSuccess(false);
        // Initialize temp value based on field
        if (field === 'appliance') setTempValue(bookingData.appliance);
        if (field === 'brand') setTempValue(bookingData.brand);
        if (field === 'date') setTempValue(bookingData.serviceDate);
    };

    const confirmEdit = () => {
        if (!editingField) return;

        if (editingField === 'appliance') updateBookingData("appliance", tempValue);
        if (editingField === 'brand') updateBookingData("brand", tempValue);
        if (editingField === 'date') updateBookingData("serviceDate", tempValue);

        setIsSuccess(true);
    };

    const closeDialog = () => {
        setEditingField(null);
        setIsSuccess(false);
        setTempValue("");
    };

    const formatDateDisplay = (dateStr: string) => {
        if (!dateStr) return "";
        return `${dateStr}, Between 8 AM - 5 PM`;
    };

    return (
        <div className="w-full h-full bg-white flex flex-col p-8 pt-12 relative">
            {/* BACK BUTTON */}
            <button
                onClick={onBack}
                disabled={currentStep === 1}
                className={`w-fit cursor-pointer flex items-center gap-2 text-md font-medium mb-12 transition-colors ${currentStep === 1
                    ? "text-gray-300 cursor-not-allowed hidden"
                    : "text-[#00245B] hover:text-blue-700"
                    }`}
            >
                <ArrowLeft size={20} />
                Previous Step
            </button>

            {/* HEADER */}
            <h2 className="text-xl font-bold text-[#00245B] mb-8">
                Appointment Details
            </h2>

            {/* DETAILS LIST */}
            <div className="flex flex-col gap-6 flex-1">

                {/* 1. Type */}
                <div className="flex flex-col">
                    <span className="text-sm text-gray-400 font-medium mb-1">
                        Type of Appointment
                    </span>
                    <span className="text-md font-semibold text-[#0046BE] uppercase">
                        REPAIR
                    </span>
                </div>

                {/* 2. Appliance */}
                {bookingData.appliance && (
                    <div className="flex flex-col animate-in fade-in slide-in-from-left-2 duration-300">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm text-gray-400 font-medium">
                                Appliance
                            </span>
                            <button onClick={() => handleEdit('appliance')} className="cursor-pointer text-gray-400 hover:text-[#0046BE] transition-colors">
                                <Pencil size={14} />
                            </button>
                        </div>
                        <span className="text-md font-semibold text-[#0046BE]">
                            {bookingData.appliance}
                        </span>
                    </div>
                )}

                {/* 3. Brand */}
                {bookingData.brand && (
                    <div className="flex flex-col animate-in fade-in slide-in-from-left-2 duration-300">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm text-gray-400 font-medium">
                                Brand
                            </span>
                            <button onClick={() => handleEdit('brand')} className="cursor-pointer text-gray-400 hover:text-[#0046BE] transition-colors">
                                <Pencil size={14} />
                            </button>
                        </div>
                        <span className="text-md font-semibold text-[#0046BE]">
                            {bookingData.brand}
                        </span>
                    </div>
                )}

                {/* 4. Date & Time */}
                {bookingData.serviceDate && (
                    <div className="flex flex-col animate-in fade-in slide-in-from-left-2 duration-300">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm text-gray-400 font-medium">
                                Date & Time
                            </span>
                            <button onClick={() => handleEdit('date')} className=" cursor-pointer text-gray-400 hover:text-[#0046BE] transition-colors">
                                <Pencil size={14} />
                            </button>
                        </div>
                        <span className="text-md font-semibold text-[#0046BE]">
                            {formatDateDisplay(bookingData.serviceDate)}
                        </span>
                    </div>
                )}

                {/* Diagnostic Fee */}
                <div className="mt-auto pt-4 border-t border-gray-100">
                    <span className="text-sm text-gray-400 font-medium mb-1 block">
                        Diagnostic fee
                    </span>
                    <span className="text-xl font-bold text-[#0046BE]">
                        $129.00
                    </span>
                </div>
            </div>

            {/* DIALOGS */}
            <Dialog open={!!editingField} onOpenChange={(open) => !open && closeDialog()}>
                <DialogContent className={`w-[95%] sm:w-full p-6 md:p-8 rounded-xl mx-auto overflow-hidden max-h-[90vh] ${editingField === 'date' ? 'sm:max-w-[900px]' : 'sm:max-w-[600px]:'}`}>

                    {/* Mode 1 - Editing */}
                    {!isSuccess && (
                        <div className="space-y-12">
                            {/* APPLIANCE & BRAND: Standard Header & Layout */}
                            {editingField !== 'date' && (
                                <>
                                    <DialogHeader className="mb-2">
                                        <DialogTitle className="text-[#00245B] text-xl text-center sm:text-left">
                                            {editingField === 'appliance' && "Edit Appliance"}
                                            {editingField === 'brand' && "Edit Brand"}
                                        </DialogTitle>
                                    </DialogHeader>

                                    {editingField === 'appliance' && (
                                        <DropdownMenu>
                                            <DropdownMenuTrigger className="cursor-pointer w-full py-2 px-3 text-base border border-gray-200 rounded-md flex items-center justify-between outline-none focus:ring-1 focus:ring-[#0046BE] bg-white">
                                                <span>{tempValue || "Select an appliance"}</span>
                                                <ChevronDown className="h-4 w-4 opacity-50" />
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent className="w-(--radix-dropdown-menu-trigger-width) max-h-[300px] overflow-y-auto" align="start">
                                                {appliances.map((appliance) => {
                                                    const isSelected = tempValue === appliance.value;
                                                    return (
                                                        <DropdownMenuItem
                                                            key={appliance.value}
                                                            onSelect={() => setTempValue(appliance.value)}
                                                            className={`cursor-pointer flex items-center justify-between ${isSelected ? "text-[#0046BE] bg-blue-50 font-medium" : ""}`}
                                                        >
                                                            {appliance.label}
                                                            {isSelected && <Check size={16} />}
                                                        </DropdownMenuItem>
                                                    );
                                                })}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    )}

                                    {editingField === 'brand' && (
                                        <DropdownMenu>
                                            <DropdownMenuTrigger className="cursor-pointer w-full h-12 px-3 text-base border border-gray-200 rounded-md flex items-center justify-between outline-none focus:ring-1 focus:ring-[#0046BE] bg-white">
                                                <span>{tempValue || "Select a brand"}</span>
                                                <ChevronDown className="h-4 w-4 opacity-50" />
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent className="w-(--radix-dropdown-menu-trigger-width) max-h-[300px] overflow-y-auto" align="start">
                                                {brands.map((brand) => {
                                                    const isSelected = tempValue === brand.value;
                                                    return (
                                                        <DropdownMenuItem
                                                            key={brand.value}
                                                            onSelect={() => setTempValue(brand.value)}
                                                            className={`cursor-pointer flex items-center justify-between ${isSelected ? "text-[#0046BE] bg-blue-50 font-medium" : ""}`}
                                                        >
                                                            {brand.label}
                                                            {isSelected && <Check size={16} />}
                                                        </DropdownMenuItem>
                                                    );
                                                })}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    )}
                                </>
                            )}

                            {/* DATE: Custom Layout */}
                            {editingField === 'date' && (
                                <div className="w-full">
                                    <div className="text-center mb-8 px-4">
                                        <h3 className="text-[#00245B] text-xl font-bold mb-2 text-wrap">
                                            Please select the date and time that works best
                                        </h3>
                                        <p className="text-gray-500 text-sm">
                                            Please select the date and time that works best for you.
                                        </p>
                                    </div>

                                    <div className="w-full px-1">
                                        <Carousel
                                            opts={{ align: "start" }}
                                            className="w-full mx-auto"
                                        >
                                            <CarouselContent>
                                                {dates.map((date) => {
                                                    const isSelected = tempValue === date.label;
                                                    return (
                                                        <CarouselItem key={date.id} className="basis-1/5 flex flex-col items-center pl-0">
                                                            <div className="flex flex-col items-center gap-3 p-1 w-fit">
                                                                <span className="text-center text-sm font-medium text-[#00245B] whitespace-nowrap px-1">
                                                                    {date.label}
                                                                </span>
                                                                <button
                                                                    onClick={() => setTempValue(date.label)}
                                                                    className={`w-full py-3 px-6 border rounded-md text-[10px] sm:text-xs font-bold transition-all whitespace-nowrap shadow-sm cursor-pointer overflow-hidden text-ellipsis ${isSelected
                                                                        ? "bg-[#0046BE] border-[#0046BE] text-white ring-1 ring-[#0046BE]"
                                                                        : "bg-white border-gray-200 text-[#00245B] hover:border-blue-300 hover:bg-blue-50"
                                                                        }`}
                                                                >
                                                                    8 AM-5 PM
                                                                </button>
                                                            </div>
                                                        </CarouselItem>
                                                    )
                                                })}
                                            </CarouselContent>

                                            {/* Custom Navigation Below */}
                                            <div className="flex justify-center gap-6 mt-6">
                                                <CarouselPrevious className="static translate-y-0 border-gray-200 hover:bg-gray-100 hover:text-[#00245B]" />
                                                <CarouselNext className="static translate-y-0 border-gray-200 hover:bg-gray-100 hover:text-[#00245B]" />
                                            </div>
                                        </Carousel>
                                    </div>
                                </div>
                            )}

                            {/* Shared Update Button / Action */}
                            <div className="pt-4 flex justify-center">
                                <button
                                    onClick={confirmEdit}
                                    className={`cursor-pointer py-3 text-white font-bold rounded-lg transition-colors shadow-sm ${editingField === 'date'
                                        ? "bg-gray-200 text-gray-700 hover:bg-gray-300 w-full"
                                        : "bg-[#0046BE] hover:bg-blue-800 w-fit px-22"
                                        }`}
                                    style={editingField === 'date' ? { backgroundColor: '#E5E7EB', color: '#00245B' } : {}}
                                >
                                    {editingField === 'date' ? "Accept Changes" : "Update"}
                                </button>
                            </div>
                        </div>
                    )}

                    {/* BODY: Mode 2 - Success */}
                    {isSuccess && (
                        <div className="flex flex-col items-center justify-center py-6 space-y-4 animate-in fade-in zoom-in-95 duration-200">
                            <CheckCircle className="text-green-500 w-16 h-16" />
                            <h3 className="text-xl font-bold text-[#00245B]">Updated Successfully!</h3>
                            <p className="text-gray-500 text-center text-sm max-w-[80%]">
                                Your appointment details have been updated.
                            </p>
                            <button
                                onClick={closeDialog}
                                className="cursor-pointer mt-4 px-8 py-2 bg-gray-100 text-[#00245B] font-bold rounded-lg hover:bg-gray-200 transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    )}

                </DialogContent>
            </Dialog>
        </div>
    );
}
