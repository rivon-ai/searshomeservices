const DATA_BASE_URL = (process.env.NEXT_PUBLIC_DATA_URL || 'http://localhost:3001').replace(/\/$/, '');

export interface SymptomNode {
    tag: string;
    content: string;
    attributes: string | Record<string, any>;
    order: number;
    children?: SymptomNode[];
}

const APPLIANCE_DIR_MAP: Record<string, string> = {
    'furnace': 'gas',
    'central-air': 'central'
};

export interface StatsItem {
    value: number;
    label: string;
    description: string;
}

export interface RepairItem {
    title: string;
    description: string;
    linkText: string;
    linkUrl: string;
}

export interface FaqItem {
    question: string;
    answer: string;
}

export interface TestimonialItem {
    id: number;
    title: string;
    rating: number;
    review: string;
    customerName: string;
    location: string;
}

export interface GlossaryItem {
    title: string;
    description: string;
    link: string;
}

export interface CrossLinkItem {
    title: string;
    link: string;
}

export interface BlogPostItem {
    id: number;
    title: string;
    description: string;
    readTime: string;
    date: string;
    imageUrl: string; 
    imageAlt: string;
    productLink: {
        text: string;
        url: string;
    };
}

export interface QuickRepairItem {
    imgSrc: string;
    title: string;
    description: string;
}

export interface QuickRepairData {
    title: string;
    items: QuickRepairItem[];
}

export interface SymptomPageData {
    meta: {
        title: string;
        description: string;
    };
    stats: StatsItem[];
    repairs: RepairItem[];
    faqs: FaqItem[];
    testimonials: TestimonialItem[];
    glossary: GlossaryItem[];
    additionalSymptomsLinks: CrossLinkItem[];
    otherBrandLinks: CrossLinkItem[];
    blogPosts: BlogPostItem[];
    quickRepair?: QuickRepairData;
    rawNodes: SymptomNode[];
}

