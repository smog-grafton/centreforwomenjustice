'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle2, Users, Building2, HeartHandshake, Send } from 'lucide-react';
import { SectionHeading, Button } from '@/components/ui/Common';
import type { MembershipPageData } from '@/lib/membership-api';
import { submitMembershipApplication } from '@/lib/membership-api';

interface MembershipClientProps {
  initialData: MembershipPageData | null;
}

export default function MembershipPage({ initialData }: MembershipClientProps) {
  const hero = initialData?.hero ?? {
    title: 'Become a Member',
    subtitle:
      'Join a powerful network of advocates, legal professionals, and community leaders dedicated to advancing human rights.',
    image_url: null,
  };

  const whyJoin = initialData?.why_join ?? {
    title: 'Why Join CWJ-U?',
    body:
      "Membership is more than just support; it's active participation in the fight for justice. As a member, you amplify our voice and extend our reach.",
  };

  const types = initialData?.types ?? [];

  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    location: '',
    type: 'individual' as 'individual' | 'organizational',
    reason: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleTypeChange = (value: 'individual' | 'organizational') => {
    setForm((prev) => ({ ...prev, type: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccessMessage(null);
    setErrorMessage(null);
    setFieldErrors({});

    const primaryType =
      types.find((t) => (form.type === 'individual' ? !t.is_organizational : t.is_organizational)) ??
      null;

    const response = await submitMembershipApplication({
      ...form,
      membership_type_slug: primaryType?.slug,
    });

    setSubmitting(false);

    if (!response.success) {
      setErrorMessage(response.message ?? 'Something went wrong.');
      const errors: Record<string, string> = {};
      if (response.errors) {
        for (const [field, messages] of Object.entries(response.errors)) {
          if (messages && messages.length > 0) {
            errors[field] = messages[0];
          }
        }
      }
      setFieldErrors(errors);
      return;
    }

    setSuccessMessage(
      response.message ?? 'Thank you. Your membership application has been submitted.',
    );
    setForm({
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      location: '',
      type: 'individual',
      reason: '',
    });
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-48 pb-24 bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          {hero.image_url && (
            <Image
              src={hero.image_url}
              alt="Membership Background"
              fill
              className="object-cover opacity-30"
              referrerPolicy="no-referrer"
            />
          )}
          <div className="absolute inset-0 bg-slate-900/70 mix-blend-multiply" />
        </div>
        <div className="container-custom relative z-10">
          <div className="mb-6 flex items-center space-x-2 text-sm font-medium text-white/60">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/about" className="hover:text-white transition-colors">About</Link>
            <span>/</span>
            <span className="text-secondary">Membership</span>
          </div>
          <SectionHeading title={hero.title} subtitle={hero.subtitle ?? undefined} light />
        </div>
      </section>

      {/* Why Join */}
      <section className="py-24 bg-slate-50">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-4">
              {whyJoin.title}
            </h2>
            {whyJoin.body && (
              <p className="text-lg text-slate-600">
                {whyJoin.body}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Users className="w-8 h-8 text-primary" />,
                title: 'Community & Networking',
                desc:
                  'Connect with like-minded individuals, legal experts, and activists across Uganda.',
              },
              {
                icon: <HeartHandshake className="w-8 h-8 text-primary" />,
                title: 'Direct Impact',
                desc:
                  'Your membership dues directly fund our legal aid clinics and community education programs.',
              },
              {
                icon: <CheckCircle2 className="w-8 h-8 text-primary" />,
                title: 'Exclusive Resources',
                desc:
                  'Gain access to specialized training, policy briefs, and invitations to our annual general meetings.',
              },
            ].map((benefit, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center hover:shadow-md transition-shadow">
                <div className="bg-primary/5 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{benefit.title}</h3>
                <p className="text-slate-600 leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Membership Types & Form */}
      <section className="py-24">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            
            {/* Types */}
            <div className="space-y-12">
              <div>
                <h2 className="text-3xl font-serif font-bold text-slate-900 mb-6">Membership Categories</h2>
                <p className="text-slate-600 mb-8 leading-relaxed">
                  We offer two main categories of membership to accommodate both individuals passionate about our cause and organizations looking to partner with us.
                </p>
              </div>

              <div className="space-y-6">
                <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Users className="w-24 h-24" />
                  </div>
                  <div className="relative z-10">
                    {types
                      .filter((t) => !t.is_organizational)
                      .map((type) => (
                        <div key={type.id}>
                          <h3 className="text-2xl font-bold text-slate-900 mb-2 flex items-center">
                            <Users className="w-6 h-6 mr-3 text-primary" />
                            {type.name}
                          </h3>
                          {type.description && (
                            <p className="text-slate-600 mb-4">{type.description}</p>
                          )}
                          {type.benefits?.length > 0 && (
                            <ul className="space-y-2">
                              {type.benefits.map((benefit, index) => (
                                <li
                                  key={index}
                                  className="flex items-center text-sm text-slate-700"
                                >
                                  <CheckCircle2 className="w-4 h-4 mr-2 text-secondary" />{' '}
                                  {benefit.text}
                                </li>
                              ))}
                            </ul>
                          )}
                          {(type.annual_fee ?? null) !== null && (
                            <div className="mt-6 pt-6 border-t border-slate-200">
                              <p className="font-bold text-slate-900">
                                Annual Fee:{' '}
                                <span className="text-primary">
                                  {(type.currency || 'UGX')}{' '}
                                  {type.annual_fee?.toLocaleString('en-UG')}
                                </span>
                              </p>
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                </div>

                <div className="bg-slate-900 p-8 rounded-2xl text-white relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Building2 className="w-24 h-24" />
                  </div>
                  <div className="relative z-10">
                    {types
                      .filter((t) => t.is_organizational)
                      .map((type) => (
                        <div key={type.id}>
                          <h3 className="text-2xl font-bold mb-2 flex items-center">
                            <Building2 className="w-6 h-6 mr-3 text-secondary" />
                            {type.name}
                          </h3>
                          {type.description && (
                            <p className="text-white/80 mb-4">{type.description}</p>
                          )}
                          {type.benefits?.length > 0 && (
                            <ul className="space-y-2">
                              {type.benefits.map((benefit, index) => (
                                <li
                                  key={index}
                                  className="flex items-center text-sm text-white/90"
                                >
                                  <CheckCircle2 className="w-4 h-4 mr-2 text-secondary" />{' '}
                                  {benefit.text}
                                </li>
                              ))}
                            </ul>
                          )}
                          {(type.annual_fee ?? null) !== null && (
                            <div className="mt-6 pt-6 border-t border-white/10">
                              <p className="font-bold">
                                Annual Fee:{' '}
                                <span className="text-secondary">
                                  {(type.currency || 'UGX')}{' '}
                                  {type.annual_fee?.toLocaleString('en-UG')}
                                </span>
                              </p>
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="bg-white rounded-[2rem] shadow-xl border border-slate-100 p-8 md:p-12 sticky top-32">
              <h3 className="text-2xl font-serif font-bold text-slate-900 mb-6">
                Apply for Membership
              </h3>
              {successMessage && (
                <div className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
                  {successMessage}
                </div>
              )}
              {errorMessage && (
                <div className="mb-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">
                  {errorMessage}
                </div>
              )}
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">First Name *</label>
                    <input
                      type="text"
                      name="first_name"
                      required
                      value={form.first_name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/20 outline-none transition-shadow"
                      placeholder="Jane"
                    />
                    {fieldErrors.first_name && (
                      <p className="text-xs text-rose-600 mt-1">{fieldErrors.first_name}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Last Name *</label>
                    <input
                      type="text"
                      name="last_name"
                      required
                      value={form.last_name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/20 outline-none transition-shadow"
                      placeholder="Doe"
                    />
                    {fieldErrors.last_name && (
                      <p className="text-xs text-rose-600 mt-1">{fieldErrors.last_name}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/20 outline-none transition-shadow"
                      placeholder="jane@example.com"
                    />
                    {fieldErrors.email && (
                      <p className="text-xs text-rose-600 mt-1">{fieldErrors.email}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={form.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/20 outline-none transition-shadow"
                      placeholder="+256 700 000000"
                    />
                    {fieldErrors.phone && (
                      <p className="text-xs text-rose-600 mt-1">{fieldErrors.phone}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">
                    Location / District *
                  </label>
                  <input
                    type="text"
                    name="location"
                    required
                    value={form.location}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/20 outline-none transition-shadow"
                    placeholder="e.g. Kampala"
                  />
                  {fieldErrors.location && (
                    <p className="text-xs text-rose-600 mt-1">{fieldErrors.location}</p>
                  )}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Membership Type *</label>
                  <div className="grid grid-cols-2 gap-4">
                    <label className="flex items-center p-4 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                      <input
                        type="radio"
                        name="membershipType"
                        value="individual"
                        className="w-4 h-4 text-primary focus:ring-primary"
                        checked={form.type === 'individual'}
                        onChange={() => handleTypeChange('individual')}
                      />
                      <span className="ml-3 font-medium text-slate-900">Individual</span>
                    </label>
                    <label className="flex items-center p-4 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                      <input
                        type="radio"
                        name="membershipType"
                        value="organizational"
                        className="w-4 h-4 text-primary focus:ring-primary"
                        checked={form.type === 'organizational'}
                        onChange={() => handleTypeChange('organizational')}
                      />
                      <span className="ml-3 font-medium text-slate-900">Organizational</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">
                    Why do you want to join? (Optional)
                  </label>
                  <textarea
                    name="reason"
                    rows={4}
                    value={form.reason}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/20 outline-none resize-none transition-shadow"
                    placeholder="Tell us briefly about your interest in CWJ-U..."
                  />
                </div>

                <Button size="lg" className="w-full" disabled={submitting}>
                  {submitting ? 'Submitting...' : 'Submit Application'}{' '}
                  {!submitting && <Send className="ml-2 h-4 w-4" />}
                </Button>
                <p className="text-xs text-slate-500 text-center mt-4">
                  By submitting this form, you agree to our membership terms and conditions. We will contact you regarding payment details.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
