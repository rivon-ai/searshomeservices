"use client";

import React, { useState } from "react";
import { ArrowLeft, ArrowRight, X, Check } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogClose,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../../components/ui/dialog";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { DATES } from "../../schedule/data";

import { useRouter } from "next/navigation";
import { updateAppointment } from "../../services/appointmentService";

interface ActionFooterProps {
    appointmentId: string;
    serviceDate: string;
    serviceTime: string;
}

const CANCEL_REASONS = [
    "Appliance Works Again",
    "Price Is Too High",
    "Decided To Replace Appliance",
    "Unavailable On Reschedule Date",
    "Can't Wait This Long For A Repair",
    "Fixing The Appliance Myself",
    "Used Another Repair Service"
];

export function ActionFooter({ appointmentId, serviceDate, serviceTime }: ActionFooterProps) {
    const router = useRouter();
    const [isRescheduleOpen, setIsRescheduleOpen] = useState(false);
    const [isCancelOpen, setIsCancelOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState("");

    // Reschedule State
    const [isRescheduleSuccess, setIsRescheduleSuccess] = useState(false);

    // Cancel State
    const [selectedReasons, setSelectedReasons] = useState<string[]>([]);
    const [isCancelSuccess, setIsCancelSuccess] = useState(false);

    const handleConfirmReschedule = async () => {
        if (!selectedDate) return;

        await updateAppointment(appointmentId, {
            serviceDate: selectedDate,
            serviceTime: selectedTime
        });

        setIsRescheduleSuccess(true);
        router.refresh();
    };

    const handleCloseReschedule = () => {
        setIsRescheduleOpen(false);
        // Reset state after a short delay
        setTimeout(() => {
            setIsRescheduleSuccess(false);
            setSelectedDate("");
            setSelectedTime("");
        }, 300);
    };

    const toggleReason = (reason: string) => {
        setSelectedReasons(prev =>
            prev.includes(reason)
                ? prev.filter(r => r !== reason)
                : [...prev, reason]
        );
    };

    const handleConfirmCancel = async () => {
        if (selectedReasons.length === 0) return;

        await updateAppointment(appointmentId, {
            status: 'cancelled',
            rejectionReason: selectedReasons.join(", ")
        });

        setIsCancelSuccess(true);
        router.refresh();
    };

    const handleCloseCancel = () => {
        setIsCancelOpen(false);
        // Reset state after a short delay
        setTimeout(() => {
            setIsCancelSuccess(false);
            setSelectedReasons([]);
        }, 300);
    };

    return (
        <div className="py-8 pb-20">
            <h2 className="text-[#00245B] text-2xl font-bold mb-4">Reschedule Or Cancel</h2>

            <p className="text-sm text-gray-500 mb-6 leading-relaxed max-w-3xl">
                Should you need to make any changes to your appointment, please <span className="font-bold text-[#00245B]">submit reschedule or cancellation requests at least 24 hours prior to your service date</span> so we can best accommodate your request. This will help guarantee no miscommunication on the day of service. Thank you!
            </p>

            <div className="flex gap-4">
                {/* RESCHEDULE DIALOG */}
                <Dialog open={isRescheduleOpen} onOpenChange={(open) => {
                    if (open) setIsRescheduleOpen(true);
                    else handleCloseReschedule();
                }}>
                    <DialogTrigger asChild>
                        <button className="cursor-pointer px-6 py-2 border border-[#0046BE] text-[#0046BE] text-sm rounded-md hover:bg-blue-50 transition-colors">
                            Reschedule
                        </button>
                    </DialogTrigger>
                    <DialogContent className="w-full md:max-w-[700px] p-8 md:p-12">
                        {isRescheduleSuccess ? (
                            <div className="flex flex-col items-center justify-center py-10 text-center space-y-6">
                                <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
                                    <Check className="h-10 w-10 text-green-600" />
                                </div>
                                <h3 className="text-[#00245B] text-3xl font-bold">Reschedule Confirmed</h3>
                                <p className="text-gray-500 max-w-md">
                                    Your appointment has been successfully rescheduled to <span className="font-bold text-[#0046BE]">{selectedDate}, between {selectedTime}</span>.
                                </p>
                                <button
                                    onClick={handleCloseReschedule}
                                    className="cursor-pointer mt-8 bg-[#0046BE] text-white font-bold py-3 px-12 rounded-lg hover:bg-blue-800 transition-colors shadow-sm"
                                >
                                    Close
                                </button>
                            </div>
                        ) : (
                            <>
                                <DialogHeader className="flex flex-row items-center justify-between border-b pb-4 mb-6">
                                    <DialogTitle className="text-3xl font-normal text-[#00245B] text-center w-full">Rescheduling</DialogTitle>
                                </DialogHeader>

                                <div className="text-center mb-8 space-y-2">
                                    <p className="text-[#00245B]">
                                        Your current appointment is <span className="font-bold text-[#0046BE]">{serviceDate}, between {serviceTime}</span>.
                                    </p>
                                    <p className="text-[#00245B]">
                                        To reschedule, please select a new date and time that works best for you.
                                    </p>
                                </div>

                                <div className="mb-6">
                                    <p className="text-[#00245B] text-lg font-medium mb-4">
                                        Today is <span className="font-bold text-[#0046BE]">Wednesday, January 28</span>
                                    </p>
                                    <p className="text-[#0046BE] font-medium mb-6">Select a new date and time</p>

                                    {/* Date/Time Carousel */}
                                    <div className="px-12 relative">
                                        <Carousel
                                            opts={{
                                                align: "start",
                                            }}
                                            className="w-full"
                                        >
                                            <CarouselContent className="mx-2">
                                                {DATES.slice(0, 5).map((date) => (
                                                    <CarouselItem key={date.id} className="basis-1/2 md:basis-1/4 pl-0 pr-2">
                                                        <div className="flex flex-col gap-3">
                                                            <div className="text-center font-bold text-[#00245B] text-sm mb-1">
                                                                {date.label}
                                                            </div>
                                                            <button
                                                                onClick={() => { setSelectedDate(date.label); setSelectedTime("7 AM-6 PM"); }}
                                                                className={`cursor-pointer py-3 px-1 border rounded-lg text-xs font-bold transition-all shadow-sm ${selectedDate === date.label && selectedTime === "7 AM-6 PM"
                                                                    ? "bg-[#0046BE] text-white border-[#0046BE]"
                                                                    : "bg-white text-[#00245B] border-gray-200 hover:border-blue-300 hover:shadow-md"
                                                                    }`}
                                                            >
                                                                7 AM-6 PM
                                                            </button>
                                                            <button
                                                                onClick={() => { setSelectedDate(date.label); setSelectedTime("8 AM-5 PM"); }}
                                                                className={`cursor-pointer py-3 px-1 border rounded-lg text-xs font-bold transition-all shadow-sm ${selectedDate === date.label && selectedTime === "8 AM-5 PM"
                                                                    ? "bg-[#0046BE] text-white border-[#0046BE]"
                                                                    : "bg-white text-[#00245B] border-gray-200 hover:border-blue-300 hover:shadow-md"
                                                                    }`}
                                                            >
                                                                8 AM-5 PM
                                                            </button>
                                                        </div>
                                                    </CarouselItem>
                                                ))}
                                            </CarouselContent>
                                            <CarouselPrevious className="-left-8 bg-white border-gray-200 text-[#0046BE] hover:bg-blue-50" />
                                            <CarouselNext className="-right-8 bg-white border-gray-200 text-[#0046BE] hover:bg-blue-50" />
                                        </Carousel>
                                    </div>

                                    {selectedDate && (
                                        <p className="text-center text-[#00245B] font-medium mb-8">
                                            Your appointment will now be {selectedDate}, between {selectedTime === "7 AM-6 PM" ? "7:00 AM and 6:00 PM" : "8:00 AM and 5:00 PM"}.
                                        </p>
                                    )}

                                    <div className="flex justify-center pt-6">
                                        <button
                                            onClick={handleConfirmReschedule}
                                            disabled={!selectedDate}
                                            className="cursor-pointer bg-[#0046BE] text-white font-bold py-3 px-12 rounded-lg hover:bg-blue-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            Confirm
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                    </DialogContent>
                </Dialog>

                {/* CANCEL DIALOG */}
                <Dialog open={isCancelOpen} onOpenChange={(open) => {
                    if (open) setIsCancelOpen(true);
                    else handleCloseCancel();
                }}>
                    <DialogTrigger asChild>
                        <button className="cursor-pointer px-6 py-2 border border-[#0046BE] text-[#0046BE] text-sm rounded-md hover:bg-blue-50 transition-colors">
                            Cancel
                        </button>
                    </DialogTrigger>
                    <DialogContent className="max-w-[700px] w-full p-8 md:p-12">
                        {isCancelSuccess ? (
                            <div className="flex flex-col items-center justify-center py-10 text-center space-y-6">
                                <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
                                    <Check className="h-10 w-10 text-green-600" />
                                </div>
                                <h3 className="text-[#00245B] text-3xl font-bold">Cancellation Confirmed</h3>
                                <p className="text-gray-500 max-w-md">
                                    Your appointment for <span className="font-bold text-[#0046BE]">{serviceDate}</span> has been successfully cancelled.
                                </p>
                                <button
                                    onClick={handleCloseCancel}
                                    className="cursor-pointer mt-8 bg-[#0046BE] text-white font-bold py-3 px-12 rounded-lg hover:bg-blue-800 transition-colors shadow-sm"
                                >
                                    Close
                                </button>
                            </div>
                        ) : (
                            <>
                                <DialogHeader className="flex flex-row items-center justify-between pb-4 mb-2">
                                    <DialogTitle className="text-4xl font-normal text-[#00245B] text-center w-full">Canceling</DialogTitle>
                                </DialogHeader>

                                <div className="text-center mb-10 space-y-6">
                                    <p className="text-[#00245B] text-lg">
                                        Your current appointment is <span className="font-bold text-[#0046BE]">{serviceDate}, between {serviceTime}</span>.
                                    </p>
                                    <p className="text-gray-500">
                                        In order to better serve you, please select the reason(s) for canceling:
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                                    {CANCEL_REASONS.map((reason) => {
                                        const isSelected = selectedReasons.includes(reason);
                                        return (
                                            <button
                                                key={reason}
                                                onClick={() => toggleReason(reason)}
                                                className={`cursor-pointer py-3 px-4 rounded-lg transition-all text-sm font-medium border ${isSelected
                                                    ? "bg-[#0046BE] text-white border-[#0046BE] shadow-md"
                                                    : "bg-white text-[#00245B] border-blue-200 hover:border-blue-400 hover:bg-blue-50"
                                                    }`}
                                            >
                                                {reason}
                                            </button>
                                        );
                                    })}
                                </div>

                                <div className="flex justify-center">
                                    <button
                                        onClick={handleConfirmCancel}
                                        disabled={selectedReasons.length === 0}
                                        className="cursor-pointer bg-[#0046BE] text-white font-bold py-3 px-10 rounded-lg hover:bg-blue-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm min-w-[200px]"
                                    >
                                        Confirm Cancellation
                                    </button>
                                </div>
                            </>
                        )}
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}