function parseAttributes(attrString: string | Record<string, any>): Record<string, any> {
    if (typeof attrString !== 'string') return attrString;
    try {
        let jsonStr = attrString
            .replace(/'/g, '"')
            .replace(/None/g, 'null')
            .replace(/True/g, 'true')
            .replace(/False/g, 'false');
        
        return JSON.parse(jsonStr);
    } catch (e) {
        // console.error("Error parsing attributes:", attrString, e);
        return {};
    }
}

export async function getSymptomData(slug: string): Promise<SymptomPageData | null> {
    try {
        const parts = slug.split('-');
        if (parts.length < 3) return null;

        const brand = parts[0];
        const appliance = parts[1];
        const issue = parts.slice(2).join('-');

        const applianceDir = APPLIANCE_DIR_MAP[appliance] || appliance;
        
        // Define candidates as URLs
        const candidates = [
            `${DATA_BASE_URL}/data/brands/${brand}/${applianceDir}/symptoms/${issue}.json`,
            `${DATA_BASE_URL}/data/brands/${brand}/${applianceDir}/symptoms/${appliance}-${issue}.json`,
            `${DATA_BASE_URL}/data/brands/${brand}/${applianceDir}/symptoms/${brand}-${appliance}-${issue}.json`
        ];

        let root = null;
        for (const url of candidates) {
            try {
                const response = await fetch(url);
                if (response.ok) {
                    root = await response.json();
                    break;
                }
            } catch (err: any) {
                // Continue to next candidate
            }
        }

        if (!root) {
            return null;
        }

        // Handle the array structure where data is in root[0].full_content
        let nodes: SymptomNode[] = [];
        if (Array.isArray(root)) {
            if (root[0] && Array.isArray(root[0].full_content)) {
                nodes = root[0].full_content;
            } else {
                nodes = root as SymptomNode[];
            }
        } else {
            nodes = root as SymptomNode[]; // fallback
        }

        nodes.sort((a, b) => a.order - b.order);

        // Filter nodes based on ignore list
        const h1Index = nodes.findIndex(node => node.tag === 'h1');
        if (h1Index !== -1) {
            nodes = nodes.slice(h1Index);
        }

        const h2Indices = nodes.reduce((acc, node, index) => {
            if (node.tag === 'h2') {
                acc.push(index);
            }
            return acc;
        }, [] as number[]);

        if (h2Indices.length >= 2) {
            const secondToLastH2Index = h2Indices[h2Indices.length - 2];
            let lastSpanIndex = -1;
            for (let i = secondToLastH2Index + 1; i < nodes.length; i++) {
                if(nodes[i].tag === 'h2') break;
                if (nodes[i].tag === 'span') {
                    lastSpanIndex = i;
                }
            }
            if (lastSpanIndex !== -1) {
                nodes = nodes.slice(0, lastSpanIndex + 1);
            }
        }


        const processedNodes = nodes.map(node => ({
            ...node,
            attributes: parseAttributes(node.attributes)
        }));

        return {
            meta: extractMeta(processedNodes),
            stats: extractStats(processedNodes),
            repairs: extractRepairs(processedNodes),
            faqs: extractFaqs(processedNodes),
            testimonials: extractTestimonials(processedNodes),
            glossary: extractGlossary(processedNodes),
            additionalSymptomsLinks: extractCrossLinks(processedNodes, slug),
            otherBrandLinks: extractOtherBrandsLinks(processedNodes, slug),
            blogPosts: extractBlogPosts(processedNodes),
            quickRepair: extractQuickRepairSteps(processedNodes),
            rawNodes: processedNodes
        };

    } catch (error) {
        console.error("Error loading symptom data:", error);
        return null;
    }
}

function extractMeta(nodes: SymptomNode[]) {
    const h1Index = nodes.findIndex(n => n.tag === 'h1');
    let description = '';
    
    if (h1Index !== -1) {
        for (let i = h1Index + 1; i < nodes.length; i++) {
            const node = nodes[i];
            if (node.tag === 'p' && node.content.length > 20) {
                description = node.content;
                break;
            }
            if (node.tag.startsWith('h') && node.tag !== 'h1') break;
        }
    }

    if (!description) {
        const commonHeaderIndex = nodes.findIndex(n => n.tag === 'h2' && n.content.includes('Common reasons'));
        if (commonHeaderIndex !== -1) {
             for (let i = commonHeaderIndex + 1; i < nodes.length; i++) {
                if (nodes[i].tag === 'p') {
                    description = nodes[i].content;
                    break;
                }
             }
        }
    }

    return {
        title: h1Index !== -1 ? nodes[h1Index].content : '',
        description
    };
}

function extractStats(nodes: SymptomNode[]): StatsItem[] {
    const stats: StatsItem[] = [];
    for (let i = 0; i < nodes.length - 1; i++) {
        const node = nodes[i];
        if (node.tag === 'span' && node.content.includes('% of the time it\'s the')) {
            const valueMatch = node.content.match(/(\d+)%/);
            if (valueMatch) {
                const value = parseInt(valueMatch[1]);
                const description = node.content; 
                const nextNode = nodes[i + 1];
                if (nextNode && nextNode.tag === 'span') {
                    stats.push({
                        value,
                        description,
                        label: nextNode.content
                    });
                }
            }
        }
    }
    return stats;
}

function extractRepairs(nodes: SymptomNode[]): RepairItem[] {
    const repairs: RepairItem[] = [];
    for (let i = 0; i < nodes.length - 2; i++) {
        const node = nodes[i];
        if (node.tag === 'h4' && node.content.includes('Replacement')) {
            const title = node.content;
            let description = '';
            let linkText = '';
            let linkUrl = '';
            for (let j = 1; j <= 3; j++) {
                const next = nodes[i + j];
                if (!next) break;
                if (next.tag === 'p' && !description) description = next.content;
                if (next.tag === 'a' && !linkUrl) {
                    linkText = next.content;
                    const attrs = next.attributes as Record<string, any>;
                    linkUrl = attrs.href || '#';
                }
            }
            if (description) {
                repairs.push({ title, description, linkText, linkUrl });
            }
        }
    }
    return repairs;
}

function extractFaqs(nodes: SymptomNode[]): FaqItem[] {
    const faqs: FaqItem[] = [];
    let inFaqSection = false;
    for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        if (node.tag === 'h2' && node.content.includes('Frequently Asked Questions')) {
            inFaqSection = true;
            continue;
        }
        if (inFaqSection) {
            if (node.tag === 'h2') break;
            const attrs = node.attributes as Record<string, any>;
            const classes = Array.isArray(attrs.class) ? attrs.class : [];
            if (node.tag === 'div' && classes.includes('font-semibold') && node.content.endsWith('?')) {
                const question = node.content;
                const nextNode = nodes[i + 1];
                if (nextNode && nextNode.tag === 'div') {
                    faqs.push({
                        question,
                        answer: nextNode.content
                    });
                }
            }
        }
    }
    return faqs;
}

