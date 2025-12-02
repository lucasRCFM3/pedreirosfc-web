export function RolePageSkeleton() {
  return (
    <div className="p-6 md:p-12 max-w-6xl mx-auto min-h-screen flex flex-col lg:flex-row gap-12 animate-pulse">
      <div className="flex-1 order-2 lg:order-1">
        {/* Header Skeleton */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 border-b border-white/5 pb-8">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-white/5 rounded-2xl" />
            <div>
              <div className="h-12 w-48 bg-white/5 rounded mb-2" />
              <div className="h-6 w-32 bg-white/5 rounded" />
            </div>
          </div>
          <div className="h-10 w-32 bg-white/5 rounded-full" />
        </div>

        {/* Stats Skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white/5 rounded-2xl p-4 border border-white/5">
              <div className="h-4 w-24 bg-white/5 rounded mb-2" />
              <div className="h-8 w-16 bg-white/5 rounded mb-1" />
              <div className="h-3 w-20 bg-white/5 rounded" />
            </div>
          ))}
        </div>

        {/* Filter Tabs Skeleton */}
        <div className="flex items-center gap-2 mb-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-10 w-32 bg-white/5 rounded-full" />
          ))}
        </div>

        {/* Match List Skeleton */}
        <div className="flex flex-col gap-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-[#0a0a0a] border border-white/5">
              <div className="w-1 h-12 bg-white/5 rounded-full" />
              <div className="w-48 flex items-center gap-4">
                <div className="w-12 h-12 bg-white/5 rounded-lg" />
                <div className="h-4 w-20 bg-white/5 rounded" />
              </div>
              <div className="flex-1 flex flex-col items-center">
                <div className="h-6 w-24 bg-white/5 rounded mb-1" />
                <div className="h-3 w-16 bg-white/5 rounded" />
              </div>
              <div className="w-40 h-8 bg-white/5 rounded hidden md:block" />
              <div className="w-24 h-8 bg-white/5 rounded" />
            </div>
          ))}
        </div>
      </div>

      {/* Sidebar Skeleton */}
      <div className="w-full lg:w-80 order-1 lg:order-2">
        <div className="sticky top-8">
          <div className="h-6 w-32 bg-white/5 rounded mb-6" />
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/5">
                <div className="w-10 h-10 bg-white/5 rounded-full" />
                <div className="flex-1">
                  <div className="h-4 w-24 bg-white/5 rounded mb-2" />
                  <div className="h-3 w-32 bg-white/5 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

