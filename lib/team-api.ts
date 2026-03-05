import { API_BASE_URL } from '@/lib/env';
const API_URL = API_BASE_URL;

export type TeamGroup = 'board' | 'staff';

export interface TeamMemberApi {
  id: number;
  slug: string;
  name: string;
  role: string | null;
  group_type: string;
  bio: string | null;
  image: string | null;
  sort_order: number;
}

export async function fetchTeamMembers(group?: TeamGroup): Promise<TeamMemberApi[]> {
  const params = new URLSearchParams();
  if (group) params.set('group', group);
  const url = `${API_URL}/api/v1/team${params.toString() ? '?' + params.toString() : ''}`;
  const res = await fetch(url, { next: { revalidate: 60 } });
  if (!res.ok) return [];
  const json = await res.json();
  const data = json.data ?? json;
  return Array.isArray(data) ? data : [];
}
