'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';
import { subscribeNewsletter } from '@/lib/news-api';
import type { ContactSettingsData } from '@/lib/settings-api';

const XIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
  </svg>
);

function NewsletterBlock() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus('loading');
    const result = await subscribeNewsletter(email.trim());
    setStatus(result.ok ? 'success' : 'error');
    setMessage(result.message || (result.ok ? 'Thank you for subscribing.' : 'Something went wrong.'));
    if (result.ok) setEmail('');
  };

  return (
    <div>
      <h4 className="font-bold mb-6 text-slate-900">Stay Updated</h4>
      <p className="text-sm text-slate-600 mb-4">Get the latest updates delivered straight to your inbox.</p>
      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === 'loading'}
          className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full bg-primary text-white py-3 rounded-lg font-bold text-sm btn-transition hover:bg-primary/90 disabled:opacity-70"
        >
          {status === 'loading' ? 'Subscribing…' : 'Subscribe'}
        </button>
        {message && (
          <p className={`text-xs ${status === 'success' ? 'text-green-600' : 'text-amber-600'}`}>{message}</p>
        )}
      </form>
    </div>
  );
}

interface FooterProps {
  settings?: ContactSettingsData | null;
}

export default function Footer({ settings }: FooterProps) {
  const footer = settings?.footer;
  const social = settings?.social;

  return (
    <footer className="bg-slate-50 border-t border-slate-200 pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand & Mission */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center">
              <Image
                src="/assets/images/logo/logo-for-lite-bg.svg"
                alt="Centre for Women Justice Uganda (CWJU)"
                width={160}
                height={48}
                className="h-10 w-auto object-contain object-left"
                unoptimized
              />
            </Link>
            <p className="text-slate-600 text-sm leading-relaxed">
              Promoting access to justice for women and girls in Uganda through legal aid, advocacy, and empowerment.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="https://x.com/CentreforWomen2" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-primary transition-colors" aria-label="X (Twitter)"><XIcon className="h-5 w-5" /></a>
              <a href="https://www.facebook.com/cwjug/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-primary transition-colors" aria-label="Facebook"><Facebook className="h-5 w-5" /></a>
              <a href="https://www.instagram.com/centreforwomen2/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-primary transition-colors" aria-label="Instagram"><Instagram className="h-5 w-5" /></a>
              <a href="https://ug.linkedin.com/company/centre-for-women-justice-uganda" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-primary transition-colors" aria-label="LinkedIn"><Linkedin className="h-5 w-5" /></a>
              <a href="https://www.youtube.com/@centreforwomen2?si=dBjeAeljfb4Yt1yu" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-primary transition-colors" aria-label="YouTube"><Youtube className="h-5 w-5" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-6 text-slate-900">Quick Links</h4>
            <ul className="space-y-4 text-sm text-slate-600">
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/programs" className="hover:text-primary transition-colors">Our Programs</Link></li>
              <li><Link href="/news" className="hover:text-primary transition-colors">News & Events</Link></li>
              <li><Link href="/volunteer" className="hover:text-primary transition-colors">Volunteer</Link></li>
              <li><Link href="/donate" className="hover:text-primary transition-colors">Donate</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold mb-6 text-slate-900">Contact Us</h4>
            <ul className="space-y-4 text-sm text-slate-600">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-secondary flex-shrink-0" />
                <span>{footer?.location ?? 'Kampala, Uganda'}</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-secondary flex-shrink-0" />
                <span>{footer?.phone ?? '0750007674 / 0760195706'}</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-secondary flex-shrink-0" />
                <span>{footer?.email ?? 'centre4womenjusticeu@gmail.com'}</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <NewsletterBlock />
        </div>

        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0 text-xs text-slate-500 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2">
            <p>© {new Date().getFullYear()} Centre for Women Justice Uganda. All rights reserved.</p>
            <span className="hidden md:inline text-slate-300">|</span>
            <p>
              Powered by <a href="https://smogcoders.com" target="_blank" rel="noopener noreferrer" className="font-bold hover:text-primary transition-colors">smogcoders</a>
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            <Link href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
