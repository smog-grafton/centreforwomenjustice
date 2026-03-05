import { Skeleton, SkeletonCard } from '@/components/ui/Skeleton';

export default function HomeLoading() {
  return (
    <div className="flex flex-col w-full bg-white min-h-screen">
      {/* Hero Skeleton */}
      <section className="relative h-screen w-full overflow-hidden bg-slate-900">
        <div className="absolute inset-0 bg-slate-800" />
        <div className="container-custom relative h-full flex flex-col justify-center pt-20">
          <div className="max-w-3xl space-y-6 md:space-y-8 pb-32 md:pb-40">
            <div>
              <Skeleton className="h-6 w-32 mb-4 bg-white/20 rounded-full" />
              <Skeleton className="h-16 md:h-24 w-full max-w-2xl bg-white/20" />
            </div>
            <Skeleton className="h-6 w-full max-w-xl bg-white/20" />
            <Skeleton className="h-6 w-3/4 max-w-lg bg-white/20" />
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Skeleton className="h-14 w-40 bg-white/20 rounded-full" />
              <Skeleton className="h-14 w-40 bg-white/20 rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* About Us Skeleton */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-12 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <div className="pt-6">
                <Skeleton className="h-12 w-40 rounded-full" />
              </div>
            </div>
            <div className="relative h-[500px] w-full rounded-3xl overflow-hidden">
              <Skeleton className="absolute inset-0" />
            </div>
          </div>
        </div>
      </section>

      {/* Impact Metrics Skeleton */}
      <section className="py-20 bg-slate-50">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="text-center space-y-4 p-6">
                <Skeleton className="h-14 w-14 rounded-xl mx-auto" />
                <Skeleton className="h-10 w-24 mx-auto" />
                <Skeleton className="h-4 w-32 mx-auto" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Grid Skeleton */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <Skeleton className="h-4 w-32 mx-auto" />
            <Skeleton className="h-10 w-3/4 mx-auto" />
            <Skeleton className="h-4 w-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </div>
      </section>

      {/* How We Support You Skeleton */}
      <section className="py-24 bg-slate-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="space-y-6">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-10 w-3/4" />
              <div className="space-y-4 pt-8">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex gap-4">
                    <Skeleton className="h-12 w-12 rounded-xl flex-shrink-0" />
                    <div className="space-y-2 w-full">
                      <Skeleton className="h-5 w-1/3" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-[600px] rounded-3xl overflow-hidden">
              <Skeleton className="absolute inset-0" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
