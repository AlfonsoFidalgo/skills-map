"use client";

import { INDUSTRIES } from "@/utils/constants";
import { FaLaptopCode } from "react-icons/fa";
import { FaHandshake } from "react-icons/fa";
import { FaGears } from "react-icons/fa6";
import { BiPurchaseTagAlt } from "react-icons/bi";

import IndustryCard from "@/components/industry-card";

export default function IndustrySelectContainer({
  selectedIndustry,
  setSelectedIndustry,
}: {
  selectedIndustry: string | null | undefined;
  setSelectedIndustry: (industry: string | null | undefined) => void;
}) {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl">
        {Object.keys(INDUSTRIES).map((industry) => {
          const key = INDUSTRIES[industry as keyof typeof INDUSTRIES];
          const icon = getIcon(industry);

          return (
            <IndustryCard
              key={key}
              name={industry}
              icon={icon}
              selected={selectedIndustry === industry}
              onUpdateIndustry={() => setSelectedIndustry(industry)}
            />
          );
        })}
      </div>
    </div>
  );
}

function getIcon(industry: string) {
  switch (industry) {
    case "Tech":
      return <FaLaptopCode className="h-5 w-5" />;
    case "Sales":
      return <FaHandshake className="h-5 w-5" />;
    case "Product Management":
      return <FaGears className="h-5 w-5" />;
    case "Marketing":
      return <BiPurchaseTagAlt className="h-5 w-5" />;
    default:
      return <FaLaptopCode className="h-5 w-5" />;
  }
}