function extractTestimonials(nodes: SymptomNode[]): TestimonialItem[] {
    const testimonials: TestimonialItem[] = [];
    let inSection = false;
    // Look for H2 "What our customers say about us"
    const startIdx = nodes.findIndex(n => n.tag === 'h2' && n.content.includes('say about us'));
    if (startIdx === -1) return [];

    let currentReview: Partial<TestimonialItem> = {};
    
    for (let i = startIdx + 1; i < nodes.length; i++) {
        const node = nodes[i];
        // Stop if H2
        if (node.tag === 'h2') break;

        // Pattern: P(Title) -> P(Review) -> P(Author)
        
        const attrs = node.attributes as Record<string, any>;
        const classes = Array.isArray(attrs.class) ? attrs.class : [];

        if (node.tag === 'p') {
             if (classes.includes('text-blue-300') && classes.includes('font-semibold')) {
                 // Start new review
                 currentReview = { id: testimonials.length + 1, rating: 5, title: node.content };
             } else if (classes.includes('line-clamp-5')) {
                 if (currentReview) currentReview.review = node.content;
             } else if (classes.includes('italic') && classes.includes('uppercase')) {
                 if (currentReview) {
                     // "NAME, LOC"
                     const parts = node.content.split(',');
                     currentReview.customerName = parts[0]?.trim() || node.content;
                     currentReview.location = parts.slice(1).join(',').trim();
                     
                     if (currentReview.title && currentReview.review) {
                         testimonials.push(currentReview as TestimonialItem);
                     }
                     currentReview = {};
                 }
             }
        }
    }
    return testimonials;
}

function extractGlossary(nodes: SymptomNode[]): GlossaryItem[] {
    const glossary: GlossaryItem[] = [];
    const startIdx = nodes.findIndex(n => n.tag === 'h3' && n.content.includes('Glossary Terms'));
    if (startIdx === -1) return [];

    for (let i = startIdx + 1; i < nodes.length; i++) {
        const node = nodes[i];
        if (node.tag === 'h2') break; // Next major section

        // Span (Term) -> P (Definition)
        if (node.tag === 'span' && (node.attributes as any)?.class?.includes('text-blue-300')) {
             const title = node.content;
             const nextNode = nodes[i + 1];
             if (nextNode && nextNode.tag === 'p') {
                 glossary.push({
                     title,
                     description: nextNode.content,
                     link: '#' // JSON doesn't seem to have links for these?
                 });
             }
        }
    }
    return glossary;
}

function extractCrossLinks(nodes: SymptomNode[], currentSlug: string): CrossLinkItem[] {
    const links: CrossLinkItem[] = [];
    // "Additional possible... symptoms"
    const startIdx = nodes.findIndex(n => n.tag === 'h2' && n.content.includes('Additional possible'));
    if (startIdx === -1) return [];

    for (let i = startIdx + 1; i < nodes.length; i++) {
        const node = nodes[i];
        if (node.tag === 'h2') break;
        
        if (node.tag === 'span' && (node.attributes as any)?.class?.includes('text-gray-500')) {
             // Link logic: Construct URL from title? JSON doesn't have href on these spans usually?
             // "Kenmore dishwasher not starting" -> /symptom/kenmore-dishwasher-not-starting
             const title = node.content;
             const generatedSlug = title.toLowerCase().replace(/\s+/g, '-');
             links.push({
                 title,
                 link: `/symptom/${generatedSlug}`
             });
        }
    }
    return links;
}

