"use client";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { FaHandshake } from "react-icons/fa";
import { useState } from "react";
import { type Skill } from "@/actions/skills";

type EndorseModalProps = {
  open: boolean;
  setOpen: (arg: boolean) => void;
  userName: string | null;
  skills: Partial<Skill>[];
};

export default function EndorseModal({
  open,
  setOpen,
  userName,
  skills,
}: EndorseModalProps) {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  console.log(selectedSkills);
  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) => {
      if (prev.includes(skill)) {
        return prev.filter((s) => s !== skill);
      } else if (prev.length < 2) {
        return [...prev, skill];
      }
      return prev;
    });
  };

  const canEndorse = selectedSkills.length > 0;

  return (
    <div>
      <Dialog open={open} onClose={setOpen} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:size-10">
                    <FaHandshake
                      aria-hidden="true"
                      className="size-6 text-green-600"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <DialogTitle
                      as="h3"
                      className="text-base font-semibold text-gray-900"
                    >
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
                              <span className="text-sm font-medium">
                                {skill.name}
                              </span>
                              {selectedSkills.includes(skill.id!) && (
                                <span className="text-green-600 text-sm">
                                  ✓
                                </span>
                              )}
                            </div>
                          </button>
                        ))}
                      </div>
                      {selectedSkills.length > 0 && (
                        <p className="mt-2 text-xs text-gray-600">
                          Selected: {selectedSkills.join(", ")} (
                          {selectedSkills.length}/2)
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  disabled={!canEndorse}
                  className={`inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold shadow-xs sm:ml-3 sm:w-auto transition-all duration-200 ease-in-out ${
                    canEndorse
                      ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 hover:shadow-xl"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {selectedSkills.length > 0
                    ? `Endorse (${selectedSkills.length})`
                    : "Endorse"}
                </button>
                <button
                  type="button"
                  data-autofocus
                  onClick={() => setOpen(false)}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                  Cancel
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
