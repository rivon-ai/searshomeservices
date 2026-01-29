"use client";

import { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X } from "lucide-react";

interface AntiGravityProgressBarProps {
    currentStep: number;
    totalSteps?: number;
    isError?: boolean;
    onStepClick?: (step: number) => void;
}

export function AntiGravityProgressBar({
    currentStep,
    totalSteps = 5,
    isError = false,
    onStepClick,
}: AntiGravityProgressBarProps) {
    // --- ANIMATION CONFIG ---
    const springTransition = {
        type: "spring" as const,
        stiffness: 300,
        damping: 30,
        mass: 0.8,
    };

    const currentPositionPct = currentStep === 1 ? 0 : currentStep === totalSteps ? 100 : 50;

    const stepsToRender = useMemo(() => {
        const steps = [];
        // Add Previous if exists
        if (currentStep > 1) steps.push(currentStep - 1);
        // Add Current
        steps.push(currentStep);
        // Add Next if exists
        if (currentStep < totalSteps) steps.push(currentStep + 1);
        return steps;
    }, [currentStep, totalSteps]);

    // Helper to get slot layout for a given step
    const getLayoutConfig = (step: number) => {
        if (step === currentStep) {
            // Current Step Position
            // Align text based on position
            let xAlign = "-50%";
            if (currentPositionPct === 0) xAlign = "0%";
            if (currentPositionPct === 100) xAlign = "-100%";

            return {
                left: `${currentPositionPct}%`,
                opacity: 1,
                x: xAlign,
            };
        }
        if (step < currentStep) {
            // Previous Step -> Always 0% (Left Edge)
            return {
                left: "0%",
                opacity: 0.5,
                x: "0%", // Align Left
            };
        }
        if (step > currentStep) {
            // Next Step -> Always 100% (Right Edge)
            return {
                left: "100%",
                opacity: 0.5,
                x: "-100%", // Align Right
            };
        }
        // Fallback for exiting steps
        return { left: "100%", opacity: 0, x: "-50%" };
    };

    return (
        <div className="w-full p-4 md:p-8 flex flex-col gap-6">

            {/* LABELS CONTAINER */}
            <div className="relative w-full h-8">
                <AnimatePresence initial={false} mode="popLayout">
                    {stepsToRender.map((step) => {
                        const config = getLayoutConfig(step);
                        const isCurrent = step === currentStep;

                        const labels: Record<number, string> = {
                            1: "Product",
                            2: "Zip Code",
                            3: "Date & Time",
                            4: "Service Call",
                            5: "Book",
                        };

                        return (
                            <motion.div
                                key={step}
                                onClick={() => onStepClick?.(step)}
                                initial={{ opacity: 0 }}
                                animate={config}
                                exit={{ opacity: 0 }}
                                transition={springTransition}
                                className={`absolute top-0 text-sm font-medium whitespace-nowrap ${onStepClick ? 'cursor-pointer' : ''}`}
                            >
                                <span className={isCurrent ? "text-[#00245B] font-bold text-base" : "text-gray-400"}>
                                    {labels[step] || `Step ${step}`}
                                </span>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>

            {/* TRACK AND BARS */}
            <div className="relative w-full h-3">

                <div className="absolute top-1/2 left-0 w-full h-2 -translate-y-1/2 bg-gray-200 rounded-full" />

                <motion.div
                    className={`absolute top-1/2 left-0 h-2 -translate-y-1/2 rounded-full origin-left ${isError ? "bg-red-500" : "bg-[#FFC220]"
                        }`}
                    initial={{ width: "0%" }}
                    animate={{ width: `${currentPositionPct}%` }}
                    transition={springTransition}
                />

                <motion.div
                    className="absolute top-1/2 w-4 h-4 bg-white rounded-full shadow-md z-20"
                    animate={{ left: `${currentPositionPct}%` }}
                    style={{ y: "-50%", x: "-50%" }}
                    transition={springTransition}
                >
                    {isError && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <X size={10} className="text-red-500" />
                        </div>
                    )}
                </motion.div>

                {currentStep > 1 && (
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-1/2 left-0 w-2 h-2 bg-[#FFC220] rounded-full z-10"
                        style={{ x: "-50%", y: "-50%" }}
                    />
                )}

                {/* RIGHT TICK (Next) - Only if Current < Total */}
                {currentStep < totalSteps && (
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-1/2 left-full w-2 h-2 bg-gray-200 rounded-full z-10"
                        style={{ x: "-50%", y: "-50%" }}
                    />
                )}
            </div>
        </div>
    );
}
