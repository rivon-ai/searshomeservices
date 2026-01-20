import React from "react";
import ContentGrid from "@/app/components/ContentGrid";
import GlossaryTerms from "@/app/components/GlossaryTerms";
import LatestResource from "@/app/components/LatestResource";
import FaqHeroSection from "../../components/FaqHeroSection";

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

import Link from "next/link";

const faqContent = (
  <>
    <p className="mb-4">
      It's common for Home Warranty plans to have an initial 30 day waiting
      period from your initial purchase date.
    </p>
    <p className="mb-4">
      One of the unique benefits of the Sears Protect plan is being entitled to
      a 25% discount on appliance and HVAC repairs (service performed by Sears
      Home Services) in the event something goes wrong during the initial 30
      days.
    </p>
    <p>
      For more information about home warranty waiting periods, read our article{" "}
      <Link href="#" className="text-blue-600 hover:underline">
        Why Does a Home Warranty Have a Waiting Period?
      </Link>
    </p>
  </>
);

const additionalFaqs = [
  { question: "How much does a Sears Protect plan cost?", href: "#" },
  {
    question:
      "Is there a limit on the number of service calls I can request through my Sears Protect plan?",
    href: "#",
  },
  {
    question:
      "What if an appliance covered by my Sears Protect plan is unrepairable?",
    href: "#",
  },
  {
    question:
      "What if you repair my appliance covered by Sears Protect and the same problem occurs? Will you charge me to...",
    href: "#",
  },
];

export default async function Page({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;

  const pageTitle =
    "Why does the Sears Protect plan have a 30 day waiting period?";

  return (
    <div>
      <div className="mx-auto lg:max-w-[50%] flex flex-col gap-20 py-10">
        <FaqHeroSection
          categorySlug={category}
          slug={slug}
          title={pageTitle}
          updatedDate="Jan. 16, 2026"
          content={faqContent}
          additionalFaqs={additionalFaqs}
        />
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
