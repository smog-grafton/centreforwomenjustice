import type { Metadata } from 'next';
import AboutClient from './AboutClient';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about our mission, vision, and the team behind CWJU.',
};

export default function AboutPage() {
  return <AboutClient />;
}
