'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronUp, ChevronDown, Play } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { cn } from '@/lib/utils';

import { API_BASE_URL } from '@/lib/env';
const API_URL = API_BASE_URL;
const VIDEO_SPOTLIGHT_URL = `${API_URL}/api/v1/video-spotlight`;

interface VideoSlide {
  id: number;
  title: string;
  subtitle: string;
  video_type: string;
  video_url: string | null;
  youtube_id: string | null;
  thumbnail_image: string | null;
  background_image: string | null;
}

function thumbnailFor(slide: VideoSlide): string {
  if (slide.thumbnail_image) return slide.thumbnail_image;
  if (slide.youtube_id) return `https://img.youtube.com/vi/${slide.youtube_id}/sddefault.jpg`;
  return 'https://picsum.photos/seed/video-spotlight/800/450';
}

function backgroundFor(slide: VideoSlide): string {
  if (slide.background_image) return slide.background_image;
  if (slide.youtube_id) return `https://img.youtube.com/vi/${slide.youtube_id}/sddefault.jpg`;
  return 'https://picsum.photos/seed/video-bg/1920/1080';
}

const ScribbleCircle = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 100 100"
    className={cn('absolute pointer-events-none', className)}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <motion.path
      d="M95 50C95 74.8528 74.8528 95 50 95C25.1472 95 5 74.8528 5 50C5 25.1472 25.1472 5 50 5C74.8528 5 95 25.1472 95 50Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 0.6 }}
      transition={{ duration: 1.5, ease: 'easeInOut' }}
    />
    <motion.path
      d="M90 45C90 65 75 85 50 85C25 85 10 65 10 45C10 25 25 10 50 10C75 10 90 25 90 45Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 0.4 }}
      transition={{ duration: 1.8, ease: 'easeInOut', delay: 0.2 }}
    />
  </svg>
);

export const VideoSpotlightSlider = () => {
  const [slides, setSlides] = useState<VideoSlide[]>([]);
  const [subscribeLabel, setSubscribeLabel] = useState('Subscribe To Our YouTube');
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [direction, setDirection] = useState(0);
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(VIDEO_SPOTLIGHT_URL)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (cancelled || !data) return;
        setSubscribeLabel(data.subscribe_label ?? 'Subscribe To Our YouTube');
        setSlides(Array.isArray(data.slides) ? data.slides : []);
        setCurrentIndex(0);
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (slides.length ? (prev + 1) % slides.length : 0));
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (slides.length ? (prev - 1 + slides.length) % slides.length : 0));
  }, [slides.length]);

  useEffect(() => {
    if (slides.length && !isHovered && !isModalOpen) {
      autoplayTimerRef.current = setInterval(nextSlide, 8000);
    }
    return () => {
      if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
    };
  }, [slides.length, isHovered, isModalOpen, nextSlide]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isModalOpen) return;
      if (e.key === 'ArrowUp') prevSlide();
      if (e.key === 'ArrowDown') nextSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, nextSlide, prevSlide]);

  const touchStart = useRef<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientY;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart.current === null) return;
    const touchEnd = e.changedTouches[0].clientY;
    const diff = touchStart.current - touchEnd;
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
    touchStart.current = null;
  };

  if (loading && slides.length === 0) {
    return (
      <section className="relative min-h-[600px] lg:h-[700px] overflow-hidden bg-slate-950 flex items-center justify-center">
        <div className="h-12 w-64 bg-white/10 rounded animate-pulse" />
      </section>
    );
  }

  if (slides.length === 0) {
    return null;
  }

  const currentSlide = slides[currentIndex];
  const thumbnailSrc = thumbnailFor(currentSlide);
  const backgroundSrc = backgroundFor(currentSlide);
  const isYouTube = currentSlide.video_type === 'youtube' && currentSlide.youtube_id;

  return (
    <section
      className="relative min-h-[600px] lg:h-[700px] overflow-hidden bg-slate-950 flex items-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={backgroundSrc}
            alt=""
            fill
            className="object-cover opacity-30"
            referrerPolicy="no-referrer"
            unoptimized={backgroundSrc.startsWith('http') && !backgroundSrc.includes('picsum')}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
          <div className="absolute inset-0 bg-slate-950/40" />
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            key={`preview-${currentSlide.id}`}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md shadow-2xl group cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            <Image
              src={thumbnailSrc}
              alt={currentSlide.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              referrerPolicy="no-referrer"
              unoptimized={thumbnailSrc.startsWith('http') && !thumbnailSrc.includes('picsum')}
            />
            <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-slate-900/0 transition-colors duration-300" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/80">
                <Play fill="currentColor" size={24} className="ml-1" />
              </div>
            </div>
          </motion.div>

          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={`content-${currentSlide.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <p className="text-primary font-medium tracking-wider text-sm italic">
                    {subscribeLabel}
                  </p>
                  <div className="h-0.5 w-12 bg-primary/30" />
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white leading-tight">
                  {currentSlide.title}
                </h2>
                <p className="text-lg text-white/60 max-w-lg">
                  {currentSlide.subtitle}
                </p>
                <div className="pt-4 relative inline-block">
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full border border-white/20 text-white font-bold tracking-widest text-xs uppercase transition-all hover:bg-white hover:text-slate-950 z-10"
                  >
                    <Play size={14} fill="currentColor" />
                    Play Video
                  </button>
                  <ScribbleCircle className="w-[180px] h-[100px] -top-2 -left-4 text-primary/60" />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="absolute right-4 lg:right-12 top-1/2 -translate-y-1/2 flex flex-col items-center gap-6 z-20">
        <div className="flex flex-col gap-4">
          <button
            onClick={prevSlide}
            className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:border-white transition-all hover:bg-white/10"
            aria-label="Previous slide"
          >
            <ChevronUp size={24} />
          </button>
          <button
            onClick={nextSlide}
            className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:border-white transition-all hover:bg-white/10"
            aria-label="Next slide"
          >
            <ChevronDown size={24} />
          </button>
        </div>
        <div className="flex flex-col gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setDirection(idx > currentIndex ? 1 : -1);
                setCurrentIndex(idx);
              }}
              className={cn(
                'w-1.5 transition-all duration-300 rounded-full',
                currentIndex === idx ? 'h-6 bg-primary' : 'h-1.5 bg-white/20 hover:bg-white/40'
              )}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {isYouTube ? (
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${currentSlide.youtube_id}?autoplay=1`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full h-full min-h-[50vh]"
          />
        ) : currentSlide.video_url ? (
          <video
            src={currentSlide.video_url}
            controls
            autoPlay
            className="w-full h-full max-h-[80vh]"
          />
        ) : (
          <p className="text-white p-8">No video source.</p>
        )}
      </Modal>
    </section>
  );
};
