import { API_BASE_URL } from '@/lib/env';
const API_URL = API_BASE_URL;

export interface MembershipTypeApi {
  id: number;
  slug: string;
  name: string;
  short_label: string | null;
  is_organizational: boolean;
  description: string | null;
  annual_fee: number | null;
  currency: string | null;
  benefits: { text: string }[];
}

export interface MembershipPageData {
  hero: {
    title: string;
    subtitle: string | null;
    image_url: string | null;
  };
  why_join: {
    title: string;
    body: string | null;
  };
  cta: {
    title: string | null;
    body: string | null;
  };
  types: MembershipTypeApi[];
}

export interface MembershipApplicationPayload {
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  location?: string;
  type: 'individual' | 'organizational';
  membership_type_slug?: string;
  reason?: string;
}

export interface MembershipApplicationResponse {
  success: boolean;
  message?: string;
  errors?: Record<string, string[]>;
}

export async function fetchMembershipPage(): Promise<MembershipPageData | null> {
  const url = `${API_URL}/api/v1/membership/page`;
  const res = await fetch(url, {
    // Disable caching so CMS changes in Filament
    // are reflected immediately on the frontend.
    cache: 'no-store',
  });
  if (!res.ok) return null;
  return res.json();
}

export async function submitMembershipApplication(
  payload: MembershipApplicationPayload,
): Promise<MembershipApplicationResponse> {
  const res = await fetch(`${API_URL}/api/v1/memberships/apply`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (res.status === 422) {
    const data = await res.json();
    return {
      success: false,
      message: data.message ?? 'Validation error.',
      errors: data.errors ?? {},
    };
  }

  if (!res.ok) {
    return {
      success: false,
      message: 'Something went wrong while submitting your application.',
    };
  }

  const data = await res.json();
  return {
    success: !!data.success,
    message: data.message ?? 'Membership application submitted successfully.',
  };
}

