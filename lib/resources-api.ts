import { API_BASE_URL } from '@/lib/env';
const API_URL = API_BASE_URL;

export type ResourceCategory = 'publications' | 'newsletters' | 'annual-reports' | 'know-your-rights';

export interface ResourceItemApi {
  id: number;
  slug: string;
  category: string;
  title: string;
  summary: string | null;
  tag: string | null;
  author: string | null;
  cover_image: string | null;
  file_path: string | null;
  download_url: string | null;
  href: string | null;
  year: number | null;
  is_published: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface ResourceListResponse {
  data: ResourceItemApi[];
  links: { first: string; last: string; prev: string | null; next: string | null };
  meta: { current_page: number; last_page: number; per_page: number; total: number };
}

export async function fetchResources(
  page = 1,
  perPage = 24,
  category?: string | null
): Promise<ResourceListResponse> {
  const params = new URLSearchParams();
  params.set('page', String(page));
  params.set('per_page', String(perPage));
  if (category) params.set('category', category);
  const url = `${API_URL}/api/v1/resources?${params.toString()}`;
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) {
    return {
      data: [],
      links: {} as ResourceListResponse['links'],
      meta: { current_page: 1, last_page: 1, per_page: perPage, total: 0 },
    };
  }
  return res.json();
}

export async function fetchResourceBySlug(slug: string): Promise<ResourceItemApi | null> {
  const res = await fetch(`${API_URL}/api/v1/resources/${encodeURIComponent(slug)}`);
  if (!res.ok) return null;
  const data = await res.json();
  return data.data ?? null;
}

export async function fetchResourceCategories(): Promise<string[]> {
  const res = await fetch(`${API_URL}/api/v1/resources/categories`);
  if (!res.ok) return [];
  const data = await res.json();
  return Array.isArray(data.data) ? data.data : [];
}

/** Map API item to Resource shape for ResourceCard / home showcase */
export function toResourceItem(item: ResourceItemApi): {
  id: string;
  category: ResourceCategory;
  title: string;
  tag: string;
  author: string;
  coverImage: string;
  href: string;
  year?: number;
  summary?: string;
  downloadUrl: string | null;
} {
  const category = item.category as ResourceCategory;
  return {
    id: String(item.id),
    category: ['publications', 'newsletters', 'annual-reports', 'know-your-rights'].includes(item.category)
      ? category
      : 'publications',
    title: item.title,
    tag: item.tag || '#Resource',
    author: item.author || 'CWJ-U',
    coverImage: item.cover_image || '',
    href: item.href || `/resources/${item.slug}`,
    year: item.year ?? undefined,
    summary: item.summary ?? undefined,
    downloadUrl: item.download_url ?? null,
  };
}
