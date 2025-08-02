import { DialogTitle } from "@headlessui/react";
import { Skill } from "@/actions/skills";

type EndorseModalContentProps = {
  userName: string | null;
  skills: Partial<Skill>[];
  toggleSkill: (skill: string) => void;
  selectedSkills: string[];
  actionState: {
    success: boolean | null;
    message: string;
  } | null;
};

export default function EndorseModalContent({
  userName,
  skills,
  toggleSkill,
  selectedSkills,
  actionState,
}: EndorseModalContentProps) {
  return (
    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
      <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
        {userName ? `Endorse ${userName}` : "Endorse"}
      </DialogTitle>
      <div className="mt-2">
        <p className="text-sm text-gray-500">
          {`You can endorse ${userName} on up to two of the following skills:`}
        </p>
        <div className="mt-4 space-y-2">
          {skills.map((skill) => (
            <button
              key={skill.id}
              onClick={() => toggleSkill(skill.id!)}
              disabled={
                !selectedSkills.includes(skill.id!) &&
                selectedSkills.length >= 2
              }
              className={`w-full text-left px-3 py-2 rounded-md border transition-colors ${
                selectedSkills.includes(skill.id!)
                  ? "bg-green-50 border-green-300 text-green-800"
                  : selectedSkills.length >= 2
                  ? "bg-gray-50 border-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{skill.name}</span>
                {selectedSkills.includes(skill.id!) && (
                  <span className="text-green-600 text-sm">✓</span>
                )}
              </div>
            </button>
          ))}
        </div>
        {actionState?.success === false && (
          <p className="mt-2 text-sm text-red-500 text-center">
            {actionState.message}
          </p>
        )}
      </div>
    </div>
  );
}
