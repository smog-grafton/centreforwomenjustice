'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import { Target, Eye, Heart, Shield, Scale } from 'lucide-react';
import { SectionHeading } from '@/components/ui/Common';

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="relative pt-48 pb-24 bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://picsum.photos/seed/about-hero/1920/1080"
            alt="About CWJU Background"
            fill
            className="object-cover opacity-30"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-slate-900/70 mix-blend-multiply" />
        </div>
        <div className="container-custom max-w-4xl relative z-10">
          <SectionHeading
            title="About CWJU"
            subtitle="Founded in 2010, the Centre for Women Justice Uganda is a non-profit organization dedicated to breaking the cycle of violence and injustice against women."
            centered
            light
          />
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24">
        <div className="container-custom grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-primary p-12 rounded-[3rem] text-white space-y-6">
            <div className="bg-white/10 w-16 h-16 rounded-2xl flex items-center justify-center">
              <Target className="h-8 w-8 text-secondary" />
            </div>
            <h3 className="text-3xl font-serif font-bold">Our Mission</h3>
            <p className="text-lg text-white/80 leading-relaxed">
              To promote access to justice for women and girls in Uganda through legal aid, advocacy, and empowerment, ensuring a society where gender equality is a reality.
            </p>
          </div>
          <div className="bg-slate-900 p-12 rounded-[3rem] text-white space-y-6">
            <div className="bg-white/10 w-16 h-16 rounded-2xl flex items-center justify-center">
              <Eye className="h-8 w-8 text-secondary" />
            </div>
            <h3 className="text-3xl font-serif font-bold">Our Vision</h3>
            <p className="text-lg text-white/80 leading-relaxed">
              A Uganda where every woman and girl lives in dignity, free from violence, and with full access to their fundamental human rights.
            </p>
          </div>
        </div>
      </section>

      {/* History */}
      <section className="py-24 bg-slate-50">
        <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <SectionHeading
              title="Our Journey"
              subtitle="From a small group of volunteer lawyers to a national advocacy powerhouse."
            />
            <div className="space-y-6 text-slate-600 leading-relaxed">
              <p>
                The Centre for Women Justice Uganda was born out of a critical need for specialized legal support for survivors of gender-based violence. In the early 2000s, many women faced insurmountable barriers to justice, from high legal fees to social stigma.
              </p>
              <p>
                Our founders, a group of passionate human rights lawyers, began by offering pro-bono services in community centers. Today, we have grown into a multi-disciplinary team of lawyers, social workers, and advocates working across the country.
              </p>
            </div>
          </div>
          <div className="relative h-[500px] rounded-[2rem] overflow-hidden shadow-xl">
            <Image
              src="https://picsum.photos/seed/history/1000/1000"
              alt="Our History"
              fill
              className="object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24">
        <div className="container-custom">
          <SectionHeading
            title="Our Core Values"
            subtitle="The principles that guide every action we take and every life we touch."
            centered
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'Integrity', desc: 'We maintain the highest ethical standards in all our legal and advocacy work.', icon: Shield },
              { title: 'Empathy', desc: 'We approach every case with deep compassion and understanding for the survivor.', icon: Heart },
              { title: 'Excellence', desc: 'We strive for the best possible outcomes for our clients through rigorous legal practice.', icon: Scale },
              { title: 'Empowerment', desc: 'We believe in giving women the tools to be agents of their own change.', icon: Target },
            ].map((value, i) => (
              <div key={i} className="p-8 rounded-3xl border border-slate-100 text-center space-y-4 hover:bg-slate-50 transition-colors">
                <div className="bg-primary/5 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-8 w-8 text-primary" />
                </div>
                <h4 className="text-xl font-bold text-slate-900">{value.title}</h4>
                <p className="text-sm text-slate-600">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
