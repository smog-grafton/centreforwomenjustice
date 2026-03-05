'use client';

import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';

export default function PageLoader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Lock scroll while loading
    document.body.style.overflow = 'hidden';
    
    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.overflow = 'unset';
    }, 2200); // 2.2 seconds total duration

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex flex-col items-center overflow-hidden px-4">
            <motion.span
              className="text-xs md:text-sm tracking-[0.3em] text-secondary uppercase mb-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            >
              Center for Women and Justice Uganda
            </motion.span>
            
            <div className="overflow-hidden">
              <motion.h1
                className="text-5xl md:text-7xl font-serif text-white tracking-wider"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
              >
                CWJ-U
              </motion.h1>
            </div>
            
            <motion.div
              className="mt-8 h-[1px] bg-secondary/50"
              initial={{ width: 0 }}
              animate={{ width: "100px" }}
              transition={{ duration: 1, ease: "easeInOut", delay: 0.8 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
