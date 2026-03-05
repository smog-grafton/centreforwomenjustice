'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, Scale, Megaphone, Briefcase, Heart, Shield, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

// Icon mapping for Lucide icons
const iconMap = {
  Scale,
  Megaphone,
  Briefcase,
  Heart,
  Shield,
  Users,
};

export interface ProgramCardProps {
  title: string;
  slug: string;
  excerpt: string;
  iconKey: string;
  image: string;
  themeAccent?: string;
  index: number;
}

export function ProgramCard({ title, slug, excerpt, iconKey, image, themeAccent = 'bg-primary', index }: ProgramCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const Icon = iconMap[iconKey as keyof typeof iconMap] || Scale;

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: shouldReduceMotion ? 0 : 12 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.21, 0.47, 0.32, 0.98] as const,
        delay: index * 0.1,
      }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="h-full"
    >
      <Link
        href={`/programs/${slug}`}
        className="group relative flex flex-col h-full bg-white border border-slate-200 hover:border-primary/30 transition-all duration-500 overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      >
        {/* Editorial Accent Bar */}
        <div 
          className={cn(
            "absolute left-0 top-0 bottom-0 w-1 z-20 transition-all duration-500 group-hover:w-1.5",
            themeAccent
          )} 
        />

        {/* Featured Image Section */}
        <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        <div className="p-6 md:p-7 flex flex-col flex-grow relative">
          {/* Icon Section - Floating slightly over image */}
          <div className="absolute -top-7 right-6 z-10">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-md text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
              <Icon className="w-6 h-6 stroke-[1.5]" />
            </div>
          </div>

          {/* Content Section */}
          <div className="space-y-3 flex-grow">
            <h3 className="text-xl font-serif font-bold text-slate-900 group-hover:text-primary transition-colors duration-300 leading-tight">
              {title}
            </h3>
            <p className="text-slate-600 leading-relaxed text-sm line-clamp-3">
              {excerpt}
            </p>
          </div>

          {/* Footer Section */}
          <div className="mt-6 pt-5 border-t border-slate-50 flex items-center justify-between mt-auto">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 group-hover:text-primary transition-colors duration-300">
              Explore Program
            </span>
            <div className="flex items-center justify-center w-7 h-7 rounded-full border border-slate-200 group-hover:border-primary group-hover:bg-primary transition-all duration-500">
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-all duration-500 transform group-hover:translate-x-0.5" />
            </div>
          </div>
        </div>

        {/* Subtle Background Pattern (barely visible) */}
        <div className="absolute -right-4 -bottom-4 opacity-[0.02] pointer-events-none group-hover:opacity-[0.05] transition-opacity duration-700">
          <Icon className="w-32 h-32" />
        </div>
      </Link>
    </motion.div>
  );
}
