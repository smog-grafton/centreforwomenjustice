'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import { useSearchParams } from 'next/navigation';
import { FileText, Download, Search } from 'lucide-react';
import { SectionHeading, Button } from '@/components/ui/Common';
import {
  fetchResources,
  toResourceItem,
  type ResourceItemApi,
} from '@/lib/resources-api';

const CATEGORY_META: Record<string, { title: string; subtitle: string }> = {
  publications: {
    title: 'Publications & Research',
    subtitle: "In-depth analysis, policy briefs, and research reports driving evidence-based advocacy.",
  },
  newsletters: {
    title: 'Newsletters',
    subtitle: 'Quarterly updates and community voices from the field.',
  },
  'annual-reports': {
    title: 'Annual Reports',
    subtitle: 'Our yearly impact reports and financial summaries.',
  },
  'know-your-rights': {
    title: 'Know Your Rights',
    subtitle: 'Practical guides and handbooks for understanding your legal rights.',
  },
};

const DEFAULT_META = {
  title: 'Resources & Publications',
  subtitle: "Access our latest research, policy briefs, and practical guides for women's rights advocates.",
};

export default function ResourcesClient({
  category: categoryProp,
  title: titleProp,
  subtitle: subtitleProp,
}: {
  category?: string;
  title?: string;
  subtitle?: string;
} = {}) {
  const searchParams = useSearchParams();
  const categoryFromQuery = searchParams.get('category');
  const category = categoryProp ?? categoryFromQuery ?? undefined;

  const [items, setItems] = useState<ResourceItemApi[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const meta = category && CATEGORY_META[category]
    ? CATEGORY_META[category]
    : DEFAULT_META;
  const title = titleProp ?? meta.title;
  const subtitle = subtitleProp ?? meta.subtitle;

  useEffect(() => {
    setLoading(true);
    fetchResources(currentPage, 12, category).then((res) => {
      setItems(res.data);
      setTotalPages(res.meta?.last_page ?? 1);
      setLoading(false);
    });
  }, [currentPage, category]);

  return (
    <div className="bg-white min-h-screen">
      <section className="relative pt-48 pb-24 bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-slate-800" />
          <div className="absolute inset-0 bg-slate-900/70 mix-blend-multiply" />
        </div>
        <div className="container-custom relative z-10">
          <SectionHeading
            title={title}
            subtitle={subtitle}
            centered
            light
          />
          <div className="mt-12 bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row gap-4 text-slate-900">
            <div className="flex-grow relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search resources by title or keyword..."
                className="w-full pl-12 pr-4 py-3 rounded-xl border-none focus:ring-2 focus:ring-primary/20 outline-none"
              />
            </div>
            <div className="flex gap-2">
              <Link href="/resources/publications">
                <Button variant="outline" size="sm">Publications</Button>
              </Link>
              <Link href="/resources/know-your-rights">
                <Button variant="outline" size="sm">Know Your Rights</Button>
              </Link>
              <Link href="/resources/newsletters">
                <Button variant="outline" size="sm">Newsletters</Button>
              </Link>
              <Link href="/resources/annual-reports">
                <Button variant="outline" size="sm">Annual Reports</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              <div className="col-span-full text-slate-500">Loading resources…</div>
            ) : (
              items.map((resource, i) => {
                const item = toResourceItem(resource);
                return (
                  <motion.div
                    key={resource.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="group bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden"
                  >
                    <div className="relative h-48 w-full bg-slate-200">
                      {item.coverImage ? (
                        <Image
                          src={item.coverImage}
                          alt={resource.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          referrerPolicy="no-referrer"
                        />
                      ) : null}
                    </div>
                    <div className="p-8 flex flex-col flex-grow">
                      <div className="bg-slate-50 w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors">
                        <FileText className="h-6 w-6 text-slate-400 group-hover:text-primary" />
                      </div>
                      <div className="flex-grow space-y-4">
                        <div className="flex justify-between items-start">
                          <span className="text-xs font-bold text-secondary uppercase tracking-wider">{resource.category}</span>
                          {resource.year && <span className="text-xs font-medium text-slate-400">{resource.year}</span>}
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary transition-colors">{resource.title}</h3>
                        {resource.summary && (
                          <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">{resource.summary}</p>
                        )}
                        {resource.tag && (
                          <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-1 rounded-md font-bold uppercase tracking-tighter inline-block">
                            {resource.tag}
                          </span>
                        )}
                      </div>
                      <div className="mt-8 pt-6 border-t border-slate-50 flex flex-col gap-2">
                        {item.downloadUrl ? (
                          <a
                            href={item.downloadUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full"
                          >
                            <Button variant="ghost" className="w-full justify-between group/btn">
                              Download <Download className="h-4 w-4 transition-transform group-hover/btn:translate-y-1" />
                            </Button>
                          </a>
                        ) : (
                          <Link href={item.href}>
                            <Button variant="ghost" className="w-full justify-between group/btn">
                              View details
                            </Button>
                          </Link>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>
          {totalPages > 1 && (
            <div className="mt-12 flex justify-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                <Button
                  key={num}
                  variant={currentPage === num ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setCurrentPage(num)}
                >
                  {num}
                </Button>
              ))}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
