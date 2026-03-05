import { VolunteerWizard } from '@/components/volunteer/VolunteerWizard';
import { ArrowLeft, ShieldCheck, Users } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';

export default function VolunteerApplyPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-12 md:py-24">
      <div className="container-custom">
        <div className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <Link href="/volunteer" className="inline-flex items-center text-slate-500 hover:text-primary font-bold transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Volunteer
          </Link>
          <div className="flex items-center space-x-6 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="h-4 w-4 text-primary" />
              <span>Secure Application</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-primary" />
              <span>Join 50+ Volunteers</span>
            </div>
          </div>
        </div>

        <Suspense fallback={<div className="h-96 flex items-center justify-center bg-white rounded-[2.5rem] shadow-2xl border border-slate-100">Loading application...</div>}>
          <VolunteerWizard />
        </Suspense>

        <div className="mt-16 max-w-3xl mx-auto text-center space-y-4">
          <p className="text-xs text-slate-400 leading-relaxed">
            By applying, you agree to our Privacy Policy regarding the storage and processing of your personal data. 
            We will only use your information to contact you about volunteer opportunities at CWJ-U.
          </p>
        </div>
      </div>
    </div>
  );
}
