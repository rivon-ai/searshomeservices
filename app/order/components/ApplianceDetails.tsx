"use client";

import React, { useState } from "react";
import { Info, X, Camera, Check } from "lucide-react";
import { useRouter } from "next/navigation";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogClose,
} from "../../components/ui/dialog";
import { updateAppointment } from "../../services/appointmentService";

interface ApplianceDetailsProps {
    appointmentId: string;
    brand: string;
    appliance: string;
    model?: string;
    serial?: string;
    issueImage?: string;
    barcodeImage?: string;
}

export function ApplianceDetails({
    appointmentId,
    brand,
    appliance,
    model,
    serial,
    issueImage,
    barcodeImage
}: ApplianceDetailsProps) {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [isUpdateSuccess, setIsUpdateSuccess] = useState(false);

    // State for inputs
    const [editModel, setEditModel] = useState(model || "");
    const [editSerial, setEditSerial] = useState(serial || "");
    const [editIssueImage, setEditIssueImage] = useState(issueImage || "");
    const [editBarcodeImage, setEditBarcodeImage] = useState(barcodeImage || "");

    const handleUpdate = async () => {
        await updateAppointment(appointmentId, {
            applianceModelNumber: editModel,
            applianceSerialNumber: editSerial,
            applianceIssueImage: editIssueImage,
            applianceBarcodeImage: editBarcodeImage
        });
        setIsUpdateSuccess(true);
        router.refresh();
    };

    const handleOpen = () => {
        setEditModel(model || "");
        setEditSerial(serial || "");
        setEditIssueImage(issueImage || "");
        setEditBarcodeImage(barcodeImage || "");
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
        setTimeout(() => {
            setIsUpdateSuccess(false);
            setEditModel(model || "");
            setEditSerial(serial || "");
            setEditIssueImage(issueImage || "");
            setEditBarcodeImage(barcodeImage || "");
        }, 300);
    };

    // Refs for file inputs
    const issueInputRef = React.useRef<HTMLInputElement>(null);
    const barcodeInputRef = React.useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'issue' | 'barcode') => {
        const file = e.target.files?.[0];
        if (!file) return;

        // 2MB limit
        if (file.size > 2 * 1024 * 1024) {
            alert("File size must be less than 2MB");
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result as string;
            if (type === 'issue') {
                setEditIssueImage(base64String);
            } else {
                setEditBarcodeImage(base64String);
            }
        };
        reader.readAsDataURL(file);
    };

    return (
        <div className="py-8 border-b border-gray-100">
            <h2 className="text-[#00245B] text-2xl font-bold mb-6">Your {brand} {appliance} Details</h2>

            <div className="bg-[#FFF9E6] p-6 rounded-lg flex gap-4 items-start mb-8">
                <div className="bg-[#FFEBAA] p-1.5 rounded-full shrink-0 mt-0.5">
                    <Info size={20} className="text-[#996B00]" />
                </div>
                <p className="text-[#595959] text-sm leading-relaxed">
                    Customers who provided the information below had their {brand} {appliance} fixed faster. Please help us save you time by allowing us to get the right parts before we meet at your home.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                <div>
                    <label className="block text-sm text-gray-400 mb-2">Model</label>
                    <input type="text" value={model || "-"} disabled className="w-full border-b border-gray-200 py-1 bg-transparent text-gray-600" />
                </div>
                <div>
                    <label className="block text-sm text-gray-400 mb-2">Serial</label>
                    <input type="text" value={serial || "-"} disabled className="w-full border-b border-gray-200 py-1 bg-transparent text-gray-600" />
                </div>
            </div>

            <button
                onClick={handleOpen}
                className="cursor-pointer py-2.5 px-6 border border-[#0046BE] text-[#0046BE] font-bold rounded-md hover:bg-blue-50 transition-colors"
            >
                Add Appliance Details
            </button>

            {/* Add Appliance Details Dialog */}
            <Dialog open={isOpen} onOpenChange={(open) => {
                if (open) setIsOpen(true);
                else handleClose();
            }}>
                <DialogContent className="max-w-[700px] w-full p-0 overflow-hidden bg-white">
                    {isUpdateSuccess ? (
                        <div className="flex flex-col items-center justify-center py-16 px-10 text-center space-y-6">
                            <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
                                <Check className="h-10 w-10 text-green-600" />
                            </div>
                            <h3 className="text-[#00245B] text-3xl font-bold">Update Confirmed</h3>
                            <p className="text-gray-500 max-w-md">
                                Your appliance details have been successfully updated.
                            </p>
                            <button
                                onClick={handleClose}
                                className="cursor-pointer mt-8 bg-[#0046BE] text-white font-bold py-3 px-12 rounded-lg hover:bg-blue-800 transition-colors shadow-sm"
                            >
                                Close
                            </button>
                        </div>
                    ) : (
                        <div className="relative p-6 px-10 pt-10">
                            <DialogHeader className="mb-8">
                                <DialogTitle className="text-center text-[#00245B] text-2xl font-normal">
                                    Add Appliance Details
                                </DialogTitle>
                                <DialogClose className="absolute right-4 top-4 opacity-70 hover:opacity-100 transition-opacity">
                                    <X className="h-6 w-6 text-gray-400" />
                                    <span className="sr-only">Close</span>
                                </DialogClose>
                            </DialogHeader>

                            <div className="space-y-8">

                                {/* Image Inputs */}
                                {/* Image Inputs */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Issue Image */}
                                    <div>
                                        <p className="text-[#00245B] font-medium mb-3 text-center">Appliance Issue</p>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            ref={issueInputRef}
                                            className="hidden"
                                            onChange={(e) => handleFileChange(e, 'issue')}
                                        />
                                        <div
                                            className="border-2 border-dashed border-gray-300 rounded-lg h-40 flex flex-col items-center justify-center bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors overflow-hidden relative"
                                            onClick={() => issueInputRef.current?.click()}
                                        >
                                            {editIssueImage ? (
                                                <img src={editIssueImage} alt="Issue" className="w-full h-full object-cover" />
                                            ) : (
                                                <>
                                                    <Camera className="text-gray-400 mb-2" size={32} />
                                                    <span className="text-sm text-gray-500">Tap to add photo</span>
                                                </>
                                            )}
                                        </div>
                                    </div>

                                    {/* Barcode Image */}
                                    <div>
                                        <p className="text-[#00245B] font-medium mb-3 text-center">Model / Serial Label</p>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            ref={barcodeInputRef}
                                            className="hidden"
                                            onChange={(e) => handleFileChange(e, 'barcode')}
                                        />
                                        <div
                                            className="border-2 border-dashed border-gray-300 rounded-lg h-40 flex flex-col items-center justify-center bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors overflow-hidden relative"
                                            onClick={() => barcodeInputRef.current?.click()}
                                        >
                                            {editBarcodeImage ? (
                                                <img src={editBarcodeImage} alt="Barcode" className="w-full h-full object-cover" />
                                            ) : (
                                                <>
                                                    <Camera className="text-gray-400 mb-2" size={32} />
                                                    <span className="text-sm text-gray-500">Tap to add photo</span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Text Inputs */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-gray-500 text-sm mb-1">Model Number</label>
                                        <input
                                            type="text"
                                            value={editModel}
                                            onChange={(e) => setEditModel(e.target.value)}
                                            className="w-full border-b border-blue-300 py-2 text-[#595959] focus:outline-none focus:border-blue-600 transition-colors"
                                            placeholder="Enter model number"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-500 text-sm mb-1">Serial Number</label>
                                        <input
                                            type="text"
                                            value={editSerial}
                                            onChange={(e) => setEditSerial(e.target.value)}
                                            className="w-full border-b border-blue-300 py-2 text-[#595959] focus:outline-none focus:border-blue-600 transition-colors"
                                            placeholder="Enter serial number"
                                        />
                                    </div>
                                </div>

                                {/* Update Button */}
                                <div className="pt-2 pb-6">
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
