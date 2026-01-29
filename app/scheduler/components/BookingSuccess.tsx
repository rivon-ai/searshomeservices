import React, { useEffect, useState } from "react";
import { Check, Info } from "lucide-react";
import Link from "next/link";
import { getAppointmentById, Appointment } from "../../services/appointmentService";

interface BookingSuccessProps {
    appointmentId: string;
}

export function BookingSuccess({ appointmentId }: BookingSuccessProps) {
    const [appointment, setAppointment] = useState<Appointment | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAppointment = async () => {
            try {
                if (appointmentId) {
                    const data = await getAppointmentById(appointmentId);
                    setAppointment(data || null);
                }
            } catch (error) {
                console.error("Failed to fetch appointment", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAppointment();
    }, [appointmentId]);

    if (loading) {
        return <div className="text-center py-20 text-gray-500">Loading your confirmation...</div>;
    }

    if (!appointment) {
        return <div className="text-center py-20 text-red-500">Could not find appointment details.</div>;
    }

    return (
        <div className="w-full mx-auto animate-in fade-in slide-in-from-bottom-6 duration-700 ease-out">

            {/* Success Card */}
            <div className="bg-[#EFF9E8] rounded-xl p-8 pt-12 relative text-center border border-gray-100 shadow-sm mt-8">
                {/* Floating Check Icon */}
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[#7AC11A] rounded-full p-2.5 shadow-md border-4 border-white">
                    <Check className="text-white" size={32} strokeWidth={3} />
                </div>

                <h2 className="text-2xl font-bold text-[#00245B] mb-4">
                    {appointment.firstName}, you're all set!
                </h2>

                <p className="text-[#00245B] text-lg mb-8">
                    You have successfully scheduled your Service appointment for <span className="font-bold">{appointment.serviceDate} from {appointment.serviceTime}.</span>
                </p>
                <Link href={`/order/${appointment.id}`}>
                    <button className="w-full py-3.5 border border-[#0046BE] text-[#0046BE] font-bold rounded-lg hover:bg-blue-50 transition-colors bg-white">
                        View Appointment Details
                    </button>
                </Link>
            </div>

            {/* Technician Info */}
            <div className="py-8 space-y-6 text-gray-600">
                <p>
                    One of our highly trained technicians will arrive at <span className="text-gray-800 font-medium">{appointment.streetAddress}{appointment.suite ? `, ${appointment.suite}` : ""}, {appointment.city}, {appointment.state} {appointment.zipCode}</span> during the time and date listed above.
                </p>

                <p>
                    We have sent a confirmation email to <span className="text-[#0046BE] font-medium">{appointment.email}</span> and a text to <span className="text-gray-800 font-medium">{appointment.phone}</span>.
                </p>

                <div className="space-y-3">
                    <p className="font-medium text-gray-700">If you opted in, you will also receive a text message:</p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>On your day of service with a narrowed time window for your appointment</li>
                        <li>When your technician is on their way</li>
                    </ul>
                </div>

                <div className="pt-2">
                    <p className="font-bold text-[#00245B]">Thank you for choosing Sears Home Services!</p>
                    <p className="font-bold text-[#00245B]">We look forward to helping you.</p>
                </div>
            </div>
        </div>
    );
}
