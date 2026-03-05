import { API_BASE_URL } from '@/lib/env';
const API_URL = API_BASE_URL;

export interface ContactSubmissionPayload {
  first_name?: string;
  last_name?: string;
  email: string;
  subject?: string;
  message: string;
}

export interface ContactSubmissionResponse {
  success: boolean;
  message?: string;
  errors?: Record<string, string[]>;
}

export async function submitContactForm(
  payload: ContactSubmissionPayload,
): Promise<ContactSubmissionResponse> {
  const res = await fetch(`${API_URL}/api/v1/contact-submissions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...payload,
      source: 'contact_page',
    }),
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
      message: 'Something went wrong while sending your message.',
    };
  }

  const data = await res.json();

  return {
    success: !!data.success,
    message: data.message ?? 'Thank you for reaching out. We have received your message.',
  };
}

