import { API_BASE_URL } from '@/lib/env';

const API_URL = API_BASE_URL;

export interface SiteSectionItemApi {
  id: number;
  title: string | null;
  subtitle: string | null;
  description: string | null;
  value: string | null;
  prefix: string | null;
  suffix: string | null;
  icon: string | null;
  image: string | null;
  cta_text: string | null;
  cta_url: string | null;
  metadata: Record<string, string | number | boolean | null>;
  sort_order: number;
}

export interface SiteSectionApi {
  id: number;
  key: string;
  title: string | null;
  subtitle: string | null;
  description: string | null;
  cta_text: string | null;
  cta_url: string | null;
  image: string | null;
  icon: string | null;
  metadata: Record<string, string | number | boolean | null>;
  sort_order: number;
  items: SiteSectionItemApi[];
}

export async function fetchSiteSection(key: string): Promise<SiteSectionApi | null> {
  const res = await fetch(`${API_URL}/api/v1/site-sections/${encodeURIComponent(key)}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) return null;
  const json = await res.json();
  return json.data ?? json;
}
