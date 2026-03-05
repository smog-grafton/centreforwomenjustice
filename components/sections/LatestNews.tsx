'use client';

import React, { useEffect, useState } from 'react';
import { NewsCard } from '@/components/cards/NewsCard';
import { SectionHeading } from '@/components/ui/Common';
import { motion } from 'motion/react';
import { fetchNewsPage, toNewsCardItem } from '@/lib/news-api';
import type { NewsItem } from '@/data/news';

export const LatestNews: React.FC = () => {
  const [items, setItems] = useState<NewsItem[]>([]);

  useEffect(() => {
    fetchNewsPage(1, 6).then((res) => {
      setItems(res.data.map(toNewsCardItem));
    });
  }, []);

  return (
    <section className="py-24 bg-white relative overflow-hidden bg-[url('/textures/grain.svg')] bg-repeat">
      <div className="absolute inset-0 bg-white/70 pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-2"
          >
            <p className="font-handwriting text-primary text-xl italic">
              Stay Updated
            </p>
            <h2 className="text-5xl font-bold font-serif text-slate-900 tracking-tight">
              Latest News & Blog
            </h2>
            <div className="w-24 h-1 bg-primary/20 mx-auto mt-4 rounded-full" />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, index) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};
