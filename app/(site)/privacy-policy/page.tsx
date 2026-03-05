import type { Metadata } from 'next';
import PrivacyPolicyClient from './PrivacyPolicyClient';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Read the privacy policy of the Centre for Women Justice Uganda to understand how we handle your data.',
};

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyClient />;
}
