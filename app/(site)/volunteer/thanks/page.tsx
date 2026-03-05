import Link from 'next/link';
import { CheckCircle2, ArrowRight, Heart, Mail, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/Common';

export default function VolunteerThanksPage() {
  return (
    <div className="bg-white min-h-screen flex items-center justify-center py-24">
      <div className="container-custom max-w-3xl">
        <div className="bg-white rounded-[3rem] shadow-2xl border border-slate-100 overflow-hidden">
          <div className="bg-primary p-16 text-white text-center space-y-6 relative overflow-hidden">
            <div className="relative z-10">
              <div className="bg-white/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8 backdrop-blur-sm">
                <CheckCircle2 className="h-10 w-10 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-serif font-bold">Application Received!</h1>
              <p className="text-xl text-white/80 font-medium max-w-md mx-auto">
                Thank you for your interest in joining the Centre for Women Justice Uganda.
              </p>
            </div>
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/10 to-transparent" />
          </div>

          <div className="p-12 space-y-12">
            <div className="space-y-8">
              <h2 className="text-2xl font-serif font-bold text-slate-900 text-center">What Happens Next?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center space-y-4">
                  <div className="bg-slate-50 w-12 h-12 rounded-2xl flex items-center justify-center mx-auto">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">Review</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">Our team will review your application and skills within 5-7 business days.</p>
                </div>
                <div className="text-center space-y-4">
                  <div className="bg-slate-50 w-12 h-12 rounded-2xl flex items-center justify-center mx-auto">
                    <Calendar className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">Interview</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">If there is a match, we will invite you for a brief introductory interview.</p>
                </div>
                <div className="text-center space-y-4">
                  <div className="bg-slate-50 w-12 h-12 rounded-2xl flex items-center justify-center mx-auto">
                    <Heart className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">Onboarding</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">Once accepted, you will receive onboarding materials and start your journey with us.</p>
                </div>
              </div>
            </div>

            <div className="pt-12 border-t border-slate-100 flex flex-col items-center space-y-8">
              <div className="text-center space-y-4">
                <p className="text-slate-600">In the meantime, feel free to explore our latest news and resources.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/news">
                    <Button variant="outline" className="w-full sm:w-auto">
                      Read Our News <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/">
                    <Button className="w-full sm:w-auto">
                      Back to Home
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
