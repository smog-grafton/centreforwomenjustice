import { Skeleton, SkeletonCard } from '@/components/ui/Skeleton';

export default function NewsLoading() {
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
