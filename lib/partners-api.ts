import { API_BASE_URL } from '@/lib/env';
const API_URL = API_BASE_URL;

export interface PartnerApi {
  id: number;
  name: string;
  logo: string | null;
}

export async function fetchPartners(): Promise<PartnerApi[]> {
  const res = await fetch(`${API_URL}/api/v1/partners`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) return [];
  const json = await res.json();
  const data = json.data ?? json;
  return Array.isArray(data) ? data : [];
}
