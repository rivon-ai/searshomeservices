"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import FloatingLabelInput from "@/components/shared/FloatingLabelInput";
import OrderResultList from "./OrderResultList";
import { useOrderLookup } from "@/hooks/useOrderLookup";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"

const OrderLookup = ({ searchState }: { searchState: ReturnType<typeof useOrderLookup> }) => {
    const {
        orders,
        isLoading,
        error,
        hasSearched,
        phone,
        email,
        orderNumber,
        fieldErrors,
        currentPage,
        totalPages,
        paginatedOrders,
        setPhone,
        setEmail,
        setOrderNumber,
        handlePhoneSearch,
        handleOrderNumberSearch,
        handlePageChange
    } = searchState;

    return (
        <div className="flex flex-col gap-8 w-full">

            {/* RESULTS LIST - Show at TOP when search is performed */}
            {hasSearched && paginatedOrders.length > 0 && (
                <OrderResultList
                    orders={paginatedOrders}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            )}

            {/* ERROR MESSAGE */}
            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                    {error}
                </div>
            )}

            {/* PHONE/EMAIL SEARCH SECTION */}
            <div>
                {/* Heading - Changes based on search state */}
                {hasSearched && orders.length > 0 ? (
                    <div className="mb-6">
                        <h2 className="text-[#002855] text-base font-medium mb-1">
                            Not seeing your order?
                        </h2>
                        <p className="text-sm text-gray-600">
                            Please, try looking up with your <span className="font-medium text-[#0046BE]">phone or email or service order</span>.
                        </p>
                    </div>
                ) : (
                    <h2 className="text-[#002855] text-base font-medium mb-6">
                        Find your appointment details by phone number or email
                    </h2>
                )}

                <form className="flex flex-col gap-4" onSubmit={handlePhoneSearch}>
                    {/* Side-by-side layout for Phone and Email */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="relative">
                            <FloatingLabelInput
                                label="Phone Number"
                                type="tel"
                                id="phone"
                                name="phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                            />
                            <span className="absolute top-4 right-2 text-red-500 text-xs">*</span>
                            {fieldErrors.phone && <p className="text-xs text-red-500 mt-1">{fieldErrors.phone}</p>}
                        </div>

                        <div className="relative">
                            <FloatingLabelInput
                                label="Email (Optional)"
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {fieldErrors.email && <p className="text-xs text-red-500 mt-1">{fieldErrors.email}</p>}
                        </div>
                    </div>

                    <div className="mt-2">
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="cursor-pointer bg-[#004BBC] hover:bg-[#00388C] text-white font-medium py-2 px-8 rounded-md text-sm transition-colors h-auto w-auto disabled:opacity-50"
                        >
                            {isLoading ? "Searching..." : "Search"}
                        </Button>
                    </div>
                </form>
            </div>

            {/* SERVICE ORDER NUMBER SEARCH SECTION */}
            <div className="mt-2">
                <form className="flex flex-col gap-4" onSubmit={handleOrderNumberSearch}>
                    <div className="relative">
                        <FloatingLabelInput
                            label="Service Order Number"
                            type="text"
                            id="serviceOrder"
                            name="serviceOrder"
                            value={orderNumber}
                            onChange={(e) => setOrderNumber(e.target.value)}
                            required
                        />
                        <span className="absolute top-4 right-2 text-red-500 text-xs">*</span>
                        {fieldErrors.orderNumber && <p className="text-xs text-red-500 mt-1">{fieldErrors.orderNumber}</p>}
                    </div>

                    <div className="mt-2">
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="cursor-pointer bg-[#004BBC] hover:bg-[#00388C] text-white font-medium py-2 px-8 rounded-md text-sm transition-colors h-auto w-auto disabled:opacity-50"
                        >
                            {isLoading ? "Searching..." : "Search"}
                        </Button>
                    </div>
                </form>
                <div className="mt-4">
                    <Tooltip>
                        <TooltipTrigger className="text-[#004BBC] hover:underline text-sm font-medium">
                            How to find your order number?
                        </TooltipTrigger>
                        <TooltipContent
                            className="p-4 bg-gray-50 border border-gray-200 shadow-lg rounded-lg max-w-xs text-gray-500"
                            sideOffset={5}
                            hideArrow={true}
                            arrowClassName="bg-gray-50 fill-gray-50"
                        >
                            <p className="font-bold text-sm mb-2">Finding your order number:</p>
                            <ol className="list-decimal pl-4 space-y-2 text-sm">
                                <li>Go to your email inbox.</li>
                                <li>Search for <span className="font-semibold">"Sears Home Services"</span> (check your junk folder).</li>
                                <li>Open the email and look for <span className="font-semibold">"Order Number"</span>.</li>
                            </ol>
                        </TooltipContent>
                    </Tooltip>
                </div>
            </div>
        </div>
    );
};

export default OrderLookup;
