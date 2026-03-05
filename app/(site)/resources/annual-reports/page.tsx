import Link from 'next/link';
import ResourcesClient from '../ResourcesClient';

export const metadata = {
  title: 'Annual Reports',
  description: 'Annual impact reports and financial summaries from Centre for Women Justice Uganda.',
};

export default function AnnualReportsPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="container-custom pt-8 pb-4">
        <nav className="flex items-center space-x-2 text-sm font-medium text-slate-600">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
          <Link href="/resources" className="hover:text-primary transition-colors">Resources</Link>
            <span>/</span>
          <span className="text-secondary font-bold">Annual Reports</span>
                </nav>
              </div>
      <ResourcesClient
        category="annual-reports"
        title="Annual Reports"
        subtitle="Our yearly impact reports and financial summaries."
      />
    </div>
  );
}
