import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Target, Eye, Heart, Users, Shield, Scale, BookOpen } from 'lucide-react';
import { SectionHeading } from '@/components/ui/Common';
import { fetchAboutPage } from '@/lib/about-api';

export const metadata: Metadata = {
  title: 'Who We Are',
  description: 'Dedicated to advancing justice, human rights, and equality for all in Uganda.',
};

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  scale: Scale,
  users: Users,
  shield: Shield,
  home: Heart,
  heart: Heart,
  target: Target,
};

export default async function WhoWeArePage() {
  const data = await fetchAboutPage('who-we-are');

  if (!data) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <p className="text-slate-500">Content unavailable.</p>
      </div>
    );
  }

  const { hero, mission, vision, what_we_do, pillars_heading, core_values_heading, core_values, cta } = data;

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="relative pt-48 pb-24 bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          {hero.image ? (
            <Image
              src={hero.image}
              alt={hero.title || 'Who We Are'}
              fill
              className="object-cover opacity-30"
              priority
            />
          ) : null}
          <div className="absolute inset-0 bg-slate-900/70 mix-blend-multiply" />
        </div>
        <div className="container-custom relative z-10">
          <div className="mb-6 flex items-center space-x-2 text-sm font-medium text-white/60">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/about" className="hover:text-white transition-colors">About</Link>
            <span>/</span>
            <span className="text-secondary">Who We Are</span>
          </div>
          <SectionHeading
            title={hero.title || 'Who We Are'}
            subtitle={hero.subtitle || 'Dedicated to advancing justice, human rights, and equality for all.'}
            light
          />
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-slate-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white p-10 rounded-[2rem] shadow-sm border border-slate-100 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <Target className="w-32 h-32" />
              </div>
              <div className="relative z-10">
                <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                  <Target className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-3xl font-serif font-bold text-slate-900 mb-4">{mission.title || 'Our Mission'}</h2>
                <p className="text-lg text-slate-600 leading-relaxed">{mission.body || ''}</p>
              </div>
            </div>

            <div className="bg-slate-900 p-10 rounded-[2rem] shadow-sm relative overflow-hidden group text-white">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <Eye className="w-32 h-32" />
              </div>
              <div className="relative z-10">
                <div className="bg-white/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                  <Eye className="w-8 h-8 text-secondary" />
                </div>
                <h2 className="text-3xl font-serif font-bold mb-4">{vision.title || 'Our Vision'}</h2>
                <p className="text-lg text-white/80 leading-relaxed">{vision.body || ''}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do */}
      {what_we_do.items?.length ? (
        <section className="py-24">
          <div className="container-custom">
            <SectionHeading
              title={what_we_do.title || 'What We Do'}
              subtitle={what_we_do.subtitle || 'Our comprehensive approach to creating lasting systemic change.'}
              centered
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              {[Scale, Shield, BookOpen].slice(0, what_we_do.items.length).map((Icon, i) => (
                <div key={i} className="bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:shadow-md transition-all">
                  <div className="bg-white w-12 h-12 rounded-xl flex items-center justify-center shadow-sm mb-6 text-primary">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{what_we_do.items[i].title}</h3>
                  <p className="text-slate-600">{what_we_do.items[i].description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Core Values */}
      {core_values?.length ? (
        <section className="py-24 bg-slate-900 text-white">
          <div className="container-custom">
            <div className="max-w-3xl mb-16">
              <h2 className="text-sm font-bold tracking-widest text-secondary uppercase mb-4">{pillars_heading || 'Our Pillars'}</h2>
              <h3 className="text-4xl md:text-5xl font-serif font-bold">{core_values_heading || 'Core Values'}</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {core_values.map((value, i) => {
                const Icon = value.icon ? iconMap[value.icon] ?? Heart : Heart;
                return (
                  <div key={i} className="space-y-4">
                    <div className="text-secondary"><Icon className="w-8 h-8" /></div>
                    <h4 className="text-xl font-bold">{value.title}</h4>
                    <p className="text-white/70 text-sm leading-relaxed">{value.description}</p>
                    <div className="w-12 h-1 bg-white/10 rounded-full" />
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      ) : null}

      {/* CTA */}
      <section className="py-24 bg-primary text-white text-center">
        <div className="container-custom max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">{cta.heading || 'Join Us in the Fight for Justice'}</h2>
          <p className="text-xl text-white/80 mb-10">{cta.subtitle || 'Whether you need assistance or want to support our cause, we are here.'}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/get-help" className="w-full sm:w-auto px-8 py-4 bg-white text-primary rounded-full font-bold hover:bg-slate-50 transition-colors">
              Get help
            </Link>
            <Link href="/donate" className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-bold hover:bg-white/10 transition-colors">
              Support Our Work
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
