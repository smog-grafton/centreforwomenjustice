import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, MapPin, Tag } from 'lucide-react';
import { SectionHeading } from '@/components/ui/Common';
import { fetchProjects } from '@/lib/projects-api';

export const metadata: Metadata = {
  title: 'Our Projects',
  description: 'Explore our ongoing and past initiatives driving systemic change across Uganda.',
};

function statusLabel(status: string): string {
  const labels: Record<string, string> = {
    ongoing: 'Ongoing',
    completed: 'Completed',
    planned: 'Planned',
  };
  return labels[status] ?? status;
}

export default async function ProjectsPage() {
  const projects = await fetchProjects();
  const heroProject = projects[0];
  const heroImage = heroProject?.featured_image ?? null;

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section - background from latest project featured image */}
      <section className="relative pt-48 pb-24 bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          {heroImage && (
            <Image
              src={heroImage}
              alt="Projects Background"
              fill
              className="object-cover opacity-30"
              referrerPolicy="no-referrer"
              priority
            />
          )}
          <div className="absolute inset-0 bg-slate-900/70 mix-blend-multiply" />
        </div>
        <div className="container-custom relative z-10">
          <div className="mb-6 flex items-center space-x-2 text-sm font-medium text-white/60">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/about" className="hover:text-white transition-colors">About</Link>
            <span>/</span>
            <span className="text-secondary">Projects</span>
          </div>
          <SectionHeading
            title="Our Projects"
            subtitle="Explore our ongoing and past initiatives driving systemic change across Uganda."
            light
          />
        </div>
      </section>

      {/* Filters & Grid */}
      <section className="py-24 bg-slate-50">
        <div className="container-custom">
          <div className="flex flex-wrap gap-4 mb-12">
            <select className="px-4 py-2 rounded-full border border-slate-200 bg-white text-sm font-medium text-slate-700 outline-none focus:ring-2 focus:ring-primary/20" aria-label="Filter by topic">
              <option>All Topics</option>
            </select>
            <select className="px-4 py-2 rounded-full border border-slate-200 bg-white text-sm font-medium text-slate-700 outline-none focus:ring-2 focus:ring-primary/20" aria-label="Filter by year">
              <option>All Years</option>
            </select>
            <select className="px-4 py-2 rounded-full border border-slate-200 bg-white text-sm font-medium text-slate-700 outline-none focus:ring-2 focus:ring-primary/20" aria-label="Filter by status">
              <option>All Statuses</option>
              <option>Ongoing</option>
              <option>Completed</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.length === 0 ? (
              <p className="col-span-full text-center text-slate-500 py-12">No projects yet.</p>
            ) : (
              projects.map((project) => (
                <Link
                  key={project.id}
                  href={`/projects/${project.slug}`}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 group hover:shadow-md transition-all flex flex-col"
                >
                  <div className="relative h-48 overflow-hidden">
                    {project.featured_image ? (
                      <Image
                        src={project.featured_image}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-full h-full bg-slate-200" />
                    )}
                    <div className="absolute top-4 right-4">
                      <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                        project.status === 'ongoing' ? 'bg-secondary text-slate-900' : 'bg-slate-900 text-white'
                      }`}>
                        {statusLabel(project.status)}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex-grow flex flex-col">
                    {project.topic && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="inline-flex items-center text-xs font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                          <Tag className="w-3 h-3 mr-1" />
                          {project.topic}
                        </span>
                      </div>
                    )}
                    <h3 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2">{project.title}</h3>
                    <p className="text-slate-600 text-sm mb-6 flex-grow line-clamp-3">{project.summary ?? ''}</p>
                    <div className="space-y-2 pt-4 border-t border-slate-100">
                      {project.year_range && (
                        <div className="flex items-center text-sm text-slate-500">
                          <Calendar className="w-4 h-4 mr-2 text-slate-400 shrink-0" />
                          {project.year_range}
                        </div>
                      )}
                      {project.location && (
                        <div className="flex items-center text-sm text-slate-500">
                          <MapPin className="w-4 h-4 mr-2 text-slate-400 shrink-0" />
                          {project.location}
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary text-white text-center">
        <div className="container-custom max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Get Involved</h2>
          <p className="text-xl text-white/80 mb-10">Discover how you can contribute to our ongoing programs or volunteer your time.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/programs" className="w-full sm:w-auto px-8 py-4 bg-white text-primary rounded-full font-bold hover:bg-slate-50 transition-colors">
              Explore Programs
            </Link>
            <Link href="/volunteer" className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-bold hover:bg-white/10 transition-colors">
              Volunteer With Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
