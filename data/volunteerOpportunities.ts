export interface VolunteerOpportunity {
  id: string;
  title: string;
  category: string;
  description: string;
  requirements: string[];
  location: string;
  commitment: string;
}

export const volunteerOpportunities: VolunteerOpportunity[] = [
  {
    id: 'vol-1',
    title: 'Pro-Bono Legal Counsel',
    category: 'Legal Aid',
    description: 'Provide expert legal advice and representation to survivors of gender-based violence.',
    requirements: [
      'Qualified lawyer in Uganda',
      'Experience in family or criminal law',
      'Commitment to human rights'
    ],
    location: 'Kampala / Remote',
    commitment: '5-10 hours per month'
  },
  {
    id: 'vol-2',
    title: 'Community Outreach Advocate',
    category: 'Advocacy',
    description: 'Help organize and lead awareness workshops in rural communities about women’s rights.',
    requirements: [
      'Strong communication skills',
      'Fluency in local languages (Luganda, Acholi, etc.)',
      'Passion for community mobilization'
    ],
    location: 'Regional Districts',
    commitment: 'Flexible'
  },
  {
    id: 'vol-3',
    title: 'Research & Policy Assistant',
    category: 'Research',
    description: 'Assist our policy team in researching legislative gaps and drafting policy briefs.',
    requirements: [
      'Background in law, social sciences, or gender studies',
      'Strong writing and analytical skills',
      'Attention to detail'
    ],
    location: 'Remote',
    commitment: '10 hours per week'
  }
];
