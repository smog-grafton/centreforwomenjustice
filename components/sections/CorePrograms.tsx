'use client';

import * as React from 'react';
import { motion } from 'motion/react';
import { SectionHeading } from '@/components/ui/Common';
import { ProgramCard } from '@/components/cards/ProgramCard';

import { API_BASE_URL } from '@/lib/env';
const API_URL = API_BASE_URL;

/** Section title & subtitle are editable in Laravel Admin: Programs → "Edit Programs page & home section". */

interface Program {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  image: string | null;
  icon: string;
}

interface ProgramsPageMeta {
  home_section_title?: string;
  home_section_subtitle?: string;
}

export function CorePrograms() {
  const [programs, setPrograms] = React.useState<Program[]>([]);
  const [sectionHeading, setSectionHeading] = React.useState<{ title: string; subtitle: string }>({
    title: 'Our Core Programs',
    subtitle: 'We take a holistic approach to justice, addressing the legal, social, and economic barriers women face.',
  });
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let cancelled = false;

    Promise.all([
      fetch(`${API_URL}/api/v1/programs`).then((r) => (r.ok ? r.json() : { data: [] })),
      fetch(`${API_URL}/api/v1/pages/programs`).then((r) => (r.ok ? r.json() : null)),
    ])
      .then(([programsRes, pageRes]) => {
        if (cancelled) return;
        const list = Array.isArray(programsRes.data) ? programsRes.data : programsRes.data?.data ?? [];
        setPrograms(list.map((p: { id: number; title: string; slug: string; excerpt?: string; summary?: string; image?: string | null; hero_image?: string | null; icon?: string }) => ({
          id: p.id,
          title: p.title,
          slug: p.slug,
          excerpt: p.excerpt ?? p.summary ?? '',
          image: p.image ?? p.hero_image ?? null,
          icon: p.icon ?? 'Scale',
        })));

        const meta: ProgramsPageMeta = pageRes?.meta ?? {};
        if (meta.home_section_title || meta.home_section_subtitle) {
          setSectionHeading({
            title: meta.home_section_title ?? 'Our Core Programs',
            subtitle: meta.home_section_subtitle ?? 'We take a holistic approach to justice, addressing the legal, social, and economic barriers women face.',
          });
        }
      })
      .catch(() => { if (!cancelled) setPrograms([]); })
      .finally(() => { if (!cancelled) setLoading(false); });

    return () => { cancelled = true; };
  }, []);

  if (loading && programs.length === 0) {
    return (
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="container-custom relative z-10">
          <div className="h-12 w-64 bg-slate-200 rounded animate-pulse mx-auto mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-80 bg-slate-200 rounded-2xl animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-secondary/5 skew-x-12 -translate-x-1/2 pointer-events-none" />

      <div className="container-custom relative z-10">
        <SectionHeading
          title={sectionHeading.title}
          subtitle={sectionHeading.subtitle}
          centered
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {programs.map((program, i) => (
            <ProgramCard
              key={program.id}
              index={i}
              title={program.title}
              slug={program.slug}
              excerpt={program.excerpt}
              iconKey={program.icon}
              image={program.image || 'https://picsum.photos/seed/program/800/600'}
              themeAccent={i % 2 === 0 ? 'bg-primary' : 'bg-secondary'}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
