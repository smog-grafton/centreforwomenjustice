'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useInterval } from '@/hooks/use-interval';
import { Button } from '@/components/ui/Common';

import { API_BASE_URL } from '@/lib/env';
const API_URL = API_BASE_URL;
const HERO_SLIDES_URL = `${API_URL}/api/v1/hero-slides`;

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  primaryCta: { text: string; href: string };
  secondaryCta: { text: string; href: string };
  imageSrc: string | null;
  imageAlt: string;
}

function getDefaultImage(id: number): string {
  return `https://picsum.photos/seed/hero-${id}/1920/1080`;
}

const AUTOPLAY_INTERVAL = 7000;

export default function HeroSlider() {
  const [slides, setSlides] = React.useState<Slide[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [current, setCurrent] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);
  const [touchStart, setTouchStart] = React.useState<number | null>(null);

  React.useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetch(HERO_SLIDES_URL)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load hero slides');
        return res.json();
      })
      .then((data: { data: Slide[] }) => {
        if (cancelled) return;
        const list = Array.isArray(data.data) ? data.data : (data as unknown as Slide[]);
        setSlides(list);
        setCurrent(0);
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Failed to load');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const nextSlide = React.useCallback(() => {
    setCurrent((prev) => (slides.length ? (prev + 1) % slides.length : 0));
  }, [slides.length]);

  const prevSlide = React.useCallback(() => {
    setCurrent((prev) => (slides.length ? (prev - 1 + slides.length) % slides.length : 0));
  }, [slides.length]);

  useInterval(nextSlide, !loading && slides.length > 0 && !isPaused ? AUTOPLAY_INTERVAL : null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setIsPaused(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.targetTouches[0].clientX;
    const diff = touchStart - touchEnd;
    if (diff > 50) {
      nextSlide();
      setTouchStart(null);
    } else if (diff < -50) {
      prevSlide();
      setTouchStart(null);
    }
  };

  const handleTouchEnd = () => {
    setTouchStart(null);
    setTimeout(() => setIsPaused(false), 2000);
  };

  if (error) {
    return (
      <section className="relative min-h-[60vh] w-full flex items-center justify-center bg-slate-900 text-white">
        <p className="text-center text-white/80">Unable to load hero content. Please try again later.</p>
      </section>
    );
  }

  if (loading || slides.length === 0) {
    return (
      <section className="relative h-screen w-full overflow-hidden bg-slate-900">
        <div className="container-custom relative h-full flex flex-col justify-center pt-32">
          <div className="max-w-3xl space-y-6 animate-pulse">
            <div className="h-8 w-48 bg-white/20 rounded" />
            <div className="h-14 w-full bg-white/20 rounded" />
            <div className="h-6 w-3/4 bg-white/20 rounded" />
          </div>
        </div>
      </section>
    );
  }

  const slide = slides[current];
  const imageSrc = slide.imageSrc || getDefaultImage(slide.id);

  return (
    <section
      className="relative h-screen w-full overflow-hidden bg-slate-900"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <Image
            src={imageSrc}
            alt={slide.imageAlt}
            fill
            priority
            className="object-cover"
            referrerPolicy="no-referrer"
            unoptimized={imageSrc.startsWith('http') && !imageSrc.includes('picsum.photos')}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />

          {/* Content: extra top padding so hero text clears the fixed header */}
          <div className="container-custom relative h-full flex flex-col justify-center pt-32 md:pt-40">
            <div className="max-w-3xl space-y-6 md:space-y-8 pb-32 md:pb-40">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                <span className="inline-block bg-secondary text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
                  CWJU Impact
                </span>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white leading-[1.1]">
                  {slide.title}
                </h1>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-lg md:text-xl text-white/90 max-w-xl leading-relaxed"
              >
                {slide.subtitle}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 pt-4"
              >
                <Link href={slide.primaryCta.href || '#'}>
                  <Button size="lg" className="w-full sm:w-auto text-base px-10">
                    {slide.primaryCta.text}
                  </Button>
                </Link>
                <Link href={slide.secondaryCta.href || '#'}>
                  <Button variant="outline" size="lg" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-primary text-base px-10">
                    {slide.secondaryCta.text}
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-12 right-12 hidden md:flex space-x-4 z-20">
        <button
          onClick={prevSlide}
          className="p-4 rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm hover:bg-white hover:text-primary transition-all"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={nextSlide}
          className="p-4 rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm hover:bg-white hover:text-primary transition-all"
          aria-label="Next slide"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      <div className="absolute bottom-8 md:bottom-12 left-6 right-6 md:left-12 md:right-auto z-30 flex flex-col space-y-6">
        <div className="flex items-center space-x-4">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setCurrent(idx);
                setIsPaused(true);
                setTimeout(() => setIsPaused(false), 5000);
              }}
              className="group py-4 focus:outline-none"
              aria-label={`Go to slide ${idx + 1}`}
            >
              <div
                className={cn(
                  'h-1.5 transition-all duration-500 rounded-full',
                  current === idx ? 'w-12 bg-secondary' : 'w-6 bg-white/30 group-hover:bg-white/60'
                )}
              />
            </button>
          ))}
        </div>
        <div className="w-full md:w-64 h-1 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            key={current + (isPaused ? '-paused' : '-active')}
            initial={{ width: 0 }}
            animate={{ width: isPaused ? '0%' : '100%' }}
            transition={{ duration: isPaused ? 0 : AUTOPLAY_INTERVAL / 1000, ease: 'linear' }}
            className="h-full bg-secondary shadow-[0_0_8px_rgba(242,125,38,0.5)]"
          />
        </div>
      </div>
    </section>
  );
}
