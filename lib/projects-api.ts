import { API_BASE_URL } from '@/lib/env';
const API_URL = API_BASE_URL;

export interface ProjectApi {
  id: number;
  slug: string;
  title: string;
  summary: string | null;
  body: string | null;
  status: string;
  topic: string | null;
  year_range: string | null;
  location: string | null;
  featured_image: string | null;
  sort_order: number;
  is_featured: boolean;
}

export interface ProjectFilters {
  status?: string;
  topic?: string;
  year?: string;
}

export async function fetchProjects(filters?: ProjectFilters): Promise<ProjectApi[]> {
  const params = new URLSearchParams();
  if (filters?.status) params.set('status', filters.status);
  if (filters?.topic) params.set('topic', filters.topic);
  if (filters?.year) params.set('year', filters.year);
  const qs = params.toString();
  const url = `${API_URL}/api/v1/projects${qs ? '?' + qs : ''}`;
  const res = await fetch(url, { next: { revalidate: 60 } });
  if (!res.ok) return [];
  const json = await res.json();
  const data = json.data ?? json;
  return Array.isArray(data) ? data : [];
}

export async function fetchProjectSlugs(): Promise<{ slug: string }[]> {
  const url = `${API_URL}/api/v1/projects/slugs`;
  const res = await fetch(url, { next: { revalidate: 60 } });
  if (!res.ok) return [];
  const json = await res.json();
  const data = json.data ?? json;
  return Array.isArray(data) ? data : [];
}

export async function fetchProjectBySlug(slug: string): Promise<ProjectApi | null> {
  const url = `${API_URL}/api/v1/projects/${encodeURIComponent(slug)}`;
  const res = await fetch(url, { next: { revalidate: 60 } });
  if (!res.ok) return null;
  const json = await res.json();
  const data = json.data ?? json;
  return data && typeof data === 'object' && 'slug' in data ? data : null;
}
