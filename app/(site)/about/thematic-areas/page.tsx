import Image from 'next/image';
import Link from 'next/link';
import { Heart, Scale, Shield, FileText, Activity, ArrowRight, ChevronRight, LucideIcon } from 'lucide-react';
import { fetchThematicAreas } from '@/lib/thematic-areas-api';

const ICON_MAP: Record<string, LucideIcon> = {
  heart: Heart,
  scale: Scale,
  shield: Shield,
  'file-text': FileText,
  activity: Activity,
};

const COLOR_MAP: Record<string, { color: string; accent: string }> = {
  rose: { color: 'bg-rose-50 text-rose-600 border-rose-100', accent: 'text-rose-600' },
  indigo: { color: 'bg-indigo-50 text-indigo-600 border-indigo-100', accent: 'text-indigo-600' },
  emerald: { color: 'bg-emerald-50 text-emerald-600 border-emerald-100', accent: 'text-emerald-600' },
  amber: { color: 'bg-amber-50 text-amber-600 border-amber-100', accent: 'text-amber-600' },
  cyan: { color: 'bg-cyan-50 text-cyan-600 border-cyan-100', accent: 'text-cyan-600' },
};

export default async function ThematicAreasPage() {
  const thematicAreas = await fetchThematicAreas();
  const heroArea = thematicAreas[0];
  const heroSrc = heroArea?.image ?? null;

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section - background from latest (first by sort_order) thematic area */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        {heroSrc && (
          <Image
            src={heroSrc}
            alt="Women empowerment in Uganda"
            fill
            className="object-cover"
            referrerPolicy="no-referrer"
            priority
          />
        )}
        <div className="absolute inset-0 bg-slate-900/70 mix-blend-multiply" />

        <div className="relative z-10 container-custom text-center text-white mt-16">
          <div className="flex items-center justify-center space-x-2 text-sm font-medium mb-8 opacity-90">
            <Link href="/" className="hover:text-primary-200 transition-colors">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <span>About</span>
            <ChevronRight className="h-4 w-4" />
            <span className="text-primary-300">Thematic Areas</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 tracking-tight">
            Our Thematic Areas
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto font-light opacity-90 leading-relaxed">
            Driving systemic change through focused, strategic interventions for women and girls in Uganda.
          </p>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-20 bg-slate-50">
        <div className="container-custom max-w-4xl text-center">
          <p className="text-2xl md:text-3xl font-serif text-slate-700 leading-relaxed">
            At CWJ-U, our work is structured around <span className="text-primary font-bold italic">five core pillars</span>.
            Each area is designed to address specific systemic challenges and empower women to claim their rights.
          </p>
        </div>
      </section>

      {/* Thematic Areas List */}
      <section className="py-24 overflow-hidden">
        <div className="container-custom space-y-32">
          {thematicAreas.length === 0 ? (
            <p className="text-center text-slate-500 py-12">No thematic areas yet. Add them in the admin.</p>
          ) : (
            thematicAreas.map((area, index) => {
              const isEven = index % 2 === 0;
              const Icon = (area.icon && ICON_MAP[area.icon]) ? ICON_MAP[area.icon] : FileText;
              const styles = (area.color_class && COLOR_MAP[area.color_class]) ? COLOR_MAP[area.color_class] : COLOR_MAP.amber;
              const areaImage = area.image || null;
              const displayId = String(index + 1).padStart(2, '0');

              return (
                <div
                  key={area.id}
                  className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-24 items-center`}
                >
                  <div className="w-full lg:w-1/2 relative">
                    <div
                      className={`absolute inset-0 bg-slate-100 rounded-[2.5rem] transform ${isEven ? '-translate-x-6 translate-y-6' : 'translate-x-6 translate-y-6'} -z-10`}
                    />
                    <div className="relative aspect-[4/3] w-full rounded-[2.5rem] overflow-hidden shadow-2xl">
                      {areaImage ? (
                        <>
                          <Image
                            src={areaImage}
                            alt={area.title}
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-700"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-60" />
                        </>
                      ) : (
                        <div className="w-full h-full bg-slate-200" />
                      )}
                    </div>
                    <div className={`absolute ${isEven ? '-right-8 -bottom-8' : '-left-8 -bottom-8'} w-24 h-24 rounded-full bg-white shadow-xl flex items-center justify-center z-20 border-8 border-white`}>
                      <div className={`w-full h-full rounded-full flex items-center justify-center ${styles.color} border`}>
                        <Icon className="w-8 h-8" />
                      </div>
                    </div>
                  </div>

                  <div className="w-full lg:w-1/2 relative">
                    <div className="absolute -top-20 -left-10 text-[12rem] font-serif font-bold text-slate-50 opacity-80 z-0 select-none leading-none pointer-events-none">
                      {displayId}
                    </div>
                    <div className="relative z-10">
                      <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-6 leading-tight">
                        {area.title}
                      </h2>
                      <div className="w-12 h-1 bg-primary mb-8 rounded-full" />
                      <p className="text-lg text-slate-600 leading-relaxed mb-8">
                        {area.description ?? ''}
                      </p>
                      <Link
                        href="/get-help"
                        className={`inline-flex items-center space-x-2 font-semibold ${styles.accent} hover:opacity-80 transition-opacity group`}
                      >
                        <span>Seek assistance in this area</span>
                        <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0 100 C 20 0 50 0 100 100 Z" fill="currentColor" />
          </svg>
        </div>
        <div className="container-custom relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Need Legal Support?</h2>
          <p className="text-xl text-primary-100 mb-10 max-w-2xl mx-auto font-light">
            Our team is ready to provide confidential, pro-bono legal assistance and counseling. You don&apos;t have to face this alone.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/get-help"
              className="px-8 py-4 bg-white text-primary rounded-full font-bold text-lg hover:bg-slate-50 transition-colors shadow-lg hover:shadow-xl w-full sm:w-auto"
            >
              Get Help Now
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 bg-transparent border-2 border-white/30 text-white rounded-full font-bold text-lg hover:bg-white/10 transition-colors w-full sm:w-auto"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
