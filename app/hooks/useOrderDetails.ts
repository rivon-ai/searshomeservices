"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateAppointment } from "@/lib/appointmentService";

interface UseOrderDetailsProps {
    appointmentId: string;
    initialEmail: string;
    initialPhone: string;
    initialInstructions: string;
}

export function useOrderDetails({ 
    appointmentId, 
    initialEmail, 
    initialPhone, 
    initialInstructions 
}: UseOrderDetailsProps) {
    const router = useRouter();
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isEditSuccess, setIsEditSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    
    const [editEmail, setEditEmail] = useState(initialEmail);
    const [editPhone, setEditPhone] = useState(initialPhone);
    const [editInstructions, setEditInstructions] = useState(initialInstructions);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleUpdate = async () => {
        setIsLoading(true);
        setErrors({});
        
        try {
            await updateAppointment(appointmentId, {
                email: editEmail,
                phone: editPhone,
                instructions: editInstructions
            });
            setIsEditSuccess(true);
            router.refresh();
        } catch (error) {
            console.error("Failed to update appointment:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const openEdit = () => {
        setEditEmail(initialEmail);
        setEditPhone(initialPhone);
        setEditInstructions(initialInstructions);
        setIsEditOpen(true);
    };

    const handleCloseEdit = () => {
        setIsEditOpen(false);
        setTimeout(() => {
            setIsEditSuccess(false);
        }, 300);
    };

    return {
        isEditOpen,
        isEditSuccess,
        isLoading,
        editEmail,
        editPhone,
        editInstructions,
        errors,
        setEditEmail,
        setEditPhone,
        setEditInstructions,
        handleUpdate,
        openEdit,
        handleCloseEdit
    };
}
