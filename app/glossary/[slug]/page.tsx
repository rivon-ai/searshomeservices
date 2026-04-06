import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getGlossaryTermBySlug, getGlossaryTermsByLetter } from "@/services/glossaryService";
import { CategoryLayout } from "@/components/features/glossary/CategoryLayout";
import { DefinitionLayout } from "@/components/features/glossary/DefinitionLayout";

// ISR: Cache the full rendered page for 1 hour. On-demand slugs are rendered
// on first visit and then cached — scales to any number of terms.
export const revalidate = 3600;
export const dynamicParams = true;

interface PageProps {
  readonly params: Promise<{
    readonly slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  if (/^[a-zA-Z]$/.test(slug) || slug === "num") {
    return {
      title: `Glossary Terms: ${slug.toUpperCase()} | Sears Home Services`,
      description: `Browse all home appliance and repair glossary terms starting with the letter ${slug.toUpperCase()}.`
    };
  }

  const termData = await getGlossaryTermBySlug(slug);
  if (!termData) return {};

  return {
    title: termData.seoTitle || `${termData.term} | Glossary`,
    description: termData.seoDescription || termData.description,
  };
}

export default async function GlossarySlugPage({ params }: PageProps) {
  const { slug } = await params;

  // Check if it's a category (single letter or 'num')
  if (/^[a-zA-Z]$/.test(slug) || slug === "num") {
    const letter = slug.toUpperCase();
    const terms = await getGlossaryTermsByLetter(letter);

    return <CategoryLayout letter={letter} terms={terms || []} />;
  }

  // Check if it's a definition
  const term = await getGlossaryTermBySlug(slug);
  if (term) {
    return <DefinitionLayout term={term} />;
  }

  return notFound();
}
