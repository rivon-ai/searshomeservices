"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogClose,
} from "../../components/ui/dialog";
import { X, Check } from "lucide-react";
import { updateAppointment } from "../../services/appointmentService";

interface OrderDetailsProps {
    appointmentStatus: string;
    appointmentId: string;
    orderNumber: string;
    streetAddress: string;
    suite?: string;
    city: string;
    state: string;
    zipCode: string;
    phone: string;
    email: string;
    instructions?: string;
}

export function OrderDetails({
    appointmentStatus,
    appointmentId,
    orderNumber,
    streetAddress,
    suite,
    city,
    state,
    zipCode,
    phone,
    email,
    instructions
}: OrderDetailsProps) {
    const router = useRouter();
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isEditSuccess, setIsEditSuccess] = useState(false);
    const [editEmail, setEditEmail] = useState(email);
    const [editPhone, setEditPhone] = useState(phone);
    const [editInstructions, setEditInstructions] = useState(instructions || "");

    const handleUpdate = async () => {
        await updateAppointment(appointmentId, {
            email: editEmail,
            phone: editPhone,
            instructions: editInstructions
        });
        setIsEditSuccess(true);
        router.refresh();
    };

    const handleCloseEdit = () => {
        setIsEditOpen(false);
        setTimeout(() => {
            setIsEditSuccess(false);
            setEditEmail(email);
            setEditPhone(phone);
            setEditInstructions(instructions || "");
        }, 300);
    };

    return (
        <div className="py-8 border-b border-gray-100">
            <h2 className="text-[#00245B] text-2xl font-bold mb-6">Order Details</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* 1. Order Number */}
                <div>
                    <h2 className="text-gray-500 text-sm mb-1">Your Order Number</h2>
                    <p className="text-[#00245B] font-medium">{orderNumber}</p>
                    {appointmentStatus !== 'cancelled' && (
                        <button
                            onClick={() => {
                                setEditEmail(email);
                                setEditPhone(phone);
                                setEditInstructions(instructions || "");
                                setIsEditOpen(true);
                            }}
                            className="cursor-pointer mt-4 w-full md:w-32 py-2 border border-blue-900 text-[#0046BE] rounded-md hover:bg-blue-50 transition-colors">
                            Edit
                        </button>
                    )}
                </div>

                {/* 2. Service Address */}
                <div>
                    <h2 className="text-gray-500 text-sm mb-1">Your Service Address</h2>
                    <p className="text-[#00245B] font-medium">
                        {streetAddress}
                        {suite && <><br />{suite}</>}
                    </p>
                    <p className="text-[#00245B] font-medium">
                        {city}, {state}, {zipCode}
                    </p>
                    <p className="mt-2 text-sm text-gray-400">
                        If the service address listed is incorrect, please chat with us to update the appointment.
                    </p>
                </div>

                {/* 3. Contact Info */}
                <div>
                    <div className="flex justify-between items-center mb-1">
                        <h2 className="text-gray-500 text-sm">Contact Info</h2>
                    </div>
                    <p className="text-[#595959] text-sm mb-1">Phone Number: <span className="font-medium text-[#00245B]">{phone}</span></p>
                    <p className="text-[#595959] text-sm">Email: <span className="font-medium text-[#00245B]">{email}</span></p>
                </div>
            </div>

            {/* Edit Info Dialog */}
            <Dialog open={isEditOpen} onOpenChange={(open) => {
                if (open) setIsEditOpen(true);
                else handleCloseEdit();
            }}>
                <DialogContent className="max-w-[700px] w-full p-0 overflow-hidden bg-white">
                    {isEditSuccess ? (
                        <div className="flex flex-col items-center justify-center py-16 px-10 text-center space-y-6">
                            <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
                                <Check className="h-10 w-10 text-green-600" />
                            </div>
                            <h3 className="text-[#00245B] text-3xl font-bold">Update Confirmed</h3>
                            <p className="text-gray-500 max-w-md">
                                Your contact information has been successfully updated.
                            </p>
                            <button
                                onClick={handleCloseEdit}
                                className="cursor-pointer mt-8 bg-[#0046BE] text-white font-bold py-3 px-12 rounded-lg hover:bg-blue-800 transition-colors shadow-sm"
                            >
                                Close
                            </button>
                        </div>
                    ) : (
                        <div className="relative p-6 px-10 pt-10">
                            <DialogHeader className="mb-8">
                                <DialogTitle className="text-center text-[#00245B] text-2xl font-normal">
                                    Please edit your info below.
                                </DialogTitle>
                                <DialogClose className="absolute right-4 top-4 opacity-70 hover:opacity-100 transition-opacity">
                                    <X className="h-6 w-6 text-gray-400" />
                                    <span className="sr-only">Close</span>
                                </DialogClose>
                            </DialogHeader>

                            <div className="space-y-6">
                                {/* Address Display */}
                                <div>
                                    <label className="block text-[#595959] text-lg mb-1">Address of service:</label>
                                    <p className="text-[#00245B] text-xl font-normal leading-tight">
                                        {streetAddress} {suite ? suite : ""} <br />
                                        {city}, {state} {zipCode}
                                    </p>
                                </div>

                                {/* Inputs */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                                    <div>
                                        <label className="block text-gray-500 text-sm mb-1">Email <span className="text-red-500">*</span></label>
                                        <input
                                            type="email"
                                            value={editEmail}
                                            onChange={(e) => setEditEmail(e.target.value)}
                                            className="w-full border-b border-blue-300 py-2 text-[#595959] focus:outline-none focus:border-blue-600 transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-500 text-sm mb-1">Phone Number <span className="text-red-500">*</span></label>
                                        <input
                                            type="tel"
                                            value={editPhone}
                                            onChange={(e) => setEditPhone(e.target.value)}
                                            className="w-full border-b border-blue-300 py-2 text-[#595959] focus:outline-none focus:border-blue-600 transition-colors"
                                        />
                                    </div>
                                </div>

                                {/* Instructions */}
                                <div className="pt-4">
                                    <label className="block text-[#595959] text-lg mb-1">
                                        Provide special instructions for the technician for your appointment
                                    </label>
                                    <p className="text-[#00245B] font-bold mb-3">
                                        i.e.: Do not park in the driveway, Use buzzer number 2,etc...
                                    </p>
                                    <textarea
                                        value={editInstructions}
                                        onChange={(e) => setEditInstructions(e.target.value)}
                                        placeholder="Enter your instructions up to 60 characters"
                                        maxLength={60}
                                        className="w-full border-b border-blue-300 py-2 text-[#595959] focus:outline-none focus:border-blue-600 transition-colors resize-none h-12 placeholder:text-gray-400"
                                    />
                                </div>

                                {/* Button */}
                                <div className="pt-6 pb-6">
                                    <button
                                        onClick={handleUpdate}
                                        className="cursor-pointer w-full bg-[#E5E7EB] text-[#00245B] font-bold py-3 rounded-md hover:bg-gray-300 transition-colors"
                                    >
                                        Update
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
