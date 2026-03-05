'use client';

import { use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowLeft, CheckCircle2, Share2, MessageSquare, Users } from 'lucide-react';
import { Button, SectionHeading } from '@/components/ui/Common';
import { programs } from '@/data/mock-data';
import { notFound } from 'next/navigation';

export default function ProgramDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const program = programs.find((p) => p.slug === slug);

  if (!program) {
    notFound();
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px]">
        <Image
          src={program.image}
          alt={program.title}
          fill
          className="object-cover"
          priority
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center">
          <div className="container-custom">
            <Link href="/programs" className="inline-flex items-center text-white/80 hover:text-white mb-8 transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Programs
            </Link>
            <div className="max-w-3xl space-y-6">
              <h1 className="text-4xl md:text-6xl font-serif font-bold text-white leading-tight">
                {program.title}
              </h1>
              <p className="text-xl text-white/80 leading-relaxed">
                {program.excerpt}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-24">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-8 space-y-12">
              <div className="space-y-6">
                <h2 className="text-3xl font-serif font-bold text-slate-900">Program Overview</h2>
                <div className="prose prose-lg max-w-none text-slate-600 leading-relaxed">
                  <p>{program.description}</p>
                  <p>
                    Our approach is built on years of experience working within the Ugandan legal system and understanding the unique challenges faced by women. We don&apos;t just provide legal advice; we provide a pathway to empowerment.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-slate-50 p-8 rounded-3xl space-y-4">
                  <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Who We Serve</h3>
                  <p className="text-sm text-slate-600">Women and girls from marginalized communities, survivors of GBV, and those facing property rights violations.</p>
                </div>
                <div className="bg-slate-50 p-8 rounded-3xl space-y-4">
                  <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center">
                    <MessageSquare className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">How to Access</h3>
                  <p className="text-sm text-slate-600">Visit our clinics, call our toll-free line, or fill out the intake form on our website.</p>
                </div>
              </div>

              <div className="space-y-8">
                <h2 className="text-3xl font-serif font-bold text-slate-900">Key Outcomes & Impact</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {program.outcomes.map((outcome, i) => (
                    <div key={i} className="flex items-start space-x-3 p-4 rounded-2xl border border-slate-100">
                      <CheckCircle2 className="h-6 w-6 text-secondary flex-shrink-0" />
                      <span className="text-slate-700 font-medium">{outcome}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4 space-y-8">
              <div className="bg-slate-900 p-10 rounded-[2rem] text-white space-y-8">
                <h3 className="text-2xl font-serif font-bold">Need Assistance?</h3>
                <p className="text-white/70">If you need help related to this program, our legal team is ready to assist you.</p>
                <div className="space-y-4">
                  <Link href="/get-help">
                    <Button className="w-full bg-secondary text-white hover:bg-secondary/90">Apply for Legal Aid</Button>
                  </Link>
                  <Link href="/contact">
                    <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white hover:text-slate-900">Contact Program Lead</Button>
                  </Link>
                </div>
              </div>

              <div className="bg-slate-50 p-8 rounded-[2rem] space-y-6">
                <h3 className="text-xl font-bold text-slate-900">Other Programs</h3>
                <div className="space-y-4">
                  {programs.filter(p => p.slug !== slug).map(p => (
                    <Link key={p.id} href={`/programs/${p.slug}`} className="group block p-4 rounded-xl hover:bg-white hover:shadow-md transition-all">
                      <h4 className="font-bold text-slate-900 group-hover:text-primary transition-colors">{p.title}</h4>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-1">{p.excerpt}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