function extractOtherBrandsLinks(nodes: SymptomNode[], currentSlug: string): CrossLinkItem[] {
    const links: CrossLinkItem[] = [];
    const startIdx = nodes.findIndex(n => n.tag === 'h2' && n.content.includes('These dishwasher brands may also experience'));
    if (startIdx === -1) return [];

    for (let i = startIdx + 1; i < nodes.length; i++) {
        const node = nodes[i];
        if (node.tag === 'h2') break;
        
        if (node.tag === 'span' && (node.attributes as any)?.class?.includes('text-gray-500')) {
             const title = node.content;
             const generatedSlug = title.toLowerCase().replace(/\s+/g, '-');
             links.push({
                 title,
                 link: `/symptom/${generatedSlug}`
             });
        }
    }
    return links;
}

function extractBlogPosts(nodes: SymptomNode[]): BlogPostItem[] {
    const posts: BlogPostItem[] = [];
    const startIdx = nodes.findIndex(n => n.tag === 'h2' && n.content.includes('Repair Dishwasher Resources'));
    if (startIdx === -1) return [];

    let currentPost: Partial<BlogPostItem> = {};
    
    for (let i = startIdx + 1; i < nodes.length; i++) {
        const node = nodes[i];
        if (node.tag === 'h2') break; 

        // Img -> P(Title) -> Span(ReadTime) -> Span(Date) -> P(Desc) -> A(Link)
        
        if (node.tag === 'img' && node.content.includes('[IMAGE]')) {
             // Start new post
             // extract src?
             // Content: "[IMAGE] Alt: ... | Src: ..."
             const srcMatch = node.content.match(/Src:\s*(\S+)/);
             if (srcMatch) {
                currentPost = { id: posts.length + 1, imageUrl: srcMatch[1], imageAlt: 'Blog Image' };
             }
        } else if (node.tag === 'p' && (node.attributes as any)?.class?.includes('font-semibold')) {
            if (currentPost) currentPost.title = node.content;
        } else if (node.tag === 'span' && node.content.includes('read')) {
            if (currentPost) currentPost.readTime = node.content;
        } else if (node.tag === 'span' && node.content.match(/[A-Z][a-z]+\.\s\d+/)) { // Dec. 19
            if (currentPost) currentPost.date = node.content;
        } else if (node.tag === 'p' && (node.attributes as any)?.class?.includes('text-blue-400')) {
             if (currentPost) currentPost.description = node.content;
        } else if (node.tag === 'a' && node.content === 'Dishwasher') {
             if (currentPost) {
                 const attrs = node.attributes as any;
                 currentPost.productLink = { text: 'Dishwasher', url: attrs.href || '#' };
                 // End of post
                 if (currentPost.title) {
                     posts.push(currentPost as BlogPostItem);
                 }
                 currentPost = {};
             }
        }
    }
    return posts;
}

function extractQuickRepairSteps(nodes: SymptomNode[]): QuickRepairData | undefined {
    // Find the trigger heading
    const triggerIdx = nodes.findIndex(n => 
        n.tag === 'h2' && n.content.toLowerCase().includes('repair is quick and easy')
    );

    if (triggerIdx === -1) return undefined;

    const title = nodes[triggerIdx].content;
    const items: QuickRepairItem[] = [];
    
    // Look for the next 3 items (img, h3, p pattern)
    let i = triggerIdx + 1;
    let itemsCollected = 0;

    while (i < nodes.length && itemsCollected < 3) {
        const imgNode = nodes[i];
        const h3Node = nodes[i + 1];
        const pNode = nodes[i + 2];

        if (imgNode?.tag === 'img' && h3Node?.tag === 'h3' && pNode?.tag === 'p') {
            const srcMatch = imgNode.content.match(/Src:\s*(\S+)/);
            // Also check attributes if content match fails
            let imgSrc = srcMatch ? srcMatch[1] : '';
            if (!imgSrc && typeof imgNode.attributes === 'object') {
                imgSrc = imgNode.attributes.src || '';
            }

            items.push({
                imgSrc: imgSrc,
                title: h3Node.content,
                description: pNode.content
            });
            i += 3;
            itemsCollected++;
        } else {
            // If pattern breaks, try to increment and look again (maybe some spacers)
            i++;
            if (i > triggerIdx + 10) break; // Safety break
        }
    }

    if (items.length > 0) {
        return { title, items };
    }

    return undefined;
}
