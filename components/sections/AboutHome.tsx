'use client';

import * as React from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { Scale, Users, ShieldCheck, Home } from 'lucide-react';
import { SectionHeading } from '@/components/ui/Common';
import { fetchAboutPage, type AboutPagePillar } from '@/lib/about-api';

const iconMap: Record<string, React.ElementType> = {
  scale: Scale,
  users: Users,
  shield: ShieldCheck,
  home: Home,
};

export function AboutHome() {
  const [mission, setMission] = React.useState<string>('');
  const [vision, setVision] = React.useState<string>('');
  const [pillars, setPillars] = React.useState<AboutPagePillar[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetchAboutPage('who-we-are').then((data) => {
      if (data) {
        setMission(data.mission.body ?? '');
        setVision(data.vision.body ?? '');
        setPillars(data.pillars ?? []);
      }
      setLoading(false);
    });
  }, []);

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">

          {/* Left Column: Image Panel (lg:col-span-5) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative h-[600px] md:h-[750px] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/assets/images/home/about/founder.jpeg"
                alt="Women's Rights Advocacy in Uganda"
                fill
                className="object-cover"
              />
              <div className="absolute top-8 left-8 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20 shadow-lg z-20">
                <span className="text-xs font-bold tracking-[0.2em] text-primary uppercase">About CWJ-U</span>
              </div>
              <div className="absolute bottom-8 right-8 bg-slate-900/90 backdrop-blur-sm px-6 py-3 rounded-full border border-white/10 shadow-xl z-20">
                <span className="text-xs font-bold tracking-[0.2em] text-white uppercase">Founded 2011</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-secondary/20 rounded-full blur-3xl -z-10" />
            <div className="absolute top-1/2 -left-12 w-24 h-24 border-2 border-primary/10 rounded-full -z-10" />
          </motion.div>

          {/* Right Column: Content + Pillar Rail (lg:col-span-7) */}
          <div className="lg:col-span-7 space-y-16">

            {/* Mission & Vision Blocks */}
            <div className="space-y-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h4 className="text-xs font-bold text-secondary uppercase tracking-[0.3em] mb-4">Our Mission</h4>
                {loading ? (
                  <div className="h-24 bg-slate-100 rounded-lg animate-pulse" />
                ) : (
                  <p className="text-2xl md:text-3xl font-serif font-medium text-slate-900 leading-tight">
                    {mission || 'To provide holistic legal aid and advocacy services that empower women and girls in Uganda to claim their rights, access justice, and live lives free from violence.'}
                  </p>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="pl-8 border-l-2 border-primary/20"
              >
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-[0.3em] mb-4">Our Vision</h4>
                {loading ? (
                  <div className="h-16 bg-slate-100 rounded-lg animate-pulse" />
                ) : (
                  <p className="text-xl font-serif italic text-slate-600">
                    &quot;{vision || 'A society where every woman and girl in Uganda enjoys full access to justice and equality under the law.'}&quot;
                  </p>
                )}
              </motion.div>
            </div>

            {/* Pillar Rail */}
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
              ) : pillars.length > 0 ? (
                pillars.map((pillar, index) => {
                  const IconComponent = pillar.icon ? iconMap[pillar.icon] ?? Scale : Scale;
                  return (
                    <motion.div
                      key={pillar.number}
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
                          <span className="text-[10px] font-bold text-white">{pillar.number}</span>
                        </div>
                      </div>
                      <div className="space-y-2 pt-1">
                        <h3 className="text-lg font-bold text-slate-900 group-hover:text-primary transition-colors">
                          {pillar.title}
                        </h3>
                        <p className="text-slate-600 text-sm leading-relaxed max-w-xl">
                          {pillar.description}
                        </p>
                      </div>
                    </motion.div>
                  );
                })
              ) : (
                /* Fallback if no pillars from API */
                [Scale, Users, ShieldCheck, Home].map((Icon, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    className="relative flex flex-col sm:flex-row gap-6 sm:items-start group"
                  >
                    <div className="relative z-10 flex-shrink-0">
                      <div className="w-14 h-14 rounded-full bg-white border border-slate-100 shadow-sm flex items-center justify-center">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-slate-900 flex items-center justify-center border-2 border-white">
                        <span className="text-[10px] font-bold text-white">{String(index + 1).padStart(2, '0')}</span>
                      </div>
                    </div>
                    <div className="space-y-2 pt-1">
                      <h3 className="text-lg font-bold text-slate-900">Pillar {index + 1}</h3>
                      <p className="text-slate-600 text-sm leading-relaxed">Content from About → Who We Are in the admin.</p>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
