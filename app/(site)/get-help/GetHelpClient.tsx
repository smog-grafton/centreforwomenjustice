'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import type { ContactSettingsData } from '@/lib/settings-api';
import { submitHelpRequest } from '@/lib/help-api';

interface GetHelpClientProps {
  initialData: ContactSettingsData | null;
}

export default function GetHelpPage({ initialData }: GetHelpClientProps) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [assistanceSelections, setAssistanceSelections] = useState<string[]>([]);
  const [consentChecked, setConsentChecked] = useState(false);

  const [form, setForm] = useState({
    full_name: '',
    phone: '',
    district: '',
    preferred_contact: '',
    description: '',
  });

  const hero = initialData?.get_help?.hero ?? {
    title: 'Get help.',
    subtitle:
      'If you are a woman or girl in Uganda facing injustice, violence, or discrimination, we are here to support you.',
    image_url: null,
  };

  const introBody =
    initialData?.get_help?.intro_body ??
    'Our services are free, confidential, and trauma-informed.';

  const emergencyPhone = initialData?.helpline.emergency_phone ?? '0800 123 456';
  const helpEmail = initialData?.helpline.email ?? 'help@awla.org';

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const toggleAssistanceType = (type: string) => {
    setAssistanceSelections((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccessMessage(null);
    setErrorMessage(null);
    setFieldErrors({});

    const response = await submitHelpRequest({
      full_name: form.full_name,
      phone: form.phone,
      district: form.district || undefined,
      preferred_contact: form.preferred_contact || undefined,
      assistance_types: assistanceSelections,
      description: form.description,
      consent: consentChecked,
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
      response.message ??
        'Thank you for reaching out. One of our legal officers will contact you within 24-48 hours. If this is an emergency, please call our toll-free line immediately.',
    );
    setSubmitted(true);
    setForm({
      full_name: '',
      phone: '',
      district: '',
      preferred_contact: '',
      description: '',
    });
    setAssistanceSelections([]);
    setConsentChecked(false);
  };

  return (
    <div className="min-h-screen bg-[#f5f5f4] text-[#0a0a0a] font-sans selection:bg-[#0a0a0a] selection:text-white flex flex-col md:flex-row">
      
'      {/* Left Pane - Editorial / Brutalist */}\n'
      <div className="w-full md:w-5/12 lg:w-1/2 bg-[#0a0a0a] text-[#f5f5f4] p-8 md:p-16 lg:p-24 flex flex-col justify-between relative overflow-hidden min-h-[40vh] md:min-h-screen">
        {hero.image_url && (
          <div className="absolute inset-0 opacity-20">
            {/* Background hero image; use plain img to avoid layout shift in this brutalist layout */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={hero.image_url}
              alt="Get help background"
              className="w-full h-full object-cover mix-blend-screen"
            />
          </div>
        )}
        {/* Vertical Rail Text */}
        <div className="absolute left-8 top-24 hidden lg:block">
          <p 
            style={{ writingMode: 'vertical-rl' }} 
            className="rotate-180 tracking-[0.15em] text-[10px] uppercase opacity-50 font-mono"
          >
            CONFIDENTIAL INTAKE FORM // 001
          </p>
        </div>

        <div className="lg:pl-16 relative z-10 pt-12 md:pt-0">
          <Link href="/" className="inline-block mb-16 text-sm font-bold tracking-widest uppercase hover:opacity-70 transition-opacity">
            ← Back to Home
          </Link>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-7xl lg:text-8xl font-serif leading-[0.85] tracking-tighter mb-8"
          >
            {hero.title?.split(' ').map((word, index) => (
              <span key={index}>
                {word}
                {index === 0 && <br />}
              </span>
            )) || (
              <>
                Get
                <br />
                help.
              </>
            )}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl font-light max-w-md opacity-80 leading-relaxed"
          >
            {hero.subtitle ??
              'If you are a woman or girl in Uganda facing injustice, violence, or discrimination, we are here to support you.'}
            <br />
            <br />
            {introBody}
          </motion.p>
        </div>

        <div className="lg:pl-16 mt-16 relative z-10">
          <div className="grid grid-cols-2 gap-8 border-t border-white/20 pt-8">
            <div>
              <p className="text-[10px] uppercase tracking-widest opacity-50 font-mono mb-2">Emergency</p>
              <p className="font-serif text-xl">{emergencyPhone}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest opacity-50 font-mono mb-2">Email</p>
              <p className="font-serif text-xl">{helpEmail}</p>
            </div>
          </div>
        </div>

        {/* Decorative oversized element */}
        <div className="absolute -bottom-20 -right-20 text-[20vw] font-serif leading-none opacity-5 select-none pointer-events-none">
          *
        </div>
      </div>

      {/* Right Pane - The Form */}
      <div className="w-full md:w-7/12 lg:w-1/2 p-8 md:p-16 lg:p-24 flex items-center justify-center bg-[#f5f5f4] relative">
        <div className="w-full max-w-xl">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="border border-[#0a0a0a] p-12 bg-white relative"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-[#0a0a0a]" />
              <CheckCircle2 className="w-12 h-12 mb-6" strokeWidth={1.5} />
              <h2 className="text-3xl font-serif leading-tight mb-4">Request Received.</h2>
              <p className="text-[#0a0a0a]/70 mb-8 leading-relaxed">
                {successMessage ??
                  'Thank you for reaching out. One of our legal officers will contact you within 24-48 hours. If this is an emergency, please call our toll-free line immediately.'}
              </p>
              <button 
                onClick={() => setSubmitted(false)}
                className="group flex items-center text-xs font-bold uppercase tracking-widest hover:opacity-70 transition-opacity"
              >
                Submit another request <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          ) : (
            <motion.form 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              onSubmit={handleSubmit} 
              className="space-y-10"
            >
              {errorMessage && (
                <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">
                  {errorMessage}
                </div>
              )}
              <div className="space-y-8">
                {/* Input Group */}
                <div className="relative">
                  <input
                    required
                    type="text"
                    id="fullName"
                    name="full_name"
                    value={form.full_name}
                    onChange={handleChange}
                    className="peer w-full bg-transparent border-b border-[#0a0a0a]/30 py-4 text-lg outline-none focus:border-[#0a0a0a] transition-colors placeholder-transparent"
                    placeholder="Full Name (or Alias)"
                  />
                  <label 
                    htmlFor="fullName"
                    className="absolute left-0 -top-3.5 text-[10px] font-bold uppercase tracking-widest text-[#0a0a0a]/50 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#0a0a0a]/50 peer-placeholder-shown:top-4 peer-placeholder-shown:font-normal peer-placeholder-shown:tracking-normal peer-focus:-top-3.5 peer-focus:text-[10px] peer-focus:font-bold peer-focus:tracking-widest peer-focus:text-[#0a0a0a]"
                  >
                    Full Name (or Alias)
                  </label>
                  {fieldErrors.full_name && (
                    <p className="text-xs text-rose-600 mt-1">{fieldErrors.full_name}</p>
                  )}
                </div>

                <div className="relative">
                  <input
                    required
                    type="tel"
                    id="phone"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="peer w-full bg-transparent border-b border-[#0a0a0a]/30 py-4 text-lg outline-none focus:border-[#0a0a0a] transition-colors placeholder-transparent"
                    placeholder="Phone Number"
                  />
                  <label 
                    htmlFor="phone"
                    className="absolute left-0 -top-3.5 text-[10px] font-bold uppercase tracking-widest text-[#0a0a0a]/50 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#0a0a0a]/50 peer-placeholder-shown:top-4 peer-placeholder-shown:font-normal peer-placeholder-shown:tracking-normal peer-focus:-top-3.5 peer-focus:text-[10px] peer-focus:font-bold peer-focus:tracking-widest peer-focus:text-[#0a0a0a]"
                  >
                    Phone Number
                  </label>
                  {fieldErrors.phone && (
                    <p className="text-xs text-rose-600 mt-1">{fieldErrors.phone}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="relative">
                    <select 
                      id="district"
                      name="district"
                      value={form.district}
                      onChange={handleChange}
                      className="peer w-full bg-transparent border-b border-[#0a0a0a]/30 py-4 text-lg outline-none focus:border-[#0a0a0a] transition-colors appearance-none rounded-none"
                    >
                      <option value="" disabled hidden></option>
                      <option value="Kampala">Kampala</option>
                      <option value="Wakiso">Wakiso</option>
                      <option value="Gulu">Gulu</option>
                      <option value="Mbarara">Mbarara</option>
                      <option value="Other">Other</option>
                    </select>
                    <label 
                      htmlFor="district"
                      className="absolute left-0 -top-3.5 text-[10px] font-bold uppercase tracking-widest text-[#0a0a0a]"
                    >
                      District
                    </label>
                    <div className="absolute right-0 top-5 pointer-events-none">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                    </div>
                  </div>

                  <div className="relative">
                    <select 
                      id="contactMethod"
                      name="preferred_contact"
                      value={form.preferred_contact}
                      onChange={handleChange}
                      className="peer w-full bg-transparent border-b border-[#0a0a0a]/30 py-4 text-lg outline-none focus:border-[#0a0a0a] transition-colors appearance-none rounded-none"
                    >
                      <option value="" disabled hidden></option>
                      <option value="Phone Call">Phone Call</option>
                      <option value="WhatsApp">WhatsApp</option>
                      <option value="Email">Email</option>
                    </select>
                    <label 
                      htmlFor="contactMethod"
                      className="absolute left-0 -top-3.5 text-[10px] font-bold uppercase tracking-widest text-[#0a0a0a]"
                    >
                      Preferred Contact
                    </label>
                    <div className="absolute right-0 top-5 pointer-events-none">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 pt-4">
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-[#0a0a0a]">
                    Type of Assistance Needed
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                    {['Domestic Violence', 'Property/Land Rights', 'Child Custody', 'Employment Dispute', 'Sexual Assault', 'Other'].map((type) => (
                      <label key={type} className="flex items-center space-x-3 cursor-pointer group">
                        <div className="relative flex items-center justify-center w-5 h-5 border border-[#0a0a0a]/30 group-hover:border-[#0a0a0a] transition-colors">
                          <input
                            type="checkbox"
                            className="peer sr-only"
                            checked={assistanceSelections.includes(type)}
                            onChange={() => toggleAssistanceType(type)}
                          />
                          <div className="w-3 h-3 bg-[#0a0a0a] opacity-0 peer-checked:opacity-100 transition-opacity" />
                        </div>
                        <span className="text-sm text-[#0a0a0a]/80 group-hover:text-[#0a0a0a] transition-colors">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="relative pt-4">
                  <textarea
                    required
                    id="description"
                    name="description"
                    rows={4}
                    value={form.description}
                    onChange={handleChange}
                    className="peer w-full bg-transparent border-b border-[#0a0a0a]/30 py-4 text-lg outline-none focus:border-[#0a0a0a] transition-colors placeholder-transparent resize-none"
                    placeholder="Brief Description of Your Case"
                  />
                  <label 
                    htmlFor="description"
                    className="absolute left-0 top-0 text-[10px] font-bold uppercase tracking-widest text-[#0a0a0a]/50 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#0a0a0a]/50 peer-placeholder-shown:top-4 peer-placeholder-shown:font-normal peer-placeholder-shown:tracking-normal peer-focus:top-0 peer-focus:text-[10px] peer-focus:font-bold peer-focus:tracking-widest peer-focus:text-[#0a0a0a]"
                  >
                    Brief Description of Your Case
                  </label>
                  {fieldErrors.description && (
                    <p className="text-xs text-rose-600 mt-1">{fieldErrors.description}</p>
                  )}
                </div>

                <div className="pt-4">
                  <label className="flex items-start space-x-4 cursor-pointer group">
                    <div className="relative flex-shrink-0 flex items-center justify-center w-5 h-5 border border-[#0a0a0a]/30 group-hover:border-[#0a0a0a] transition-colors mt-0.5">
                      <input
                        required
                        type="checkbox"
                        className="peer sr-only"
                        checked={consentChecked}
                        onChange={(e) => setConsentChecked(e.target.checked)}
                      />
                      <div className="w-3 h-3 bg-[#0a0a0a] opacity-0 peer-checked:opacity-100 transition-opacity" />
                    </div>
                    <span className="text-xs text-[#0a0a0a]/60 leading-relaxed">
                      I understand that submitting this form does not create an attorney-client relationship. I agree to the processing of my data for the purpose of receiving legal aid.
                    </span>
                  </label>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={submitting}
                className="w-full bg-[#0a0a0a] text-white py-5 px-8 text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#0a0a0a]/90 transition-colors flex justify-between items-center group disabled:opacity-70"
              >
                <span>{submitting ? 'Submitting…' : 'Submit Request'}</span>
                {!submitting && (
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                )}
              </button>
            </motion.form>
          )}
        </div>
      </div>
    </div>
  );
}
