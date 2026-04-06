export const validations = {
    validatePhone: (phone: string): string | null => {
        if (!phone) return "Phone number is required";
        const digits = phone.replace(/\D/g, "");
        if (digits.length < 10 || digits.length > 15) return "Please enter a valid phone number (10-15 digits)";
        return null;
    },
    validateEmail: (email: string, required = false): string | null => {
        if (!email) return required ? "Email is required" : null;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) return "Please enter a valid email address";
        return null;
    },
    validateOrderNumber: (orderNumber: string): string | null => {
        if (!orderNumber) return "Order number is required";
        if (orderNumber.length < 5) return "Invalid order number format";
        return null;
    },
    validateName: (name: string, fieldLabel: string): string | null => {
        if (!name || name.trim().length < 2) return `${fieldLabel} is required (min 2 chars)`;
        return null;
    },
    validateZipCode: (zip: string): string | null => {
        if (!zip) return "Zip code is required";
        const clean = zip.replace(/\D/g, "");
        if (clean.length !== 5) return "Zip code must be 5 digits";
        return null;
    },
    validateAddress: (address: string): string | null => {
        if (!address || address.trim().length < 5) return "Please enter a valid street address (min 5 chars)";
        return null;
    },
    validateCity: (city: string): string | null => {
        if (!city || city.trim().length < 2) return "City is required (min 2 chars)";
        return null;
    },
    validateState: (state: string): string | null => {
        if (!state) return "State is required";
        return null;
    }
};
