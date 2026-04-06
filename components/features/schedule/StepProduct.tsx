"use client";

import React from "react";
import {
    Combobox,
    ComboboxContent,
    ComboboxItem,
    ComboboxList,
    ComboboxInput,
} from "@/components/ui/combobox";
import { cn } from "@/utils/cn";
import { ChevronDown } from "lucide-react";
import type { ApplianceOption, BrandsByAppliance } from "@/types/repairTypes";
import type { BookingData } from "@/hooks/useScheduleWizard";

interface StepProductProps {
    bookingData: BookingData;
    updateBookingData: (key: keyof BookingData, value: unknown) => void;
    onNext: () => void;
    appliances: ApplianceOption[];
    brandsByAppliance: BrandsByAppliance;
    isLoading: boolean;
}

export function StepProduct({
    bookingData,
    updateBookingData,
    onNext,
    appliances,
    brandsByAppliance,
    isLoading,
}: StepProductProps) {
    const [applianceInputValue, setApplianceInputValue] = React.useState(
        bookingData.appliance || ""
    );
    const [brandInputValue, setBrandInputValue] = React.useState(
        bookingData.brand || ""
    );
    const [isApplianceFocused, setIsApplianceFocused] = React.useState(false);
    const [isBrandFocused, setIsBrandFocused] = React.useState(false);

    // Sync input display when booking data changes externally
    React.useEffect(() => {
        setApplianceInputValue(bookingData.appliance || "");
    }, [bookingData.appliance]);

    React.useEffect(() => {
        setBrandInputValue(bookingData.brand || "");
    }, [bookingData.brand]);

    // ── Derived appliance list (filtered by search input) ────────────────────
    const filteredAppliances = React.useMemo(() => {
        if (!applianceInputValue) return appliances;
        return appliances.filter((a) =>
            a.label.toLowerCase().includes(applianceInputValue.toLowerCase())
        );
    }, [appliances, applianceInputValue]);

    // ── Brands for the selected appliance (filtered by search input) ─────────
    const brandsForAppliance = React.useMemo<string[]>(() => {
        if (!bookingData.appliance) return [];
        return brandsByAppliance[bookingData.appliance] ?? [];
    }, [bookingData.appliance, brandsByAppliance]);

    const filteredBrands = React.useMemo(() => {
        if (!brandInputValue) return brandsForAppliance;
        return brandsForAppliance.filter((b) =>
            b.toLowerCase().includes(brandInputValue.toLowerCase())
        );
    }, [brandsForAppliance, brandInputValue]);

    const isBrandRequired = brandsForAppliance.length > 0;

    // ── Handlers ─────────────────────────────────────────────────────────────
    const handleApplianceChange = (selectedId: string) => {
        updateBookingData("appliance", selectedId);
        // Clear brand if it's no longer valid for the new appliance
        const brandsForNew = brandsByAppliance[selectedId] ?? [];
        if (!brandsForNew.includes(bookingData.brand)) {
            updateBookingData("brand", "");
        }
    };

    const isContinueDisabled =
        isLoading ||
        !bookingData.appliance ||
        (isBrandRequired && !bookingData.brand);

    // ── Skeleton while options are loading ───────────────────────────────────
    if (isLoading) {
        return (
            <div className="w-full mx-auto space-y-8 animate-pulse">
                <div className="space-y-1">
                    <div className="h-7 w-48 bg-gray-200 rounded" />
                    <div className="h-4 w-36 bg-gray-100 rounded" />
                </div>
                <div className="h-12 bg-gray-100 rounded" />
                <div className="h-12 bg-gray-100 rounded" />
            </div>
        );
    }

    return (
        <div className="w-full mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
            <div className="space-y-1">
                <h2 className="text-2xl font-semibold text-[#00245B]">
                    What needs repair?
                </h2>
                <p className="text-gray-500">
                    {isBrandRequired
                        ? "Now, choose your brand."
                        : "Choose your appliance."}
                </p>
            </div>

            <div className="space-y-6">
                {/* Appliance Combobox */}
                <div className="relative group">
                    <Combobox
                        value={bookingData.appliance}
                        onValueChange={(val) => handleApplianceChange(val || "")}
                        inputValue={applianceInputValue}
                        onInputValueChange={setApplianceInputValue}
                        onOpenChange={setIsApplianceFocused}
                    >
                        <ComboboxInput
                            autoComplete="off"
                            placeholder="Select an appliance"
                            showTrigger={false}
                            className="w-full text-left py-4 border-0! bg-white outline-none! h-12 transition-colors cursor-pointer flex items-center justify-between group rounded-none shadow-none! focus-within:ring-0! focus-within:border-0! ring-0!"
                        >
                            <ChevronDown size={14} className="text-gray-400 mr-2" />
                            <ComboboxContent className="mt-2">
                                <ComboboxList>
                                    {filteredAppliances.length > 0 ? (
                                        filteredAppliances.map((appliance) => (
                                            <ComboboxItem
                                                key={appliance.id}
                                                value={appliance.id}
                                                className="cursor-pointer"
                                            >
                                                {appliance.icon} {appliance.label}
                                            </ComboboxItem>
                                        ))
                                    ) : (
                                        <div className="p-2 text-gray-400 text-sm text-center">
                                            No results found
                                        </div>
                                    )}
                                </ComboboxList>
                            </ComboboxContent>
                        </ComboboxInput>
                    </Combobox>

                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gray-200 transition-colors duration-200" />
                    <div
                        className={cn(
                            "absolute bottom-0 left-0 right-0 h-[2px] bg-[#0046BE] transition-transform duration-300 ease-in-out origin-center scale-x-0",
                            isApplianceFocused && "scale-x-100"
                        )}
                    />
                </div>

                {/* Brand Combobox — shown only when the selected appliance has brands */}
                {isBrandRequired && (
                    <div className="relative group animate-in fade-in slide-in-from-top-2 duration-300">
                        <Combobox
                            value={bookingData.brand}
                            onValueChange={(val) =>
                                updateBookingData("brand", val || "")
                            }
                            inputValue={brandInputValue}
                            onInputValueChange={setBrandInputValue}
                            onOpenChange={setIsBrandFocused}
                        >
                            <ComboboxInput
                                autoComplete="off"
                                placeholder="Select a brand"
                                showTrigger={false}
                                className="w-full text-left py-4 border-0! bg-white outline-none! h-12 transition-colors cursor-pointer flex items-center justify-between group rounded-none shadow-none! focus-within:ring-0! focus-within:border-0! ring-0!"
                            >
                                <ChevronDown size={14} className="text-gray-400 mr-2" />
                                <ComboboxContent className="mt-2">
                                    <ComboboxList>
                                        {filteredBrands.length > 0 ? (
                                            filteredBrands.map((brand) => (
                                                <ComboboxItem
                                                    key={brand}
                                                    value={brand}
                                                    className="cursor-pointer"
                                                >
                                                    {brand}
                                                </ComboboxItem>
                                            ))
                                        ) : (
                                            <div className="p-2 text-gray-400 text-sm text-center">
                                                No results found
                                            </div>
                                        )}
                                    </ComboboxList>
                                </ComboboxContent>
                            </ComboboxInput>
                        </Combobox>

                        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gray-200 transition-colors duration-200" />
                        <div
                            className={cn(
                                "absolute bottom-0 left-0 right-0 h-[2px] bg-[#0046BE] transition-transform duration-300 ease-in-out origin-center scale-x-0",
                                isBrandFocused && "scale-x-100"
                            )}
                        />
                    </div>
                )}
            </div>

            <div className="pt-4 px-20 md:px-44 flex flex-col items-center">
                <button
                    onClick={onNext}
                    disabled={isContinueDisabled}
                    className="cursor-pointer px-16 py-3 bg-[#0046BE] text-white font-bold rounded-lg hover:bg-blue-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                    Continue
                </button>
                <p className="text-[#0046BE] text-sm font-medium mt-4 cursor-pointer text-center">
                    Will you be using repair benefits from a Sears or other warranty plan?
                </p>
            </div>
        </div>
    );
}
