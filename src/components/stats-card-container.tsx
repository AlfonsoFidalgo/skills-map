import { FaHandshake } from "react-icons/fa";

type ProfileStatsContainerProps = {
  endorsers?: number;
};

export default function StatsCardContainer({
  endorsers,
}: ProfileStatsContainerProps) {
  return (
    <div className="bg-transparent p-6">
      <div className="flex items-center justify-between gap-3">
        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
          <FaHandshake className="w-7 h-7 text-green-600" />
        </div>
        <h4 className="text-lg font-semibold text-gray-800 mb-1">
          Endorsed by {endorsers || 0} users
        </h4>
      </div>
    </div>
  );
}
