"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authService, validations, AuthResponse } from "@/services/auth-service";

export function useAuth() {
  const router = useRouter();
  
  // Loading & Error States
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Sign In Flow
  const handleSignIn = async (email: string, password: string) => {
    setServerError("");
    const newErrors: Record<string, string> = {};

    const emailErr = validations.validateEmail(email);
    const passwordErr = validations.validatePassword(password);

    if (emailErr) newErrors.email = emailErr;
    if (passwordErr) newErrors.password = passwordErr;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return false;
    }

    setErrors({});
    setIsLoading(true);
    try {
      const response = await authService.signIn(email, password);
      if (response.success) {
        router.push("/");
        return true;
      } else {
        setServerError(response.message);
        return false;
      }
    } catch (err) {
      setServerError("An unexpected error occurred. Please try again.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Sign Up Flow
  const handleSignUp = async (data: { fullName: string; email: string; password: string; agreeTerms: boolean }) => {
    setServerError("");
    const newErrors: Record<string, string> = {};

    const nameErr = validations.validateUsername(data.fullName);
    const emailErr = validations.validateEmail(data.email);
    const passwordErr = validations.validatePassword(data.password);

    if (nameErr) newErrors.fullName = nameErr;
    if (emailErr) newErrors.email = emailErr;
    if (passwordErr) newErrors.password = passwordErr;
    if (!data.agreeTerms) newErrors.terms = "You must agree to the terms";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return false;
    }

    setErrors({});
    setIsLoading(true);
    try {
      const response = await authService.signUp(data);
      if (response.success) {
        router.push("/");
        return true;
      } else {
        setServerError(response.message);
        return false;
      }
    } catch (err) {
      setServerError("An unexpected error occurred. Please try again.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Forgot Password Flow
  const handleForgotPassword = async (email: string) => {
    setServerError("");
    setSuccessMessage("");
    const newErrors: Record<string, string> = {};

    const emailErr = validations.validateEmail(email);
    if (emailErr) newErrors.email = emailErr;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return false;
    }

    setErrors({});
    setIsLoading(true);
    try {
      const response = await authService.forgotPassword(email);
      if (response.success) {
        setSuccessMessage(response.message);
        return true;
      } else {
        setServerError(response.message);
        return false;
      }
    } catch (err) {
      setServerError("An unexpected error occurred. Please try again.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Utils
  const clearErrors = () => {
    setErrors({});
    setServerError("");
    setSuccessMessage("");
  };

  const updateFieldError = (field: string, value: string) => {
    if (errors[field]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  return {
    isLoading,
    serverError,
    successMessage,
    errors,
    setErrors,
    handleSignIn,
    handleSignUp,
    handleForgotPassword,
    clearErrors,
    updateFieldError,
  };
}

