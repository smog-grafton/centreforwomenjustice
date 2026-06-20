'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import React from 'react';
import {
  Users,
  Heart,
  CheckCircle2,
  ArrowRight,
  Briefcase,
  Globe,
  ShieldCheck,
  MessageSquare,
} from 'lucide-react';
import { SectionHeading, Button } from '@/components/ui/Common';
import { OpportunityCard } from '@/components/volunteer/OpportunityCard';
import type { VolunteerPageData } from '@/lib/volunteer-api';

interface VolunteerClientProps {
  initialData: VolunteerPageData | null;
}

export default function VolunteerPage({ initialData }: VolunteerClientProps) {
  const hero = initialData?.hero ?? {
    pill_text: 'Join a Community of Change-Makers',
    title: 'Your Skills Can Change Lives.',
    highlight_text: 'Change Lives',
    body:
      'Whether you are a legal professional, a student, or a passionate advocate, there is a place for you at CWJU. Help us bring justice to women and girls in Uganda.',
    primary_cta_label: 'Apply to Volunteer',
    primary_cta_url: '/volunteer/apply',
    secondary_cta_label: 'View Opportunities',
    secondary_cta_url: '#opportunities',
    background_image_url: null,
    foreground_image_url: null,
  };

  const why = initialData?.why ?? {
    title: 'Why Volunteer with Us?',
    subtitle:
      'Volunteering at CWJU is more than just giving your time; it is about building a more just society.',
    image_url: null,
    items: [
      {
        title: 'Professional Growth',
        description:
          'Gain hands-on experience in human rights law, advocacy, and community development.',
        icon_key: 'briefcase',
      },
      {
        title: 'Meaningful Impact',
        description:
          'Directly contribute to the safety and empowerment of vulnerable women and girls.',
        icon_key: 'heart',
      },
      {
        title: 'Networking',
        description:
          'Connect with a network of legal professionals and human rights activists.',
        icon_key: 'globe',
      },
    ],
  };

  const opportunitiesIntro = initialData?.opportunities_intro ?? {
    title: 'Current Opportunities',
    subtitle: 'We are looking for dedicated individuals to support our mission in the following areas.',
  };

  const opportunities = initialData?.opportunities ?? [];
  const testimonials = initialData?.testimonials ?? [];
  const [activeTestimonial, setActiveTestimonial] = React.useState(0);
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="relative pt-48 pb-24 bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          {hero.background_image_url && (
            <Image
              src={hero.background_image_url}
              alt="Volunteer Background"
              fill
              className="object-cover opacity-30"
              referrerPolicy="no-referrer"
            />
          )}
          <div className="absolute inset-0 bg-slate-900/70 mix-blend-multiply" />
        </div>
        <div className="container-custom relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center space-x-2 bg-white/10 text-white/90 px-4 py-2 rounded-full text-sm font-bold backdrop-blur-sm">
              <Users className="h-4 w-4" />
              <span>{hero.pill_text ?? 'Join a Community of Change-Makers'}</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-serif font-bold leading-tight">
              {hero.title ? (
                <>
                  {hero.title.replace(hero.highlight_text ?? '', '').trim()}{' '}
                  {hero.highlight_text && (
                    <span className="text-secondary italic">{hero.highlight_text}</span>
                  )}
                </>
              ) : (
                <>
                  Your Skills Can <span className="text-secondary italic">Change Lives</span>.
                </>
              )}
            </h1>
            <p className="text-xl text-white/70 max-w-xl leading-relaxed">
              {hero.body ??
                'Whether you are a legal professional, a student, or a passionate advocate, there is a place for you at CWJU. Help us bring justice to women and girls in Uganda.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href={hero.primary_cta_url ?? '/volunteer/apply'}>
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-secondary hover:bg-secondary/90 text-white"
                >
                  {hero.primary_cta_label ?? 'Apply to Volunteer'}
                </Button>
              </Link>
              <Link href={hero.secondary_cta_url ?? '#opportunities'}>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto border-white/20 text-white hover:bg-white hover:text-primary"
                >
                  {hero.secondary_cta_label ?? 'View Opportunities'}
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative h-[500px] rounded-[3rem] overflow-hidden shadow-2xl hidden lg:block">
            {hero.foreground_image_url && (
              <Image
                src={hero.foreground_image_url}
                alt="Volunteers in action"
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            )}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/20 to-transparent" />
      </section>

      {/* Why Volunteer */}
      <section className="py-24 bg-slate-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative h-[500px] rounded-[3rem] overflow-hidden shadow-xl">
              {why.image_url && (
                <Image
                  src={why.image_url}
                  alt="Impact of volunteering"
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              )}
            </div>
            <div className="space-y-8">
              <SectionHeading
                title={why.title ?? 'Why Volunteer with Us?'}
                subtitle={
                  why.subtitle ??
                  'Volunteering at CWJU is more than just giving your time; it is about building a more just society.'
                }
              />
              <div className="space-y-6">
                {why.items.map((item, i) => {
                  const iconKey = item.icon_key ?? '';
                  const IconComp =
                    iconKey === 'heart' ? Heart : iconKey === 'globe' ? Globe : Briefcase;
                  return (
                  <div key={i} className="flex items-start space-x-4 p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
                    <div className="bg-primary/5 p-3 rounded-xl">
                      <IconComp className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1">{item.title}</h4>
                      <p className="text-sm text-slate-500 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );})}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Opportunities Grid */}
      <section id="opportunities" className="py-24">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <SectionHeading
              title={opportunitiesIntro.title ?? 'Current Opportunities'}
              subtitle={
                opportunitiesIntro.subtitle ??
                'We are looking for dedicated individuals to support our mission in the following areas.'
              }
              centered
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {opportunities.map((opp) => (
              <OpportunityCard
                key={opp.id}
                opportunity={{
                  id: String(opp.id),
                  title: opp.title,
                  category: opp.category ?? '',
                  description: opp.description ?? '',
                  requirements: opp.requirements ?? [],
                  location: opp.location ?? '',
                  commitment: opp.commitment ?? '',
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="bg-secondary/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-8">
              <MessageSquare className="h-8 w-8 text-secondary" />
            </div>
            {testimonials.length > 0 ? (
              <>
                <motion.div
                  key={testimonials[activeTestimonial]?.id ?? 'single'}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <h2 className="text-3xl md:text-5xl font-serif italic leading-tight">
                    &quot;{testimonials[activeTestimonial].quote}&quot;
                  </h2>
                  <div className="space-y-1 mt-6">
                    <p className="font-bold text-xl text-secondary">
                      {testimonials[activeTestimonial].name}
                    </p>
                    {testimonials[activeTestimonial].role && (
                      <p className="text-sm text-white/50 uppercase tracking-widest font-bold">
                        {testimonials[activeTestimonial].role}
                      </p>
                    )}
                  </div>
                </motion.div>
                {testimonials.length > 1 && (
                  <div className="flex justify-center mt-10 space-x-3">
                    {testimonials.map((t, index) => (
                      <button
                        key={t.id}
                        aria-label={`Show testimonial ${index + 1}`}
                        onClick={() => setActiveTestimonial(index)}
                        className={`w-3 h-3 rounded-full border border-white/40 transition-all ${
                          activeTestimonial === index ? 'bg-secondary border-secondary' : 'bg-transparent'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </>
            ) : (
              <h2 className="text-3xl md:text-5xl font-serif italic leading-tight">
                &quot;Volunteering with CWJU opened my eyes to the power of legal advocacy. Seeing a woman regain her
                dignity and property rights is a feeling I will never forget.&quot;
              </h2>
            )}
          </div>
        </div>
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl translate-y-1/2 translate-x-1/2" />
      </section>

      {/* Final CTA */}
      <section className="py-24">
        <div className="container-custom text-center space-y-8">
          <SectionHeading
            title="Ready to Make a Difference?"
            subtitle="Start your application today and join our mission to promote justice for women in Uganda."
            centered
          />
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <Link href="/volunteer/apply">
              <Button size="lg" className="px-12">Apply Now</Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg" className="px-12">Ask a Question</Button>
            </Link>
          </div>
          <div className="flex justify-center items-center space-x-8 pt-8 opacity-50">
            <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-slate-400">
              <ShieldCheck className="h-4 w-4" />
              <span>Secure Application</span>
            </div>
            <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-slate-400">
              <CheckCircle2 className="h-4 w-4" />
              <span>Verified NGO</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
