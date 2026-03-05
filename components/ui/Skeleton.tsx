import React from 'react';

export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`animate-pulse rounded-md bg-slate-200/60 ${className}`}
      {...props}
    />
  );
}

export function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-4 p-6 border border-slate-100 rounded-2xl bg-white shadow-sm">
      <Skeleton className="h-48 w-full rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-6 w-3/4" />
      </div>
      <Skeleton className="h-20 w-full" />
      <div className="pt-4">
        <Skeleton className="h-10 w-32 rounded-full" />
      </div>
    </div>
  );
}
