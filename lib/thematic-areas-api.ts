import { API_BASE_URL } from '@/lib/env';
const API_URL = API_BASE_URL;

export interface ThematicAreaApi {
  id: number;
  slug: string;
  title: string;
  description: string | null;
  image: string | null;
  icon: string | null;
  color_class: string | null;
  sort_order: number;
}

export async function fetchThematicAreas(): Promise<ThematicAreaApi[]> {
  const url = `${API_URL}/api/v1/thematic-areas`;
  const res = await fetch(url, { next: { revalidate: 60 } });
  if (!res.ok) return [];
  const json = await res.json();
  const data = json.data ?? json;
  return Array.isArray(data) ? data : [];
}
