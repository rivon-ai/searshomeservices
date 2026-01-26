import React from "react";
import Image from "next/image";

export interface StepItem {
  icon: string;
  title: string;
  description: string;
}

export interface MaintenanceStepsProps {
  title?: string;
  steps: StepItem[];
}

export default function MaintenanceSteps({
  title = "Your maintenance is just a phone call away",
  steps = [],
}: MaintenanceStepsProps) {
  return (
    <section className="w-full bg-white py-12 lg:py-20">
      <div className="w-full max-w-300 mx-auto px-4">
        <div className="max-w-2xl mb-12 lg:mb-16">
          <h2 className="text-3xl font-bold text-blue-950 leading-tight">
            {title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-start">
              <div className="mb-6 relative w-14 h-14">
                <Image
                  src={step.icon}
                  alt={step.title}
                  fill
                  className="object-contain"
                />
              </div>
              <h4 className="text-2xl font-bold text-blue-950 mb-3">
                {step.title}
              </h4>
              <p className="text-lg text-gray-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
