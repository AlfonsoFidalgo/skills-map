"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { signIn } from "@/actions/auth";

import EndorseModal from "./modal";

export function EndorseButton({ pageUserId }: { pageUserId: string }) {
  const session = useSession();
  const [open, setOpen] = React.useState(false);

  if (!session.data?.user) {
    return (
      <>
        <div className="border-t border-gray-200 mb-8"></div>
        <form action={signIn}>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-4 rounded-xl font-semibold shadow-lg hover:from-blue-600 hover:to-purple-700 hover:shadow-xl transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 text-lg flex items-center justify-center gap-3"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            Sign In with LinkedIn
          </button>
        </form>
      </>
    );
  }
  if (session.data.user.id === pageUserId) {
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
        <EndorseModal open={open} setOpen={setOpen}/>
      </>
    );
  }
}
