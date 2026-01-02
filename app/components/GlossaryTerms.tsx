import React from "react";

const terms = [
  {
    title: "What is the drum of the washing machine?",
    description:
      "The drum is the core part of the washer that holds your laundry and enables the cleaning process through rotation, agitation, and rinsing.",
  },
  {
    title: "What is a 608 Certification?",
    description:
      "The 608 Certification, mandated by the Environmental Protection Agency (EPA), is required for HVAC technicians to legally handle refrigerants. It ensures technicians understand refrigerant types, environmental impact, and proper handling techniques.",
  },
  {
    title: "What is a Compressor?",
    description:
      "A compressor is a mechanical device that increases the pressure of a gas by reducing its volume, essential in various systems including refrigerators, air conditioners, and HVAC units for cooling and refrigeration processes.",
  },
  {
    title: "What is a Condenser?",
    description:
      "A condenser is a component of HVAC and refrigeration systems, responsible for releasing absorbed heat from the refrigerant into the surrounding air.",
  },
];

export default function GlossaryTerms() {
  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-blue-950 mb-12">Glossary Terms</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
        {terms.map((term, index) => (
          <div key={index} className="flex flex-col">
            <h2 className="text-lg font-bold text-blue-950 mb-4">
              {term.title}
            </h2>
            <p className="text-gray-600 text-[15px] leading-relaxed line-clamp-4">
              {term.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
