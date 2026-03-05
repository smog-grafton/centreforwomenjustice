'use client';

import { SectionHeading } from '@/components/ui/Common';

export default function TermsOfServicePage() {
  return (
    <div className="bg-white min-h-screen py-24">
      <div className="container-custom max-w-4xl">
        <SectionHeading
          title="Terms of Service"
          subtitle={`Last updated: ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`}
        />
        <div className="prose prose-slate max-w-none space-y-8 text-slate-600">
          <section className="space-y-4">
            <h3 className="text-2xl font-bold text-slate-900">1. Acceptance of Terms</h3>
            <p>
              By accessing and using the website of the Centre for Women Justice Uganda (CWJ-U), you accept and agree to be bound by the terms and provision of this agreement.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-2xl font-bold text-slate-900">2. Use of the Website</h3>
            <p>
              You agree to use this site only for lawful purposes, and in a manner that does not infringe the rights of, or restrict or inhibit the use and enjoyment of this site by any third party.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-2xl font-bold text-slate-900">3. Intellectual Property</h3>
            <p>
              All content included on this site, such as text, graphics, logos, button icons, images, audio clips, digital downloads, data compilations, and software, is the property of CWJ-U or its content suppliers and protected by international copyright laws.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-2xl font-bold text-slate-900">4. Disclaimer of Warranties</h3>
            <p>
              This site is provided by CWJ-U on an &quot;as is&quot; and &quot;as available&quot; basis. CWJ-U makes no representations or warranties of any kind, express or implied, as to the operation of this site or the information, content, materials, or products included on this site.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-2xl font-bold text-slate-900">5. Limitation of Liability</h3>
            <p>
              CWJ-U will not be liable for any damages of any kind arising from the use of this site, including, but not limited to direct, indirect, incidental, punitive, and consequential damages.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-2xl font-bold text-slate-900">6. Modifications</h3>
            <p>
              CWJ-U reserves the right to make changes to our site, policies, and these Terms of Service at any time. If any of these conditions shall be deemed invalid, void, or for any reason unenforceable, that condition shall be deemed severable and shall not affect the validity and enforceability of any remaining condition.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-2xl font-bold text-slate-900">7. Contact Us</h3>
            <p>
              If you have any questions about these Terms of Service, please contact us at info@cwj-u.org.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
