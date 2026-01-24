import React from "react";
import FaqCardSection from "./FaqCardSection";
import HelpOptions from "./HelpOptions";
import RecentApplianceSymptoms from "@/app/components/RecentApplianceSymptoms";
import LatestResource from "@/app/components/LatestResource";
import GlossaryTerms from "@/app/components/GlossaryTerms";
import ContentGrid from "@/app/components/ContentGrid";

const symptomItems = [
  {
    title: "Payne central air not working",
    description:
      "When your Payne central air conditioner won’t turn on or isn’t cooling, check for power problems...",
    href: "#",
  },
  {
    title: "ICP central air not working",
    description:
      "When your ICP central air conditioner won’t turn on or isn’t cooling, check for power problems...",
    href: "#",
  },
  {
    title: "Heil central air not working",
    description:
      "When your Heil central air conditioner won’t turn on or isn’t cooling, check for power problems...",
    href: "#",
  },
  {
    title: "Carrier central air not working",
    description:
      "When your Carrier central air conditioner won’t turn on or isn’t cooling, check for power problems...",
    href: "#",
  },
  {
    title: "Comfortmaker central air not working",
    description:
      "When your Comfortmaker central air conditioner won’t turn on or isn’t cooling, check for power problems...",
    href: "#",
  },
  {
    title: "Ruud central air not working",
    description:
      "When your Ruud central air conditioner won’t turn on or isn’t cooling, check for power problems...",
    href: "#",
  },
];

export default function MainSection() {
  return (
    <div>
      <div className="bg-blue-50/70">
        <FaqCardSection />
      </div>
      <div className="border-b">
        <HelpOptions />
      </div>
      <div className="mx-auto lg:max-w-[50%] flex flex-col gap-20 py-10">
        <LatestResource />
        <GlossaryTerms />
        <ContentGrid
          sectionTitle="Recent Appliance Symptoms"
          items={symptomItems}
        />
      </div>
    </div>
  );
}
