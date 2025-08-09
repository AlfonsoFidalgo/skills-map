import { FaEye } from "react-icons/fa";
import { FaHandshake } from "react-icons/fa";
import { texts } from "@/utils/constants";

type ProfileStatsContainerProps = {
  endorsers?: number;
  profileViews?: number;
};

export default function StatsCardContainer({
  endorsers,
  profileViews,
}: ProfileStatsContainerProps) {
  return (
    <div className="space-y-1 lg:space-y-2">
      {/* Endorsers Card */}
      <div className="bg-transparent p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h4 className="text-lg font-semibold text-gray-800 mb-1">
              {texts.endorsers.title}
            </h4>
            <p className="text-3xl font-bold text-green-600">
              {endorsers || 0}
            </p>
            {/* <p className="text-sm text-gray-500 mt-1">
              {isVisitor ? texts.endorsers.visitor : texts.endorsers.user}
            </p> */}
          </div>
          <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <FaHandshake className="w-7 h-7 text-green-600" />
          </div>
        </div>
      </div>

      {/* Profile Views Card */}
      <div className="bg-transparent p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h4 className="text-lg font-semibold text-gray-800 mb-1">
              {texts.profileViews.title}
            </h4>
            <p className="text-3xl font-bold text-purple-600">
              {profileViews || 0}
            </p>
            {/* <p className="text-sm text-gray-500 mt-1">
              {isVisitor ? texts.profileViews.visitor : texts.profileViews.user}
            </p> */}
          </div>
          <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <FaEye className="w-7 h-7 text-purple-600" />
          </div>
        </div>
      </div>
    </div>
  );
}
