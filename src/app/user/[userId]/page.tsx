import Image from "next/image";
import { FaEye } from "react-icons/fa";
import { FaHandshake } from "react-icons/fa";
import { getUser } from "@/actions/users";
import { RadarChartRounded } from "@/components/radar-chart";
import UserInfo from "@/components/user-info";
import { getIndustryDetails } from "@/actions/industries";
import UserNotFound from "@/components/user-not-found";

type Params = Promise<{ userId: string }>;

export default async function UserPage({ params }: { params: Params }) {
  const { userId } = await params;
  const user = await getUser(userId);
  console.log(user);
  const industry = user?.industryId
    ? await getIndustryDetails(user.industryId)
    : null;

  if (user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="max-w-5xl mx-auto px-4 py-8">
          {/* Header Section */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-8">
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
              <div>
                <Image
                  className="rounded-full shadow-lg border-4 border-white ring-2 ring-blue-100"
                  src={user.image as string}
                  width={120}
                  height={120}
                  alt="user photo"
                />
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 mb-8">
            {/* Skills Overview Card */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <div className="mb-6">
                <h3 className="text-3xl font-bold text-gray-800 mb-2 text-center upper">
                  {user.firstName}&apos;s skill map
                </h3>
              </div>
              <div className="flex justify-center">
                <div className="w-full max-w-md">
                  <RadarChartRounded />
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="space-y-2">
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800">
                      Endorsers
                    </h4>
                    <p className="text-3xl font-bold text-green-600 mt-2">23</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <FaHandshake className="w-6 h-6 text-green-600" />
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
                    <FaEye className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return <UserNotFound />;
}
