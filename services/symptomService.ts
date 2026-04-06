import { SymptomDetailResponse } from '@/types/symptom';

export type {
    SymptomPageData,
    StatsItem, RepairItem, FaqItem, TestimonialItem, GlossaryItem, CrossLinkItem, BlogPostItem
} from '@/utils/mappers/symptomMappers';

import type {
    SymptomPageData
} from '@/utils/mappers/symptomMappers';

const APPLIANCE_DIR_MAP: Record<string, string> = {
    'furnace': 'gas',
    'central-air': 'central'
};

export async function getSymptomData(slug: string): Promise<SymptomPageData | null> {
    try {
        const parts = slug.split('-');
        if (parts.length < 3) return null;

        const brand = parts[0];
        const appliance = parts[1];
        const issue = parts.slice(2).join('-');

        const applianceDir = APPLIANCE_DIR_MAP[appliance] || appliance;
        
        const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';
        // New endpoint structure matches the documentation provided by the user
        const url = `${API_BASE_URL}/symptoms/${issue}?brand=${brand}&appliance=${applianceDir}`;

        const response = await fetch(url);
        if (!response.ok) {
            return null;
        }

        const json: SymptomDetailResponse = await response.json();
        
        if (!json.success || !json.data) {
            return null;
        }

        const data = json.data;

        // Map the new rich API structure back to the SymptomPageData interface
        // to minimize breaking changes in the components for now.
        return {
            meta: {
                title: data.pageTitle,
                description: data.commonReasonsDescription
            },
            stats: data.mostCommonParts.map(part => ({
                value: Number.parseInt(part.percentage),
                label: part.part,
                description: `${part.percentage} it's the ${part.part}`
            })),
            repairs: data.commonRepairs.map(repair => ({
                title: repair.title,
                description: repair.description,
                linkText: repair.diyLink.label,
                linkUrl: repair.diyLink.href
            })),
            faqs: data.faq.map(f => ({
                question: f.question,
                answer: f.answer
            })),
            testimonials: data.customerReviews.map((rev, idx) => ({
                id: idx + 1,
                title: rev.title,
                rating: 5, // Default for now as not in schema
                review: rev.body,
                customerName: rev.reviewer.split(',')[0],
                location: rev.reviewer.split(',')[1]?.trim() || ''
            })),
            glossary: data.relatedGlossaryTerms.map(g => ({
                title: g.title,
                description: g.definition,
                link: '#'
            })),
            additionalSymptomsLinks: data.relatedSymptoms.map(s => ({
                title: s,
                link: `/symptom-center/${s.toLowerCase().replaceAll(' ', '-')}`
            })),
            otherBrandLinks: data.relatedBrands.map(b => ({
                title: b,
                link: `/symptom-center/${b.toLowerCase().replaceAll(' ', '-')}`
            })),
            blogPosts: data.relatedBlogArticles.map((post, idx) => ({
                id: idx + 1,
                title: post.title,
                description: post.description,
                readTime: post.readTime,
                date: post.date,
                imageUrl: post.image,
                imageAlt: post.title,
                productLink: post.categoryLinks[0] ? {
                    text: post.categoryLinks[0].label,
                    url: post.categoryLinks[0].href
                } : { text: '', url: '' }
            })),
            troubleshootingSections: data.troubleshootingSections,
            rawNodes: [] 
        };

    } catch (error) {
        console.error("Error loading symptom data:", error);
        return null;
    }
}
