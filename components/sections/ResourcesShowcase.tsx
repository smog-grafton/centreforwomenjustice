'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import { ResourceCard } from '@/components/cards/ResourceCard';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';
import { fetchResources, toResourceItem, type ResourceCategory } from '@/lib/resources-api';

const categories: { id: ResourceCategory; label: string; path: string }[] = [
  { id: 'publications', label: 'Publications', path: '/resources/publications' },
  { id: 'newsletters', label: 'Newsletters', path: '/resources/newsletters' },
  { id: 'annual-reports', label: 'Annual Reports', path: '/resources/annual-reports' },
];

export const ResourcesShowcase: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<ResourceCategory>('publications');
  const [resources, setResources] = useState<ReturnType<typeof toResourceItem>[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchResources(1, 12, activeCategory).then((res) => {
      setResources(res.data.map(toResourceItem));
      setLoading(false);
    });
  }, [activeCategory]);

  const filteredResources = resources;

  return (
    <section className="py-24 bg-[#f0f0e8] relative overflow-hidden bg-[url('/textures/grain.svg')] bg-repeat">
      {/* Subtle grain overlay for the whole section */}
      <div className="absolute inset-0 bg-white/40 pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Heading + Categories */}
          <div className="lg:col-span-4 space-y-12">
            <div className="space-y-4">
              <p className="font-mono text-slate-500 text-sm font-bold uppercase tracking-widest">
                {'// Library of Information'}
              </p>
              <h2 className="text-5xl md:text-6xl font-bold font-serif text-slate-900 tracking-tight uppercase">
                Resources
              </h2>
            </div>

            <nav className="flex flex-col space-y-4">
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={cat.path}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveCategory(cat.id);
                  }}
                  className={cn(
                    "group flex items-center justify-between py-4 px-6 rounded-xl transition-all duration-300 text-left border-2",
                    activeCategory === cat.id
                      ? "bg-slate-900 border-slate-900 text-white shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]"
                      : "bg-transparent border-transparent text-slate-600 hover:border-slate-900 hover:text-slate-900 hover:shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]"
                  )}
                >
                  <span className="font-bold text-lg font-serif">{cat.label}</span>
                  {activeCategory === cat.id ? (
                    <ArrowLeft className="h-5 w-5 rotate-180" />
                  ) : (
                    <ChevronRight className="h-5 w-5 opacity-50 group-hover:opacity-100 transition-opacity" />
                  )}
                </Link>
              ))}
            </nav>

            {/* Slider Controls (Desktop) Removed */}
          </div>

          {/* Vertical Divider (Desktop) */}
          <div className="hidden lg:block lg:col-span-1 h-full flex justify-center">
            <div className="w-0.5 h-full bg-slate-900/10" />
          </div>

          {/* Right Column: Resource List */}
          <div className="lg:col-span-7 relative">
            <div className="flex flex-col space-y-6">
              {loading ? (
                <p className="text-slate-500">Loading resources…</p>
              ) : (
                <AnimatePresence mode="popLayout">
                  {filteredResources.map((resource) => (
                    <div key={resource.id} className="w-full">
                      <ResourceCard resource={resource} />
                    </div>
                  ))}
                </AnimatePresence>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
