"use client";

import React from "react";
import { signIn } from "@/actions/auth";

import EndorseModal from "./endorse-modal";
import { Skill } from "@/actions/skills";
import LinkedInButton from "@/components/UI/linkedin-button";

type EndorseButtonProps = {
  pageUserId: string;
  sessionUserId: string | undefined;
  userName: string | null;
  skills: Partial<Skill>[];
  industrySelected: boolean;
  endorsedSkillsIds: string[];
};
export default function EndorseContainer({
  pageUserId,
  sessionUserId,
  userName,
  skills,
  industrySelected,
  endorsedSkillsIds,
}: EndorseButtonProps) {
  //   const session = useSession();
  const [open, setOpen] = React.useState(false);

  //user not logged in
  if (!sessionUserId) {
    return (
      <>
        <div className="border-t border-gray-200 mb-8"></div>
        <form action={signIn}>
          <div className="flex justify-center mb-4">
            <p className="text-gray-600 text-lg">
              Please, sign in to endorse {userName}
            </p>
          </div>
          <LinkedInButton />
        </form>
      </>
    );
  }

  if (!industrySelected) {
    return;
  }
  //user logged in and not viewing their own profile
  if (sessionUserId !== pageUserId) {
    return (
      <>
        <div className="border-t border-gray-200 mb-8"></div>
        <div className="flex flex-col justify-center">
          <div className="flex justify-center mb-4">
            <p className="text-gray-600 text-lg text-center">
              Help {userName} by endorsing their skills now!
            </p>
          </div>
          <button
            onClick={() => setOpen(true)}
            className="w-full max-w-xs mx-auto bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-4 rounded-xl font-semibold shadow-lg hover:from-green-600 hover:to-emerald-700 hover:shadow-xl transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-300 text-lg"
          >
            Endorse
          </button>
        </div>
        <EndorseModal
          open={open}
          setOpen={setOpen}
          userName={userName}
          skills={skills}
          endorserId={sessionUserId}
          endorseeId={pageUserId}
          endorsedSkillsIds={endorsedSkillsIds}
        />
      </>
    );
  }
}
