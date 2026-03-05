import Link from 'next/link';
import ResourcesClient from '../ResourcesClient';

export const metadata = {
  title: 'Newsletters',
  description: 'Quarterly updates and community voices from Centre for Women Justice Uganda.',
};

export default function NewslettersPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="container-custom pt-8 pb-4">
        <nav className="flex items-center space-x-2 text-sm font-medium text-slate-600">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <Link href="/resources" className="hover:text-primary transition-colors">Resources</Link>
          <span>/</span>
          <span className="text-secondary font-bold">Newsletters</span>
        </nav>
      </div>
      <ResourcesClient
        category="newsletters"
        title="Newsletters"
        subtitle="Quarterly updates and community voices from the field."
      />
    </div>
  );
}
