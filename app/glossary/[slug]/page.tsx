import { notFound } from "next/navigation";
import { getGlossaryPageType, GLOSSARY_TERMS } from "../lib/glossaryData";
import { CategoryLayout } from "../components/CategoryLayout";
import { DefinitionLayout } from "../components/DefinitionLayout";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function GlossarySlugPage({ params }: PageProps) {
  const { slug } = await params;
  const pageType = getGlossaryPageType(slug);

  if (!pageType) {
    return notFound();
  }

  if (pageType.type === "CATEGORY") {
    const letter = pageType.letter;
    // Filter terms for this letter
    const terms = GLOSSARY_TERMS.filter((term) => term.letter === letter);

    return <CategoryLayout letter={letter} terms={terms} />;
  }

  if (pageType.type === "DEFINITION") {
    return <DefinitionLayout term={pageType.data} />;
  }

  return notFound();
}
