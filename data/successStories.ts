export interface SuccessStory {
  id: string;
  caseNumber: string;
  quote: string;
  name: string;
  location: string;
  tagLine: string;
  heroImage: string;
  bubbleImage: string;
}

export const successStories: SuccessStory[] = [
  {
    id: '1',
    caseNumber: 'Case: 33724',
    quote: 'If CWJ-U was not there, I would have lost my land and my children\'s future. They stood by me when everyone else turned away.',
    name: 'Anna Okello',
    location: 'Karamoja District',
    tagLine: 'Celebrating Empowered Lives',
    heroImage: 'https://picsum.photos/seed/cwju1/800/800',
    bubbleImage: 'https://picsum.photos/seed/cwju2/400/400',
  },
  {
    id: '2',
    caseNumber: 'Case: 33743',
    quote: 'CWJ-U intercepted an attempt to deprive me of my late husband\'s estate. Today, my family lives in peace and security.',
    name: 'Jennifer Atieno',
    location: 'Kotido District',
    tagLine: 'Justice Restored',
    heroImage: 'https://picsum.photos/seed/cwju3/800/800',
    bubbleImage: 'https://picsum.photos/seed/cwju4/400/400',
  },
  {
    id: '3',
    caseNumber: 'Case: 33812',
    quote: 'Through their legal aid clinics, I learned my rights and found the courage to seek mediation. Our community is stronger now.',
    name: 'Sarah Musoke',
    location: 'Wakiso District',
    tagLine: 'Strength in Knowledge',
    heroImage: 'https://picsum.photos/seed/cwju5/800/800',
    bubbleImage: 'https://picsum.photos/seed/cwju6/400/400',
  }
];
