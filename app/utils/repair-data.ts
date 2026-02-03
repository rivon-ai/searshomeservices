const DATA_BASE_URL = (process.env.NEXT_PUBLIC_DATA_URL || 'http://localhost:3001').replace(/\/$/, '');

function sanitizeSlug(name: string): string {
    return name
        .toLowerCase()
        .replace(/&/g, "and")
        .replace(/[^a-z0-9]/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");
}

function toStylizedName(slug: string): string {
    // Remove '-repair-service' if present
    const cleanSlug = slug.replace(/-repair-service$/, '');
    return cleanSlug
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join('_');
}

export async function getRepairServiceData(slug: string): Promise<any | null> {
    const stylized = toStylizedName(slug);
    const candidates = [
        `${DATA_BASE_URL}/data/scraped/${stylized}/${stylized}-repair-service.json`,
        `${DATA_BASE_URL}/data/scraped/${stylized}/${slug}.json`,
        `${DATA_BASE_URL}/data/scraped/${slug}.json`
    ];

    for (const url of candidates) {
        try {
            const response = await fetch(url);
            if (response.ok) {
                const json = await response.json();
                return Array.isArray(json) ? json[0] : json;
            }
        } catch (err: any) {
            // Continue to next candidate
        }
    }

    return null;
}

export async function getBrandApplianceRepairData(brand: string, appliance: string): Promise<any | null> {
    const brandSlug = sanitizeSlug(brand);
    const applianceSlug = sanitizeSlug(appliance);

    const candidates = [
        `${DATA_BASE_URL}/data/scraped/${brandSlug}/appliances/${applianceSlug}.json`,
        `${DATA_BASE_URL}/data/scraped/${brandSlug}/appliances/${brandSlug}-${applianceSlug}.json`
    ];

    for (const url of candidates) {
        try {
            const response = await fetch(url);
            if (response.ok) {
                const json = await response.json();
                return Array.isArray(json) ? json[0] : json;
            }
        } catch (err: any) {
             // Continue to next candidate
        }
    }

    return null;
}
