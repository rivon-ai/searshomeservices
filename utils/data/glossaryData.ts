export interface TermObject {
  term: string;
  slug: string;
  letter: string;
  definition: string;
  details?: string;
  description?: string;
  title?: string;
  metaData?: {
    termName?: string;
    letter?: string;
    [key: string]: any;
  };
}

export const GLOSSARY_TERMS: TermObject[] = [];
