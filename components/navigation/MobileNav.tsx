'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { ChevronDown, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';
import { navConfig, NavItem } from '@/lib/navConfig';

interface MobileNavProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function MobileNav({ isOpen, setIsOpen }: MobileNavProps) {
  const pathname = usePathname();
  const [openDropdowns, setOpenDropdowns] = React.useState<Record<string, boolean>>({});

  const toggleDropdown = (label: string) => {
    setOpenDropdowns(prev => ({ ...prev, [label]: !prev[label] }));
  };

  // Close on route change
  React.useEffect(() => {
    setIsOpen(false);
  }, [pathname, setIsOpen]);

  // Lock scroll when open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[60] md:hidden"
            aria-hidden="true"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-[85%] max-w-sm bg-white z-[70] md:hidden shadow-2xl flex flex-col overflow-hidden"
            role="dialog"
            aria-modal="true"
          >
            <div className="p-6 flex items-center justify-between border-b border-slate-100 bg-white sticky top-0 z-10">
              <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center">
                <Image
                  src="/assets/images/meta/centre-for-women-justice.jpg"
                  alt="Centre for Women Justice Uganda (CWJ-U)"
                  width={140}
                  height={44}
                  className="h-11 w-auto object-contain object-left rounded"
                />
              </Link>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 text-slate-400 hover:text-primary transition-colors rounded-lg focus-visible:ring-2 focus-visible:ring-primary/50 outline-none"
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="flex-grow overflow-y-auto py-6 px-4 space-y-2">
              {navConfig.map((item) => (
                <div key={item.label} className="border-b border-slate-50 last:border-0 pb-2 mb-2">
                  {item.children ? (
                    <div>
                      <button
                        onClick={() => toggleDropdown(item.label)}
                        className={cn(
                          "w-full flex items-center justify-between py-3 px-2 text-lg font-medium rounded-lg transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
                          item.children.some(child => pathname.startsWith(child.href)) ? "text-primary font-bold" : "text-slate-700"
                        )}
                        aria-expanded={openDropdowns[item.label]}
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-slate-400">{item.icon}</span>
                          <span>{item.label}</span>
                        </div>
                        <ChevronDown className={cn("h-5 w-5 transition-transform duration-200", openDropdowns[item.label] && "rotate-180")} />
                      </button>
                      
                      <AnimatePresence>
                        {openDropdowns[item.label] && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="pl-11 pr-2 py-2 space-y-1">
                              {item.children.map((child) => (
                                <Link
                                  key={child.href}
                                  href={child.href}
                                  className={cn(
                                    "flex items-center space-x-3 py-2.5 px-3 rounded-lg text-sm transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
                                    pathname === child.href ? "bg-primary/10 text-primary font-bold" : "text-slate-600 hover:bg-slate-50"
                                  )}
                                  onClick={() => setIsOpen(false)}
                                >
                                  <span className={cn(pathname === child.href ? "text-primary" : "text-slate-400")}>{child.icon}</span>
                                  <span>{child.label}</span>
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      href={item.href!}
                      className={cn(
                        "flex items-center space-x-3 py-3 px-2 text-lg font-medium rounded-lg transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
                        pathname === item.href ? "text-primary font-bold" : "text-slate-700 hover:bg-slate-50"
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      <span className={cn(pathname === item.href ? "text-primary" : "text-slate-400")}>{item.icon}</span>
                      <span>{item.label}</span>
                    </Link>
                  )}
                </div>
              ))}
            </div>

            <div className="p-6 bg-slate-50 border-t border-slate-100 sticky bottom-0 z-10 space-y-4">
              <Link
                href="/get-help"
                className="block w-full bg-primary text-white text-center py-4 rounded-xl font-bold shadow-lg hover:bg-primary/90 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                onClick={() => setIsOpen(false)}
              >
                Get help
              </Link>
              <Link
                href="/donate"
                className="block w-full bg-white text-primary border border-primary/20 text-center py-4 rounded-xl font-bold hover:bg-slate-50 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                onClick={() => setIsOpen(false)}
              >
                Support Our Work
              </Link>
              <p className="text-center text-xs text-slate-400 pt-2">
                Confidential & Free Legal Aid
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
