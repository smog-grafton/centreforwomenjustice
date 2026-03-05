export interface Campaign {
  id: string;
  title: string;
  slug: string;
  goalAmount: number;
  raisedAmount: number;
  currency: string;
  coverImage: string;
  shortDescription: string;
  fullDescription: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'completed';
  impactBullets: string[];
}

export const campaigns: Campaign[] = [
  {
    id: 'camp-1',
    title: 'Legal Aid for GBV Survivors',
    slug: 'legal-aid-gbv-survivors',
    goalAmount: 50000,
    raisedAmount: 32500,
    currency: 'USD',
    coverImage: 'https://picsum.photos/seed/camp1/1200/800',
    shortDescription: 'Providing essential legal representation to women surviving domestic and sexual violence.',
    fullDescription: 'This campaign aims to fund our core legal aid services for the next six months. Every dollar goes directly to court fees, lawyer stipends, and transportation for survivors to attend hearings. We believe that justice should not be a luxury.',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    status: 'active',
    impactBullets: [
      'Covers legal fees for 100+ survivors',
      'Provides 24/7 emergency legal counseling',
      'Supports strategic litigation for policy change'
    ]
  },
  {
    id: 'camp-2',
    title: 'Rural Women Property Rights',
    slug: 'rural-women-property-rights',
    goalAmount: 30000,
    raisedAmount: 12000,
    currency: 'USD',
    coverImage: 'https://picsum.photos/seed/camp2/1200/800',
    shortDescription: 'Securing land and inheritance rights for widows and vulnerable women in rural Uganda.',
    fullDescription: 'In many rural communities, women are often evicted from their homes after the death of a spouse. This campaign funds community mediation and legal education to protect women’s property rights.',
    startDate: '2024-03-01',
    endDate: '2024-09-30',
    status: 'active',
    impactBullets: [
      'Mediates 50+ land disputes',
      'Trains 20 community paralegals',
      'Secures land titles for 30 households'
    ]
  }
];
