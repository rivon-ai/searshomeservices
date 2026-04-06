import React from "react";
import { notFound } from "next/navigation";
import { MaintainPageData } from "../types/maintain-data";
import SectionRenderer from "@/components/features/maintain/SectionRenderer";
import { getMaintainPageData } from "@/services/maintainService";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const data: MaintainPageData = await getMaintainPageData(slug);

  if (!data || !data.seo) return {};

  return {
    title: data.seo.title,
    description: data.seo.description,
  };
}

export default async function MaintainSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const data: MaintainPageData = await getMaintainPageData(slug);

  if (!data) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white">
      {data.sections.map((section, index) => (
        <SectionRenderer key={section.id || index} section={section} />
      ))}
    </main>
  );
}
