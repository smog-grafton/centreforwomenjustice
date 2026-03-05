import { DonationWizard } from '@/components/donate/DonationWizard';
import { ShieldCheck, Heart, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';

export default function CheckoutPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-12 md:py-24">
      <div className="container-custom">
        <div className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <Link href="/donate" className="inline-flex items-center text-slate-500 hover:text-primary font-bold transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Donations
          </Link>
          <div className="flex items-center space-x-6 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="h-4 w-4 text-primary" />
              <span>Secure Checkout</span>
            </div>
            <div className="flex items-center space-x-2">
              <Heart className="h-4 w-4 text-primary" />
              <span>Direct Impact</span>
            </div>
          </div>
        </div>

        <Suspense fallback={<div className="h-96 flex items-center justify-center bg-white rounded-[2.5rem] shadow-2xl border border-slate-100">Loading checkout...</div>}>
          <DonationWizard />
        </Suspense>

        <div className="mt-16 max-w-3xl mx-auto text-center space-y-4">
          <p className="text-xs text-slate-400 leading-relaxed">
            By donating, you agree to our Terms of Service and Privacy Policy. 
            All donations are processed securely. The Centre for Women Justice Uganda is a registered NGO.
          </p>
          <div className="flex justify-center space-x-4 opacity-30 grayscale">
            {/* Payment Icons Placeholder */}
            <div className="w-10 h-6 bg-slate-400 rounded" />
            <div className="w-10 h-6 bg-slate-400 rounded" />
            <div className="w-10 h-6 bg-slate-400 rounded" />
            <div className="w-10 h-6 bg-slate-400 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}
