"use client";

import React from "react";
import {
    Combobox,
    ComboboxContent,
    ComboboxItem,
    ComboboxList,
    ComboboxInput,
} from "@/components/ui/combobox";
import { brandAppliances } from "@/utils/brandAppliances";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
    
interface StepProps {
    bookingData: any;
    updateBookingData: (key: string, value: any) => void;
    onNext: () => void;
}

export function StepProduct({ bookingData, updateBookingData, onNext }: StepProps) {
    const [applianceInputValue, setApplianceInputValue] = React.useState(bookingData.appliance || "");
    const [brandInputValue, setBrandInputValue] = React.useState(bookingData.brand || "");
    const [isApplianceFocused, setIsApplianceFocused] = React.useState(false);
    const [isBrandFocused, setIsBrandFocused] = React.useState(false);

    // Sync input values when booking data changes (e.g. initial load or handleApplianceChange)
    React.useEffect(() => {
        setApplianceInputValue(bookingData.appliance || "");
    }, [bookingData.appliance]);

    React.useEffect(() => {
        setBrandInputValue(bookingData.brand || "");
    }, [bookingData.brand]);

    // Get all unique appliances from the data
    const allAppliances = React.useMemo(() => {
        const applianceSet = new Set<string>();
        brandAppliances.forEach((brandData) => {
            brandData.appliances.forEach((app) => {
                applianceSet.add(app.appliance);
            });
        });
        const sorted = Array.from(applianceSet).sort().map(app => ({ value: app, label: app }));
        if (!applianceInputValue) return sorted;
        return sorted.filter(app =>
            app.label.toLowerCase().includes(applianceInputValue.toLowerCase())
        );
    }, [applianceInputValue]);

    // Get brands that support the selected appliance
    const brandsForSelectedAppliance = React.useMemo(() => {
        if (!bookingData.appliance) return [];

        const brands = brandAppliances
            .filter((brandData) =>
                brandData.appliances.some((app) => app.appliance === bookingData.appliance)
            )
            .map((brandData) => ({ value: brandData.brand, label: brandData.brand }));

        if (!brandInputValue) return brands;
        return brands.filter(brand =>
            brand.label.toLowerCase().includes(brandInputValue.toLowerCase())
        );
    }, [bookingData.appliance, brandInputValue]);

    // Check if brand selection is required (appliance has brands associated)
    const isBrandRequired = brandsForSelectedAppliance.length > 0;

    const handleApplianceChange = (val: string) => {
        updateBookingData("appliance", val);

        // Check if the new appliance supports the currently selected brand
        const brandsForNewAppliance = brandAppliances
            .filter((brandData) =>
                brandData.appliances.some((app) => app.appliance === val)
            )
            .map((brandData) => brandData.brand);

        if (!brandsForNewAppliance.includes(bookingData.brand)) {
            updateBookingData("brand", "");
        }
    };

    return (
        <div className="w-full mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
            <div className="space-y-1">
                <h2 className="text-2xl font-semibold text-[#00245B]">What needs repair?</h2>
                <p className="text-gray-500">
                    {isBrandRequired ? "Now, choose your brand." : "Choose your appliance."}
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
                                    {allAppliances.length > 0 ? (   
                                        allAppliances.map((appliance) => (
                                            <ComboboxItem key={appliance.value} value={appliance.value} className="cursor-pointer">
                                                {appliance.label}
                                            </ComboboxItem>
                                        ))
                                    ) : (
                                        <div className="p-2 text-gray-400 text-sm text-center">No results found</div>
                                    )}  
                                </ComboboxList>
                            </ComboboxContent>
                        </ComboboxInput>
                    </Combobox>

                    {/* Underline - Base */}
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gray-200 transition-colors duration-200" />

                    {/* Underline - Active (Animated) */}
                    <div
                        className={cn(
                            "absolute bottom-0 left-0 right-0 h-[2px] bg-[#0046BE] transition-transform duration-300 ease-in-out origin-center scale-x-0",
                            isApplianceFocused && "scale-x-100"
                        )}
                    />
                </div>

                {/* Brand Combobox - Conditionally Shown */}
                {isBrandRequired && (
                    <div className="relative group animate-in fade-in slide-in-from-top-2 duration-300">
                        <Combobox
                            value={bookingData.brand}
                            onValueChange={(val) => updateBookingData("brand", val || "")}
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
                                        {brandsForSelectedAppliance.length > 0 ? (
                                            brandsForSelectedAppliance.map((brand) => (
                                                <ComboboxItem key={brand.value} value={brand.value} className="cursor-pointer">
                                                    {brand.label}
                                                </ComboboxItem>
                                            ))
                                        ) : (
                                            <div className="p-2 text-gray-400 text-sm text-center">No results found</div>
                                        )}
                                    </ComboboxList>
                                </ComboboxContent>
                            </ComboboxInput>
                        </Combobox>

                        {/* Underline - Base */}
                        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gray-200 transition-colors duration-200" />

                        {/* Underline - Active (Animated) */}
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
                    disabled={!bookingData.appliance || (isBrandRequired && !bookingData.brand)}
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
