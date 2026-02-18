import { notFound } from "next/navigation";
import { glossaryService } from "@/lib/glossaryService";
import { CategoryLayout } from "@/components/features/glossary/CategoryLayout";
import { DefinitionLayout } from "@/components/features/glossary/DefinitionLayout";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function GlossarySlugPage({ params }: PageProps) {
  const { slug } = await params;

  // Check if it's a category (single letter or 'num')
  if (/^[a-zA-Z]$/.test(slug) || slug === "num") {
    const letter = slug.toUpperCase();
    const terms = glossaryService.getTermsByLetter(letter);
    return <CategoryLayout letter={letter} terms={terms} />;
  }

  // Check if it's a definition
  const term = glossaryService.getTermBySlug(slug);
  if (term) {
    return <DefinitionLayout term={term} />;
  }

  return notFound();
}
