"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { 
    getAppointmentsByPhoneEmail, 
    validateOrderId, 
    Appointment 
} from "@/services/appointmentService";
import { validations } from "@/utils/validations";

export function useOrderLookup() {
    const router = useRouter();
    const [orders, setOrders] = useState<Appointment[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [hasSearched, setHasSearched] = useState(false);

    // Form states
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [orderNumber, setOrderNumber] = useState("");
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const ORDERS_PER_PAGE = 5;

    // Derived states
    const totalPages = useMemo(() => Math.ceil(orders.length / ORDERS_PER_PAGE), [orders.length]);
    
    const paginatedOrders = useMemo(() => {
        return orders.slice(
            (currentPage - 1) * ORDERS_PER_PAGE,
            currentPage * ORDERS_PER_PAGE
        );
    }, [orders, currentPage]);

    const handlePhoneSearch = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        
        // Reset errors
        setError("");
        setFieldErrors({});

        // Validate
        const phoneErr = validations.validatePhone(phone);
        const emailErr = validations.validateEmail(email);

        if (phoneErr || emailErr) {
            const newErrors: Record<string, string> = {};
            if (phoneErr) newErrors.phone = phoneErr;
            if (emailErr) newErrors.email = emailErr;
            setFieldErrors(newErrors);
            return;
        }

        setIsLoading(true);
        try {
            const results = await getAppointmentsByPhoneEmail(phone, email || undefined);
            setOrders(results);
            setHasSearched(true);
            setCurrentPage(1);

            if (results.length === 0) {
                setError("No appointments found for the provided phone number and email.");
            } else {
                // Clear fields only on success with results
                setPhone("");
                setEmail("");
            }
        } catch (err) {
            setError("An error occurred while searching for appointments. Please try again.");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleOrderNumberSearch = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        
        // Reset errors
        setError("");
        setFieldErrors({});

        // Validate
        const orderErr = validations.validateOrderNumber(orderNumber);
        if (orderErr) {
            setFieldErrors({ orderNumber: orderErr });
            return;
        }

        setIsLoading(true);
        try {
            const exists = await validateOrderId(orderNumber);
            if (exists) {
                router.push(`/order/${orderNumber}`);
            } else {
                setError("Order number not found. Please check and try again.");
            }
        } catch (err) {
            setError("An error occurred while validating the order number. Please try again.");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const clearLookup = () => {
        setHasSearched(false);
        setOrders([]);
        setError("");
        setFieldErrors({});
    };

    return {
        // States
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
        
        // Setters
        setPhone,
        setEmail,
        setOrderNumber,
        
        // Actions
        handlePhoneSearch,
        handleOrderNumberSearch,
        handlePageChange,
        clearLookup
    };
}

