import type { Metadata } from 'next';
import ProgramsClient from './ProgramsClient';

export const metadata: Metadata = {
  title: 'Our Programs',
  description: 'Discover our core programs focused on legal aid, advocacy, and community empowerment for women and girls in Uganda.',
};

export default async function ProgramsPage() {
  // Simulate data fetching delay to demonstrate the skeleton loading
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return <ProgramsClient />;
}
