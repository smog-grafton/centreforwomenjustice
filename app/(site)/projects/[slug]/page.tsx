import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Calendar, MapPin, Tag } from 'lucide-react';
import { fetchProjectBySlug, fetchProjectSlugs } from '@/lib/projects-api';

function statusLabel(status: string): string {
  const labels: Record<string, string> = {
    ongoing: 'Ongoing',
    completed: 'Completed',
    planned: 'Planned',
  };
  return labels[status] ?? status;
}

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await fetchProjectSlugs();
  return slugs.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await fetchProjectBySlug(slug);
  if (!project) return { title: 'Project' };
  return {
    title: project.title,
    description: project.summary ?? undefined,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = await fetchProjectBySlug(slug);
  if (!project) notFound();

  const hasHeroImage = !!project.featured_image;

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="relative pt-48 pb-24 bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          {hasHeroImage && (
            <Image
              src={project.featured_image!}
              alt={project.title}
              fill
              className="object-cover opacity-40"
              referrerPolicy="no-referrer"
              priority
            />
          )}
          <div className="absolute inset-0 bg-slate-900/70 mix-blend-multiply" />
        </div>
        <div className="container-custom relative z-10">
          <div className="mb-6 flex items-center space-x-2 text-sm font-medium text-white/80">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/about/projects" className="hover:text-white transition-colors">Projects</Link>
            <span>/</span>
            <span className="text-secondary">{project.title}</span>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <span className={`px-3 py-1 text-sm font-bold rounded-full ${
              project.status === 'ongoing' ? 'bg-secondary text-slate-900' : 'bg-white/20 text-white'
            }`}>
              {statusLabel(project.status)}
            </span>
            {project.topic && (
              <span className="inline-flex items-center text-sm text-white/90">
                <Tag className="w-4 h-4 mr-1" />
                {project.topic}
              </span>
            )}
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 max-w-4xl">{project.title}</h1>
          {project.summary && (
            <p className="text-xl text-white/90 max-w-3xl leading-relaxed">{project.summary}</p>
          )}
          <div className="mt-10">
            <Link
              href="/programs"
              className="inline-flex px-6 py-3 bg-white text-slate-900 rounded-full font-bold hover:bg-slate-100 transition-colors"
            >
              Get involved
            </Link>
          </div>
        </div>
      </section>

      {/* Overview + sidebar */}
      <section className="py-24 bg-slate-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              {project.body ? (
                <div className="prose prose-slate max-w-none prose-headings:font-serif">
                  {project.body.split(/\n\n+/).map((para, i) => (
                    <p key={i} className="text-slate-600 leading-relaxed mb-6">
                      {para.trim()}
                    </p>
                  ))}
                </div>
              ) : (
                <p className="text-slate-500">No detailed description yet.</p>
              )}
            </div>
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm sticky top-8 space-y-6">
                <h3 className="font-serif font-bold text-slate-900 text-lg">Key facts</h3>
                {project.status && (
                  <div>
                    <span className="text-xs font-medium text-slate-400 uppercase tracking-wide">Status</span>
                    <p className="text-slate-800 font-medium">{statusLabel(project.status)}</p>
                  </div>
                )}
                {project.year_range && (
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-medium text-slate-400 uppercase tracking-wide">Timeframe</span>
                      <p className="text-slate-800">{project.year_range}</p>
                    </div>
                  </div>
                )}
                {project.location && (
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-medium text-slate-400 uppercase tracking-wide">Location</span>
                      <p className="text-slate-800">{project.location}</p>
                    </div>
                  </div>
                )}
                {project.topic && (
                  <div className="flex items-start gap-3">
                    <Tag className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-medium text-slate-400 uppercase tracking-wide">Topic</span>
                      <p className="text-slate-800">{project.topic}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
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
