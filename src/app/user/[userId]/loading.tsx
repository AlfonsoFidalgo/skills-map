export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Header Skeleton */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
            <div className="relative">
              <div className="w-[120px] h-[120px] bg-gray-200 rounded-full animate-pulse"></div>
            </div>
            <div className="flex-1 text-center md:text-left space-y-4">
              <div className="h-8 bg-gray-200 rounded-lg w-3/4 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Skills Section Skeleton */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          <div className="mb-6">
            <div className="h-6 bg-gray-200 rounded w-1/4 animate-pulse mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
          </div>
          <div className="flex justify-center">
            <div className="w-72 h-72 bg-gray-200 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
