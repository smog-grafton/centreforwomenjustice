import { API_BASE_URL } from '@/lib/env';
const API_URL = API_BASE_URL;

export interface HelpRequestPayload {
  full_name: string;
  phone: string;
  district?: string;
  preferred_contact?: string;
  assistance_types?: string[];
  description: string;
  consent: boolean;
}

export interface HelpRequestResponse {
  success: boolean;
  message?: string;
  errors?: Record<string, string[]>;
}

export async function submitHelpRequest(
  payload: HelpRequestPayload,
): Promise<HelpRequestResponse> {
  const res = await fetch(`${API_URL}/api/v1/help-requests`, {
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
      message: 'Something went wrong while submitting your request.',
    };
  }

  const data = await res.json();

  return {
    success: !!data.success,
    message: data.message ?? 'Thank you for reaching out. One of our legal officers will contact you soon.',
  };
}

