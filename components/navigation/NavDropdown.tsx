'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';
import { NavItem } from '@/lib/navConfig';

interface NavDropdownProps {
  item: NavItem;
  isOverlay: boolean;
}

export function NavDropdown({ item, isOverlay }: NavDropdownProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const pathname = usePathname();
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  const isActive = item.children?.some(child => pathname.startsWith(child.href));

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEsc);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen]);

  // Close dropdown when route changes
  React.useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center space-x-1.5 text-sm font-bold transition-all duration-300 hover:opacity-70 outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-md px-2 py-1",
          isOverlay ? "text-white drop-shadow-sm" : "text-slate-600",
          isActive && (isOverlay ? "text-secondary" : "text-primary underline underline-offset-8")
        )}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span className="flex items-center space-x-1.5">
          {item.icon}
          <span>{item.label}</span>
        </span>
        <ChevronDown className={cn("h-4 w-4 transition-transform duration-200", isOpen && "rotate-180")} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute top-full left-0 mt-2 w-[320px] bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden z-50 origin-top-left"
          >
            <div className="p-2 space-y-1">
              {item.children?.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  className={cn(
                    "flex items-start space-x-3 p-3 rounded-lg transition-colors hover:bg-slate-50 focus-visible:bg-slate-50 outline-none",
                    pathname === child.href ? "bg-primary/5 text-primary" : "text-slate-700"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  <div className={cn(
                    "mt-0.5 flex-shrink-0",
                    pathname === child.href ? "text-primary" : "text-slate-400"
                  )}>
                    {child.icon}
                  </div>
                  <div>
                    <div className={cn(
                      "text-sm font-bold",
                      pathname === child.href ? "text-primary" : "text-slate-900"
                    )}>
                      {child.label}
                    </div>
                    {child.description && (
                      <p className="text-xs text-slate-500 mt-0.5 leading-snug">
                        {child.description}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
