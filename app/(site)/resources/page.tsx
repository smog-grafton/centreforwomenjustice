import type { Metadata } from 'next';
import ResourcesClient from './ResourcesClient';

export const metadata: Metadata = {
  title: 'Resources',
  description: 'Access legal guides, publications, annual reports, and newsletters from the Centre for Women Justice Uganda.',
};

export default function ResourcesPage() {
  return <ResourcesClient />;
}
