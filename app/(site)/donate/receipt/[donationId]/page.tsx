import Link from 'next/link';
import {
  CheckCircle2,
  Download,
  Printer,
  Share2,
  ArrowRight,
  Mail,
  Phone,
} from 'lucide-react';
import { formatCurrency, formatDateTime } from '@/lib/format';
import { Button } from '@/components/ui/Common';
import { fetchDonation } from '@/lib/donate-api';
import { siteSettings } from '@/data/siteSettings';

export default async function ReceiptPage({ params }: { params: Promise<{ donationId: string }> }) {
  const { donationId } = await params;
  const donation = await fetchDonation(donationId);

  if (!donation) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center py-24">
        <div className="container-custom max-w-2xl text-center space-y-8">
          <div className="bg-primary/10 w-24 h-24 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-4xl font-serif font-bold text-slate-900">Thank You for Your Support!</h1>
          <p className="text-lg text-slate-600">
            Your donation has been received and is being processed. A receipt will be sent to your email address shortly.
          </p>
          <div className="pt-8">
            <Link href="/">
              <Button size="lg">Return Home</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const campaignTitle = donation.campaign?.title ?? 'General Fund';
  const methodLabel = donation.payment_gateway
    ? donation.payment_gateway.name + (donation.payment_gateway.type === 'automatic' ? ' (card)' : '')
    : 'External';

  return (
    <div className="bg-slate-50 min-h-screen py-12 md:py-24">
      <div className="container-custom max-w-3xl">
        <div className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden">
          <div className="bg-primary p-12 text-white text-center space-y-4 relative overflow-hidden">
            <div className="relative z-10">
              <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
                <CheckCircle2 className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-3xl md:text-4xl font-serif font-bold">Donation Successful</h1>
              <p className="text-white/80 font-medium">
                Thank you, {donation.is_anonymous ? 'Supporter' : donation.donor_name ?? 'Supporter'}!
              </p>
            </div>
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/10 to-transparent" />
          </div>

          <div className="p-8 md:p-12 space-y-12">
            <div className="flex flex-col md:flex-row justify-between gap-8">
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Receipt ID</p>
                <p className="font-mono text-sm font-bold text-slate-900">{donation.receipt_number}</p>
              </div>
              <div className="md:text-right space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Date & Time</p>
                <p className="text-sm font-bold text-slate-900">{formatDateTime(donation.created_at)}</p>
              </div>
            </div>

            <div className="bg-slate-50 rounded-3xl p-8 space-y-6">
              <div className="flex justify-between items-center border-b border-slate-200 pb-6">
                <h3 className="font-bold text-slate-900">Donation Summary</h3>
                <span className="bg-secondary text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                  {donation.frequency}
                </span>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Campaign</span>
                  <span className="font-bold text-slate-900">{campaignTitle}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Payment Method</span>
                  <span className="font-bold text-slate-900 capitalize">{methodLabel}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Donor Name</span>
                  <span className="font-bold text-slate-900">
                    {donation.is_anonymous ? 'Anonymous' : donation.donor_name ?? '—'}
                  </span>
                </div>
                <div className="pt-4 border-t border-slate-200 flex justify-between items-center">
                  <span className="text-lg font-serif font-bold text-slate-900">Total Amount</span>
                  <span className="text-2xl font-bold text-primary">
                    {formatCurrency(donation.amount, donation.currency)}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="outline" className="flex-1">
                  <Download className="mr-2 h-4 w-4" /> Download PDF
                </Button>
                <Button variant="outline" className="flex-1">
                  <Printer className="mr-2 h-4 w-4" /> Print Receipt
                </Button>
              </div>
              <Button className="w-full bg-slate-900 hover:bg-slate-800">
                <Share2 className="mr-2 h-4 w-4" /> Share Your Impact
              </Button>
            </div>

            <div className="pt-12 border-t border-slate-100 space-y-8">
              <div className="text-center space-y-4">
                <h4 className="text-xl font-serif font-bold text-slate-900">Next Steps</h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Your support directly funds our legal clinics and advocacy programs. Follow us on social media to see
                  the real-world impact of your generosity.
                </p>
                <div className="flex justify-center space-x-4">
                  <Link href="/news">
                    <Button variant="ghost" size="sm" className="text-primary font-bold">
                      Read Latest News <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="bg-primary/5 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-white p-3 rounded-full shadow-sm">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Questions?</p>
                    <p className="text-sm font-bold text-slate-900">{siteSettings.contactEmail}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="bg-white p-3 rounded-full shadow-sm">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Support</p>
                    <p className="text-sm font-bold text-slate-900">{siteSettings.supportPhone}</p>
                  </div>
                </div>
              </div>

              <p className="text-[10px] text-slate-400 text-center leading-relaxed italic">
                {siteSettings.receiptFooterText}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link href="/" className="text-sm font-bold text-primary hover:underline">
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
