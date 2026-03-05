'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShieldCheck, ArrowRight, Globe, CheckCircle2 } from 'lucide-react';
import { SectionHeading, Button } from '@/components/ui/Common';
import { CampaignCard } from '@/components/donate/CampaignCard';
import type { DonatePageData, CampaignApi, PaymentGatewayApi } from '@/lib/donate-api';

const defaultHero = {
  pill_text: 'Every Dollar Makes a Difference',
  title: 'Support the Fight for Justice.',
  highlight_text: 'Justice',
  body: 'Your donations fund legal aid, community advocacy, and empowerment programs for women and girls across Uganda.',
  primary_cta_label: 'Donate Now',
  primary_cta_url: '/donate/checkout',
  secondary_cta_label: 'Explore Campaigns',
  secondary_cta_url: '#campaigns',
  background_image_url: null as string | null,
  foreground_image_url: null as string | null,
};

const defaultTransparency = {
  title: 'Our Commitment to Transparency',
  body: 'We believe in full accountability to our donors and the communities we serve. 90% of all donations go directly to program implementation.',
  bullets: [
    'Annual audited financial reports',
    'Quarterly impact updates for donors',
    'Direct oversight by a professional board',
    'Zero-tolerance policy for corruption',
  ],
  cta_label: 'View Financial Reports',
  cta_url: '/resources',
  image_url: null as string | null,
};

const defaultOtherWays = {
  title: 'Other Ways to Give',
  subtitle: 'We are also listed on several international donation platforms for your convenience.',
};

interface DonateClientProps {
  initialData: DonatePageData | null;
  campaigns: CampaignApi[];
}

