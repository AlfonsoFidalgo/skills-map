"use client";

import { useState, useEffect } from "react";
import { useActionState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
} from "@headlessui/react";
import { FaHandshake } from "react-icons/fa";
import { type Skill } from "@/actions/skills";
import { createEndorsement } from "@/actions/endorsements";
import EndorseModalContent from "@/components/endorse-modal-content";
import { MAX_ENDORSEMENTS } from "@/utils/constants";

type EndorseModalProps = {
  open: boolean;
  setOpen: (arg: boolean) => void;
  userName: string | null;
  endorserId: string;
  endorseeId: string;
  skills: Partial<Skill>[];
  endorsedSkillsIds: string[];
};

export default function EndorseModal({
  open,
  setOpen,
  userName,
  endorserId,
  endorseeId,
  skills,
  endorsedSkillsIds,
}: EndorseModalProps) {
  const [selectedSkills, setSelectedSkills] =
    useState<string[]>(endorsedSkillsIds);

  const [actionState, action, isPending] = useActionState(
    createEndorsement.bind(null, {
      endorserId,
      endorseeId,
      selectedSkills,
      skillsList: skills.map((skill) => skill.id!),
    }),
    {
      success: null,
      message: "",
    }
  );

  useEffect(() => {
    if (actionState?.success) {
      setOpen(false);
      setSelectedSkills(endorsedSkillsIds);
    }
  }, [actionState, endorsedSkillsIds, setOpen]);

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) => {
      if (prev.includes(skill)) {
        return prev.filter((s) => s !== skill);
      } else if (prev.length < MAX_ENDORSEMENTS) {
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
                  <EndorseModalContent
                    userName={userName}
                    skills={skills}
                    toggleSkill={toggleSkill}
                    selectedSkills={selectedSkills}
                    actionState={actionState}
                  />
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <form action={action}>
                  <button
                    type="submit"
                    disabled={!canEndorse}
                    className={`inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold shadow-xs sm:ml-3 sm:w-auto transition-all duration-200 ease-in-out ${
                      canEndorse
                        ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 hover:shadow-xl"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    {isPending ? "Endorsing..." : "Endorse"}
                  </button>
                </form>
                <button
                  type="button"
                  data-autofocus
                  onClick={() => {
                    setSelectedSkills(endorsedSkillsIds);
                    setOpen(false);
                  }}
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
