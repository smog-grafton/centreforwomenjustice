'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import { SectionHeading, Button } from '@/components/ui/Common';
import type { ContactSettingsData } from '@/lib/settings-api';
import { useState } from 'react';
import { submitContactForm } from '@/lib/contact-api';

interface ContactClientProps {
  initialData: ContactSettingsData | null;
}

export default function ContactPage({ initialData }: ContactClientProps) {
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const hero = initialData?.contact_page.hero ?? {
    title: 'Contact Us',
    subtitle:
      'Have questions about our work or want to partner with us? Reach out to our team.',
    image_url: null,
  };

  const contact = initialData?.contact_page;
  const helpline = initialData?.helpline;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccessMessage(null);
    setErrorMessage(null);
    setFieldErrors({});

    const response = await submitContactForm({
      first_name: form.first_name || undefined,
      last_name: form.last_name || undefined,
      email: form.email,
      message: form.message,
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
      response.message ?? 'Thank you for reaching out. We have received your message.',
    );
    setForm({
      first_name: '',
      last_name: '',
      email: '',
      message: '',
    });
  };

  return (
    <div className="bg-white min-h-screen">
      <section className="relative pt-48 pb-24 bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          {hero.image_url && (
            <Image
              src={hero.image_url}
              alt="Contact Us Background"
              fill
              className="object-cover opacity-30"
              referrerPolicy="no-referrer"
            />
          )}
          <div className="absolute inset-0 bg-slate-900/70 mix-blend-multiply" />
        </div>
        <div className="container-custom relative z-10">
          <SectionHeading
            title={hero.title ?? 'Contact Us'}
            subtitle={
              hero.subtitle ??
              'Have questions about our work or want to partner with us? Reach out to our team.'
            }
            centered
            light
          />
        </div>
      </section>

      <section className="py-24">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-12">
              <div className="space-y-8">
                <h3 className="text-2xl font-serif font-bold text-slate-900">Get in Touch</h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary/5 p-3 rounded-xl">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">Our Office</h4>
                      <p className="text-slate-600 text-sm">
                        {contact?.office.address ?? 'Plot 45, Wampewo Avenue, Kampala, Uganda'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary/5 p-3 rounded-xl">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">Phone</h4>
                      <p className="text-slate-600 text-sm">
                        {contact?.phones.primary ?? '+256 414 123 456'}
                      </p>
                      <p className="text-slate-600 text-sm">
                        {contact?.phones.whatsapp ?? '+256 700 123 456 (WhatsApp)'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary/5 p-3 rounded-xl">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">Email</h4>
                      <p className="text-slate-600 text-sm">
                        {contact?.emails.primary ?? 'info@cwju.org'}
                      </p>
                      <p className="text-slate-600 text-sm">
                        {contact?.emails.legal ?? 'legal@cwju.org'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary/5 p-3 rounded-xl">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">Working Hours</h4>
                      <p className="text-slate-600 text-sm">
                        {contact?.working_hours.weekdays ?? 'Mon - Fri: 8:00 AM - 5:00 PM'}
                      </p>
                      <p className="text-slate-600 text-sm">
                        {contact?.working_hours.weekends ?? 'Sat - Sun: Closed'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900 p-8 rounded-3xl text-white space-y-4">
                <h4 className="text-xl font-bold">
                  {contact?.emergency.heading ?? 'Emergency?'}
                </h4>
                <p className="text-white/70 text-sm">
                  {contact?.emergency.body ??
                    'If you are in immediate danger, please call our 24/7 toll-free emergency line:'}
                </p>
                <p className="text-2xl font-bold text-secondary">
                  {contact?.emergency.phone ?? '0800 123 456'}
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-[2rem] shadow-xl border border-slate-100 p-8 md:p-12">
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
                <form className="space-y-8" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">First Name</label>
                      <input
                        type="text"
                        name="first_name"
                        value={form.first_name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/20 outline-none"
                      />
                      {fieldErrors.first_name && (
                        <p className="text-xs text-rose-600 mt-1">{fieldErrors.first_name}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Last Name</label>
                      <input
                        type="text"
                        name="last_name"
                        value={form.last_name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/20 outline-none"
                      />
                      {fieldErrors.last_name && (
                        <p className="text-xs text-rose-600 mt-1">{fieldErrors.last_name}</p>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/20 outline-none"
                    />
                    {fieldErrors.email && (
                      <p className="text-xs text-rose-600 mt-1">{fieldErrors.email}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Message</label>
                    <textarea
                      rows={6}
                      name="message"
                      required
                      value={form.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/20 outline-none resize-none"
                    />
                    {fieldErrors.message && (
                      <p className="text-xs text-rose-600 mt-1">{fieldErrors.message}</p>
                    )}
                  </div>
                  <Button size="lg" className="w-full md:w-auto" disabled={submitting}>
                    {submitting ? 'Sending...' : 'Send Message'}{' '}
                    {!submitting && <Send className="ml-2 h-4 w-4" />}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="h-[400px] md:h-[500px] w-full relative bg-slate-200">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d31918.032672053545!2d32.50706195!3d0.32512625!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x177dbb0592e1c057%3A0x126aeb925311f265!2sCENTRE%20FOR%20WOMEN%20JUSTICE%20UGANDA%2C%20111%20Owen%20Rd%2C%20Kampala!3m2!1d0.3380882!2d32.5814271!5e0!3m2!1sen!2sug!4v1772602496870!5m2!1sen!2sug" 
          className="absolute inset-0 w-full h-full border-0"
          allowFullScreen={false} 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          title="Centre for Women Justice Uganda Location Map"
        ></iframe>
      </section>

      {/* Helpline Section */}
      <section className="py-24 bg-slate-50">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-sm font-bold tracking-widest text-primary uppercase">
              {helpline?.heading ?? 'Call Helpline'}
            </h2>
            <h3 className="text-3xl md:text-5xl font-serif font-bold text-slate-900">
              {helpline?.subheading ?? 'Talk to someone'}
            </h3>
            <p className="text-lg text-slate-600">
              Our team is available to help with your enquiries on email & phone.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center space-y-4 hover:shadow-md transition-shadow">
              <div className="bg-primary/5 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                <Mail className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-1">Email Address</h4>
                <p className="text-sm text-slate-500 mb-2">Mail to</p>
                <a
                  href={`mailto:${helpline?.email ?? 'info@cwju.org'}`}
                  className="text-primary font-bold hover:underline"
                >
                  {helpline?.email ?? 'info@cwju.org'}
                </a>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center space-y-4 hover:shadow-md transition-shadow">
              <div className="bg-primary/5 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                <Phone className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-1">Call Helpline</h4>
                <p className="text-sm text-slate-500 mb-2">Main Office</p>
                <a
                  href={`tel:${(helpline?.main_phone ?? '+256 414 123 456').replace(/\\s+/g, '')}`}
                  className="text-primary font-bold hover:underline"
                >
                  {helpline?.main_phone ?? '+256 414 123 456'}
                </a>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center space-y-4 hover:shadow-md transition-shadow">
              <div className="bg-primary/5 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                <Phone className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-1">Call Helpline</h4>
                <p className="text-sm text-slate-500 mb-2">Toll Free Emergency</p>
                <a
                  href={`tel:${(helpline?.emergency_phone ?? '0800 123 456').replace(/\\s+/g, '')}`}
                  className="text-primary font-bold hover:underline"
                >
                  {helpline?.emergency_phone ?? '0800 123 456'}
                </a>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center space-y-4 hover:shadow-md transition-shadow">
              <div className="bg-primary/5 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                <Phone className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-1">WhatsApp</h4>
                <p className="text-sm text-slate-500 mb-2">Direct Message</p>
                <a
                  href={`tel:${(helpline?.whatsapp_phone ?? '+256 700 123 456').replace(/\\s+/g, '')}`}
                  className="text-primary font-bold hover:underline"
                >
                  {helpline?.whatsapp_phone ?? '+256 700 123 456'}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
