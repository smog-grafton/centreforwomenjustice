import { Mail, Phone, MapPin, Youtube, Linkedin, Facebook, Instagram } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ContactSettingsData } from '@/lib/settings-api';

const XIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
  </svg>
);

interface TopBarProps {
  isOverlay?: boolean;
  settings?: ContactSettingsData | null;
}

export function TopBar({ isOverlay, settings }: TopBarProps) {
  const topbar = settings?.topbar;
  const social = settings?.social;

  return (
    <div className={cn(
      "text-xs py-2 hidden lg:block border-b transition-colors duration-300",
      isOverlay 
        ? "bg-black/20 border-white/10 text-white/90" 
        : "bg-primary border-primary-dark text-white"
    )}>
      <div className="container-custom flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <Phone className="h-3.5 w-3.5" />
            <span>{topbar?.phone ?? '0750007674 / 0760195706'}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Mail className="h-3.5 w-3.5" />
            <a
              href={`mailto:${topbar?.email ?? 'centre4womenjusticeu@gmail.com'}`}
              className="hover:text-secondary transition-colors"
            >
              {topbar?.email ?? 'centre4womenjusticeu@gmail.com'}
            </a>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="h-3.5 w-3.5" />
            <span>{topbar?.location ?? 'Kampala, Uganda'}</span>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <span className="font-semibold mr-2">Follow Us:</span>
          <a
            href={social?.x ?? 'https://x.com/CentreforWomen2'}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-secondary transition-colors"
            aria-label="X (Twitter)"
          >
            <XIcon className="h-3.5 w-3.5" />
          </a>
          <a
            href={social?.facebook ?? 'https://www.facebook.com/cwjug/'}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-secondary transition-colors"
            aria-label="Facebook"
          >
            <Facebook className="h-3.5 w-3.5" />
          </a>
          <a
            href={social?.instagram ?? 'https://www.instagram.com/centreforwomen2/'}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-secondary transition-colors"
            aria-label="Instagram"
          >
            <Instagram className="h-3.5 w-3.5" />
          </a>
          <a
            href={social?.linkedin ?? 'https://ug.linkedin.com/company/centre-for-women-justice-uganda'}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-secondary transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-3.5 w-3.5" />
          </a>
          <a
            href={social?.youtube ?? 'https://www.youtube.com/@centreforwomen2?si=dBjeAeljfb4Yt1yu'}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-secondary transition-colors"
            aria-label="YouTube"
          >
            <Youtube className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
