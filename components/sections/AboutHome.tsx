'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import { ArrowRight, Home, Scale, ShieldCheck, Users } from 'lucide-react';
import { Button } from '@/components/ui/Common';
import { fetchSiteSection, type SiteSectionApi, type SiteSectionItemApi } from '@/lib/site-sections-api';

const iconMap: Record<string, React.ElementType> = {
  scale: Scale,
  users: Users,
  'shield-check': ShieldCheck,
  shield: ShieldCheck,
  home: Home,
};

function metadataText(
  metadata: SiteSectionApi['metadata'] | SiteSectionItemApi['metadata'],
  key: string,
) {
  const value = metadata?.[key];
  return typeof value === 'string' ? value : '';
}

export function AboutHome() {
  const [section, setSection] = React.useState<SiteSectionApi | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetchSiteSection('about_home').then((data) => {
      setSection(data);
      setLoading(false);
    });
  }, []);

  if (!loading && !section) {
    return null;
  }

  const eyebrow = metadataText(section?.metadata ?? {}, 'eyebrow');
  const badgeText = metadataText(section?.metadata ?? {}, 'badge_text');
  const visionTitle = metadataText(section?.metadata ?? {}, 'vision_title');
  const visionBody = metadataText(section?.metadata ?? {}, 'vision_body');

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative h-[600px] md:h-[750px] rounded-3xl overflow-hidden shadow-2xl bg-slate-100">
              {section?.image ? (
                <Image
                  src={section.image}
                  alt={section.title ?? 'CWJU about section'}
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="absolute inset-0 bg-slate-100 animate-pulse" />
              )}
              {eyebrow && (
                <div className="absolute top-8 left-8 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20 shadow-lg z-20">
                  <span className="text-xs font-bold tracking-[0.2em] text-primary uppercase">{eyebrow}</span>
                </div>
              )}
              {badgeText && (
                <div className="absolute bottom-8 right-8 bg-slate-900/90 backdrop-blur-sm px-6 py-3 rounded-full border border-white/10 shadow-xl z-20">
                  <span className="text-xs font-bold tracking-[0.2em] text-white uppercase">{badgeText}</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-secondary/20 rounded-full blur-3xl -z-10" />
            <div className="absolute top-1/2 -left-12 w-24 h-24 border-2 border-primary/10 rounded-full -z-10" />
          </motion.div>

          <div className="lg:col-span-7 space-y-16">
            <div className="space-y-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h4 className="text-xs font-bold text-secondary uppercase tracking-[0.3em] mb-4">
                  {section?.subtitle ?? ''}
                </h4>
                {loading ? (
                  <div className="h-24 bg-slate-100 rounded-lg animate-pulse" />
                ) : (
                  <p className="text-2xl md:text-3xl font-serif font-medium text-slate-900 leading-tight">
                    {section?.description}
                  </p>
                )}
              </motion.div>

              {(visionTitle || visionBody) && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="pl-8 border-l-2 border-primary/20"
                >
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-[0.3em] mb-4">
                    {visionTitle}
                  </h4>
                  <p className="text-xl font-serif italic text-slate-600">&quot;{visionBody}&quot;</p>
                </motion.div>
              )}
            </div>

            <div className="relative space-y-12">
              <div className="absolute left-[27px] top-4 bottom-4 w-[1px] bg-gradient-to-b from-primary via-secondary to-transparent opacity-20 hidden sm:block" />

              {loading ? (
                <div className="space-y-8">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex gap-6">
                      <div className="w-14 h-14 rounded-full bg-slate-100 animate-pulse shrink-0" />
                      <div className="flex-1 space-y-2">
                        <div className="h-5 bg-slate-100 rounded w-3/4 animate-pulse" />
                        <div className="h-4 bg-slate-100 rounded w-full animate-pulse" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                section?.items.map((item, index) => {
                  const IconComponent = item.icon ? iconMap[item.icon] ?? Scale : Scale;
                  const number = item.value ?? String(index + 1).padStart(2, '0');

                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                      className="relative flex flex-col sm:flex-row gap-6 sm:items-start group"
                    >
                      <div className="relative z-10 flex-shrink-0">
                        <div className="w-14 h-14 rounded-full bg-white border border-slate-100 shadow-sm flex items-center justify-center transition-all duration-300 group-hover:border-primary/30 group-hover:shadow-md">
                          <IconComponent className="w-6 h-6 text-primary" />
                        </div>
                        <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-slate-900 flex items-center justify-center border-2 border-white">
                          <span className="text-[10px] font-bold text-white">{number}</span>
                        </div>
                      </div>
                      <div className="space-y-2 pt-1">
                        <h3 className="text-lg font-bold text-slate-900 group-hover:text-primary transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-slate-600 text-sm leading-relaxed max-w-xl">
                          {item.description}
                        </p>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>

            {section?.cta_text && section.cta_url && (
              <Link href={section.cta_url}>
                <Button variant="outline" size="lg" className="border-slate-200 hover:bg-slate-50">
                  {section.cta_text}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
