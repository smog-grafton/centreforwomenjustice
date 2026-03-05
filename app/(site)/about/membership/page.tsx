import type { Metadata } from 'next';
import MembershipClient from './MembershipClient';
import { fetchMembershipPage } from '@/lib/membership-api';

export const metadata: Metadata = {
  title: 'Membership',
  description:
    'Become a member of the Centre for Women Justice Uganda and join our network of advocates.',
};

export default async function MembershipPage() {
  const data = await fetchMembershipPage();
  return <MembershipClient initialData={data} />;
}
