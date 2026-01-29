import React from "react";
import { getAppointmentById } from "../../services/appointmentService";
import { AppointmentGrid } from "../components/AppointmentGrid";
import { OrderDetails } from "../components/OrderDetails";
import { ApplianceDetails } from "../components/ApplianceDetails";
import { VideoSection } from "../components/VideoSection";
import { ActionFooter } from "../components/ActionFooter";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function OrderDetailsPage({ params }: PageProps) {
  const { slug } = await params;
  const appointment = await getAppointmentById(slug);

  if (!appointment) {
    return (
      <div className="flex h-screen w-full items-center justify-center text-gray-500">
        Appointment not found
      </div>
    );
  }

  const isCancelled = appointment.status === 'cancelled';

  return (
    <div className="min-h-screen bg-white">
      <div className="w-full max-w-[1240px] mx-auto px-4 md:px-8 py-12">

        {/* Page Header */}
        {isCancelled ? (
          <>
            <h2 className="text-[#00245B] text-3xl font-semibold mb-4">
              Canceled - {appointment.brand} {appointment.appliance} Service Appointment
            </h2>
            <p className="text-gray-500 text-sm mb-8 leading-relaxed max-w-4xl">
              Your appointment has been canceled on {new Date(appointment.updatedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}.
            </p>
          </>
        ) : (
          <>
            <h2 className="text-[#00245B] text-3xl font-semibold mb-4">
              Your {appointment.brand} {appointment.appliance} Service Appointment
            </h2>
            <p className="text-gray-500 text-sm mb-8 leading-relaxed max-w-4xl">
              Thanks for scheduling a Sears Home Services appointment. This page will be updated if there are any changes to your appointment. On the day of your appointment, your technician will contact you when they are on the way.
            </p>
          </>
        )}

        {/* Components */}
        <AppointmentGrid
          serviceDate={appointment.serviceDate}
          serviceTime={appointment.serviceTime || ""}
          brand={appointment.brand}
          appliance={appointment.appliance}
          status={appointment.status}
        />

        <OrderDetails
          appointmentStatus={appointment.status}
          appointmentId={appointment.id}
          orderNumber={appointment.id}
          streetAddress={appointment.streetAddress}
          suite={appointment.suite}
          city={appointment.city}
          state={appointment.state}
          zipCode={appointment.zipCode}
          phone={appointment.phone}
          email={appointment.email}
          instructions={appointment.instructions}
        />

        {!isCancelled && (
          <>
            <ApplianceDetails
              appointmentId={appointment.id}
              brand={appointment.brand}
              appliance={appointment.appliance}
              model={appointment.applianceModelNumber}
              serial={appointment.applianceSerialNumber}
              issueImage={appointment.applianceIssueImage}
              barcodeImage={appointment.applianceBarcodeImage}
            />

            <VideoSection />

            <ActionFooter
              appointmentId={appointment.id}
              serviceDate={appointment.serviceDate}
              serviceTime={appointment.serviceTime || "8:00 AM to 5:00 PM"}
            />
          </>
        )}

      </div>
    </div>
  );
}