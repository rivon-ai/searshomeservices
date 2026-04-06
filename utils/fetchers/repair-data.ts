import { SummarizedRepairData } from '@/types/repairTypes';

const API_BASE = (process.env.NEXT_PUBLIC_DATA_URL || 'http://localhost:3001').replace(/\/$/, '');

export async function getRepairServiceData(slug: string): Promise<SummarizedRepairData | null> {
  try {
    const res = await fetch(`${API_BASE}/api/v1/repair/${slug}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.success ? json.data : null;
  } catch {
    return null;
  }
}

export async function getBrandApplianceRepairData(
  brand: string,
  appliance: string,
): Promise<SummarizedRepairData | null> {
  try {
    const res = await fetch(`${API_BASE}/api/v1/repair/${brand}/${appliance}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.success ? json.data : null;
  } catch {
    return null;
  }
}
