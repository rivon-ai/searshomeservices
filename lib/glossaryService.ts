import { GLOSSARY_TERMS, TermObject } from "@/app/utils/glossaryData";

export interface GlossaryData {
  [letter: string]: TermObject[];
}

export const glossaryService = {
  /**
   * Returns all glossary terms grouped by their starting letter.
   */
  getGroupedTerms: (): GlossaryData => {
    const grouped: GlossaryData = {};
    
    GLOSSARY_TERMS.forEach((term) => {
      const letter = term.letter.toUpperCase();
      if (!grouped[letter]) {
        grouped[letter] = [];
      }
      grouped[letter].push(term);
    });

    // Sort letters
    const sortedGrouped: GlossaryData = {};
    Object.keys(grouped)
      .sort()
      .forEach((letter) => {
        sortedGrouped[letter] = grouped[letter].sort((a, b) => 
          a.term.localeCompare(b.term)
        );
      });

    return sortedGrouped;
  },

  /**
   * Searches for terms by title or definition.
   */
  searchTerms: (query: string): TermObject[] => {
    if (!query || query.trim().length === 0) return [];
    
    const lowerQuery = query.toLowerCase().trim();
    return GLOSSARY_TERMS.filter(
      (term) =>
        term.term.toLowerCase().includes(lowerQuery) ||
        term.definition.toLowerCase().includes(lowerQuery)
    ).slice(0, 10); // Limit results for preview
  },

  /**
   * Gets recently added terms (mocking logic for now).
   */
  getRecentTerms: (limit: number = 4): TermObject[] => {
    return GLOSSARY_TERMS.slice(0, limit);
  },

  /**
   * Gets a term by its slug.
   */
  getTermBySlug: (slug: string): TermObject | undefined => {
    return GLOSSARY_TERMS.find((t) => t.slug === slug);
  },

  /**
   * Gets terms for a specific letter.
   */
  getTermsByLetter: (letter: string): TermObject[] => {
    return GLOSSARY_TERMS.filter((t) => t.letter.toUpperCase() === letter.toUpperCase())
      .sort((a, b) => a.term.localeCompare(b.term));
  }
};
