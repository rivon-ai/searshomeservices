import React from "react";

const symptoms = [
  {
    title: "Payne central air not working",
    description:
      "When your Payne central air conditioner won’t turn on or isn’t cooling, check for power problems, a failed capacitor, or a clogged condensate drain. This guide covers quick, safe troubleshooting steps and explains when to call Sears Home Services for expert central AC repair.",
  },
  {
    title: "ICP central air not working",
    description:
      "When your ICP central air conditioner won’t turn on or isn’t cooling, check for power problems, a failed capacitor, or a clogged condensate drain. This guide covers quick, safe troubleshooting steps and explains when to call Sears Home Services for expert central AC repair.",
  },
  {
    title: "Heil central air not working",
    description:
      "When your Heil central air conditioner won’t turn on or isn’t cooling, check for power problems, a failed capacitor, or a clogged condensate drain. This guide covers quick, safe troubleshooting steps and explains when to call Sears Home Services for expert central AC repair.",
  },
  {
    title: "Carrier central air not working",
    description:
      "When your Carrier central air conditioner won’t turn on or isn’t cooling, check for power problems, a failed capacitor, or a clogged condensate drain. This guide covers quick, safe troubleshooting steps and explains when to call Sears Home Services for expert central AC repair.",
  },
  {
    title: "Comfortmaker central air not working",
    description:
      "When your Comfortmaker central air conditioner won’t turn on or isn’t cooling, check for power problems, a failed capacitor, or a clogged condensate drain. This guide covers quick, safe troubleshooting steps and explains when to call Sears Home Services for expert central AC repair.",
  },
  {
    title: "Ruud central air not working",
    description:
      "When your Ruud central air conditioner won’t turn on or isn’t cooling, check for power problems, a failed capacitor, or a clogged condensate drain. This guide covers quick, safe troubleshooting steps and explains when to call Sears Home Services for expert central AC repair.",
  },
];

export default function CommonSymptoms() {
  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-blue-950 mb-12">
        Common Appliance Symptoms
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
        {symptoms.map((symptom, index) => (
          <div key={index} className="flex flex-col">
            <h2 className="text-lg font-bold text-blue-950 mb-4">
              {symptom.title}
            </h2>
            <p className="text-gray-600 text-[15px] leading-relaxed line-clamp-4">
              {symptom.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
