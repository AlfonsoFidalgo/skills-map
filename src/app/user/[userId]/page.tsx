import Image from "next/image";
import Link from "next/link";

import { getUser } from "@/actions/users";
import { RadarChartRounded } from "@/components/radar-chart";
import UserInfo from "@/components/user-info";
import { getIndustryDetails } from "@/actions/industries";
import Breadcrumbs from "@/components/breadcrumbs";

type Params = Promise<{ userId: string }>;

export default async function UserPage({ params }: { params: Params }) {
  const { userId } = await params;
  const user = await getUser(userId);
  const industry = user?.industryId
    ? await getIndustryDetails(user.industryId)
    : null;

  if (user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="max-w-5xl mx-auto px-4 py-8">
          <Breadcrumbs
            items={[
              { label: "Users", href: "/users" },
              { label: user.name || "User Profile" },
            ]}
          />

          {/* Header Section */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-8">
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
              <div className="relative">
                <Image
                  className="rounded-full shadow-lg border-4 border-white ring-2 ring-blue-100"
                  src={user.image as string}
                  width={120}
                  height={120}
                  alt="user photo"
                />
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white shadow-sm"></div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <UserInfo
                  userId={user.id}
                  name={user.name || ""}
                  location={user.location || ""}
                  title={user.title || ""}
                  industry={industry?.name}
                />
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Skills Overview Card */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  Skills Overview
                </h3>
                <p className="text-gray-600">
                  Visual representation of technical and soft skills
                </p>
              </div>
              <div className="flex justify-center">
                <div className="w-full max-w-md">
                  <RadarChartRounded />
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800">
                      Skills
                    </h4>
                    <p className="text-3xl font-bold text-blue-600 mt-2">5</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-blue-600"
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
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800">
                      Endorsements
                    </h4>
                    <p className="text-3xl font-bold text-green-600 mt-2">23</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800">
                      Profile Views
                    </h4>
                    <p className="text-3xl font-bold text-purple-600 mt-2">
                      156
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-purple-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Action Button - Only show for own profile */}
          {/* This would need session check similar to UserInfo component */}
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center max-w-md mx-4">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-10 h-10 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-3">
          User Not Found
        </h1>
        <p className="text-gray-600 mb-6">
          The user you&apos;re looking for doesn&apos;t exist or has been
          removed.
        </p>
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
