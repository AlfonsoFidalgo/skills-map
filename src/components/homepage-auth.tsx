"use client";

import { signIn, signOut } from "@/actions/auth";
import { navigateTo } from "@/actions/navigation";
import { type Session } from "@/types/session";

type HomepageAuthProps = {
  session: Session | null;
};

export default function HomepageAuth({ session }: HomepageAuthProps) {
  let authContent: React.ReactNode;
  console.log("session:", session);

  if (session?.user) {
    authContent = (
      <div className="p-4 space-y-3">
        <button
          onClick={() => navigateTo(`/user/${session.user.id}`)}
          className="w-full bg-gradient-to-r from-green-500 to-teal-600 text-white px-6 py-3 rounded-lg font-medium shadow-lg hover:from-green-600 hover:to-teal-700 hover:shadow-xl transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-300"
        >
          View Profile
        </button>
        <form action={signOut}>
          <button
            type="submit"
            className="w-full text-red-600 hover:text-red-800 underline hover:no-underline transition-all duration-200 text-sm font-medium"
          >
            Sign Out
          </button>
        </form>
      </div>
    );
  } else {
    authContent = (
      <form action={signIn}>
        <button
          type="submit"
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-medium shadow-lg hover:from-blue-600 hover:to-purple-700 hover:shadow-xl transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          Sign In
        </button>
      </form>
    );
  }
  return authContent;
}
