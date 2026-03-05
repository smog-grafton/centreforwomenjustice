import { API_BASE_URL } from '@/lib/env';
const API_URL = API_BASE_URL;

export interface ContactSettingsData {
  topbar: {
    location: string | null;
    phone: string | null;
    email: string | null;
  };
  footer: {
    location: string | null;
    phone: string | null;
    email: string | null;
  };
  get_help?: {
    hero: {
      title: string | null;
      subtitle: string | null;
      image_url: string | null;
    };
    intro_body: string | null;
  };
  contact_page: {
    hero: {
      title: string | null;
      subtitle: string | null;
      image_url: string | null;
    };
    office: {
      address: string | null;
    };
    phones: {
      primary: string | null;
      whatsapp: string | null;
    };
    emails: {
      primary: string | null;
      legal: string | null;
    };
    working_hours: {
      weekdays: string | null;
      weekends: string | null;
    };
    emergency: {
      heading: string | null;
      body: string | null;
      phone: string | null;
    };
  };
  helpline: {
    heading: string | null;
    subheading: string | null;
    email: string | null;
    main_phone: string | null;
    emergency_phone: string | null;
    whatsapp_phone: string | null;
  };
  social: {
    x: string | null;
    facebook: string | null;
    instagram: string | null;
    linkedin: string | null;
    youtube: string | null;
  };
}

export async function fetchContactSettings(): Promise<ContactSettingsData | null> {
  const res = await fetch(`${API_URL}/api/v1/settings/contact`, {
    cache: 'no-store',
  });
  if (!res.ok) return null;
  return res.json();
}

