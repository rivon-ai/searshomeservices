"use client";

import React, { useState } from "react";
import OrderLookup from "./components/OrderLookup";
import AppointmentInfo from "./components/AppointmentInfo";

export default function OrderPage() {
    const [hasSearched, setHasSearched] = useState(false);

    return (
        <div className="min-h-screen md:w-[80%] mx-auto bg-white">
            <main className="container mx-auto px-4 py-8 lg:py-16">
                <h2 className="text-3xl font-bold text-[#002855] mb-12">
                    Order Lookup
                </h2>

                <div className={`grid grid-cols-1 gap-12 ${hasSearched ? 'lg:grid-cols-1' : 'lg:grid-cols-2 lg:gap-24'}`}>
                    <div className="flex justify-center">
                        <OrderLookup hasSearched={hasSearched} setHasSearched={setHasSearched} />
                    </div>

                    <div className={`flex ${hasSearched ? 'justify-center' : 'lg:justify-start lg:border-l lg:border-gray-200 lg:pl-24'}`}>
                        <AppointmentInfo />
                    </div>
                </div>
            </main>
        </div>
    );
}
