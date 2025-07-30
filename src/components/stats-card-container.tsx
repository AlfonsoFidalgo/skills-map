import { FaEye } from "react-icons/fa";
import { FaHandshake } from "react-icons/fa";

type ProfileStatsContainerProps = {
  endorsers?: number;
  profileViews?: number;
};

export default function StatsCardContainer({
  endorsers,
  profileViews,
}: ProfileStatsContainerProps) {
  return (
    <div className="space-y-2 flex flex-row lg:flex-col justify-center lg:justify-start lg:mt-10">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-lg font-semibold text-gray-800">Endorsers</h4>
            <p className="text-3xl font-bold text-green-600 mt-2">
              {endorsers}
            </p>
          </div>
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center ml-4">
            <FaHandshake className="w-6 h-6 text-green-600" />
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-lg font-semibold text-gray-800">
              Profile Views
            </h4>
            <p className="text-3xl font-bold text-purple-600 mt-2">
              {profileViews}
            </p>
          </div>
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center ml-4">
            <FaEye className="w-6 h-6 text-purple-600" />
          </div>
        </div>
      </div>
    </div>
  );
}
