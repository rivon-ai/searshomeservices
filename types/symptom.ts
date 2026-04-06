export interface SymptomDetailResponse {
  success: boolean;
  data: {
    brand: string;
    appliance: string;
    symptom: string;
    slug: string;
    url: string;
    seoTitle: string;
    pageTitle: string;
    commonReasonsHeading: string;
    commonReasonsDescription: string;
    mostCommonParts: Array<{ percentage: string; part: string }>;
    cta: { title: string; phone: string };
    commonRepairs: Array<{
      title: string;
      description: string;
      diyLink: { label: string; href: string };
    }>;
    troubleshootingSections: Array<{
      heading: string;
      body: string;
      subSections: Array<{
        heading: string;
        body: string;
        image?: string;
        links?: Array<{ label: string; href: string }>;
      }>;
    }>;
    faq: Array<{ question: string; answer: string }>;
    customerReviews: Array<{ title: string; body: string; reviewer: string }>;
    relatedBlogArticles: Array<{
      title: string;
      readTime: string;
      date: string;
      description: string;
      image: string;
      categoryLinks: Array<{ label: string; href: string }>;
    }>;
    relatedGlossaryTerms: Array<{ title: string; definition: string }>;
    relatedSymptoms: string[];
    relatedBrands: string[];
  };
}

export type SymptomData = SymptomDetailResponse['data'];
