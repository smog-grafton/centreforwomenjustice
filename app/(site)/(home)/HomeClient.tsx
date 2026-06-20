'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import { CheckCircle2, Gavel, Scale, Users } from 'lucide-react';
import { Button } from '@/components/ui/Common';
import HeroSlider from '@/components/sections/HeroSlider';
import { fetchPartners, type PartnerApi } from '@/lib/partners-api';
import { fetchSiteSection, type SiteSectionApi } from '@/lib/site-sections-api';
import { CorePrograms } from '@/components/sections/CorePrograms';
import { HowWeSupportYou } from '@/components/sections/HowWeSupportYou';
import { AboutHome } from '@/components/sections/AboutHome';
import { VideoSpotlightSlider } from '@/components/sections/VideoSpotlightSlider';
import { SuccessStories } from '@/components/sections/SuccessStories';
import { LatestNews } from '@/components/sections/LatestNews';
import { ResourcesShowcase } from '@/components/sections/ResourcesShowcase';

const metricIconMap = {
  gavel: Gavel,
  users: Users,
  'check-circle': CheckCircle2,
  scale: Scale,
};

function metadataText(section: SiteSectionApi | null, key: string) {
  const value = section?.metadata?.[key];
  return typeof value === 'string' ? value : '';
}

function renderHighlightedTitle(title: string, highlight: string) {
  if (!highlight || !title.includes(highlight)) {
    return title;
  }

  const [before, after] = title.split(highlight);

  return (
    <>
      {before}
      <span className="text-secondary">{highlight}</span>
      {after}
    </>
  );
}

export default function HomePage() {
  const [partners, setPartners] = useState<PartnerApi[]>([]);
  const [impactMetrics, setImpactMetrics] = useState<SiteSectionApi | null>(null);
  const [partnersStrip, setPartnersStrip] = useState<SiteSectionApi | null>(null);
  const [finalCta, setFinalCta] = useState<SiteSectionApi | null>(null);

  useEffect(() => {
    fetchPartners().then(setPartners);
    fetchSiteSection('impact_metrics').then(setImpactMetrics);
    fetchSiteSection('partners_strip').then(setPartnersStrip);
    fetchSiteSection('home_final_cta').then(setFinalCta);
  }, []);

  return (
    <div className="flex flex-col w-full">
      {/* Hero Slider Section */}
      <HeroSlider />

      {/* About Us Section */}
      <AboutHome />

      {/* Impact Metrics */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {(impactMetrics?.items ?? []).map((stat, i) => {
              const IconComponent = stat.icon ? metricIconMap[stat.icon as keyof typeof metricIconMap] ?? Scale : Scale;
              const value = `${stat.prefix ?? ''}${stat.value ?? ''}${stat.suffix ?? ''}`;

              return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="text-center space-y-2 p-6 rounded-2xl hover:bg-slate-50 transition-colors"
              >
                <div className="inline-flex p-3 bg-primary/5 rounded-xl mb-4">
                  <IconComponent className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-4xl font-bold text-slate-900">{value}</h3>
                <p className="text-slate-500 font-medium">{stat.title}</p>
                {stat.description && (
                  <p className="text-xs text-slate-400 leading-relaxed">{stat.description}</p>
                )}
              </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Programs Grid */}
      <CorePrograms />
      
      {/* How We Support You Section */}
      <HowWeSupportYou />

      {/* Video Spotlight Section */}
      <VideoSpotlightSlider />

      {/* Latest News Redesigned */}
      <LatestNews />

      {/* Success Stories Section */}
      <SuccessStories />

      {/* Resources Showcase Section */}
      <ResourcesShowcase />

      {/* Partners Strip – horizontal slider only, no wrapping */}
      <section className="py-16 bg-slate-50 border-y border-slate-100 overflow-hidden">
        {partnersStrip?.title && (
          <p className="text-center text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-12">
            {partnersStrip.title}
          </p>
        )}
        <div className="relative w-full">
          <div
            className="scrollbar-hide flex flex-nowrap items-center justify-start gap-12 md:gap-24 overflow-x-auto overflow-y-hidden scroll-smooth pb-2 px-4 md:px-8 w-full min-w-0"
            style={{ flexWrap: 'nowrap' }}
          >
            {partners.map((partner) => (
              <div
                key={partner.id}
                className="relative w-32 h-12 md:w-40 md:h-16 shrink-0 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 flex items-center justify-center"
              >
                {partner.logo ? (
                  <Image
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    width={160}
                    height={64}
                    className="object-contain w-full h-full"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <span className="text-slate-400 font-semibold text-sm text-center">
                    {partner.name}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      {finalCta && (
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="bg-slate-900 rounded-[3rem] p-12 md:p-20 text-center space-y-8 relative overflow-hidden">
            <div className="relative z-10 space-y-6">
              <h2 className="text-4xl md:text-6xl font-serif font-bold text-white">
                {renderHighlightedTitle(finalCta.title ?? '', metadataText(finalCta, 'highlight_text'))}
              </h2>
              {finalCta.description && (
                <p className="text-xl text-white/70 max-w-2xl mx-auto">
                  {finalCta.description}
                </p>
              )}
              <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                {finalCta.cta_text && finalCta.cta_url && (
                  <Link href={finalCta.cta_url}>
                    <Button variant="secondary" size="lg" className="w-full sm:w-auto">{finalCta.cta_text}</Button>
                  </Link>
                )}
                {metadataText(finalCta, 'secondary_cta_text') && metadataText(finalCta, 'secondary_cta_url') && (
                  <Link href={metadataText(finalCta, 'secondary_cta_url')}>
                  <Button variant="outline" size="lg" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-slate-900">
                    {metadataText(finalCta, 'secondary_cta_text')}
                  </Button>
                </Link>
                )}
              </div>
            </div>
            <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/20 skew-x-12 translate-x-1/2" />
          </div>
        </div>
      </section>
      )}
    </div>
  );
}
