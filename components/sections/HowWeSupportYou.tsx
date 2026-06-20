'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2, FileSearch, Gavel, HeartHandshake, Home, PhoneCall, Scale, ShieldCheck, Users } from 'lucide-react';
import { Button, SectionHeading } from '@/components/ui/Common';
import { fetchSiteSection, type SiteSectionApi, type SiteSectionItemApi } from '@/lib/site-sections-api';

const iconMap: Record<string, React.ElementType> = {
  'phone-call': PhoneCall,
  'file-search': FileSearch,
  gavel: Gavel,
  'heart-handshake': HeartHandshake,
  users: Users,
  'check-circle': CheckCircle2,
  scale: Scale,
  'shield-check': ShieldCheck,
  home: Home,
};

const colorMap: Record<string, { icon: string; bg: string }> = {
  blue: { icon: 'text-blue-600', bg: 'bg-blue-50' },
  amber: { icon: 'text-amber-600', bg: 'bg-amber-50' },
  primary: { icon: 'text-primary', bg: 'bg-primary/5' },
  secondary: { icon: 'text-secondary', bg: 'bg-secondary/5' },
};

function metadataText(
  metadata: SiteSectionApi['metadata'] | SiteSectionItemApi['metadata'],
  key: string,
) {
  const value = metadata?.[key];
  return typeof value === 'string' ? value : '';
}

export function HowWeSupportYou() {
  const [section, setSection] = React.useState<SiteSectionApi | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetchSiteSection('how_we_support_you').then((data) => {
      setSection(data);
      setLoading(false);
    });
  }, []);

  if (!loading && !section) {
    return null;
  }

  const badgeText = metadataText(section?.metadata ?? {}, 'badge_text');
  const badgeSubtext = metadataText(section?.metadata ?? {}, 'badge_subtext');
  const secondaryCtaText = metadataText(section?.metadata ?? {}, 'secondary_cta_text');
  const secondaryCtaUrl = metadataText(section?.metadata ?? {}, 'secondary_cta_url');

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-slate-50 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl opacity-30" />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative h-[500px] md:h-[650px] rounded-[2rem] overflow-hidden shadow-2xl bg-slate-100">
              {section?.image ? (
                <Image
                  src={section.image}
                  alt={section.title ?? 'Supportive legal consultation'}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="absolute inset-0 bg-slate-100 animate-pulse" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

              {(badgeText || badgeSubtext) && (
                <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-xl">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <HeartHandshake className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      {badgeText && <p className="text-sm font-bold text-slate-900">{badgeText}</p>}
                      {badgeSubtext && <p className="text-xs text-slate-600">{badgeSubtext}</p>}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="absolute -top-6 -right-6 w-32 h-32 bg-secondary/10 rounded-full blur-2xl -z-10" />
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-primary/5 rounded-full blur-3xl -z-10" />
          </motion.div>

          <div className="space-y-12">
            {loading ? (
              <div className="space-y-3">
                <div className="h-10 w-3/4 bg-slate-100 rounded animate-pulse" />
                <div className="h-5 w-full bg-slate-100 rounded animate-pulse" />
                <div className="h-5 w-5/6 bg-slate-100 rounded animate-pulse" />
              </div>
            ) : (
              <SectionHeading title={section?.title ?? ''} subtitle={section?.subtitle ?? undefined} />
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {(loading ? [] : section?.items ?? []).map((step, index) => {
                const IconComponent = step.icon ? iconMap[step.icon] ?? HeartHandshake : HeartHandshake;
                const color = metadataText(step.metadata, 'color');
                const colorClasses = colorMap[color] ?? colorMap.primary;

                return (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group"
                  >
                    <div className="flex flex-col gap-4">
                      <div className={`w-14 h-14 rounded-2xl ${colorClasses.bg} flex items-center justify-center transition-all duration-300 group-hover:shadow-md group-hover:-translate-y-1`}>
                        <IconComponent className={`w-7 h-7 ${colorClasses.icon}`} />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                            {step.value ?? String(index + 1).padStart(2, '0')}
                          </span>
                          <h3 className="text-lg font-bold text-slate-900 group-hover:text-primary transition-colors">
                            {step.title}
                          </h3>
                        </div>
                        <p className="text-slate-600 text-sm leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center gap-4 pt-6 border-t border-slate-100"
            >
              {section?.cta_text && section.cta_url && (
                <Link href={section.cta_url}>
                  <Button size="lg" className="w-full sm:w-auto px-8 h-14 text-base shadow-lg shadow-primary/20">
                    {section.cta_text}
                  </Button>
                </Link>
              )}
              {secondaryCtaText && secondaryCtaUrl && (
                <Link href={secondaryCtaUrl}>
                  <Button variant="outline" size="lg" className="w-full sm:w-auto px-8 h-14 text-base border-slate-200 hover:bg-slate-50">
                    {secondaryCtaText} <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
