// Loading skeleton that mimics the user profile layout
export default function Loading() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden relative">

          <div className="absolute top-0 left-0 right-0 h-30 bg-gradient-to-r from-blue-500 to-indigo-600"></div>

          <div className="relative z-10 p-8">

            <div className="flex flex-col items-center space-y-6 mb-8">
              <div className="mt-4">
                <div className="w-[120px] h-[120px] bg-gray-200 rounded-full shadow-lg border-4 border-white ring-2 ring-blue-100 animate-pulse"></div>
              </div>
              <div className="text-center max-w-2xl space-y-3">
                <div className="h-8 bg-gray-200 rounded-lg w-48 mx-auto animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-32 mx-auto animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-40 mx-auto animate-pulse"></div>
              </div>
            </div>

            <div className="border-t border-gray-200 mb-8"></div>

            <div className="flex flex-col items-center space-y-8">
              <div className="w-full max-w-2xl">
                <div className="mb-6 text-center">
                  <div className="h-8 bg-gray-200 rounded-lg w-64 mx-auto animate-pulse mb-2"></div>
                </div>
                <div className="flex justify-center">
                  <div className="w-11/12 max-w-lg">
                    <div className="w-72 h-72 bg-gray-200 rounded-full animate-pulse mx-auto"></div>
                  </div>
                </div>
              </div>

              <div className="bg-transparent p-6 w-full max-w-md">
                <div className="flex items-center justify-between gap-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-xl animate-pulse flex-shrink-0"></div>
                  <div className="h-6 bg-gray-200 rounded w-40 animate-pulse"></div>
                </div>
              </div>

              <div className="w-full max-w-md text-center space-y-4 pt-4 border-t border-gray-200">
                <div className="space-y-2">
                  <div className="h-6 bg-gray-200 rounded w-32 mx-auto animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-48 mx-auto animate-pulse"></div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                  <div className="h-12 bg-gray-200 rounded-lg w-32 animate-pulse"></div>
                  <div className="h-12 bg-gray-200 rounded-lg w-24 animate-pulse"></div>
                </div>
              </div>

              <div className="w-full max-w-md">
                <div className="border-t border-gray-200 mb-8"></div>
                <div className="flex flex-col justify-center space-y-4">
                  <div className="h-5 bg-gray-200 rounded w-56 mx-auto animate-pulse"></div>
                  <div className="h-14 bg-gray-200 rounded-xl w-full max-w-xs mx-auto animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
