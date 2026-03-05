'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Resource } from '@/data/resources';
import { motion } from 'motion/react';
import { ArrowRight, Download } from 'lucide-react';

interface ResourceCardProps {
  resource: Resource;
}

export const ResourceCard: React.FC<ResourceCardProps> = ({ resource }) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.95 }}
    transition={{ duration: 0.4 }}
    className="group flex flex-col sm:flex-row w-full bg-[#f4f4ec] rounded-xl overflow-hidden border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] hover:shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] hover:-translate-y-1 hover:-translate-x-1 transition-all duration-300 relative bg-[url('/textures/grain.svg')] bg-repeat"
  >
    {/* Detail link: cover + content only (no nested <a> for download) */}
    <Link href={resource.href} className="flex flex-col sm:flex-row w-full flex-grow min-w-0">
      {/* Cover Image */}
      <div className="relative w-full sm:w-1/3 md:w-2/5 aspect-video sm:aspect-auto border-b-2 sm:border-b-0 sm:border-r-2 border-slate-900 overflow-hidden bg-slate-200">
        {resource.coverImage ? (
          <Image
            src={resource.coverImage}
            alt={resource.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105 grayscale group-hover:grayscale-0 mix-blend-multiply"
            referrerPolicy="no-referrer"
          />
        ) : null}
        <div className="absolute inset-0 bg-[url('/textures/grain.svg')] bg-repeat opacity-40 mix-blend-overlay pointer-events-none" />
      </div>

      {/* Content Area */}
      <div className="p-6 sm:p-8 flex flex-col flex-grow relative min-w-0">
        <div className="absolute inset-0 bg-white/40 pointer-events-none" />
        <div className="relative z-10 flex flex-col h-full">
          <div className="flex justify-between items-start mb-4">
            <span className="bg-slate-900 text-white font-bold text-[10px] uppercase tracking-widest px-3 py-1 rounded-full">
              {resource.tag}
            </span>
            <span className="text-slate-500 font-mono text-xs font-bold">
              {resource.year || 'N/A'}
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 mb-3 line-clamp-2 leading-tight group-hover:text-primary transition-colors">
            {resource.title}
          </h3>
          <div className="mt-auto pt-6 flex items-center justify-between gap-2">
            <p className="text-xs text-slate-600 font-medium truncate font-mono">
              BY: <span className="text-slate-900 uppercase font-bold">{resource.author}</span>
            </p>
            {/* Spacer for the action button so layout matches when button is sibling below */}
            <span className="w-10 h-10 shrink-0" aria-hidden />
          </div>
        </div>
      </div>
    </Link>

    {/* Download / arrow as sibling to Link to avoid nested <a> */}
    <div className="absolute bottom-6 right-6 sm:right-8 z-20">
      {resource.downloadUrl ? (
        <a
          href={resource.downloadUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-full border-2 border-slate-900 flex items-center justify-center bg-[#f4f4ec] group-hover:bg-slate-900 group-hover:text-white transition-colors"
          title="Download"
        >
          <Download className="w-5 h-5" />
        </a>
      ) : (
        <div className="w-10 h-10 rounded-full border-2 border-slate-900 flex items-center justify-center bg-[#f4f4ec] group-hover:bg-slate-900 group-hover:text-white transition-colors pointer-events-none">
          <ArrowRight className="w-5 h-5" />
        </div>
      )}
    </div>
  </motion.div>
);
