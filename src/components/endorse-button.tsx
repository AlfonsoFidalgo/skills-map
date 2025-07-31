"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { signIn } from "@/actions/auth";

import EndorseModal from "./endorse-modal";
import { Skill } from "@/actions/skills";
import LinkedInButton from "@/components/UI/linkedin-button";

type EndorseButtonProps = {
  pageUserId: string;
  userName: string | null;
  skills: Partial<Skill>[];
};
export function EndorseButton({
  pageUserId,
  userName,
  skills,
}: EndorseButtonProps) {
  const session = useSession();
  const [open, setOpen] = React.useState(false);

  if (!session.data?.user) {
    return (
      <>
        <div className="border-t border-gray-200 mb-8"></div>
        <form action={signIn}>
          <LinkedInButton />
        </form>
      </>
    );
  }
  if (session.data.user.id !== pageUserId) {
    return (
      <>
        <div className="border-t border-gray-200 mb-8"></div>
        <div className="flex justify-center">
          <button
            onClick={() => setOpen(true)}
            className="w-3/4 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-4 rounded-xl font-semibold shadow-lg hover:from-green-600 hover:to-emerald-700 hover:shadow-xl transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-300 text-lg"
          >
            Endorse
          </button>
        </div>
        <EndorseModal
          open={open}
          setOpen={setOpen}
          userName={userName}
          skills={skills}
        />
      </>
    );
  }
}
