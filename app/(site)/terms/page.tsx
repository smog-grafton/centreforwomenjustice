import type { Metadata } from 'next';
import TermsClient from './TermsClient';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Read the terms of service for the Centre for Women Justice Uganda website.',
};

export default function TermsOfServicePage() {
  return <TermsClient />;
}
