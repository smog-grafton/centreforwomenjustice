import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Quote, ArrowRight } from 'lucide-react';
import { SectionHeading, Button } from '@/components/ui/Common';
import { fetchSuccessStories } from '@/lib/success-stories-api';

export const metadata: Metadata = {
  title: 'Success Stories',
  description: 'Read the inspiring stories of women and girls who have found justice and empowerment through our programs.',
};

export default async function SuccessStoriesPage() {
  const stories = await fetchSuccessStories();
  const [featured, ...rest] = stories;

  return (
    <div className="bg-[#f4f4ec] min-h-screen relative">
      {/* Grain Texture Overlay */}
      <div 
        className="fixed inset-0 z-0 opacity-[0.03] pointer-events-none mix-blend-multiply"
        style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}
      ></div>

      {/* Hero Section */}
      <section className="relative pt-48 pb-24 bg-slate-900 text-white overflow-hidden z-10">
        <div className="absolute inset-0 z-0">
          {featured?.hero_image_url && (
            <Image
              src={featured.hero_image_url}
              alt="Success Stories Background"
              fill
              className="object-cover opacity-30"
              referrerPolicy="no-referrer"
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
            <span className="text-secondary">Success Stories</span>
          </div>
          <SectionHeading
            title="Success Stories"
            subtitle="Real impact, real lives changed. Read how our work is making a difference across Uganda."
            light
          />
        </div>
      </section>

      {/* Featured Story */}
      <section className="py-24 z-10 relative">
        <div className="container-custom">
          {featured ? (
            <div className="bg-white rounded-[2rem] overflow-hidden shadow-xl border border-slate-200 flex flex-col lg:flex-row">
              <div className="lg:w-1/2 relative min-h-[400px]">
                {featured.hero_image_url ? (
                  <Image
                    src={featured.hero_image_url}
                    alt={featured.name}
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-full h-full bg-slate-200" />
                )}
                <div className="absolute top-6 left-6 bg-secondary text-slate-900 px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider">
                  Featured Impact
                </div>
              </div>
              <div className="lg:w-1/2 p-12 lg:p-16 flex flex-col justify-center bg-[#fdfdfc]">
                <Quote className="w-12 h-12 text-primary/20 mb-6" />
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-6 leading-tight">
                  {featured.tag_line ?? featured.name}
                </h2>
                {featured.quote && (
                  <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                    {featured.quote}
                  </p>
                )}
                <div className="flex items-center justify-between mt-auto pt-8 border-t border-slate-200">
                  <div>
                    <p className="font-bold text-slate-900">{featured.name}</p>
                    {featured.location && (
                      <p className="text-sm text-slate-500">{featured.location}</p>
                    )}
                  </div>
                  <Link href={`/success-stories/${featured.slug}`} className="inline-flex">
                    <Button variant="outline" className="rounded-full">
                      Read Full Story
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-center text-slate-500">No success stories yet. Add some in the admin.</p>
          )}
        </div>
      </section>

      {/* Story Grid */}
      <section className="py-24 bg-white z-10 relative">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-serif font-bold text-slate-900">More Stories of Change</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {rest.map((story) => (
              <Link
                key={story.id}
                href={`/success-stories/${story.slug}`}
                className="group cursor-pointer"
              >
                <div className="relative h-64 rounded-2xl overflow-hidden mb-6">
                  {story.hero_image_url ? (
                    <Image
                      src={story.hero_image_url}
                      alt={story.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-200" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                  <div className="absolute bottom-6 left-6 right-6">
                    {story.tag_line && (
                      <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md text-white text-xs font-bold rounded-full mb-3 border border-white/30">
                        {story.tag_line}
                      </span>
                    )}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-primary transition-colors line-clamp-2">
                  {story.name}
                </h3>
                {story.quote && (
                  <p className="text-slate-600 mb-4 line-clamp-3 leading-relaxed">
                    {story.quote}
                  </p>
                )}
                <div className="flex items-center text-sm font-medium text-primary">
                  Read Story <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <Button variant="outline" size="lg" className="rounded-full border-slate-300 text-slate-700 hover:bg-slate-50">
              Load More Stories
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-slate-900 text-white text-center z-10 relative">
        <div className="container-custom max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Help Us Write the Next Success Story</h2>
          <p className="text-xl text-white/80 mb-10">Your support enables us to continue fighting for justice and empowering communities.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/donate" className="w-full sm:w-auto px-8 py-4 bg-secondary text-slate-900 rounded-full font-bold hover:bg-white transition-colors">
              Donate Now
            </Link>
            <Link href="/volunteer" className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-white/20 text-white rounded-full font-bold hover:bg-white/10 transition-colors">
              Become a Volunteer
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
