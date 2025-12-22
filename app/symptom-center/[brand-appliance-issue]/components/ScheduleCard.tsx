import React, { useState } from 'react';
import { Phone, MessageSquare, ChevronDown } from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
const ScheduleData = {
    title: "Schedule your ICP furnace repair now!",
    description: "We can help! Our certified technicians repair all models of ICP furnaces. We can fix yours no matter where you bought it.",
    phoneNumber: "(802) 552-4364",
    productOptions: [],
    brandOptions: [],
}

interface ScheduleCardProps {
    title?: string;
    description?: string;
    phoneNumber?: string;
    productOptions?: { label: string; value: string }[];
    brandOptions?: { label: string; value: string }[];
    onSchedule?: (data: { product: string; brand: string }) => void;
}

function ScheduleCard({
    title = ScheduleData.title,
    description = ScheduleData.description,
    phoneNumber = ScheduleData.phoneNumber,
    productOptions = ScheduleData.productOptions,
    brandOptions = ScheduleData.brandOptions,
    onSchedule
}: ScheduleCardProps) {

    const [selectedProduct, setSelectedProduct] = useState('');
    const [selectedBrand, setSelectedBrand] = useState('');

    const handleSchedule = () => {
        if (onSchedule) {
            onSchedule({ product: selectedProduct, brand: selectedBrand });
        }
    };

    return (
        <div className="w-full py-8 px-4 bg-gray-50">
            <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    {/* Left Section */}
                    <div className="space-y-6">
                        <h2 className="text-[#0f3b6d] text-2xl md:text-3xl font-bold leading-tight">
                            {title}
                        </h2>

                        <p className="text-gray-600 text-base leading-relaxed">
                            {description}
                        </p>

                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-gray-700" />
                                <div className="flex items-center gap-2 flex-wrap">
                                    <span className="text-gray-700">Call</span>
                                    <a
                                        href={`tel:${phoneNumber.replace(/\D/g, '')}`}
                                        className="text-[#2563eb] font-semibold hover:underline"
                                    >
                                        {phoneNumber}
                                    </a>
                                    <span className="text-gray-700">or schedule online now.</span>
                                </div>
                            </div>

                            <button className="flex items-center gap-3 text-gray-700 hover:text-gray-900 transition-colors">
                                <MessageSquare className="w-5 h-5" />
                                <span>Chat</span>
                            </button>
                        </div>
                    </div>

                    {/* Right Section - Form */}
                    <div className="space-y-4">
                        <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                            <SelectTrigger className="w-full h-12 bg-white border border-gray-300 rounded-md px-4 text-gray-700">
                                <SelectValue placeholder="Garage Door Opener" />
                            </SelectTrigger>
                            <SelectContent>
                                {productOptions.length > 0 ? (
                                    productOptions.map((option, index) => (
                                        <SelectItem key={index} value={option.value}>
                                            {option.label}
                                        </SelectItem>
                                    ))
                                ) : (
                                    <>
                                        <SelectItem value="garage-door-opener">Garage Door Opener</SelectItem>
                                        <SelectItem value="furnace">Furnace</SelectItem>
                                        <SelectItem value="air-conditioner">Air Conditioner</SelectItem>
                                        <SelectItem value="heat-pump">Heat Pump</SelectItem>
                                    </>
                                )}
                            </SelectContent>
                        </Select>

                        <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                            <SelectTrigger className="w-full h-12 bg-white border border-gray-300 rounded-md px-4 text-gray-700">
                                <SelectValue placeholder="Chamberlain" />
                            </SelectTrigger>
                            <SelectContent>
                                {brandOptions.length > 0 ? (
                                    brandOptions.map((option, index) => (
                                        <SelectItem key={index} value={option.value}>
                                            {option.label}
                                        </SelectItem>
                                    ))
                                ) : (
                                    <>
                                        <SelectItem value="chamberlain">Chamberlain</SelectItem>
                                        <SelectItem value="liftmaster">LiftMaster</SelectItem>
                                        <SelectItem value="genie">Genie</SelectItem>
                                        <SelectItem value="craftsman">Craftsman</SelectItem>
                                    </>
                                )}
                            </SelectContent>
                        </Select>

                        <button
                            onClick={handleSchedule}
                            className="w-full h-12 bg-[#fbbf24] hover:bg-[#f59e0b] text-gray-900 font-semibold rounded-md transition-colors shadow-sm"
                        >
                            Schedule Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ScheduleCard