export default function DonateClient({ initialData, campaigns }: DonateClientProps) {
  const hero = initialData?.hero ?? defaultHero;
  const transparency = initialData?.transparency ?? defaultTransparency;
  const otherWays = initialData?.other_ways ?? defaultOtherWays;
  const paymentGateways: PaymentGatewayApi[] = initialData?.payment_gateways ?? [];
  const externalGateways = paymentGateways.filter((pg) => pg.type === 'external');

  const heroBg = hero.background_image_url || 'https://picsum.photos/seed/donate-hero-bg/1920/1080';
  const heroFg = hero.foreground_image_url || 'https://picsum.photos/seed/donate-hero-page/1200/1000';
  const transparencyImg = transparency.image_url || 'https://picsum.photos/seed/transparency/1000/800';

  // API or Filament may send bullets as array or comma-separated string
  const transparencyBullets: string[] = Array.isArray(transparency.bullets)
    ? transparency.bullets
    : typeof transparency.bullets === 'string'
      ? transparency.bullets.split(',').map((s: string) => s.trim()).filter(Boolean)
      : defaultTransparency.bullets;

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="relative pt-48 pb-24 bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={heroBg}
            alt="Donate Background"
            fill
            className="object-cover opacity-30"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-slate-900/70 mix-blend-multiply" />
        </div>
        <div className="container-custom relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            {hero.pill_text && (
              <div className="inline-flex items-center space-x-2 bg-secondary/20 text-secondary px-4 py-2 rounded-full text-sm font-bold">
                <Heart className="h-4 w-4 fill-current" />
                <span>{hero.pill_text}</span>
              </div>
            )}
            <h1 className="text-5xl md:text-7xl font-serif font-bold leading-tight">
              {hero.title && hero.highlight_text
                ? (() => {
                    const parts = hero.title.split(hero.highlight_text);
                    if (parts.length < 2) return hero.title;
                    return (
                      <>
                        {parts[0]}
                        <span className="text-secondary italic">{hero.highlight_text}</span>
                        {parts[1]}
                      </>
                    );
                  })()
                : hero.title ?? 'Support the Fight for Justice.'}
            </h1>
            {hero.body && (
              <p className="text-xl text-white/70 max-w-xl leading-relaxed">{hero.body}</p>
            )}
            <div className="flex flex-col sm:flex-row gap-4">
              {hero.primary_cta_label && hero.primary_cta_url && (
                <Link href={hero.primary_cta_url}>
                  <Button size="lg" className="w-full sm:w-auto bg-secondary hover:bg-secondary/90 text-white">
                    {hero.primary_cta_label}
                  </Button>
                </Link>
              )}
              {hero.secondary_cta_label && hero.secondary_cta_url && (
                <Link href={hero.secondary_cta_url}>
                  <Button variant="outline" size="lg" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-slate-900">
                    {hero.secondary_cta_label}
                  </Button>
                </Link>
              )}
            </div>
          </div>
          <div className="relative h-[500px] rounded-[3rem] overflow-hidden shadow-2xl hidden lg:block">
            <Image
              src={heroFg}
              alt="Donation Impact"
              fill
              className="object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/10 -skew-x-12 translate-x-1/4" />
      </section>

      {/* Trust Bar */}
      <section className="py-12 bg-slate-50 border-b border-slate-100">
        <div className="container-custom flex flex-wrap justify-center items-center gap-8 md:gap-16">
          <div className="flex items-center space-x-3 text-slate-500 font-bold uppercase tracking-widest text-xs">
            <ShieldCheck className="h-5 w-5 text-primary" />
            <span>100% Secure Payments</span>
          </div>
          <div className="flex items-center space-x-3 text-slate-500 font-bold uppercase tracking-widest text-xs">
            <Globe className="h-5 w-5 text-primary" />
            <span>Global Tax-Deductible Options</span>
          </div>
          <div className="flex items-center space-x-3 text-slate-500 font-bold uppercase tracking-widest text-xs">
            <Heart className="h-5 w-5 text-primary" />
            <span>Direct Impact in Uganda</span>
          </div>
        </div>
      </section>

      {/* Active Campaigns */}
      <section id="campaigns" className="py-24">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <SectionHeading
              title="Active Campaigns"
              subtitle="Choose a specific cause to support or make a general donation to our core mission."
            />
            <Link href="/donate/checkout">
              <Button variant="ghost" className="group">
                Make a General Donation <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {campaigns.map((campaign) => (
              <CampaignCard key={campaign.id} campaign={campaign} />
            ))}
          </div>
        </div>
      </section>

      {/* Other Ways to Give */}
      <section className="py-24 bg-slate-50">
        <div className="container-custom">
          <SectionHeading
            title={otherWays.title ?? 'Other Ways to Give'}
            subtitle={otherWays.subtitle ?? 'We are also listed on several international donation platforms for your convenience.'}
            centered
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {externalGateways.length > 0
              ? externalGateways.map((ext) => (
                  <div key={ext.id} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all text-center space-y-4">
                    <div className="bg-slate-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Globe className="h-8 w-8 text-primary" />
                    </div>
                    <h4 className="text-xl font-bold text-slate-900">{ext.name}</h4>
                    <p className="text-sm text-slate-600">{ext.description ?? ''}</p>
                    {ext.url && (
                      <a
                        href={ext.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-primary font-bold hover:underline pt-4"
                      >
                        Visit {ext.name} <ArrowRight className="ml-2 h-4 w-4" />
                      </a>
                    )}
                  </div>
                ))
              : null}
          </div>
        </div>
      </section>

      {/* Transparency Section */}
      <section className="py-24">
        <div className="container-custom bg-slate-900 rounded-[3rem] p-12 md:p-20 text-white grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            {transparency.title && (
              <h2 className="text-4xl font-serif font-bold">
                {transparency.title.includes('Transparency') ? (
                  (() => {
                    const parts = transparency.title.split('Transparency');
                    return (
                      <>
                        {parts[0]}
                        <span className="text-secondary">Transparency</span>
                        {parts[1] ?? ''}
                      </>
                    );
                  })()
                ) : (
                  transparency.title
                )}
              </h2>
            )}
            {transparency.body && (
              <p className="text-lg text-white/70 leading-relaxed">{transparency.body}</p>
            )}
            {transparencyBullets.length > 0 && (
              <div className="space-y-4">
                {transparencyBullets.map((item, i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <CheckCircle2 className="h-5 w-5 text-secondary" />
                    <span className="text-sm font-medium">{item}</span>
                  </div>
                ))}
              </div>
            )}
            {transparency.cta_label && transparency.cta_url && (
              <Link href={transparency.cta_url}>
                <Button variant="outline" className="border-white/20 text-white hover:bg-white hover:text-slate-900">
                  {transparency.cta_label}
                </Button>
              </Link>
            )}
          </div>
          <div className="relative h-[400px] rounded-3xl overflow-hidden">
            <Image
              src={transparencyImg}
              alt="Transparency"
              fill
              className="object-cover opacity-60"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
