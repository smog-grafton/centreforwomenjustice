'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { NewsItem } from '@/data/news';
import { Eye, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

interface NewsCardProps {
  item: NewsItem;
}

export const NewsCard: React.FC<NewsCardProps> = ({ item }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group relative h-[500px] rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500"
    >
      <Link href={`/news/${item.slug}`} className="block h-full">
        {/* Background Image (only when cover is set) */}
        {item.coverImage ? (
          <>
            <Image
              src={item.coverImage}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
          </>
        ) : (
          <div className="absolute inset-0 bg-slate-300" />
        )}

        {/* Paper Content Panel */}
        <div className="absolute bottom-6 left-6 right-6 bg-white rounded-2xl p-6 shadow-2xl transform transition-transform duration-500 group-hover:-translate-y-2 bg-[url('/textures/grain.svg')] bg-repeat">
          {/* Subtle grain overlay */}
          <div className="absolute inset-0 bg-white/40 pointer-events-none rounded-2xl" />
          
          <div className="relative z-10">
            {/* Date Badge */}
            <div className="absolute -top-10 right-0 bg-primary text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lg">
              {item.date}
            </div>

            <div className="space-y-3">
              <div className="flex flex-col">
                <span className="font-handwriting text-primary text-sm italic mb-1">
                  {item.authorLabel}
                </span>
                <div className="w-12 h-0.5 bg-primary/20" />
              </div>

              <h3 className="text-xl font-bold text-slate-900 leading-tight line-clamp-3 group-hover:text-primary transition-colors">
                {item.title}
              </h3>

              <div className="pt-4 flex items-center justify-between border-t border-slate-100">
                <div className="flex items-center text-primary font-bold text-xs uppercase tracking-widest">
                  <span>MORE DETAILS</span>
                  <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
                
                <div className="flex items-center text-slate-400 text-xs font-medium">
                  <Eye className="mr-1.5 h-4 w-4" />
                  <span>{item.views} Views</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
