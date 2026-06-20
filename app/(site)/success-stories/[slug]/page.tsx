import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, MapPin, Quote } from 'lucide-react';
import { fetchSuccessStoryBySlug, fetchSuccessStorySlugs } from '@/lib/success-stories-api';
import { Button, SectionHeading } from '@/components/ui/Common';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await fetchSuccessStorySlugs();
  return slugs.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const story = await fetchSuccessStoryBySlug(slug);
  if (!story) {
    return { title: 'Success Story' };
  }

  return {
    title: story.seo?.meta_title ?? story.tag_line ?? story.name,
    description: story.seo?.meta_description ?? story.quote ?? undefined,
  };
}

export default async function SuccessStoryDetailPage({ params }: Props) {
  const { slug } = await params;
  const story = await fetchSuccessStoryBySlug(slug);

  if (!story) {
    // Let Next.js handle not-found routing
    return null;
  }

  const heroImage = story.hero_image_url;

  return (
    <main className="bg-[#f4f4ec] min-h-screen">
      {/* Hero */}
      <section className="relative pt-40 pb-20 bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          {heroImage && (
            <Image
              src={heroImage}
              alt={story.name}
              fill
              className="object-cover opacity-40"
              referrerPolicy="no-referrer"
            />
          )}
          <div className="absolute inset-0 bg-slate-900/70 mix-blend-multiply" />
        </div>
        <div className="container-custom relative z-10">
          <div className="mb-6 flex items-center space-x-2 text-sm font-medium text-white/70">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/about" className="hover:text-white transition-colors">
              About
            </Link>
            <span>/</span>
            <Link href="/about/success-stories" className="hover:text-white transition-colors">
              Success Stories
            </Link>
            <span>/</span>
            <span className="text-secondary">{story.name}</span>
          </div>

          <SectionHeading
            title={story.tag_line ?? story.name}
            subtitle={story.location ?? 'Real stories of justice and empowerment.'}
            light
          />
        </div>
      </section>

      {/* Body */}
      <section className="py-24">
        <div className="container-custom grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main narrative */}
          <article className="lg:col-span-2 space-y-8">
            {story.quote && (
              <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-slate-100 relative">
                <Quote className="w-10 h-10 text-primary/20 mb-4" />
                <p className="text-lg md:text-xl text-slate-800 leading-relaxed italic">
                  “{story.quote}”
                </p>
              </div>
            )}

            <div className="space-y-6 text-slate-700 leading-relaxed">
              {story.tag_line && (
                <p>
                  <strong>{story.tag_line}.</strong>{' '}
                  This story highlights the impact of legal support and community empowerment
                  provided by CWJU.
                </p>
              )}
              <p>
                Every success story represents a person, family, or community whose rights have
                been defended. Through strategic litigation, legal aid, and advocacy, CWJU helps
                transform experiences of injustice into pathways toward dignity and safety.
              </p>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="space-y-8">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-4">
              <h3 className="font-serif text-xl font-bold text-slate-900">Story details</h3>
              {story.case_number && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Case number
                  </p>
                  <p className="text-slate-800 font-medium">{story.case_number}</p>
                </div>
              )}
              {story.location && (
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-slate-400 mt-1" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Location
                    </p>
                    <p className="text-slate-800">{story.location}</p>
                  </div>
                </div>
              )}
              {story.published_at && (
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-slate-400 mt-1" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Published
                    </p>
                    <p className="text-slate-800">
                      {new Date(story.published_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              )}
              {story.program && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Related program
                  </p>
                  <Link
                    href={`/programs/${story.program.slug}`}
                    className="text-primary font-medium hover:underline"
                  >
                    {story.program.title}
                  </Link>
                </div>
              )}
            </div>

            {story.bubble_image_url && (
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col items-center gap-4">
                <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-slate-100 shadow-lg">
                  <Image
                    src={story.bubble_image_url}
                    alt={story.name}
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <p className="text-sm text-slate-600 text-center">
                  Each case is unique. Our team walks with survivors and communities from the first
                  consultation to the final judgement and beyond.
                </p>
              </div>
            )}
          </aside>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-slate-900 text-white text-center">
        <div className="container-custom max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            Help Us Write the Next Success Story
          </h2>
          <p className="text-xl text-white/80 mb-10">
            Your support enables us to continue fighting for justice and empowering communities.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/donate" className="w-full sm:w-auto">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                Donate Now
              </Button>
            </Link>
            <Link href="/volunteer" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-slate-900"
              >
                Become a Volunteer
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

