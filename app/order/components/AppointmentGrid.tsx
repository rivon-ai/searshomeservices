import React from "react";
import { Info, CalendarPlus } from "lucide-react";          

interface AppointmentGridProps {
    serviceDate: string;
    serviceTime: string;
    brand: string;
    appliance: string;
    status: string;
}

export function AppointmentGrid({ serviceDate, serviceTime, brand, appliance, status }: AppointmentGridProps) {
    return (
        <div className="py-6 border-b border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* 1. Service Date */}
                <div>
                    <h2 className="text-gray-500 text-sm mb-1">Service Date</h2>
                    <p className="text-[#00245B] font-medium">{serviceDate}</p>
                </div>

                {/* 2. Arrival Window */}
                <div>
                    <h2 className="text-gray-500 text-sm mb-1">Technician Arrival Window</h2>
                    <p className="text-[#00245B] font-medium">{serviceTime || "8:00 AM to 5:00 PM"}</p>
                    <div className="flex items-center gap-1 mt-1 text-gray-500 text-xs cursor-pointer hover:text-blue-600">
                        <Info size={12} />
                        <span>What is this?</span>
                    </div>
                </div>

                {/* 3. Brand & Product */}
                <div>
                    <h2 className="text-gray-500 text-sm mb-1">Brand & Product</h2>
                    <p className="text-[#00245B] font-medium">{brand} {appliance}</p>
                </div>

                {/* 4. Diagnostic Fee */}
                <div>
                    <h2 className="text-gray-500 text-sm mb-1">Diagnostic Fee</h2>
                    <p className="text-[#00245B] font-medium">$99.00</p>
                    <div className="flex items-center gap-1 mt-1 text-gray-500 text-xs cursor-pointer hover:text-blue-600">
                        <Info size={12} />
                        <span>What is this?</span>
                    </div>
                </div>
            </div>

            <div className="mt-6 flex items-center gap-4">
                {status !== "cancelled" && (
                    <button className="cursor-pointer flex items-center gap-2 bg-[#0046BE] text-white px-4 py-2.5 rounded-md font-bold text-sm hover:bg-blue-800 transition-colors">
                        <CalendarPlus size={18} />
                        <span>Add To Calendar</span>
                    </button>
                )}
            </div>
        </div>
    );
}
