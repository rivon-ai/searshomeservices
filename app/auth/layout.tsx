"use client";

import { motion } from "framer-motion";
import { HomeRounded } from "grommet-icons";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-[#fdfdfd] relative overflow-hidden">
            {/* Background Orbs */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100 rounded-full blur-[120px] opacity-50" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-100 rounded-full blur-[120px] opacity-50" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md px-6 py-12 relative z-10"
            >
                <div className="flex flex-col items-center mb-8">
                    <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200 mb-4 text-white font-bold text-2xl">
                        <HomeRounded size="24px" color="white" className="" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Sears Home Services</h2>
                    <p className="text-gray-500 mt-2 text-center">
                        Modern home repair and maintenance solutions.
                    </p>
                </div>
                {children}
            </motion.div>
        </div>
    );
}
