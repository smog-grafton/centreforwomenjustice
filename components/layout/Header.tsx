'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useScrollPosition } from '@/hooks/use-scroll-position';
import { navConfig } from '@/lib/navConfig';
import { NavDropdown } from '@/components/navigation/NavDropdown';
import { MobileNav } from '@/components/navigation/MobileNav';
import { TopBar } from './TopBar';
import type { ContactSettingsData } from '@/lib/settings-api';

interface HeaderProps {
  settings?: ContactSettingsData | null;
}

export default function Header({ settings }: HeaderProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const pathname = usePathname();
  const scrollY = useScrollPosition();
  
  const isHomePage = pathname === '/';
  const isScrolled = scrollY > 50;
  const isOverlay = isHomePage && !isScrolled;

  return (
    <>
      <header 
        className={cn(
          "fixed top-0 z-50 w-full transition-all duration-300 ease-in-out flex flex-col",
          isOverlay 
            ? "bg-transparent" 
            : "bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm"
        )}
      >
        {/* Top Bar - hides on scroll */}
        <div className={cn(
          "transition-all duration-300 overflow-hidden",
          isScrolled ? "h-0 opacity-0" : "h-auto opacity-100"
        )}>
          <TopBar isOverlay={isOverlay} settings={settings} />
        </div>

        {/* Main Header Content */}
        <div className={cn(
          "container-custom flex items-center justify-between transition-all duration-300",
          isOverlay && !isScrolled ? "py-6" : "py-4"
        )}>
          <Link href="/" className="flex items-center group outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-lg p-1 -ml-1 transition-opacity hover:opacity-90">
            <Image
              src={isOverlay ? '/assets/images/logo/logo-for-dark-bg.svg' : '/assets/images/logo/logo-for-lite-bg.svg'}
              alt="Centre for Women Justice Uganda (CWJ-U)"
              width={160}
              height={48}
              className="h-10 w-auto object-contain object-left"
              priority
              unoptimized
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navConfig.map((item) => (
              <React.Fragment key={item.label}>
                {item.children ? (
                  <NavDropdown item={item} isOverlay={isOverlay} />
                ) : (
                  <Link
                    href={item.href!}
                    className={cn(
                      "flex items-center space-x-1.5 text-sm font-bold transition-all duration-300 hover:opacity-70 outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-md px-2 py-1",
                      isOverlay 
                        ? "text-white drop-shadow-sm" 
                        : "text-slate-600",
                      pathname === item.href && (isOverlay ? "text-secondary" : "text-primary underline underline-offset-8")
                    )}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                )}
              </React.Fragment>
            ))}
            <Link
              href="/get-help"
              className={cn(
                "px-6 py-2.5 rounded-full text-sm font-bold btn-transition shadow-lg outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                isOverlay 
                  ? "bg-white text-primary hover:bg-secondary hover:text-white" 
                  : "bg-primary text-white hover:bg-primary/90"
              )}
            >
              Get help
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className={cn(
              "md:hidden p-2 rounded-lg transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
              isOverlay ? "text-white bg-white/10" : "text-slate-600 bg-slate-100"
            )}
            onClick={() => setIsOpen(true)}
            aria-label="Open menu"
            aria-expanded={isOpen}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      <MobileNav isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}
