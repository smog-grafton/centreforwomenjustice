import { API_BASE_URL } from '@/lib/env';
const API_URL = API_BASE_URL;

export interface NewsCategoryApi {
  id: number;
  name: string;
  slug: string;
  sort_order?: number;
}

export interface NewsTagApi {
  id: number;
  name: string;
  slug: string;
}

export interface NewsPostApi {
  id: number;
  slug: string;
  title: string;
  published_on: string;
  author_label: string | null;
  views: number;
  cover_image: string | null;
  excerpt: string | null;
  body?: string;
  is_published: boolean;
  category: NewsCategoryApi | null;
  tags: NewsTagApi[];
  created_at?: string;
  updated_at?: string;
}

export interface NewsListResponse {
  data: NewsPostApi[];
  links: { first: string; last: string; prev: string | null; next: string | null };
  meta: { current_page: number; last_page: number; per_page: number; total: number };
}

export async function fetchNewsPage(
  page = 1,
  perPage = 12,
  categorySlug?: string | null
): Promise<NewsListResponse> {
  const params = new URLSearchParams();
  params.set('page', String(page));
  params.set('per_page', String(perPage));
  if (categorySlug) params.set('category', categorySlug);
  const url = `${API_URL}/api/v1/news?${params.toString()}`;
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) return { data: [], links: {} as NewsListResponse['links'], meta: { current_page: 1, last_page: 1, per_page: perPage, total: 0 } };
  return res.json();
}

export async function fetchLatestNews(): Promise<NewsPostApi | null> {
  const res = await fetch(`${API_URL}/api/v1/news/latest`);
  if (!res.ok) return null;
  const data = await res.json();
  return data.data ?? null;
}

export async function fetchNewsBySlug(slug: string): Promise<NewsPostApi | null> {
  const res = await fetch(`${API_URL}/api/v1/news/${encodeURIComponent(slug)}`);
  if (!res.ok) return null;
  const data = await res.json();
  return data.data ?? null;
}

export async function fetchNewsCategories(): Promise<NewsCategoryApi[]> {
  const res = await fetch(`${API_URL}/api/v1/news/categories`);
  if (!res.ok) return [];
  const data = await res.json();
  return Array.isArray(data.data) ? data.data : [];
}

export async function fetchNewsTags(): Promise<NewsTagApi[]> {
  const res = await fetch(`${API_URL}/api/v1/news/tags`);
  if (!res.ok) return [];
  const data = await res.json();
  return Array.isArray(data.data) ? data.data : [];
}

export async function subscribeNewsletter(email: string): Promise<{ ok: boolean; message?: string }> {
  const res = await fetch(`${API_URL}/api/v1/newsletter/subscribe`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  const data = await res.json().catch(() => ({}));
  if (res.ok) return { ok: true, message: data.message };
  return { ok: false, message: data.message || data.errors?.email?.[0] || 'Subscription failed.' };
}

/** Map API post to NewsCard item shape. coverImage is empty when no cover_image. */
export function toNewsCardItem(post: NewsPostApi): {
  id: string;
  title: string;
  slug: string;
  date: string;
  authorLabel: string;
  views: number;
  coverImage: string;
  excerpt: string;
} {
  return {
    id: String(post.id),
    title: post.title,
    slug: post.slug,
    date: post.published_on ? new Date(post.published_on).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '.') : '',
    authorLabel: post.author_label || 'CWJ-U Desk',
    views: post.views,
    coverImage: post.cover_image ?? '',
    excerpt: post.excerpt || '',
  };
}
