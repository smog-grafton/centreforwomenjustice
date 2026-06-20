'use client';

import { use, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react';
import { Button } from '@/components/ui/Common';
import { NewsProseContent } from '@/components/NewsProseContent';
import { fetchNewsBySlug, fetchNewsPage, toNewsCardItem } from '@/lib/news-api';
import type { NewsPostApi } from '@/lib/news-api';
import { notFound } from 'next/navigation';

export default function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [post, setPost] = useState<NewsPostApi | null | undefined>(undefined);
  const [recent, setRecent] = useState<NewsPostApi[]>([]);

  useEffect(() => {
    Promise.all([
      fetchNewsBySlug(slug),
      fetchNewsPage(1, 4),
    ]).then(([p, listRes]) => {
      setPost(p ?? null);
      const others = (listRes.data || []).filter((x) => x.slug !== slug).slice(0, 3);
      setRecent(others);
    });
  }, [slug]);

  if (post === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500">
        Loading…
      </div>
    );
  }

  if (!post) {
    notFound();
  }

  const coverImage = post.cover_image ?? null;
  const publishedDate = post.published_on ? new Date(post.published_on).toLocaleDateString() : '';

  return (
    <article className="bg-white min-h-screen">
      <section className="relative h-[60vh] min-h-[400px]">
        {coverImage ? (
          <>
            <Image
              src={coverImage}
              alt={post.title}
              fill
              className="object-cover"
              priority
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/40" />
          </>
        ) : (
          <div className="absolute inset-0 bg-slate-800" />
        )}
        <div className="absolute inset-0 flex items-end pb-16">
          <div className="container-custom">
            <Link href="/news" className="inline-flex items-center text-white/80 hover:text-white mb-8 transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to News
            </Link>
            <div className="max-w-4xl space-y-6">
              {post.category && (
                <span className="bg-secondary text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                  {post.category.name}
                </span>
              )}
              <h1 className="text-4xl md:text-6xl font-serif font-bold text-white leading-tight">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-white/80 text-sm">
                <span className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4" /> {publishedDate}
                </span>
                <span className="flex items-center">
                  <User className="mr-2 h-4 w-4" /> {post.author_label || 'CWJU Communications'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-8 space-y-12">
              {post.excerpt && (
                <p className="text-xl font-medium text-slate-900 mb-8">{post.excerpt}</p>
              )}
              {post.body ? (
                <NewsProseContent html={post.body} className="text-slate-600 leading-relaxed" />
              ) : (
                <p className="text-slate-600">No content available.</p>
              )}

              <div className="pt-12 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="flex flex-wrap gap-2">
                  {post.tags?.length > 0 && (
                    <>
                      <span className="flex items-center text-slate-400 mr-2">
                        <Tag className="h-4 w-4 mr-2" /> Tags:
                      </span>
                      {post.tags.map((t) => (
                        <span key={t.id} className="px-3 py-1 bg-slate-50 text-slate-500 rounded-full text-xs font-bold">
                          #{t.name}
                        </span>
                      ))}
                    </>
                  )}
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-bold text-slate-400">Share:</span>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm" className="h-10 w-10 p-0 rounded-full" aria-label="Share on Facebook">
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                    </Button>
                    <Button variant="ghost" size="sm" className="h-10 w-10 p-0 rounded-full" aria-label="Share on Twitter">
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                    </Button>
                    <Button variant="ghost" size="sm" className="h-10 w-10 p-0 rounded-full" aria-label="Share on LinkedIn">
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-12">
              <div className="bg-slate-50 p-8 rounded-[2rem] space-y-6">
                <h3 className="text-xl font-bold text-slate-900">Recent Posts</h3>
                <div className="space-y-6">
                  {recent.map((p) => {
                    const item = toNewsCardItem(p);
                    return (
                      <Link key={p.id} href={`/news/${p.slug}`} className="group flex gap-4">
                        <div className="w-20 h-20 relative rounded-xl overflow-hidden flex-shrink-0 bg-slate-200">
                          {item.coverImage ? (
                            <Image
                              src={item.coverImage}
                              alt={p.title}
                              fill
                              className="object-cover"
                              referrerPolicy="no-referrer"
                            />
                          ) : null}
                        </div>
                        <div className="space-y-1 min-w-0">
                          <h4 className="text-sm font-bold text-slate-900 group-hover:text-primary transition-colors line-clamp-2">
                            {p.title}
                          </h4>
                          <p className="text-xs text-slate-400">{item.date}</p>
                        </div>
                      </Link>
                    );
                  })}
                  {recent.length === 0 && <p className="text-sm text-slate-400">No other posts yet.</p>}
                </div>
              </div>

              <div className="bg-secondary p-8 rounded-[2rem] text-white space-y-4">
                <h4 className="text-xl font-bold">Support Our Work</h4>
                <p className="text-sm text-white/90">Your donation helps us continue providing free legal aid to women in need.</p>
                <Link href="/donate">
                  <Button className="w-full bg-white text-secondary hover:bg-white/90">Donate Now</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
