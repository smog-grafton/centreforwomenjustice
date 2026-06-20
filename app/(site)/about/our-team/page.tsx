'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import { ChevronRight, Mail } from 'lucide-react';
import { fetchTeamMembers, type TeamMemberApi } from '@/lib/team-api';
import { fetchMembershipPage, type MembershipPageData } from '@/lib/membership-api';

interface TeamHierarchySection {
  key: string;
  title: string;
  description: string | null;
  sort_order: number;
  members: TeamMemberApi[];
}

function buildHierarchy(members: TeamMemberApi[]): TeamHierarchySection[] {
  const groups = new Map<string, TeamHierarchySection>();

  members.forEach((member) => {
    const key = member.section?.slug ?? 'team-members';

    if (!groups.has(key)) {
      groups.set(key, {
        key,
        title: member.section?.title ?? 'Team Members',
        description: member.section?.description ?? null,
        sort_order: member.section?.sort_order ?? 999,
        members: [],
      });
    }

    groups.get(key)?.members.push(member);
  });

  return Array.from(groups.values()).sort((a, b) => a.sort_order - b.sort_order);
}

function TeamMemberCard({ member, featured = false }: { member: TeamMemberApi; featured?: boolean }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.45 }}
      className={featured ? 'grid gap-8 lg:grid-cols-[320px_1fr] items-center border-b border-slate-200 pb-10' : 'group'}
    >
      <div className={featured ? 'relative aspect-[4/5] overflow-hidden rounded-2xl bg-slate-200' : 'relative aspect-[4/5] mb-5 overflow-hidden rounded-2xl bg-slate-200'}>
        {member.image ? (
          <Image
            src={member.image}
            alt={member.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-4xl font-serif font-bold text-slate-400">
            {member.name.charAt(0)}
          </div>
        )}
      </div>

      <div className={featured ? 'space-y-5' : 'space-y-3'}>
        <div>
          <h3 className={featured ? 'text-3xl md:text-4xl font-serif font-bold text-slate-900' : 'text-2xl font-serif font-bold text-slate-900'}>
            {member.name}
          </h3>
          <p className="text-primary font-semibold">{member.role || 'Team Member'}</p>
        </div>
        {member.bio && (
          <p className={featured ? 'text-slate-600 leading-8 max-w-3xl' : 'text-slate-600 leading-relaxed text-sm'}>
            {member.bio}
          </p>
        )}
        <a
          href={`mailto:${member.slug}@cwju.org`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-primary transition-colors"
        >
          <Mail className="h-4 w-4" />
          Contact
        </a>
      </div>
    </motion.article>
  );
}

export default function OurTeamPage() {
  const [members, setMembers] = useState<TeamMemberApi[]>([]);
  const [loading, setLoading] = useState(true);
  const [membership, setMembership] = useState<MembershipPageData | null>(null);

  useEffect(() => {
    fetchTeamMembers('staff').then((data) => {
      setMembers(data);
      setLoading(false);
    });
    fetchMembershipPage().then((data) => setMembership(data));
  }, []);

  const hierarchy = useMemo(() => buildHierarchy(members), [members]);

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0 bg-slate-900/90" />
        <div className="relative z-10 container-custom text-center text-white mt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center space-x-2 text-sm font-medium mb-6 opacity-90"
          >
            <Link href="/" className="hover:text-primary-300 transition-colors">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <span>About</span>
            <ChevronRight className="h-4 w-4" />
            <span className="text-primary-300">Our Team</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-6xl font-serif font-bold mb-6 tracking-tight"
          >
            Meet Our Team
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl max-w-2xl mx-auto font-light opacity-90"
          >
            Dedicated professionals united by a shared vision of justice, equality, and empowerment for women and girls in Uganda.
          </motion.p>
        </div>
      </section>

      <section className="py-24">
        <div className="container-custom">
          {loading ? (
            <div className="space-y-16">
              {[1, 2, 3].map((section) => (
                <div key={section} className="space-y-8">
                  <div className="h-8 bg-slate-200 rounded w-64 animate-pulse" />
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="space-y-5">
                        <div className="aspect-[4/5] rounded-2xl bg-slate-200 animate-pulse" />
                        <div className="h-6 bg-slate-200 rounded w-1/2 animate-pulse" />
                        <div className="h-4 bg-slate-200 rounded w-1/3 animate-pulse" />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : hierarchy.length === 0 ? (
            <p className="text-center text-slate-500 py-12">No team members yet. Add them in the admin under People → Team Members (group: Staff).</p>
          ) : (
            <div className="space-y-20">
              {hierarchy.map((section, sectionIndex) => {
                const [lead, ...rest] = section.members;

                return (
                  <section key={section.key} className="space-y-10">
                    <div className="max-w-3xl">
                      <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary mb-3">
                        {String(sectionIndex + 1).padStart(2, '0')}
                      </p>
                      <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900">
                        {section.title}
                      </h2>
                      {section.description && (
                        <p className="mt-3 text-slate-600 leading-relaxed">{section.description}</p>
                      )}
                    </div>

                    {lead && <TeamMemberCard member={lead} featured={sectionIndex === 0} />}

                    {rest.length > 0 && (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {rest.map((member) => (
                          <TeamMemberCard key={member.id} member={member} />
                        ))}
                      </div>
                    )}
                  </section>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <section className="py-20 bg-white border-t border-slate-100">
        <div className="container-custom max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-6">
            {membership?.cta.title ?? 'Join Our Mission'}
          </h2>
          <p className="text-lg text-slate-600 mb-8">
            {membership?.cta.body ??
              "We are always looking for passionate individuals to join our team, volunteer, or partner with us in our fight for women's justice."}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/contact" className="px-8 py-3 bg-primary text-white rounded-full font-medium hover:bg-primary-600 transition-colors">
              Contact Us
            </Link>
            <Link href="/about/membership" className="px-8 py-3 bg-slate-100 text-slate-900 rounded-full font-medium hover:bg-slate-200 transition-colors">
              Become a Member
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
