"use server";

import fs from 'fs/promises';
import path from 'path';

const DATA_FILE_PATH = path.join(process.cwd(), 'data', 'appointments.json');

export interface Appointment {
    id: string;
    createdAt: string;
    updatedAt: string;
    // flattened booking data
    appliance: string;
    brand: string;
    zipCode: string;
    serviceDate: string;
    serviceTime: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    streetAddress: string;
    suite?: string;
    city: string;
    state: string;
    instructions?: string;
    status: 'upcoming' | 'visited' | 'cancelled';
    rejectionReason?: string;
    applianceModelNumber?: string;
    applianceSerialNumber?: string;
    applianceIssueImage?: string;
    applianceBarcodeImage?: string;
}

// Helper to ensure data directory and file exist
async function ensureFile() {
    try {
        await fs.access(DATA_FILE_PATH);
    } catch {
        const dir = path.dirname(DATA_FILE_PATH);
        await fs.mkdir(dir, { recursive: true });
        await fs.writeFile(DATA_FILE_PATH, '[]', 'utf-8');
    }
}

// Read all appointments
export async function getAppointments(): Promise<Appointment[]> {
    await ensureFile();
    const data = await fs.readFile(DATA_FILE_PATH, 'utf-8');
    try {
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

// Get appointment by ID
export async function getAppointmentById(id: string): Promise<Appointment | undefined> {
    const appointments = await getAppointments();
    return appointments.find(a => a.id === id);
}

// Create a new appointment
export async function createAppointment(bookingData: Omit<Appointment, 'id' | 'createdAt' | 'updatedAt'>): Promise<Appointment> {
    const appointments = await getAppointments();
    
    // Clean up incoming data to remove UI-only fields if they slip through
    // @ts-ignore - explicitly removing fields that might be present in the passed object
    const { specialInstructions, address, ...rest } = bookingData;

    const newAppointment: Appointment = {
        ...rest,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: 'upcoming'
    };

    appointments.push(newAppointment);
    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(appointments, null, 2), 'utf-8');
    
    return newAppointment;
}

// Update an existing appointment
export async function updateAppointment(id: string, updates: Partial<Omit<Appointment, 'id' | 'createdAt'>>): Promise<Appointment | null> {
    const appointments = await getAppointments();
    const index = appointments.findIndex(a => a.id === id);
    
    if (index === -1) return null;

    const updatedAppointment = {
        ...appointments[index],
        ...updates,
        updatedAt: new Date().toISOString()
    };

    appointments[index] = updatedAppointment;
    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(appointments, null, 2), 'utf-8');
    
    return updatedAppointment;
}

// Delete an appointment
export async function deleteAppointment(id: string): Promise<boolean> {
    const appointments = await getAppointments();
    const filtered = appointments.filter(a => a.id !== id);
    
    if (filtered.length === appointments.length) return false;

    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(filtered, null, 2), 'utf-8');
    return true;
}

// Search appointments by phone and optional email
export async function getAppointmentsByPhoneEmail(phone: string, email?: string): Promise<Appointment[]> {
    const appointments = await getAppointments();
    
    // Normalize phone for comparison (remove spaces, dashes, parentheses)
    const normalizedSearchPhone = phone.replace(/[\s\-\(\)]/g, '');
    
    return appointments.filter(appointment => {
        const normalizedAppointmentPhone = appointment.phone.replace(/[\s\-\(\)]/g, '');
        const phoneMatches = normalizedAppointmentPhone.includes(normalizedSearchPhone) || 
                            normalizedSearchPhone.includes(normalizedAppointmentPhone);
        
        // If email is provided, check both phone and email
        if (email) {
            const emailMatches = appointment.email.toLowerCase().includes(email.toLowerCase());
            return phoneMatches && emailMatches;
        }
        
        // Otherwise just check phone
        return phoneMatches;
    });
}

// Check if order ID exists (for validation before redirect)
export async function validateOrderId(id: string): Promise<boolean> {
    const appointment = await getAppointmentById(id);
    return !!appointment;
}

