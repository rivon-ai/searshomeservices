import React from "react";
import { getAppointmentById } from "@/services/appointmentService";
import { AppointmentGrid } from "@/components/features/order/AppointmentGrid";
import { OrderDetails } from "@/components/features/order/OrderDetails";
import { ApplianceDetails } from "@/components/features/order/ApplianceDetails";
import { VideoSection } from "@/components/features/order/VideoSection";
import { ActionFooter } from "@/components/features/order/ActionFooter";

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
              Your appointment has been canceled on {new Date(appointment.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}.
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
          diagnosticFee={appointment.diagnosticFee}
        />

        <OrderDetails
          appointmentStatus={appointment.status}
          appointmentId={appointment.id}
          orderNumber={appointment.id}
          streetAddress={appointment.address.streetAddress}
          suite={appointment.address.suite}
          city={appointment.address.city}
          state={appointment.address.state}
          zipCode={appointment.zipCode}
          phone={appointment.customer.phone}
          email={appointment.customer.email}
          instructions={appointment.specialInstructions}
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
              zipCode={appointment.zipCode}
              appliance={appointment.appliance}
            />
          </>
        )}

      </div>
    </div>
  );
}