import { 
  Home, 
  Info, 
  Briefcase, 
  BookOpen, 
  Newspaper, 
  PhoneCall,
  Users,
  UserCheck,
  FileText,
  Shield,
  MailOpen,
  BarChart
} from 'lucide-react';
import { ReactNode } from 'react';

export type NavItem = {
  label: string;
  href?: string;
  icon: ReactNode;
  children?: Array<{ 
    label: string; 
    href: string; 
    icon: ReactNode; 
    description?: string 
  }>;
};

export const navConfig: NavItem[] = [
  {
    label: 'Home',
    href: '/',
    icon: <Home className="w-[18px] h-[18px]" />,
  },
  {
    label: 'About',
    icon: <Info className="w-[18px] h-[18px]" />,
    children: [
      {
        label: 'Who We Are',
        href: '/about/who-we-are',
        icon: <Users className="w-[18px] h-[18px]" />,
        description: 'Our mission, vision, and core values.',
      },

      {
        label: 'Board Members',
        href: '/about/board-members',
        icon: <UserCheck className="w-[18px] h-[18px]" />,
        description: 'Meet the team guiding our organization.',
      },
      {
        label: 'Our Team',
        href: '/about/our-team',
        icon: <Users className="w-[18px] h-[18px]" />,
        description: 'Meet the dedicated professionals driving our mission.',
      },

    ],
  },
  {
    label: 'Programs',
    href: '/programs',
    icon: <Briefcase className="w-[18px] h-[18px]" />,
  },
  {
    label: 'Resources',
    icon: <BookOpen className="w-[18px] h-[18px]" />,
    children: [
      {
        label: 'Publications',
        href: '/resources/publications',
        icon: <FileText className="w-[18px] h-[18px]" />,
        description: 'Research, reports, and policy briefs.',
      },
      {
        label: 'Know Your Rights',
        href: '/resources/know-your-rights',
        icon: <Shield className="w-[18px] h-[18px]" />,
        description: 'Legal guides and educational materials.',
      },
      {
        label: 'Newsletters',
        href: '/resources/newsletters',
        icon: <MailOpen className="w-[18px] h-[18px]" />,
        description: 'Updates and insights from our team.',
      },
      {
        label: 'Annual Reports',
        href: '/resources/annual-reports',
        icon: <BarChart className="w-[18px] h-[18px]" />,
        description: 'Yearly reviews of our impact and financials.',
      },
    ],
  },
  {
    label: 'News',
    href: '/news',
    icon: <Newspaper className="w-[18px] h-[18px]" />,
  },
  {
    label: 'Contact',
    href: '/contact',
    icon: <PhoneCall className="w-[18px] h-[18px]" />,
  },
];
