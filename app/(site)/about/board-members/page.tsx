import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Linkedin, Twitter, Mail, ShieldCheck } from 'lucide-react';
import { SectionHeading } from '@/components/ui/Common';
import { fetchTeamMembers } from '@/lib/team-api';

export const metadata: Metadata = {
  title: 'Board of Directors',
  description: 'Meet the dedicated leaders guiding our mission and ensuring our accountability at Centre for Women Justice Uganda.',
};

export default async function BoardMembersPage() {
  const boardMembers = await fetchTeamMembers('board');

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-48 pb-24 bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-slate-900/90" />
        </div>
        <div className="container-custom relative z-10">
          <div className="mb-6 flex items-center space-x-2 text-sm font-medium text-white/60">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/about" className="hover:text-white transition-colors">About</Link>
            <span>/</span>
            <span className="text-secondary">Board Members</span>
          </div>
          <SectionHeading
            title="Board of Directors"
            subtitle="Meet the dedicated leaders guiding our mission and ensuring our accountability."
            light
          />
        </div>
      </section>

      {/* Board Grid */}
      <section className="py-32 bg-white">
        <div className="container-custom">
          {boardMembers.length === 0 ? (
            <p className="text-center text-slate-500 py-12">No board members yet. Add them in the admin under People → Team Members (group: Board).</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
              {boardMembers.map((member) => (
                <div
                  key={member.id}
                  className="group relative overflow-hidden bg-slate-100 aspect-[3/4] cursor-pointer"
                >
                  {member.image ? (
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105 grayscale group-hover:grayscale-0"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-slate-300 flex items-center justify-center text-slate-500 font-medium">
                      {member.name.charAt(0)}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent opacity-70 transition-opacity duration-700 group-hover:opacity-90" />
                  <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end">
                    <div className="transform transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:-translate-y-2">
                      <div className="w-12 h-px bg-secondary mb-6 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 delay-100" />
                      <h3 className="text-3xl font-serif text-white mb-2">{member.name}</h3>
                      <p className="text-secondary text-xs font-bold tracking-[0.2em] uppercase">
                        {member.role || 'Member'}
                      </p>
                    </div>
                    <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]">
                      <div className="overflow-hidden">
                        <div className="pt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-200">
                          {member.bio && (
                            <p className="text-white/80 text-sm leading-relaxed mb-6">
                              {member.bio}
                            </p>
                          )}
                          <div className="flex items-center space-x-5">
                            <a href="#" className="text-white/50 hover:text-white transition-colors" aria-label="LinkedIn">
                              <Linkedin className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-white/50 hover:text-white transition-colors" aria-label="Twitter">
                              <Twitter className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-white/50 hover:text-white transition-colors" aria-label="Email">
                              <Mail className="w-5 h-5" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Governance Section */}
      <section className="py-24">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto bg-slate-900 rounded-[2rem] p-12 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <ShieldCheck className="w-48 h-48" />
            </div>
            <div className="relative z-10">
              <div className="bg-secondary/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <ShieldCheck className="w-8 h-8 text-secondary" />
              </div>
              <h2 className="text-3xl font-serif font-bold mb-6">Governance & Accountability</h2>
              <div className="space-y-6 text-white/80 leading-relaxed">
                <p>
                  Our Board of Directors is committed to the highest standards of corporate governance. They provide strategic oversight, ensure financial integrity, and safeguard the organization&apos;s mission and values.
                </p>
                <p>
                  The Board operates independently of the executive management team, meeting quarterly to review progress, approve budgets, and set strategic priorities. We believe that strong governance is essential for building trust with our partners, donors, and the communities we serve.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary text-white text-center">
        <div className="container-custom max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Partner With Us</h2>
          <p className="text-xl text-white/80 mb-10">Interested in collaborating or supporting our governance initiatives?</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact" className="w-full sm:w-auto px-8 py-4 bg-white text-primary rounded-full font-bold hover:bg-slate-50 transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
