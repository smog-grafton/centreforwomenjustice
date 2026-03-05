'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion } from 'motion/react';
import { Calendar, ArrowRight } from 'lucide-react';
import { SectionHeading, Button } from '@/components/ui/Common';
import {
  fetchNewsPage,
  fetchLatestNews,
  fetchNewsCategories,
  fetchNewsTags,
  subscribeNewsletter,
  toNewsCardItem,
  type NewsPostApi,
  type NewsCategoryApi,
  type NewsTagApi,
} from '@/lib/news-api';

export default function NewsPage() {
  const searchParams = useSearchParams();
  const categorySlug = searchParams.get('category');

  const [posts, setPosts] = useState<NewsPostApi[]>([]);
  const [latest, setLatest] = useState<NewsPostApi | null>(null);
  const [categories, setCategories] = useState<NewsCategoryApi[]>([]);
  const [tags, setTags] = useState<NewsTagApi[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [newsletterMessage, setNewsletterMessage] = useState('');

  const heroImage = latest?.cover_image ?? null;
  const prevCategoryRef = useRef<string | null>(null);

  useEffect(() => {
    setLoading(true);
    const categoryChanged = prevCategoryRef.current !== categorySlug;
    if (categoryChanged) {
      prevCategoryRef.current = categorySlug;
      setCurrentPage(1);
    }
    const pageToFetch = categoryChanged ? 1 : currentPage;

    Promise.all([
      fetchNewsPage(pageToFetch, 6, categorySlug ?? undefined),
      categorySlug ? Promise.resolve(null) : fetchLatestNews(),
      fetchNewsCategories(),
      fetchNewsTags(),
    ]).then(([listRes, latestPost, cats, tagsList]) => {
      setPosts(listRes.data);
      setTotalPages(listRes.meta?.last_page ?? 1);
      setLatest(categorySlug ? (listRes.data[0] ?? null) : (latestPost ?? null));
      setCategories(Array.isArray(cats) ? cats : []);
      setTags(Array.isArray(tagsList) ? tagsList : []);
      setLoading(false);
    });
  }, [currentPage, categorySlug]);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setNewsletterStatus('loading');
    const result = await subscribeNewsletter(newsletterEmail.trim());
    setNewsletterStatus(result.ok ? 'success' : 'error');
    setNewsletterMessage(result.message || (result.ok ? 'Thank you for subscribing.' : 'Something went wrong.'));
    if (result.ok) setNewsletterEmail('');
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero: background = latest post featured image when available */}
      <section className="relative pt-48 pb-24 bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          {heroImage ? (
            <>
              <Image
                src={heroImage}
                alt="News & Updates"
                fill
                className="object-cover opacity-40"
                priority
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-slate-900/70 mix-blend-multiply" />
            </>
          ) : (
            <div className="absolute inset-0 bg-slate-800" />
          )}
        </div>
        <div className="container-custom relative z-10">
          <SectionHeading
            title="News & Updates"
            subtitle="Stay informed about our latest advocacy efforts, community impact, and upcoming events."
            centered
            light
          />
        </div>
      </section>

      <section className="py-24">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-16">
              {loading ? (
                <div className="text-slate-500">Loading news…</div>
              ) : (
                <>
                  {posts.map((post, i) => {
                    const item = toNewsCardItem(post);
                    return (
                      <motion.article
                        key={post.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="group flex flex-col md:flex-row gap-8"
                      >
                        <div className="md:w-2/5 relative h-64 md:h-auto rounded-3xl overflow-hidden shadow-lg bg-slate-200">
                          {item.coverImage ? (
                            <Image
                              src={item.coverImage}
                              alt={post.title}
                              fill
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                              referrerPolicy="no-referrer"
                            />
                          ) : null}
                        </div>
                        <div className="md:w-3/5 space-y-4">
                          <div className="flex items-center space-x-4 text-xs font-bold uppercase tracking-widest text-slate-400">
                            {post.category && <span className="text-secondary">{post.category.name}</span>}
                            {post.category && <span>•</span>}
                            <span className="flex items-center">
                              <Calendar className="h-3 w-3 mr-1" /> {item.date}
                            </span>
                          </div>
                          <h2 className="text-3xl font-serif font-bold text-slate-900 group-hover:text-primary transition-colors">
                            <Link href={`/news/${post.slug}`}>{post.title}</Link>
                          </h2>
                          <p className="text-slate-600 leading-relaxed line-clamp-3">{item.excerpt}</p>
                          <div className="pt-2">
                            <Link
                              href={`/news/${post.slug}`}
                              className="inline-flex items-center text-primary font-bold hover:underline"
                            >
                              Read Full Story <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                          </div>
                        </div>
                      </motion.article>
                    );
                  })}

                  {totalPages > 1 && (
                    <div className="pt-12 flex justify-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className={currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}
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
                        className={currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}
                      >
                        Next
                      </Button>
                    </div>
                  )}
                </>
              )}
            </div>

            <div className="space-y-12">
              <div className="bg-slate-50 p-8 rounded-[2rem] space-y-6">
                <h3 className="text-xl font-bold text-slate-900">Categories</h3>
                <div className="space-y-3">
                  {categories.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/news?category=${cat.slug}`}
                      className="flex justify-between items-center w-full text-sm font-medium text-slate-600 hover:text-primary transition-colors"
                    >
                      {cat.name}
                    </Link>
                  ))}
                  {categories.length === 0 && !loading && (
                    <p className="text-sm text-slate-400">No categories yet.</p>
                  )}
                </div>
              </div>

              <div className="bg-primary p-8 rounded-[2rem] text-white space-y-6">
                <h3 className="text-xl font-bold">Newsletter</h3>
                <p className="text-sm text-white/70">Get the latest updates delivered straight to your inbox.</p>
                <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                  <input
                    type="email"
                    placeholder="Email address"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    disabled={newsletterStatus === 'loading'}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-secondary/50"
                  />
                  <Button type="submit" variant="secondary" className="w-full" disabled={newsletterStatus === 'loading'}>
                    {newsletterStatus === 'loading' ? 'Subscribing…' : 'Subscribe'}
                  </Button>
                  {newsletterMessage && (
                    <p className={`text-sm ${newsletterStatus === 'success' ? 'text-white/90' : 'text-amber-200'}`}>
                      {newsletterMessage}
                    </p>
                  )}
                </form>
              </div>

              <div className="space-y-6">
                <h3 className="text-xl font-bold text-slate-900">Popular Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag.id}
                      className="px-3 py-1 bg-slate-100 text-slate-500 rounded-full text-xs font-bold hover:bg-primary/10 hover:text-primary cursor-pointer transition-colors"
                    >
                      #{tag.name}
                    </span>
                  ))}
                  {tags.length === 0 && !loading && <p className="text-sm text-slate-400">No tags yet.</p>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
