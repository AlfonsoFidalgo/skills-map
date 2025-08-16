type IndustryCardProps = {
  name: string;
  selected?: boolean;
  icon: React.ReactNode;
  onUpdateIndustry: () => void;
};

export default function IndustryCard({
  name,
  icon,
  selected,
  onUpdateIndustry,
}: IndustryCardProps) {
  return (
    <div
      className={`
        p-4 bg-white border rounded-lg shadow-sm cursor-pointer
        transition-all duration-200 ease-in-out
        hover:shadow-md hover:scale-[1.02] hover:border-gray-400
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        ${
          selected
            ? "ring-2 ring-blue-500 border-blue-200 bg-blue-50 shadow-md"
            : "border-gray-200"
        }
      `}
      onClick={onUpdateIndustry}
      tabIndex={0}
      role="button"
      aria-pressed={selected}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onUpdateIndustry();
        }
      }}
    >
      <div className="flex items-center">
        <div
          className={`mr-3 transition-colors duration-200 ${
            selected ? "text-blue-600" : "text-gray-500"
          }`}
        >
          {icon}
        </div>
        <h2
          className={`text-sm font-semibold transition-colors duration-200 ${
            selected ? "text-blue-900" : "text-gray-700"
          }`}
        >
          {name}
        </h2>
      </div>
    </div>
  );
}
