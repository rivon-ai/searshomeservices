const API_BASE_URL = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1').replace(/\/$/, '');

/**
 * Fetches all glossary terms (lightweight).
 * Endpoint: GET /api/v1/glossary
 * Returns: slug, title, description, metaData
 */
export async function getAllGlossaryTerms(): Promise<any[] | null> {
    try {
        const response = await fetch(`${API_BASE_URL}/glossary`, { next: { revalidate: 3600 } });

        if (!response.ok) {
            console.error(`Failed to fetch glossary terms. Status: ${response.status}`);
            return null;
        }

        const json = await response.json();
        return json.data || null;

    } catch (err: any) {
        console.error('Error fetching glossary terms:', err);
        return null;
    }
}

/**
 * Fetches all terms for a given letter.
 * Endpoint: GET /api/v1/glossary/letter/:letter
 * Returns: array of terms starting with the letter
 */
export async function getGlossaryTermsByLetter(letter: string): Promise<any[] | null> {
    try {
        const response = await fetch(`${API_BASE_URL}/glossary/letter/${letter.toLowerCase()}`, { next: { revalidate: 3600 } });

        if (!response.ok) {
            console.error(`Failed to fetch glossary terms for letter "${letter}". Status: ${response.status}`);
            return null;
        }

        const json = await response.json();
        return json.data || null;

    } catch (err: any) {
        console.error(`Error fetching glossary terms for letter "${letter}":`, err);
        return null;
    }
}

/**
 * Fetches a single glossary term by slug (full content).
 * Endpoint: GET /api/v1/glossary/:slug
 * The API returns a stringified JSON in `data.body` which this function parses.
 */
export async function getGlossaryTermBySlug(slug: string): Promise<any> {
    try {
        const response = await fetch(`${API_BASE_URL}/glossary/${slug}`, { next: { revalidate: 3600 } });

        if (!response.ok) {
            console.error(`Failed to fetch glossary term for slug "${slug}". Status: ${response.status}`);
            return null;
        }

        const json = await response.json();
        
        // Critical requirement: The API sends the rich content as a JSON string inside `data.body`.
        // We must parse it here before handing it to the rendering components.
        if (json?.data?.body) {
            try {
                return JSON.parse(json.data.body);
            } catch (parseError) {
                console.error(`Failed to parse data.body JSON for slug "${slug}":`, parseError);
                return null;
            }
        }
        
        return json.data || null;

    } catch (err: any) {
        console.error(`Error fetching glossary term for slug "${slug}":`, err);
        return null;
    }
}
