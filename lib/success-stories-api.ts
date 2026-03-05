import { API_BASE_URL } from '@/lib/env';
const API_URL = API_BASE_URL;

export interface SuccessStoryApi {
  id: number;
  slug: string;
  case_number: string | null;
  quote: string | null;
  name: string;
  location: string | null;
  tag_line: string | null;
  hero_image_url: string | null;
  bubble_image_url: string | null;
  is_published: boolean;
  published_at: string | null;
  program?: {
    id: number;
    title: string;
    slug: string;
  } | null;
  seo?: {
    meta_title: string | null;
    meta_description: string | null;
    canonical_url: string | null;
    og_image: string | null;
    noindex: boolean;
  };
}

export async function fetchSuccessStories(): Promise<SuccessStoryApi[]> {
  const url = `${API_URL}/api/v1/success-stories`;
  const res = await fetch(url, { next: { revalidate: 60 } });
  if (!res.ok) return [];
  const json = await res.json();
  const data = json.data ?? json;
  return Array.isArray(data) ? data : [];
}

export async function fetchSuccessStorySlugs(): Promise<{ slug: string }[]> {
  const url = `${API_URL}/api/v1/success-stories/slugs`;
  const res = await fetch(url, { next: { revalidate: 60 } });
  if (!res.ok) return [];
  const json = await res.json();
  const data = json.data ?? json;
  return Array.isArray(data) ? data : [];
}

export async function fetchSuccessStoryBySlug(slug: string): Promise<SuccessStoryApi | null> {
  const url = `${API_URL}/api/v1/success-stories/${encodeURIComponent(slug)}`;
  const res = await fetch(url, { next: { revalidate: 60 } });
  if (!res.ok) return null;
  const json = await res.json();
  const data = json.data ?? json;
  return data && typeof data === 'object' && 'slug' in data ? (data as SuccessStoryApi) : null;
}

