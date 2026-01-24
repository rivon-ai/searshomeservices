import React from "react";
import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import { MaintainPageData } from "../types/maintain-data";
import SectionRenderer from "../components/SectionRenderer";

const DATA_DIR = path.join(process.cwd(), "data/maintain/summarized");

async function getMaintainPageData(
  slug: string,
): Promise<MaintainPageData | null> {
  const filePath = path.join(DATA_DIR, `${slug}.json`);

  if (!fs.existsSync(filePath)) {
    // Try finding by explicit slug match if filename doesn't match?
    // For now assuming filename == slug as per convention
    return null;
  }

  try {
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const data: MaintainPageData = JSON.parse(fileContent);
    return data;
  } catch (error) {
    console.error(
      `Error reading or parsing maintain data for slug: ${slug}`,
      error,
    );
    return null;
  }
}

export async function generateStaticParams() {
  if (!fs.existsSync(DATA_DIR)) return [];

  const files = fs.readdirSync(DATA_DIR);
  return files
    .filter((file) => file.endsWith(".json"))
    .map((file) => ({
      slug: file.replace(".json", ""),
    }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const data = await getMaintainPageData(slug);

  if (!data) return {};

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
  const data = await getMaintainPageData(slug);

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
