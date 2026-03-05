import { API_BASE_URL } from '@/lib/env';
const API_URL = API_BASE_URL;

export interface VolunteerOpportunityApi {
  id: number;
  slug: string;
  title: string;
  category: string | null;
  description: string | null;
  requirements: string[];
  location: string | null;
  commitment: string | null;
}

export interface VolunteerTestimonialApi {
  id: number;
  name: string;
  role: string | null;
  quote: string;
  avatar_image_url: string | null;
}

export interface VolunteerPageData {
  hero: {
    pill_text: string | null;
    title: string | null;
    highlight_text: string | null;
    body: string | null;
    primary_cta_label: string | null;
    primary_cta_url: string | null;
    secondary_cta_label: string | null;
    secondary_cta_url: string | null;
    background_image_url: string | null;
    foreground_image_url: string | null;
  } | null;
  why: {
    title: string | null;
    subtitle: string | null;
    image_url: string | null;
    items: { title: string; description: string; icon_key?: string | null }[];
  } | null;
  opportunities_intro: {
    title: string | null;
    subtitle: string | null;
  } | null;
  opportunities: VolunteerOpportunityApi[];
  testimonials: VolunteerTestimonialApi[];
}

export interface VolunteerApplicationPayload {
  volunteer_opportunity_slug: string;
  applicant_name: string;
  applicant_email?: string;
  applicant_phone?: string;
  message: string;
  meta?: Record<string, unknown>;
}

export interface VolunteerApplicationResponse {
  success: boolean;
  message?: string;
  errors?: Record<string, string[]>;
}

export async function fetchVolunteerPage(): Promise<VolunteerPageData | null> {
  const res = await fetch(`${API_URL}/api/v1/volunteer/page`, {
    cache: 'no-store',
  });
  if (!res.ok) return null;
  return res.json();
}

export async function submitVolunteerApplication(
  payload: VolunteerApplicationPayload,
): Promise<VolunteerApplicationResponse> {
  const res = await fetch(`${API_URL}/api/v1/volunteer-applications`, {
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
    message: data.message ?? 'Thank you for applying to volunteer. Our team will contact you soon.',
  };
}

