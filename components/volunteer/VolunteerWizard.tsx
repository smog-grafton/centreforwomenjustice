'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, 
  Briefcase, 
  Calendar, 
  CheckCircle2, 
  Loader2, 
  Send,
  ArrowRight,
  ArrowLeft,
  Users,
  Heart
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Common';
import { Stepper } from '@/components/ui/Stepper';
import { volunteerOpportunities } from '@/data/volunteerOpportunities';
import { submitVolunteerApplication } from '@/lib/volunteer-api';

const STEPS = ['Personal', 'Interests', 'Skills', 'Review'];

export function VolunteerWizard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialRoleId = searchParams.get('role');

  const [step, setStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    interests: initialRoleId ? [initialRoleId] : [] as string[],
    skills: '',
    availability: 'Part-time',
    message: '',
    consent: false
  });

  const nextStep = () => setStep(s => Math.min(s + 1, STEPS.length - 1));
  const prevStep = () => setStep(s => Math.max(s - 1, 0));

  const handleSubmit = async () => {
    if (formData.interests.length === 0) {
      return;
    }

    setIsProcessing(true);
    try {
      const primaryInterestId = formData.interests[0];
      const opportunity = volunteerOpportunities.find((o) => o.id === primaryInterestId);

      const response = await submitVolunteerApplication({
        volunteer_opportunity_slug: opportunity?.id ?? primaryInterestId,
        applicant_name: `${formData.firstName} ${formData.lastName}`.trim(),
        applicant_email: formData.email || undefined,
        applicant_phone: formData.phone || undefined,
        message: formData.message || formData.skills,
        meta: {
          availability: formData.availability,
          interests: formData.interests,
        },
      });

      if (!response.success) {
        // Minimal error handling – could be expanded to show specific messages.
        setIsProcessing(false);
        return;
      }

      router.push('/volunteer/thanks');
    } catch (error) {
      console.error(error);
      setIsProcessing(false);
    }
  };

  const toggleInterest = (id: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(id)
        ? prev.interests.filter(i => i !== id)
        : [...prev.interests, id]
    }));
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden">
      {/* Header */}
      <div className="bg-primary p-8 md:p-12 text-white relative overflow-hidden">
        <div className="relative z-10 space-y-4">
          <div className="flex items-center space-x-3 text-secondary">
            <Users className="h-6 w-6" />
            <span className="text-sm font-bold uppercase tracking-widest text-white/80">Join Our Team</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold">Volunteer Application</h2>
          <Stepper steps={STEPS} currentStep={step} className="pt-4" />
        </div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-y-1/2 translate-x-1/2" />
      </div>

      <div className="p-8 md:p-12">
        <AnimatePresence mode="wait">
          {/* Step 0: Personal Info */}
          {step === 0 && (
            <motion.div
              key="step0"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h3 className="text-xl font-bold text-slate-900 flex items-center">
                <User className="mr-2 h-5 w-5 text-primary" /> Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">First Name</label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/20 outline-none"
                    placeholder="Jane"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">Last Name</label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/20 outline-none"
                    placeholder="Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/20 outline-none"
                    placeholder="jane@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">Phone Number</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/20 outline-none"
                    placeholder="+256 ..."
                  />
                </div>
              </div>
              <div className="flex justify-end pt-6">
                <Button onClick={nextStep} disabled={!formData.firstName || !formData.lastName || !formData.email}>
                  Continue <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 1: Interests */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h3 className="text-xl font-bold text-slate-900 flex items-center">
                <Heart className="mr-2 h-5 w-5 text-primary" /> Areas of Interest
              </h3>
              <p className="text-sm text-slate-500">Select one or more areas where you would like to contribute.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {volunteerOpportunities.map(opp => (
                  <div
                    key={opp.id}
                    onClick={() => toggleInterest(opp.id)}
                    className={cn(
                      "p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center space-x-3",
                      formData.interests.includes(opp.id) ? "border-primary bg-primary/5" : "border-slate-100 hover:border-slate-200"
                    )}
                  >
                    <div className={cn("w-5 h-5 rounded-full border-2 flex items-center justify-center", formData.interests.includes(opp.id) ? "border-primary" : "border-slate-300")}>
                      {formData.interests.includes(opp.id) && <div className="w-2.5 h-2.5 bg-primary rounded-full" />}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{opp.title}</h4>
                      <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">{opp.category}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between pt-6">
                <Button variant="ghost" onClick={prevStep}>Back</Button>
                <Button onClick={nextStep} disabled={formData.interests.length === 0}>
                  Continue <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 2: Skills & Availability */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h3 className="text-xl font-bold text-slate-900 flex items-center">
                <Briefcase className="mr-2 h-5 w-5 text-primary" /> Skills & Availability
              </h3>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">Relevant Skills & Experience</label>
                  <textarea
                    value={formData.skills}
                    onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/20 outline-none resize-none"
                    placeholder="Tell us about your background..."
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">Availability</label>
                  <div className="flex space-x-4">
                    {['Full-time', 'Part-time', 'Weekends'].map(type => (
                      <button
                        key={type}
                        onClick={() => setFormData({ ...formData, availability: type })}
                        className={cn(
                          "flex-1 py-3 rounded-xl font-bold transition-all",
                          formData.availability === type ? "bg-slate-900 text-white" : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                        )}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex justify-between pt-6">
                <Button variant="ghost" onClick={prevStep}>Back</Button>
                <Button onClick={nextStep} disabled={!formData.skills}>
                  Continue <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Review */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="bg-slate-50 rounded-3xl p-8 space-y-6">
                <div className="grid grid-cols-2 gap-8 border-b border-slate-200 pb-6">
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Applicant</p>
                    <p className="font-bold text-slate-900">{formData.firstName} {formData.lastName}</p>
                    <p className="text-xs text-slate-500">{formData.email}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Availability</p>
                    <p className="font-bold text-slate-900">{formData.availability}</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Interests</p>
                  <div className="flex flex-wrap gap-2">
                    {formData.interests.map(id => (
                      <span key={id} className="bg-white px-3 py-1 rounded-full text-xs font-bold text-primary border border-slate-200">
                        {volunteerOpportunities.find(o => o.id === id)?.title}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <label className="flex items-start space-x-3 p-4 rounded-xl border border-slate-100 cursor-pointer hover:bg-slate-50 transition-colors">
                <input
                  type="checkbox"
                  checked={formData.consent}
                  onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                  className="mt-1 w-5 h-5 text-primary rounded border-slate-300 focus:ring-primary"
                />
                <span className="text-xs text-slate-600 leading-relaxed">
                  I consent to the Centre for Women Justice Uganda storing my information and contacting me regarding volunteer opportunities. I understand that this is an application and does not guarantee a volunteer position.
                </span>
              </label>

              <div className="flex justify-between pt-6">
                <Button variant="ghost" onClick={prevStep} disabled={isProcessing}>Back</Button>
                <Button 
                  onClick={handleSubmit} 
                  disabled={isProcessing || !formData.consent}
                  className="min-w-[180px]"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Application <Send className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
