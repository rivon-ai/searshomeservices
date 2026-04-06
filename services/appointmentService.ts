import type {
    WizardOptions,
    ZipValidationResponse,
    ScheduleDay,
    PricingResponse,
    CreateAppointmentPayload,
    CreateAppointmentResponse,
    AppointmentRecord,
} from "@/types/repairTypes";

const BASE_URL =
    (process.env.NEXT_PUBLIC_DATA_URL ?? "http://localhost:5000") +
    "/api/v1/appointments";

// ---------------------------------------------------------------------------
// Helper — centralised fetch wrapper with consistent error handling
// ---------------------------------------------------------------------------
async function apiFetch<T>(
    path: string,
    options?: RequestInit
): Promise<T> {
    const response = await fetch(`${BASE_URL}${path}`, {
        headers: { "Content-Type": "application/json" },
        ...options,
    });

    if (!response.ok) {
        // Surface the backend's error message when available
        let message = `Request failed: ${response.status} ${response.statusText}`;
        try {
            const body = await response.json();
            if (body?.message) message = body.message;
        } catch {
            // ignore — body may not be JSON
        }
        throw new Error(message);
    }

    return response.json() as Promise<T>;
}

// ---------------------------------------------------------------------------
// GET /options
// Call once on wizard mount. Returns appliances, brandsByAppliance, and states.
// ---------------------------------------------------------------------------
export async function getWizardOptions(): Promise<WizardOptions> {
    return apiFetch<WizardOptions>("/options");
}

// ---------------------------------------------------------------------------
// GET /availability/zip/:zip
// Validates the zip code and returns city + state for Step 5 autofill.
// Does NOT throw on an invalid zip — the caller checks response.valid.
// ---------------------------------------------------------------------------
export async function validateZipCode(
    zip: string
): Promise<ZipValidationResponse> {
    // A 400 from the backend still contains a valid JSON body we can use
    const response = await fetch(`${BASE_URL}/availability/zip/${zip}`, {
        headers: { "Content-Type": "application/json" },
    });
    return response.json() as Promise<ZipValidationResponse>;
}

// ---------------------------------------------------------------------------
// GET /availability/schedule
// Fetches the 14-day calendar for a given zip + appliance.
// Called lazily when the user enters Step 3.
// ---------------------------------------------------------------------------
export async function getSchedule(
    zipCode: string,
    appliance: string
): Promise<ScheduleDay[]> {
    const params = new URLSearchParams({ zipCode, appliance });
    const data = await apiFetch<{ success: boolean; schedule: Record<string, ScheduleDay["slots"]> }>(
        `/availability/schedule?${params.toString()}`
    );

    // Convert the schedule object (keyed by date) to an ordered array
    return Object.entries(data.schedule).map(([date, slots]) => ({
        date,
        slots,
    }));
}

// ---------------------------------------------------------------------------
// GET /pricing
// Returns the diagnostic fee for display in Step 4.
// Called lazily when the user enters Step 4.
// ---------------------------------------------------------------------------
export async function getServicePricing(
    zipCode: string,
    appliance: string
): Promise<PricingResponse> {
    const params = new URLSearchParams({ zipCode, appliance });
    return apiFetch<PricingResponse>(`/pricing?${params.toString()}`);
}

// ---------------------------------------------------------------------------
// POST /
// Submits the final booking. Called from the hook's handleNext at Step 5.
// ---------------------------------------------------------------------------
export async function createAppointment(
    payload: CreateAppointmentPayload
): Promise<CreateAppointmentResponse> {
    return apiFetch<CreateAppointmentResponse>("/", {
        method: "POST",
        body: JSON.stringify(payload),
    });
}

// ---------------------------------------------------------------------------
// GET /:id
// Fetches a single appointment by its id (orderId) for the BookingSuccess page.
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// Order portal — these functions are used by the order management section.
// They target the same backend API as the booking wizard.
// ---------------------------------------------------------------------------

/** Legacy type alias kept for backward compatibility with order portal components */
export type Appointment = AppointmentRecord;

/**
 * Search appointments by phone (and optional email).
 * GET /api/v1/appointments?phone=&email=
 */
export async function getAppointmentsByPhoneEmail(
    phone: string,
    email?: string
): Promise<AppointmentRecord[]> {
    const params = new URLSearchParams({ phone });
    if (email) params.append("email", email);
    try {
        const response = await apiFetch<{ success: boolean; appointments: AppointmentRecord[] }>(
            `/lookup?${params.toString()}`
        );
        return response.appointments || [];
    } catch {
        return [];
    }
}

/**
 * Update an existing appointment by id.
 * PATCH /api/v1/appointments/:id
 */
export async function updateAppointment(
    id: string,
    updates: Partial<AppointmentRecord>
): Promise<AppointmentRecord | null> {
    try {
        return await apiFetch<AppointmentRecord>(`/${id}`, {
            method: "PATCH",
            body: JSON.stringify(updates),
        });
    } catch {
        return null;
    }
}

/**
 * Check whether an order ID exists.
 * Used by the order lookup flow to validate before redirecting.
 */
export async function validateOrderId(id: string): Promise<boolean> {
    const result = await getAppointmentById(id);
    return result !== null;
}

export async function getAppointmentById(
    id: string
): Promise<AppointmentRecord | null> {
    try {
        const response = await apiFetch<{
            success: boolean;
            appointment: AppointmentRecord;
        }>(`/${id}`);
        return response.appointment;
    } catch {
        return null;
    }
}
