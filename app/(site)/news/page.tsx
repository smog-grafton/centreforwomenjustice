import type { Metadata } from 'next';
import NewsClient from './NewsClient';

export const metadata: Metadata = {
  title: 'Latest News & Updates',
  description: 'Stay updated with the latest news, events, and impact stories from Centre for Women Justice Uganda.',
};

export default function NewsPage() {
  return <NewsClient />;
}
