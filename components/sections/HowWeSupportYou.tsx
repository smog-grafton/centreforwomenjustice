'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import { PhoneCall, FileSearch, Gavel, HeartHandshake, ArrowRight } from 'lucide-react';
import { Button, SectionHeading } from '@/components/ui/Common';

const steps = [
  {
    id: '01',
    title: 'Reach Out',
    description: 'Connect with us via our hotline or visit our office for a confidential initial conversation.',
    icon: PhoneCall,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
  },
  {
    id: '02',
    title: 'Assessment',
    description: 'Our legal experts review your situation to determine the best path forward for your specific needs.',
    icon: FileSearch,
    color: 'text-amber-600',
    bg: 'bg-amber-50',
  },
  {
    id: '03',
    title: 'Legal Support',
    description: 'We provide direct legal representation, mediation, or advice to ensure your rights are protected.',
    icon: Gavel,
    color: 'text-primary',
    bg: 'bg-primary/5',
  },
  {
    id: '04',
    title: 'Ongoing Care',
    description: 'Beyond the courtroom, we offer counseling and follow-up support to help you rebuild with confidence.',
    icon: HeartHandshake,
    color: 'text-secondary',
    bg: 'bg-secondary/5',
  },
];

export function HowWeSupportYou() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Subtle Background Accents */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-slate-50 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl opacity-30" />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image Column */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative h-[500px] md:h-[650px] rounded-[2rem] overflow-hidden shadow-2xl">
              <Image
                src="/assets/images/home/support/how-support.jpeg"
                alt="Supportive Legal Consultation"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              
              {/* Floating Badge */}
              <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-xl">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <HeartHandshake className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">Trusted by 5,000+ Women</p>
                    <p className="text-xs text-slate-600">Providing safe, confidential legal aid since 2010.</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-secondary/10 rounded-full blur-2xl -z-10" />
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-primary/5 rounded-full blur-3xl -z-10" />
          </motion.div>

          {/* Content Column */}
          <div className="space-y-12">
            <SectionHeading
              title="How We Support Your Journey"
              subtitle="Our process is designed to be safe, confidential, and empowering. We walk with you every step of the way toward justice and healing."
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {steps.map((step, index) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="flex flex-col gap-4">
                    <div className={`w-14 h-14 rounded-2xl ${step.bg} flex items-center justify-center transition-all duration-300 group-hover:shadow-md group-hover:-translate-y-1`}>
                      <step.icon className={`w-7 h-7 ${step.color}`} />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">{step.id}</span>
                        <h3 className="text-lg font-bold text-slate-900 group-hover:text-primary transition-colors">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center gap-4 pt-6 border-t border-slate-100"
            >
              <Link href="/get-help">
                <Button size="lg" className="w-full sm:w-auto px-8 h-14 text-base shadow-lg shadow-primary/20">
                  Get help now
                </Button>
              </Link>
              <Link href="/resources">
                <Button variant="outline" size="lg" className="w-full sm:w-auto px-8 h-14 text-base border-slate-200 hover:bg-slate-50">
                  Explore Resources <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
