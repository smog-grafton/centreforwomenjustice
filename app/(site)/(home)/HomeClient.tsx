'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2, Users, Heart, Gavel, Newspaper, Scale } from 'lucide-react';
import { Button, SectionHeading } from '@/components/ui/Common';
import HeroSlider from '@/components/sections/HeroSlider';
import { fetchPartners, type PartnerApi } from '@/lib/partners-api';
import { CorePrograms } from '@/components/sections/CorePrograms';
import { HowWeSupportYou } from '@/components/sections/HowWeSupportYou';
import { AboutHome } from '@/components/sections/AboutHome';
import { VideoSpotlightSlider } from '@/components/sections/VideoSpotlightSlider';
import { SuccessStories } from '@/components/sections/SuccessStories';
import { LatestNews } from '@/components/sections/LatestNews';
import { ResourcesShowcase } from '@/components/sections/ResourcesShowcase';

export default function HomePage() {
  const [partners, setPartners] = useState<PartnerApi[]>([]);

  useEffect(() => {
    fetchPartners().then(setPartners);
  }, []);

  return (
    <div className="flex flex-col w-full">
      {/* Hero Slider Section */}
      <HeroSlider />

      {/* About Us Section */}
      <AboutHome />

      {/* Impact Metrics */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { label: 'Cases Handled', value: '5,000+', icon: Gavel },
              { label: 'Communities Reached', value: '150+', icon: Users },
              { label: 'Legal Clinics', value: '12', icon: CheckCircle2 },
              { label: 'Success Rate', value: '85%', icon: Scale },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="text-center space-y-2 p-6 rounded-2xl hover:bg-slate-50 transition-colors"
              >
                <div className="inline-flex p-3 bg-primary/5 rounded-xl mb-4">
                  <stat.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-4xl font-bold text-slate-900">{stat.value}</h3>
                <p className="text-slate-500 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Grid */}
      <CorePrograms />
      
      {/* How We Support You Section */}
      <HowWeSupportYou />

      {/* Video Spotlight Section */}
      <VideoSpotlightSlider />

      {/* Latest News Redesigned */}
      <LatestNews />

      {/* Success Stories Section */}
      <SuccessStories />

      {/* Resources Showcase Section */}
      <ResourcesShowcase />

      {/* Partners Strip – horizontal slider only, no wrapping */}
      <section className="py-16 bg-slate-50 border-y border-slate-100 overflow-hidden">
        <p className="text-center text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-12">Our Trusted Partners & Supporters</p>
        <div className="relative w-full">
          <div
            className="scrollbar-hide flex flex-nowrap items-center justify-start gap-12 md:gap-24 overflow-x-auto overflow-y-hidden scroll-smooth pb-2 px-4 md:px-8 w-full min-w-0"
            style={{ flexWrap: 'nowrap' }}
          >
            {partners.map((partner) => (
              <div
                key={partner.id}
                className="relative w-32 h-12 md:w-40 md:h-16 shrink-0 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 flex items-center justify-center"
              >
                {partner.logo ? (
                  <Image
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    width={160}
                    height={64}
                    className="object-contain w-full h-full"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <span className="text-slate-400 font-semibold text-sm text-center">
                    {partner.name}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="bg-slate-900 rounded-[3rem] p-12 md:p-20 text-center space-y-8 relative overflow-hidden">
            <div className="relative z-10 space-y-6">
              <h2 className="text-4xl md:text-6xl font-serif font-bold text-white">Ready to make a <span className="text-secondary">difference?</span></h2>
              <p className="text-xl text-white/70 max-w-2xl mx-auto">
                Whether you need help, want to volunteer, or wish to support our mission financially, your involvement matters.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                <Link href="/donate">
                  <Button variant="secondary" size="lg" className="w-full sm:w-auto">Donate Now</Button>
                </Link>
                <Link href="/volunteer">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-slate-900">
                    Become a Volunteer
                  </Button>
                </Link>
              </div>
            </div>
            {/* Abstract Background for CTA */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/20 skew-x-12 translate-x-1/2" />
          </div>
        </div>
      </section>
    </div>
  );
}
