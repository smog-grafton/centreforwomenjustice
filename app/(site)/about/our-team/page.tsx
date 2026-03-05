'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import { ChevronRight, Linkedin, Twitter, Mail } from 'lucide-react';
import { fetchTeamMembers, type TeamMemberApi } from '@/lib/team-api';
import { fetchMembershipPage, type MembershipPageData } from '@/lib/membership-api';

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

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero Section */}
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

      {/* Team Grid Section */}
      <section className="py-24">
        <div className="container-custom">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-6">
                  <div className="aspect-[3/4] rounded-2xl bg-slate-200 animate-pulse" />
                  <div className="h-6 bg-slate-200 rounded w-1/2 mx-auto animate-pulse" />
                  <div className="h-4 bg-slate-200 rounded w-1/3 mx-auto animate-pulse" />
                  <div className="h-16 bg-slate-200 rounded animate-pulse" />
                </div>
              ))}
            </div>
          ) : members.length === 0 ? (
            <p className="text-center text-slate-500 py-12">No team members yet. Add them in the admin under People → Team Members (group: Staff).</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {members.map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="relative aspect-[3/4] mb-6 overflow-hidden rounded-2xl bg-slate-200">
                    {member.image ? (
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-4xl font-serif font-bold text-slate-400">
                        {member.name.charAt(0)}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-8">
                      <div className="flex space-x-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <a href="#" className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-primary transition-colors" aria-label="LinkedIn">
                          <Linkedin className="w-5 h-5" />
                        </a>
                        <a href="#" className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-primary transition-colors" aria-label="Twitter">
                          <Twitter className="w-5 h-5" />
                        </a>
                        <a href={`mailto:${member.slug}@cwju.org`} className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-primary transition-colors" aria-label="Email">
                          <Mail className="w-5 h-5" />
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <h3 className="text-2xl font-serif font-bold text-slate-900 mb-1">{member.name}</h3>
                    <p className="text-primary font-medium mb-4">{member.role || 'Team Member'}</p>
                    {member.bio && (
                      <p className="text-slate-600 leading-relaxed text-sm">
                        {member.bio}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Join Us CTA */}
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
