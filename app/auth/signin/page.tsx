"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaGoogle, FaApple } from "react-icons/fa";
import { useAuth } from "@/app/hooks/useAuth";

export default function SignInPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { handleSignIn, isLoading, serverError, errors, updateFieldError } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await handleSignIn(email, password);
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
        >
            <div className="space-y-2">
                <h2 className="text-xl font-semibold text-gray-900">Sign in to your account</h2>
                <p className="text-sm text-gray-500">
                    Enter your details below to access your account
                </p>
            </div>

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
                        autoComplete="email"
                    />
                    {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                </div>
                <div className="space-y-1">
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-gray-700" htmlFor="password">
                            Password
                        </label>
                        <Link
                            href="/auth/forgot-password"
                            className="text-xs font-medium text-blue-600 hover:text-blue-500"
                        >
                            Forgot password?
                        </Link>
                    </div>
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
                        autoComplete="current-password"
                    />
                    {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
                </div>
                <Button
                    type="submit"
                    className="cursor-pointer w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all active:scale-[0.98]"
                    disabled={isLoading}
                >
                    {isLoading ? "Signing In..." : "Sign In"}
                </Button>
            </form>

            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-[#fdfdfd] px-2 text-gray-400">Or continue with</span>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="h-11 border-gray-200 hover:bg-gray-50 font-medium">
                    <FaGoogle className="mr-2 h-4 w-4" />
                    Google
                </Button>
                <Button variant="outline" className="h-11 border-gray-200 hover:bg-gray-50 font-medium">
                    <FaApple className="mr-2 h-4 w-4" />
                    Apple
                </Button>
            </div>

            <p className="text-center text-sm text-gray-500">
                Don&apos;t have an account?{" "}
                <Link
                    href="/auth/signup"
                    className="font-medium text-blue-600 hover:text-blue-500"
                >
                    Sign up
                </Link>
            </p>
        </motion.div>
    );
}
