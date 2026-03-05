export interface Program {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  description: string;
  icon: string;
  image: string;
  outcomes: string[];
}

export const programs: Program[] = [
  {
    id: '1',
    title: 'Legal Aid & Representation',
    slug: 'legal-aid-representation',
    excerpt: 'Providing free legal services to women and girls facing gender-based violence and injustice.',
    description: 'Our core program focuses on ensuring that every woman in Uganda has access to competent legal representation. we handle cases ranging from domestic violence to property rights disputes.',
    icon: 'Scale',
    image: 'https://picsum.photos/seed/justice/800/600',
    outcomes: ['Over 500 cases handled annually', '90% success rate in mediation', 'Free legal clinics in 5 districts'],
  },
  {
    id: '2',
    title: 'Advocacy & Policy Reform',
    slug: 'advocacy-policy-reform',
    excerpt: 'Challenging discriminatory laws and advocating for policies that protect women’s rights.',
    description: 'We work with stakeholders at local and national levels to influence legislative changes that promote gender equality and protect vulnerable populations.',
    icon: 'Megaphone',
    image: 'https://picsum.photos/seed/advocacy/800/600',
    outcomes: ['Influenced 3 key bills in parliament', 'Nationwide awareness campaigns', 'Strategic litigation on constitutional rights'],
  },
  {
    id: '3',
    title: 'Economic Empowerment',
    slug: 'economic-empowerment',
    excerpt: 'Equipping women with skills and resources to achieve financial independence.',
    description: 'Financial stability is a key component of justice. We provide vocational training and micro-grant support to survivors of violence to help them rebuild their lives.',
    icon: 'Briefcase',
    image: 'https://picsum.photos/seed/empower/800/600',
    outcomes: ['200+ women trained in business skills', 'Established 10 savings groups', 'Increased household income for participants'],
  },
];

export interface NewsPost {
  id: string;
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
}

/** @deprecated News is loaded from API (lib/news-api.ts). */
export const newsPosts: NewsPost[] = [];

export interface Resource {
  id: string;
  title: string;
  type: 'Report' | 'Guide' | 'Policy Brief';
  year: number;
  summary: string;
  tags: string[];
  image: string;
}

export const resources: Resource[] = [
  {
    id: '1',
    title: 'Annual Human Rights Report 2023',
    type: 'Report',
    year: 2023,
    summary: 'A comprehensive overview of the state of women’s rights in Uganda over the past year.',
    tags: ['Human Rights', 'Annual Report', 'Uganda'],
    image: 'https://picsum.photos/seed/report2023/800/600',
  },
  {
    id: '2',
    title: 'Survivor’s Guide to Legal Redress',
    type: 'Guide',
    year: 2024,
    summary: 'A step-by-step guide for survivors of gender-based violence on how to seek legal help.',
    tags: ['Legal Aid', 'GBV', 'Guide'],
    image: 'https://picsum.photos/seed/guide2024/800/600',
  },
];
