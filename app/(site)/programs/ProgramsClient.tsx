'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowRight, Search, Scale, Megaphone, Briefcase, Heart, Shield, Users } from 'lucide-react';
import { SectionHeading, Button } from '@/components/ui/Common';
import { cn } from '@/lib/utils';
import * as React from 'react';

import { API_BASE_URL } from '@/lib/env';
const API_URL = API_BASE_URL;

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Scale,
  Megaphone,
  Briefcase,
  Heart,
  Shield,
  Users,
};

interface Program {
  id: number;
  title: string;
  slug: string;
  description: string;
  image: string | null;
  icon: string;
  outcomes: string[];
  category?: { id: number; name: string; slug: string } | null;
}

interface ProgramCategory {
  id: number;
  name: string;
  slug: string;
}

const defaultHero = {
  hero_title: 'Our Programs',
  hero_subtitle: 'Empowering women and girls through comprehensive legal, social, and economic interventions.',
  hero_image_url: null as string | null,
};

export default function ProgramsPage() {
  const [programs, setPrograms] = React.useState<Program[]>([]);
  const [categories, setCategories] = React.useState<ProgramCategory[]>([]);
  const [hero, setHero] = React.useState(defaultHero);
  const [loading, setLoading] = React.useState(true);
  const [selectedCategorySlug, setSelectedCategorySlug] = React.useState<string | null>('all-programs');
  const [search, setSearch] = React.useState('');

  React.useEffect(() => {
    let cancelled = false;

    Promise.all([
      fetch(`${API_URL}/api/v1/programs`).then((r) => (r.ok ? r.json() : { data: [] })),
      fetch(`${API_URL}/api/v1/program-categories`).then((r) => (r.ok ? r.json() : { data: [] })),
      fetch(`${API_URL}/api/v1/pages/programs`).then((r) => (r.ok ? r.json() : null)),
    ])
      .then(([programsRes, categoriesRes, pageRes]) => {
        if (cancelled) return;

        const list = Array.isArray(programsRes.data) ? programsRes.data : programsRes.data?.data ?? [];
        setPrograms(list.map((p: Record<string, unknown>) => ({
          id: p.id as number,
          title: p.title as string,
          slug: p.slug as string,
          description: (p.description ?? p.body ?? '') as string,
          image: (p.image ?? p.hero_image ?? null) as string | null,
          icon: (p.icon ?? 'Scale') as string,
          outcomes: Array.isArray(p.outcomes) ? (p.outcomes as string[]) : [],
          category: p.category as Program['category'],
        })));

        const catList = Array.isArray(categoriesRes.data) ? categoriesRes.data : categoriesRes.data?.data ?? [];
        setCategories(catList);

        const meta = pageRes?.meta ?? {};
        setHero({
          hero_title: meta.hero_title ?? defaultHero.hero_title,
          hero_subtitle: meta.hero_subtitle ?? defaultHero.hero_subtitle,
          hero_image_url: meta.hero_image_url ?? meta.hero_image ? `${API_URL}/uploads/${meta.hero_image}` : null,
        });
      })
      .catch(() => { if (!cancelled) setPrograms([]); })
      .finally(() => { if (!cancelled) setLoading(false); });

    return () => { cancelled = true; };
  }, []);

  const filteredPrograms = React.useMemo(() => {
    return programs.filter((p) => {
      const matchCategory = !selectedCategorySlug || selectedCategorySlug === 'all-programs' || p.category?.slug === selectedCategorySlug;
      const matchSearch = !search.trim() || p.title.toLowerCase().includes(search.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [programs, selectedCategorySlug, search]);

  const ProgramIcon = (iconKey: string) => iconMap[iconKey] ?? Scale;

  if (loading && programs.length === 0) {
    return (
      <div className="bg-white min-h-screen">
        <section className="relative pt-48 pb-24 bg-slate-900 text-white overflow-hidden">
          <div className="container-custom relative z-10">
            <div className="h-16 w-96 bg-white/20 rounded animate-pulse" />
            <div className="h-6 w-3/4 mt-4 bg-white/20 rounded animate-pulse" />
          </div>
        </section>
        <section className="py-24">
          <div className="container-custom space-y-12">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-96 bg-slate-100 rounded-2xl animate-pulse" />
            ))}
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="relative pt-48 pb-24 bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={hero.hero_image_url || 'https://picsum.photos/seed/programs-hero/1920/1080'}
            alt="Programs Background"
            fill
            className="object-cover opacity-30"
            referrerPolicy="no-referrer"
            unoptimized={!!hero.hero_image_url}
          />
          <div className="absolute inset-0 bg-slate-900/70 mix-blend-multiply" />
        </div>
        <div className="container-custom relative z-10">
          <SectionHeading
            title={hero.hero_title}
            subtitle={hero.hero_subtitle}
            light
          />
        </div>
      </section>

      {/* Filter & Search */}
      <section className="py-8 bg-slate-50 border-b border-slate-200 sticky top-20 z-30">
        <div className="container-custom flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex items-center space-x-4 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto no-scrollbar">
            {categories.map((cat) => (
              <Button
                key={cat.id}
                variant={selectedCategorySlug === cat.slug ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setSelectedCategorySlug(cat.slug)}
              >
                {cat.name}
              </Button>
            ))}
          </div>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search programs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm"
            />
          </div>
        </div>
      </section>

      {/* Programs List */}
      <section className="py-24">
        <div className="container-custom space-y-24">
          {filteredPrograms.map((program, i) => {
            const Icon = ProgramIcon(program.icon);
            return (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className={cn(
                  'flex flex-col lg:items-center gap-12',
                  i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                )}
              >
                <div className="flex-1 relative h-[400px] md:h-[500px] rounded-[2rem] overflow-hidden shadow-2xl">
                  <Image
                    src={program.image || 'https://picsum.photos/seed/program/800/600'}
                    alt={program.title}
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                    unoptimized={program.image?.startsWith('http') && !program.image.includes('picsum')}
                  />
                </div>
                <div className="flex-1 space-y-8">
                  <div className="inline-flex p-4 bg-primary/5 rounded-2xl">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <h2 className="text-4xl font-serif font-bold text-slate-900">{program.title}</h2>
                  <p className="text-lg text-slate-600 leading-relaxed">{program.description}</p>

                  {program.outcomes.length > 0 && (
                    <div className="space-y-4">
                      <h4 className="font-bold text-slate-900 uppercase tracking-wider text-sm">Key Outcomes</h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {program.outcomes.map((outcome, j) => (
                          <li key={j} className="flex items-start space-x-3 text-sm text-slate-600">
                            <div className="mt-1 h-2 w-2 rounded-full bg-secondary flex-shrink-0" />
                            <span>{outcome}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="pt-4">
                    <Link href={`/programs/${program.slug}`}>
                      <Button size="lg">View Program Details</Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
