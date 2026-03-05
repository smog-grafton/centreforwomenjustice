import { API_BASE_URL } from '@/lib/env';
const API_URL = API_BASE_URL;

export interface AboutPageHero {
  title: string | null;
  subtitle: string | null;
  image: string | null;
}

export interface AboutPageMissionVision {
  title: string | null;
  body: string | null;
}

export interface AboutPageWhatWeDoItem {
  title: string;
  description: string;
}

export interface AboutPagePillar {
  number: string;
  title: string;
  description: string;
  icon?: string;
}

export interface AboutPageCoreValue {
  title: string;
  description: string;
  icon?: string;
}

export interface AboutPageApi {
  id: number;
  slug: string;
  hero: AboutPageHero;
  mission: AboutPageMissionVision;
  vision: AboutPageMissionVision;
  what_we_do: {
    title: string | null;
    subtitle: string | null;
    items: AboutPageWhatWeDoItem[];
  };
  pillars_heading: string | null;
  core_values_heading: string | null;
  pillars: AboutPagePillar[];
  core_values: AboutPageCoreValue[];
  cta: {
    heading: string | null;
    subtitle: string | null;
  };
}

export async function fetchAboutPage(slug: string): Promise<AboutPageApi | null> {
  const res = await fetch(`${API_URL}/api/v1/about-pages/${encodeURIComponent(slug)}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) return null;
  const json = await res.json();
  return json.data ?? json;
}
