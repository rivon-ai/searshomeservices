"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const { handleForgotPassword, isLoading, serverError, successMessage, errors, updateFieldError } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await handleForgotPassword(email);
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
        >
            <div className="space-y-2">
                <h2 className="text-xl font-semibold text-gray-900">Forgot Password?</h2>
                <p className="text-sm text-gray-500">
                    Enter your email and we&apos;ll send you a link to reset your password.
                </p>
            </div>

            {successMessage ? (
                <div className="space-y-6">
                    <div className="p-4 text-sm text-green-700 bg-green-50 rounded-lg border border-green-100">
                        {successMessage}
                    </div>
                    <Link href="/auth/signin">
                        <Button variant="outline" className="w-full h-11 border-gray-200 hover:bg-gray-50 font-medium">
                            Back to Sign In
                        </Button>
                    </Link>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                    {serverError && (
                        <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg border border-red-100">
                            {serverError}
                        </div>
                    )}
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700" htmlFor="email">
                            Email address
                        </label>
                        <Input
                            id="email"
                            placeholder="name@example.com"
                            type="email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                updateFieldError("email", e.target.value);
                            }}
                            className={`h-11 ${errors.email ? "border-red-500" : ""}`}
                        />
                        {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                    </div>
                    <Button
                        type="submit"
                        className="cursor-pointer w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all active:scale-[0.98]"
                        disabled={isLoading}
                    >
                        {isLoading ? "Sending..." : "Send Reset Link"}
                    </Button>
                    <p className="text-center text-sm text-gray-500">
                        Remember your password?{" "}
                        <Link
                            href="/auth/signin"
                            className="font-medium text-blue-600 hover:text-blue-500"
                        >
                            Sign in
                        </Link>
                    </p>
                </form>
            )}
        </motion.div>
    );
}
