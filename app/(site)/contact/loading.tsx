import { Skeleton } from '@/components/ui/Skeleton';

export default function ContactLoading() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Skeleton */}
      <section className="relative pt-48 pb-24 bg-slate-900 text-white overflow-hidden">
        <div className="container-custom relative z-10">
          <Skeleton className="h-4 w-32 mb-6 bg-white/20" />
          <Skeleton className="h-12 w-3/4 md:w-1/2 mb-4 bg-white/20" />
          <Skeleton className="h-6 w-full md:w-2/3 bg-white/20" />
        </div>
      </section>

      {/* Content Skeleton */}
      <section className="py-24">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="space-y-8">
              <Skeleton className="h-8 w-1/2" />
              <div className="space-y-4">
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-3/4" />
              </div>
            </div>
            <div className="bg-slate-50 p-8 rounded-3xl">
              <Skeleton className="h-8 w-1/3 mb-6" />
              <div className="space-y-4">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-12 w-1/3" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
