'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Button } from '@/components/ui/Common';
import { fetchSuccessStories, type SuccessStoryApi } from '@/lib/success-stories-api';

export const SuccessStories = () => {
  const [stories, setStories] = useState<SuccessStoryApi[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    fetchSuccessStories().then((data) => {
      setStories(data.slice(0, 5));
      setActiveIndex(0);
    });
  }, []);

  const handleNext = useCallback(() => {
    setDirection(1);
    setActiveIndex((prev) => (stories.length ? (prev + 1) % stories.length : 0));
  }, [stories.length]);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setActiveIndex((prev) => (stories.length ? (prev - 1 + stories.length) % stories.length : 0));
  }, [stories.length]);

  useEffect(() => {
    if (!isAutoPlaying || !stories.length) return;
    const interval = setInterval(handleNext, 8000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, handleNext, stories.length]);

  const currentStory = stories[activeIndex];

  // Variants for transitions
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 20 : -20,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 20 : -20,
      opacity: 0,
    }),
  };

  if (!currentStory) {
    return null;
  }

  return (
    <section 
      className="relative py-24 overflow-hidden bg-[#f6f4f7] bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] bg-repeat"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Grain Overlay for extra texture depth */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] bg-repeat" />

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side: Content */}
          <div className="space-y-8 order-2 lg:order-1">
            <div className="space-y-4">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.p
                  key={`tag-${currentStory.id}`}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="text-primary font-serif italic text-xl md:text-2xl"
                >
                  {currentStory.tag_line ?? currentStory.name}
                </motion.p>
              </AnimatePresence>
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
                Our Success <br className="hidden md:block" /> Stories
              </h2>
              
              <p className="text-slate-600 text-lg max-w-lg leading-relaxed">
                At CWJU, our proudest achievements are the stories of the lives we&apos;ve touched and the change we&apos;ve inspired. These stories are a testament to the enduring power of determination and our commitment to advancing women&apos;s rights.
              </p>
            </div>

            {/* Navigation Arrows */}
            <div className="flex items-center gap-4 pt-4">
              <button
                onClick={handlePrev}
                className="w-12 h-12 rounded-full border border-slate-300 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white transition-all group"
                aria-label="Previous story"
              >
                <ChevronLeft className="h-6 w-6 transition-transform group-hover:-translate-x-0.5" />
              </button>
              <button
                onClick={handleNext}
                className="w-12 h-12 rounded-full border border-slate-300 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white transition-all group"
                aria-label="Next story"
              >
                <ChevronRight className="h-6 w-6 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>

            <div className="pt-4">
              <Link href="/stories">
                <Button variant="outline" size="lg" className="rounded-full px-10 border-primary text-primary hover:bg-primary hover:text-white">
                  SEE MORE STORIES
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Side: Visual Composition */}
          <div className="relative order-1 lg:order-2 h-[500px] md:h-[600px] flex items-center justify-center lg:justify-end">
            
            {/* Main Big Circle */}
            <div className="relative w-[320px] h-[320px] md:w-[450px] md:h-[450px] lg:w-[550px] lg:h-[550px] rounded-full overflow-hidden border-8 border-white shadow-2xl lg:translate-x-20">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`hero-${currentStory.id}`}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="absolute inset-0"
                >
                  {currentStory.hero_image_url ? (
                    <Image
                      src={currentStory.hero_image_url}
                      alt={currentStory.name}
                      fill
                      className="object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-200" />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Quote Card Overlay */}
            <AnimatePresence mode="wait">
              <motion.div
                  key={`card-${currentStory.id}`}
                initial={{ opacity: 0, x: -30, y: 20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                exit={{ opacity: 0, x: 20, y: -20 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="absolute left-0 md:left-10 lg:-left-10 top-1/2 -translate-y-1/2 z-20 bg-white p-8 md:p-10 rounded-[2rem] shadow-xl max-w-[280px] md:max-w-[350px] space-y-6 border border-slate-100"
              >
                {/* Quote Icon */}
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white shadow-lg">
                  <Quote className="h-6 w-6 fill-current" />
                </div>

                <div className="text-center space-y-4 pt-4">
                  <p className="text-primary font-bold text-lg uppercase tracking-wider">
                    {currentStory.case_number}
                  </p>
                  
                  <blockquote className="text-slate-700 text-lg md:text-xl leading-relaxed italic">
                    &quot;{currentStory.quote}&quot;
                  </blockquote>

                  <div className="space-y-1">
                    <p className="text-xl font-bold text-slate-900">{currentStory.name}</p>
                    <p className="text-primary font-serif italic text-lg">{currentStory.location}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Small Bubble Image */}
            <AnimatePresence mode="wait">
              <motion.div
                  key={`bubble-${currentStory.id}`}
                initial={{ opacity: 0, scale: 0.5, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -20 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="absolute bottom-0 right-10 lg:right-0 z-30 w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-white shadow-lg"
              >
                {currentStory.bubble_image_url ? (
                  <Image
                    src={currentStory.bubble_image_url}
                    alt="Supporting visual"
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-full h-full bg-slate-200" />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
};
