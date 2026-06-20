'use client';

import { SectionHeading } from '@/components/ui/Common';

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-white min-h-screen py-24">
      <div className="container-custom max-w-4xl">
        <SectionHeading
          title="Privacy Policy"
          subtitle="Last updated: March 1, 2024"
        />
        <div className="prose prose-slate max-w-none space-y-8 text-slate-600">
          <section className="space-y-4">
            <h3 className="text-2xl font-bold text-slate-900">1. Introduction</h3>
            <p>
              The Centre for Women Justice Uganda (CWJU) is committed to protecting the privacy and confidentiality of the individuals we serve. This Privacy Policy explains how we collect, use, and safeguard your personal information.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-2xl font-bold text-slate-900">2. Information We Collect</h3>
            <p>
              We collect information that you provide to us directly, such as when you fill out our intake form, subscribe to our newsletter, or donate to our cause. This may include:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Name and contact information</li>
              <li>Demographic information</li>
              <li>Details related to your legal case (for intake purposes)</li>
              <li>Payment information (for donations)</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h3 className="text-2xl font-bold text-slate-900">3. How We Use Your Information</h3>
            <p>
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide legal aid and advocacy services</li>
              <li>Communicate with you about our work and impact</li>
              <li>Process donations and provide tax receipts</li>
              <li>Improve our services and website performance</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h3 className="text-2xl font-bold text-slate-900">4. Confidentiality and Data Security</h3>
            <p>
              Confidentiality is a cornerstone of our work. We implement robust security measures to protect your data from unauthorized access, disclosure, or alteration. Legal case details are protected by attorney-client privilege where applicable.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-2xl font-bold text-slate-900">5. Contact Us</h3>
            <p>
              If you have any questions about this Privacy Policy, please contact us at info@CWJU.org.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
