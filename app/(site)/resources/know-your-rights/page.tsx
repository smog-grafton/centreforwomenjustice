import Link from 'next/link';
import ResourcesClient from '../ResourcesClient';

export const metadata = {
  title: 'Know Your Rights',
  description: 'Practical guides and handbooks for understanding your legal rights from CWJU.',
};

export default function KnowYourRightsPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="container-custom pt-8 pb-4">
        <nav className="flex items-center space-x-2 text-sm font-medium text-slate-600">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <Link href="/resources" className="hover:text-primary transition-colors">Resources</Link>
          <span>/</span>
          <span className="text-secondary font-bold">Know Your Rights</span>
        </nav>
      </div>
      <ResourcesClient
        category="know-your-rights"
        title="Know Your Rights"
        subtitle="Practical guides and handbooks for understanding your legal rights."
      />
    </div>
  );
}
