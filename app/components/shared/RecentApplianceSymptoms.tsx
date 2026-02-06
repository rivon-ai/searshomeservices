import React from "react";
import ContentGrid from "./ContentGrid";

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

export default function RecentApplianceSymptoms() {
  return (
    <ContentGrid
      sectionTitle="Recent Appliance Symptoms"
      items={symptomItems}
    />
  );
}
