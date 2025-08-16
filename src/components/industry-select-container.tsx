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
          let icon = null;

          switch (industry) {
            case "Tech":
              icon = <FaLaptopCode className="h-5 w-5" />;
              break;
            case "Sales":
              icon = <FaHandshake className="h-5 w-5" />;
              break;
            case "Product Management":
              icon = <FaGears className="h-5 w-5" />;
              break;
            case "Marketing":
              icon = <BiPurchaseTagAlt className="h-5 w-5" />;
              break;
            default:
              icon = <FaLaptopCode className="h-5 w-5" />;
          }

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
