import type { Metadata } from 'next';
import ContactClient from './ContactClient';
import { fetchContactSettings } from '@/lib/settings-api';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with the Centre for Women Justice Uganda. Find our office locations, phone numbers, and email addresses.',
};

export default async function ContactPage() {
  const settings = await fetchContactSettings();

  return <ContactClient initialData={settings} />;
}
