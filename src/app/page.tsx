import { auth } from "@/auth";
import HomepageAuth from "@/components/homepage-auth";
import HomepageCTAs from "@/components/homepage-ctas";
import { type Session } from "@/types/session";

export default async function Home() {
  const session = await auth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg mb-6">
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight">
                Skills Map
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Get endorsed for your skills and showcase your expertise to the
                world. Understand your strengths and areas of growth.
              </p>
            </div>

            {/* Auth Section */}
            <div className="flex justify-center mb-16">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 max-w-md w-full mx-4">
                <HomepageAuth session={session as Session | null} />
              </div>
            </div>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute top-0 left-0 right-0 bottom-0 overflow-hidden -z-10">
          <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-purple-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-indigo-200 rounded-full opacity-20 animate-pulse delay-2000"></div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Why Choose Skills Map?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join thousands of professionals building their digital reputation
            through skill endorsements.
          </p>
        </div>

        <HomepageCTAs />

        {/* Stats Section */}
        {/* <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">
                1,000+
              </div>
              <div className="text-gray-600 font-medium">Professionals</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">
                5,000+
              </div>
              <div className="text-gray-600 font-medium">
                Skill Endorsements
              </div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">50+</div>
              <div className="text-gray-600 font-medium">Industries</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-600 mb-2">95%</div>
              <div className="text-gray-600 font-medium">Satisfaction Rate</div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
