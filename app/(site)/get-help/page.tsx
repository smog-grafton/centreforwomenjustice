import type { Metadata } from 'next';
import GetHelpClient from './GetHelpClient';
import { fetchContactSettings } from '@/lib/settings-api';

export const metadata: Metadata = {
  title: 'Get Help',
  description: 'Confidential legal intake form for women and girls seeking justice and support.',
};

export default async function GetHelpPage() {
  const settings = await fetchContactSettings();
  return <GetHelpClient initialData={settings} />;
}
