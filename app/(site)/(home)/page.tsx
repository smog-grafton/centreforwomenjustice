import type { Metadata } from 'next';
import HomeClient from './HomeClient';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Promoting access to justice for women and girls in Uganda through legal aid, advocacy, and empowerment.',
};

export default async function HomePage() {
  // Simulate data fetching delay to demonstrate the skeleton loading
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return <HomeClient />;
}
