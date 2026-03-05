export interface VideoSlide {
  id: string;
  title: string;
  subtitle: string;
  youtubeId: string;
  backgroundImage: string;
  thumbnailImage: string;
}

export const videoSlides: VideoSlide[] = [
  {
    id: '1',
    title: 'The importance of diversity in the women\'s movement in Uganda.',
    subtitle: 'The cornerstone of strong communities.',
    youtubeId: 'dQw4w9WgXcQ', // Placeholder
    backgroundImage: 'https://picsum.photos/seed/cwju1/1920/1080',
    thumbnailImage: 'https://picsum.photos/seed/cwju1-thumb/800/450',
  },
  {
    id: '2',
    title: 'Empowering domestic workers through collective action.',
    subtitle: 'Building a future where every worker is respected.',
    youtubeId: 'dQw4w9WgXcQ',
    backgroundImage: 'https://picsum.photos/seed/cwju2/1920/1080',
    thumbnailImage: 'https://picsum.photos/seed/cwju2-thumb/800/450',
  },
  {
    id: '3',
    title: 'Legal awareness and rights for the marginalized.',
    subtitle: 'Knowledge is the first step towards justice.',
    youtubeId: 'dQw4w9WgXcQ',
    backgroundImage: 'https://picsum.photos/seed/cwju3/1920/1080',
    thumbnailImage: 'https://picsum.photos/seed/cwju3-thumb/800/450',
  },
  {
    id: '4',
    title: 'Sustainable livelihoods for women in rural areas.',
    subtitle: 'Creating economic independence through skill-building.',
    youtubeId: 'dQw4w9WgXcQ',
    backgroundImage: 'https://picsum.photos/seed/cwju4/1920/1080',
    thumbnailImage: 'https://picsum.photos/seed/cwju4-thumb/800/450',
  },
];
