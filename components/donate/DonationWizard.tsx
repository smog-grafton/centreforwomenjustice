'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import {
  CheckCircle2,
  CreditCard,
  Smartphone,
  Landmark,
  ExternalLink,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  Loader2,
  Heart,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Common';
import { Stepper } from '@/components/ui/Stepper';
import { formatCurrency } from '@/lib/format';
import {
  fetchDonatePage,
  fetchCampaigns,
  submitDonation,
  type CampaignApi,
  type PaymentGatewayApi,
} from '@/lib/donate-api';

const STEPS = ['Campaign', 'Amount', 'Details', 'Method', 'Review'];

export function DonationWizard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const campaignSlugParam = searchParams.get('campaign');

  const [campaigns, setCampaigns] = useState<CampaignApi[]>([]);
  const [paymentGateways, setPaymentGateways] = useState<PaymentGatewayApi[]>([]);
  const [loaded, setLoaded] = useState(false);

  const [step, setStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    campaignSlug: null as string | null,
    amount: 50,
    frequency: 'one-time' as 'one-time' | 'monthly',
    donorName: '',
    donorEmail: '',
    isAnonymous: false,
    payment_gateway_id: null as number | null,
    paymentType: 'card' as string,
  });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const [pageData, campaignsData] = await Promise.all([
        fetchDonatePage(),
        fetchCampaigns(),
      ]);
      if (cancelled) return;
      setCampaigns(campaignsData);
      setPaymentGateways(pageData?.payment_gateways ?? []);
      setLoaded(true);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!loaded || !campaignSlugParam) return;
    const match = campaigns.some((c) => c.slug === campaignSlugParam);
    if (match) {
      setFormData((prev) => ({ ...prev, campaignSlug: campaignSlugParam }));
      setStep(1);
    }
  }, [loaded, campaignSlugParam, campaigns]);

  const nextStep = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const prevStep = () => setStep((s) => Math.max(s - 1, 0));

  const handleDonate = async () => {
    setIsProcessing(true);
    try {
      const data = await submitDonation({
        campaign_slug: formData.campaignSlug || null,
        amount: formData.amount,
        currency: 'USD',
        frequency: formData.frequency,
        donor_name: formData.isAnonymous ? null : formData.donorName,
        donor_email: formData.donorEmail,
        is_anonymous: formData.isAnonymous,
        payment_gateway_id: formData.payment_gateway_id,
      });
      router.push(`/donate/receipt/${data.id}`);
    } catch (err) {
      console.error(err);
      setIsProcessing(false);
    }
  };

  const currentCampaign = formData.campaignSlug
    ? campaigns.find((c) => c.slug === formData.campaignSlug)
    : null;
  const selectedGateway = formData.payment_gateway_id
    ? paymentGateways.find((pg) => pg.id === formData.payment_gateway_id)
    : null;

  const automaticGateways = paymentGateways.filter((pg) => pg.type === 'automatic');
  const manualGateways = paymentGateways.filter((pg) => pg.type === 'manual');
  const externalGateways = paymentGateways.filter((pg) => pg.type === 'external');

  const defaultAutomaticId = automaticGateways[0]?.id ?? null;
  const defaultManualId = manualGateways[0]?.id ?? null;

  if (!loaded) {
    return (
      <div className="max-w-3xl mx-auto bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden">
        <div className="bg-slate-900 p-8 md:p-12 text-white text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Loading donation form...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden">
      <div className="bg-slate-900 p-8 md:p-12 text-white relative overflow-hidden">
        <div className="relative z-10 space-y-4">
          <div className="flex items-center space-x-3 text-secondary">
            <Heart className="h-6 w-6 fill-current" />
            <span className="text-sm font-bold uppercase tracking-widest">Support CWJU</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold">Make a Donation</h2>
          <Stepper steps={STEPS} currentStep={step} className="pt-4" />
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      </div>

      <div className="p-8 md:p-12">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="step0"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h3 className="text-xl font-bold text-slate-900">Where should your donation go?</h3>
              <div className="grid grid-cols-1 gap-4">
                <button
                  onClick={() => {
                    setFormData({ ...formData, campaignSlug: null });
                    nextStep();
                  }}
                  className={cn(
                    'p-6 rounded-2xl border-2 text-left transition-all',
                    formData.campaignSlug === null ? 'border-primary bg-primary/5' : 'border-slate-100 hover:border-slate-200',
                  )}
                >
                  <h4 className="font-bold text-slate-900">General Fund</h4>
                  <p className="text-sm text-slate-500">Support our greatest needs across all programs.</p>
                </button>
                {campaigns.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      setFormData({ ...formData, campaignSlug: c.slug });
                      nextStep();
                    }}
                    className={cn(
                      'p-6 rounded-2xl border-2 text-left transition-all',
                      formData.campaignSlug === c.slug ? 'border-primary bg-primary/5' : 'border-slate-100 hover:border-slate-200',
                    )}
                  >
                    <h4 className="font-bold text-slate-900">{c.title}</h4>
                    <p className="text-sm text-slate-500 line-clamp-1">{c.short_description ?? ''}</p>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-slate-900">Select Amount</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[25, 50, 100, 250].map((amt) => (
                    <button
                      key={amt}
                      onClick={() => setFormData({ ...formData, amount: amt })}
                      className={cn(
                        'py-4 rounded-xl font-bold transition-all',
                        formData.amount === amt ? 'bg-primary text-white shadow-lg' : 'bg-slate-50 text-slate-600 hover:bg-slate-100',
                      )}
                    >
                      ${amt}
                    </button>
                  ))}
                </div>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">$</span>
                  <input
                    type="number"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) || 0 })}
                    className="w-full pl-10 pr-4 py-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/20 outline-none font-bold"
                    placeholder="Custom amount"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-slate-900">Frequency</h3>
                <div className="flex space-x-4">
                  {(['one-time', 'monthly'] as const).map((freq) => (
                    <button
                      key={freq}
                      onClick={() => setFormData({ ...formData, frequency: freq })}
                      className={cn(
                        'flex-1 py-3 rounded-xl font-bold capitalize transition-all',
                        formData.frequency === freq ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-600 hover:bg-slate-100',
                      )}
                    >
                      {freq.replace('-', ' ')}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex justify-between pt-6">
                <Button variant="ghost" onClick={prevStep}>Back</Button>
                <Button onClick={nextStep}>Continue</Button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h3 className="text-xl font-bold text-slate-900">Your Details</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Full Name</label>
                    <input
                      type="text"
                      value={formData.donorName}
                      onChange={(e) => setFormData({ ...formData, donorName: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/20 outline-none"
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Email Address</label>
                    <input
                      type="email"
                      value={formData.donorEmail}
                      onChange={(e) => setFormData({ ...formData, donorEmail: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/20 outline-none"
                      placeholder="jane@example.com"
                    />
                  </div>
                </div>
                <label className="flex items-center space-x-3 p-4 rounded-xl border border-slate-100 cursor-pointer hover:bg-slate-50 transition-colors">
                  <input
                    type="checkbox"
                    checked={formData.isAnonymous}
                    onChange={(e) => setFormData({ ...formData, isAnonymous: e.target.checked })}
                    className="w-5 h-5 text-primary rounded border-slate-300 focus:ring-primary"
                  />
                  <span className="text-sm font-medium text-slate-700">Donate anonymously</span>
                </label>
              </div>
              <div className="flex justify-between pt-6">
                <Button variant="ghost" onClick={prevStep}>Back</Button>
                <Button onClick={nextStep} disabled={!formData.donorName || !formData.donorEmail}>Continue</Button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-slate-900">Choose Donation Method</h3>
                <div className="space-y-4">
                  {automaticGateways.map((pg) => (
                    <div
                      key={pg.id}
                      onClick={() => setFormData({ ...formData, payment_gateway_id: pg.id })}
                      className={cn(
                        'p-6 rounded-2xl border-2 cursor-pointer transition-all',
                        formData.payment_gateway_id === pg.id ? 'border-primary bg-primary/5' : 'border-slate-100 hover:border-slate-200',
                      )}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="bg-primary/10 p-2 rounded-lg">
                            <ShieldCheck className="h-5 w-5 text-primary" />
                          </div>
                          <h4 className="font-bold text-slate-900">{pg.name}</h4>
                        </div>
                        <div
                          className={cn(
                            'w-5 h-5 rounded-full border-2 flex items-center justify-center',
                            formData.payment_gateway_id === pg.id ? 'border-primary' : 'border-slate-300',
                          )}
                        >
                          {formData.payment_gateway_id === pg.id && <div className="w-2.5 h-2.5 bg-primary rounded-full" />}
                        </div>
                      </div>
                      {formData.payment_gateway_id === pg.id && (
                        <div className="grid grid-cols-3 gap-3 pt-2">
                          {[
                            { id: 'card', icon: CreditCard, label: 'Card' },
                            { id: 'mobile', icon: Smartphone, label: 'Mobile' },
                            { id: 'bank', icon: Landmark, label: 'Bank' },
                          ].map((m) => (
                            <button
                              key={m.id}
                              onClick={(e) => {
                                e.stopPropagation();
                                setFormData({ ...formData, paymentType: m.id });
                              }}
                              className={cn(
                                'flex flex-col items-center p-3 rounded-xl border transition-all',
                                formData.paymentType === m.id ? 'bg-white border-primary shadow-sm' : 'bg-white/50 border-transparent hover:bg-white',
                              )}
                            >
                              <m.icon className={cn('h-5 w-5 mb-1', formData.paymentType === m.id ? 'text-primary' : 'text-slate-400')} />
                              <span className="text-[10px] font-bold uppercase">{m.label}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}

                  {manualGateways.map((pg) => (
                    <div
                      key={pg.id}
                      onClick={() => setFormData({ ...formData, payment_gateway_id: pg.id })}
                      className={cn(
                        'p-5 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between',
                        formData.payment_gateway_id === pg.id ? 'border-primary bg-primary/5' : 'border-slate-100 hover:border-slate-200',
                      )}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="bg-slate-100 p-2 rounded-lg">
                          <ShieldCheck className="h-4 w-4 text-slate-500" />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900 text-sm">{pg.name}</h4>
                          <p className="text-[10px] text-slate-500">{pg.description ?? 'We will contact you to arrange an offline donation.'}</p>
                        </div>
                      </div>
                      <div
                        className={cn(
                          'w-5 h-5 rounded-full border-2 flex items-center justify-center',
                          formData.payment_gateway_id === pg.id ? 'border-primary' : 'border-slate-300',
                        )}
                      >
                        {formData.payment_gateway_id === pg.id && <div className="w-2.5 h-2.5 bg-primary rounded-full" />}
                      </div>
                    </div>
                  ))}

                  {externalGateways.length > 0 && (
                    <div className="space-y-3">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Or use external platforms</p>
                      {externalGateways.map((pg) => (
                        <div
                          key={pg.id}
                          onClick={() => setFormData({ ...formData, payment_gateway_id: pg.id })}
                          className={cn(
                            'p-5 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between',
                            formData.payment_gateway_id === pg.id ? 'border-primary bg-primary/5' : 'border-slate-100 hover:border-slate-200',
                          )}
                        >
                          <div className="flex items-center space-x-3">
                            <div className="bg-slate-100 p-2 rounded-lg">
                              <ExternalLink className="h-4 w-4 text-slate-500" />
                            </div>
                            <div>
                              <h4 className="font-bold text-slate-900 text-sm">{pg.name}</h4>
                              <p className="text-[10px] text-slate-500">External</p>
                            </div>
                          </div>
                          <div
                            className={cn(
                              'w-5 h-5 rounded-full border-2 flex items-center justify-center',
                              formData.payment_gateway_id === pg.id ? 'border-primary' : 'border-slate-300',
                            )}
                          >
                            {formData.payment_gateway_id === pg.id && <div className="w-2.5 h-2.5 bg-primary rounded-full" />}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex justify-between pt-6">
                <Button variant="ghost" onClick={prevStep}>Back</Button>
                <Button onClick={nextStep}>Review Donation</Button>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="bg-slate-50 rounded-3xl p-8 space-y-6">
                <div className="flex justify-between items-end border-b border-slate-200 pb-6">
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Total Donation</p>
                    <h4 className="text-4xl font-bold text-primary">{formatCurrency(formData.amount)}</h4>
                    <p className="text-sm text-slate-500 font-medium">
                      {formData.frequency === 'monthly' ? 'Monthly recurring' : 'One-time gift'}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Campaign</p>
                    <p className="font-bold text-slate-900">{currentCampaign?.title ?? 'General Fund'}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Donor</p>
                    <p className="font-bold text-slate-900">{formData.isAnonymous ? 'Anonymous' : formData.donorName}</p>
                    <p className="text-xs text-slate-500">{formData.donorEmail}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Method</p>
                    <p className="font-bold text-slate-900">
                      {selectedGateway
                        ? selectedGateway.type === 'automatic'
                          ? `${selectedGateway.name} (${formData.paymentType})`
                          : selectedGateway.name
                        : '—'}
                    </p>
                  </div>
                </div>
              </div>

              {selectedGateway?.type === 'external' && selectedGateway.url && (
                <div className="bg-secondary/10 p-6 rounded-2xl border border-secondary/20 space-y-4">
                  <p className="text-sm text-slate-700 font-medium">
                    You have chosen to donate via <strong>{selectedGateway.name}</strong>. Clicking the button below will open their platform in a new tab. We will still record your donation intent and show a receipt.
                  </p>
                  <a
                    href={selectedGateway.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-primary font-bold hover:underline"
                  >
                    Go to {selectedGateway.name} <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </div>
              )}

              <div className="flex justify-between pt-6">
                <Button variant="ghost" onClick={prevStep} disabled={isProcessing}>Back</Button>
                <Button
                  onClick={handleDonate}
                  disabled={isProcessing}
                  className="min-w-[180px]"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : selectedGateway?.type === 'external' ? (
                    'I have completed my donation'
                  ) : (
                    'Complete Donation'
                  )}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="bg-slate-50 p-6 border-t border-slate-100 flex items-center justify-center space-x-8 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
        <div className="flex items-center space-x-2">
          <ShieldCheck className="h-4 w-4" />
          <span>Secure SSL</span>
        </div>
        <div className="flex items-center space-x-2">
          <CheckCircle2 className="h-4 w-4" />
          <span>Verified Non-Profit</span>
        </div>
      </div>
    </div>
  );
}
