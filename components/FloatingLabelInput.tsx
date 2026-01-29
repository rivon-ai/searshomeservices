"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface FloatingLabelInputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
}

const FloatingLabelInput = React.forwardRef<
    HTMLInputElement,
    FloatingLabelInputProps
>(({ className, label, id, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(false);

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        setIsFocused(false);
        setHasValue(!!e.target.value);
        if (props.onBlur) props.onBlur(e);
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        setIsFocused(true);
        if (props.onFocus) props.onFocus(e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setHasValue(!!e.target.value);
        if (props.onChange) props.onChange(e);
    };

    const isActive = isFocused || hasValue || (props.value !== undefined && String(props.value).length > 0);

    return (
        <div className="relative w-full group">
            <div
                className={cn(
                    "relative flex items-end w-full h-14 pt-4 px-1 rounded-t-md transition-colors duration-200",
                    isFocused ? "" : "bg-transparent"
                )}
            >
                <input
                    ref={ref}
                    id={id}
                    className={cn(
                        "w-full bg-transparent text-gray-900 border-none outline-none text-base placeholder-transparent px-0 py-1",
                        className
                    )}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder=" " // Required for CSS :placeholder-shown trick fallback, though we use state here
                    {...props}
                />
                <label
                    htmlFor={id}
                    className={cn(
                        "absolute left-1 pointer-events-none transition-all duration-300 ease-out origin-left",
                        isActive
                            ? "top-1 text-xs text-[#0046BE] font-medium scale-100"
                            : "top-5 text-base text-gray-500 scale-100"
                    )}
                >
                    {label}
                </label>

                {/* Underline - Base */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gray-200 transition-colors duration-200" />

                {/* Underline - Active (Animated) */}
                <div
                    className={cn(
                        "absolute bottom-0 left-0 right-0 h-[2px] bg-[#0046BE] transition-transform duration-300 ease-in-out origin-center scale-x-0",
                        isFocused && "scale-x-100"
                    )}
                />
            </div>
        </div>
    );
});

FloatingLabelInput.displayName = "FloatingLabelInput";

export default FloatingLabelInput;
