import type { Metadata } from 'next';
import VolunteerClient from './VolunteerClient';
import { fetchVolunteerPage } from '@/lib/volunteer-api';

export const metadata: Metadata = {
  title: 'Volunteer',
  description:
    'Volunteer with the Centre for Women Justice Uganda and help bring justice to women and girls.',
};

export default async function VolunteerPage() {
  const data = await fetchVolunteerPage();
  return <VolunteerClient initialData={data} />;
}

