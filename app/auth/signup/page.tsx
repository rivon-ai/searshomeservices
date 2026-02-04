"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/app/hooks/useAuth";

export default function SignUpPage() {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [agreeTerms, setAgreeTerms] = useState(false);
    const { handleSignUp, isLoading, serverError, errors, updateFieldError } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await handleSignUp({ fullName, email, password, agreeTerms });
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
        >
            <div className="space-y-2">
                <h2 className="text-xl font-semibold text-gray-900">Create an account</h2>
                <p className="text-sm text-gray-500">
                    Enter your details below to create your account
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                {serverError && (
                    <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg border border-red-100">
                        {serverError}
                    </div>
                )}
                <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700" htmlFor="fullName">
                        Full Name
                    </label>
                    <Input
                        id="fullName"
                        placeholder="John Doe"
                        type="text"
                        value={fullName}
                        onChange={(e) => {
                            setFullName(e.target.value);
                            updateFieldError("fullName", e.target.value);
                        }}
                        className={`h-11 ${errors.fullName ? "border-red-500" : ""}`}
                    />
                    {errors.fullName && <p className="text-xs text-red-500">{errors.fullName}</p>}
                </div>
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
                <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700" htmlFor="password">
                        Password
                    </label>
                    <Input
                        id="password"
                        placeholder="••••••••"
                        type="password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            updateFieldError("password", e.target.value);
                        }}
                        className={`h-11 ${errors.password ? "border-red-500" : ""}`}
                    />
                    {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
                </div>

                <div className="flex items-start space-x-2 py-2">
                    <input
                        id="terms"
                        type="checkbox"
                        checked={agreeTerms}
                        onChange={(e) => {
                            setAgreeTerms(e.target.checked);
                            updateFieldError("terms", e.target.checked ? "checked" : "");
                        }}
                        className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor="terms" className="text-xs text-gray-500 leading-normal">
                        By creating an account, you agree to our{" "}
                        <Link href="#" className="text-blue-600 hover:underline">Terms of Service</Link> and{" "}
                        <Link href="#" className="text-blue-600 hover:underline">Privacy Policy</Link>.
                    </label>
                </div>
                {errors.terms && <p className="text-xs text-red-500">{errors.terms}</p>}

                <Button
                    type="submit"
                    className="cursor-pointer w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all active:scale-[0.98]"
                    disabled={isLoading}
                >
                    {isLoading ? "Creating Account..." : "Create Account"}
                </Button>
            </form>

            <p className="text-center text-sm text-gray-500">
                Already have an account?{" "}
                <Link
                    href="/auth/signin"
                    className="font-medium text-blue-600 hover:text-blue-500"
                >
                    Sign in
                </Link>
            </p>
        </motion.div>
    );
}
