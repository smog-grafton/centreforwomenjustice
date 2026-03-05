import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, CheckCircle2, Heart, Share2, ShieldCheck, Target } from 'lucide-react';
import { fetchCampaignBySlug } from '@/lib/donate-api';
import { formatCurrency, formatDate } from '@/lib/format';
import { Button } from '@/components/ui/Common';

export default async function CampaignDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const campaign = await fetchCampaignBySlug(slug);

  if (!campaign) {
    notFound();
  }

  const goal = Number(campaign.goal_amount) || 1;
  const raised = Number(campaign.raised_amount) || 0;
  const progress = Math.min(100, (raised / goal) * 100);
  const coverSrc = campaign.cover_image_url || campaign.cover_image || 'https://picsum.photos/seed/campaign/1200/800';
  const impactBullets = campaign.impact_bullets ?? [];
  const endDate = campaign.end_date ? formatDate(campaign.end_date) : '—';

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Header - campaign featured image as background */}
      <section className="relative h-[60vh] min-h-[400px] flex items-end pb-12">
        <Image
          src={coverSrc}
          alt={campaign.title}
          fill
          className="object-cover"
          priority
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />

        <div className="container-custom relative z-10">
          <Link href="/donate" className="inline-flex items-center text-white/70 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Campaigns
          </Link>
          <div className="max-w-3xl space-y-4">
            <div className="inline-block bg-secondary text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
              Active Campaign
            </div>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white leading-tight">
              {campaign.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24">
        <div className="container-custom grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Left Column: Story */}
          <div className="lg:col-span-2 space-y-12">
            <div className="prose prose-lg max-w-none text-slate-600">
              <h2 className="text-3xl font-serif font-bold text-slate-900 mb-6">The Story</h2>
              {campaign.full_description && (
                <div
                  className="leading-relaxed mb-6 prose prose-slate max-w-none"
                  dangerouslySetInnerHTML={{ __html: campaign.full_description }}
                />
              )}

              <h3 className="text-2xl font-serif font-bold text-slate-900 mb-4">Why This Matters</h3>
              <p className="leading-relaxed mb-8">
                In Uganda, access to justice is often hindered by systemic barriers, lack of legal literacy, and financial constraints.
                This campaign directly addresses these challenges by providing the necessary resources for legal representation and community mediation.
              </p>

              {impactBullets.length > 0 && (
                <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 space-y-6">
                  <h4 className="text-xl font-bold text-slate-900 flex items-center">
                    <Target className="mr-2 h-5 w-5 text-primary" /> Campaign Impact
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {impactBullets.map((bullet, i) => (
                      <div key={i} className="flex items-start space-x-3">
                        <CheckCircle2 className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                        <span className="text-sm font-medium text-slate-700">{bullet}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-8">
              <h3 className="text-2xl font-serif font-bold text-slate-900">Transparency & Trust</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl border border-slate-100 flex items-start space-x-4">
                  <ShieldCheck className="h-8 w-8 text-primary" />
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">Secure Donation</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">Your data is encrypted and processed through secure payment gateways.</p>
                  </div>
                </div>
                <div className="p-6 rounded-2xl border border-slate-100 flex items-start space-x-4">
                  <Heart className="h-8 w-8 text-primary" />
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">Direct Impact</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">90% of your donation goes directly to the program costs for this campaign.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Donation Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 bg-white rounded-[2.5rem] border border-slate-100 shadow-2xl p-8 md:p-10 space-y-8">
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Raised</p>
                    <h4 className="text-3xl font-bold text-primary">{formatCurrency(raised, campaign.currency)}</h4>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Goal</p>
                    <p className="font-bold text-slate-900">{formatCurrency(goal, campaign.currency)}</p>
                  </div>
                </div>

                <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-secondary transition-all duration-1000 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  <span>{Math.round(progress)}% Complete</span>
                  <span>Ends {endDate}</span>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-100">
                <Link href={`/donate/checkout?campaign=${campaign.slug}`}>
                  <Button size="lg" className="w-full text-lg py-8">
                    Donate to this Cause
                  </Button>
                </Link>
                <Button variant="outline" className="w-full">
                  <Share2 className="mr-2 h-4 w-4" /> Share Campaign
                </Button>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl text-center">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                  Join 124 other supporters
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
