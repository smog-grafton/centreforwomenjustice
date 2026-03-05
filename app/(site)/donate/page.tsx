import type { Metadata } from 'next';
import { fetchDonatePage, fetchCampaigns } from '@/lib/donate-api';
import DonateClient from './DonateClient';

export const metadata: Metadata = {
  title: 'Donate',
  description: 'Support our mission to provide free legal aid and advocacy for women and girls in Uganda. Make a donation today.',
};

export default async function DonatePage() {
  const [initialData, campaigns] = await Promise.all([
    fetchDonatePage(),
    fetchCampaigns(),
  ]);
  return <DonateClient initialData={initialData} campaigns={campaigns} />;
}
