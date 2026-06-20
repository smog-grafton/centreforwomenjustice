export type NewsItem = {
  id: string;
  title: string;
  slug: string;
  date: string;
  authorLabel: string;
  views: number;
  coverImage: string;
  excerpt: string;
};

export const newsItems: NewsItem[] = [
  {
    id: "1",
    title: "Opinion: Challenge abuse of women's rights in investment schemes",
    slug: "challenge-abuse-womens-rights",
    date: "24.02.2023",
    authorLabel: "CWJU Desk",
    views: 238,
    coverImage: "https://picsum.photos/seed/news-1/800/600",
    excerpt: "On the 8th of March, the world reminds itself of the strides made towards gender equality...",
  },
  {
    id: "2",
    title: "Gov't launches campaign to promote gender equality in household chores",
    slug: "govt-campaign-gender-equality",
    date: "11.04.2023",
    authorLabel: "CWJU Desk",
    views: 145,
    coverImage: "https://picsum.photos/seed/news-2/800/600",
    excerpt: "A new initiative aims to redistribute domestic labor more equitably across households...",
  },
  {
    id: "3",
    title: "Intimate Partner Violence: How To Spot The Early Warning Signs",
    slug: "ipv-warning-signs",
    date: "12.08.2023",
    authorLabel: "CWJU Desk",
    views: 122,
    coverImage: "https://picsum.photos/seed/news-3/800/600",
    excerpt: "Understanding the subtle indicators of control and aggression can save lives...",
  },
];
