"use client";

import { FaLock } from "react-icons/fa";
import { signIn, signOut } from "@/actions/auth";
import { navigateTo } from "@/actions/navigation";
import { type Session } from "@/types/session";
import LinkedInButton from "@/components/UI/linkedin-button";

type HomepageAuthProps = {
  session: Session | null;
};

export default function HomepageAuth({ session }: HomepageAuthProps) {
  let authContent: React.ReactNode;

  if (session?.user) {
    authContent = (
      <div className="space-y-4">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            Welcome back!
          </h3>
          <p className="text-gray-600">Ready to showcase your skills?</p>
        </div>

        <button
          onClick={() => navigateTo(`/user/${session.user.id}`)}
          className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-4 rounded-xl font-semibold shadow-lg hover:from-green-600 hover:to-emerald-700 hover:shadow-xl transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-300 text-lg"
        >
          View My Profile
        </button>

        <form action={signOut}>
          <button
            type="submit"
            className="w-full text-gray-500 hover:text-gray-700 transition-colors duration-200 text-sm font-medium py-2"
          >
            Sign Out
          </button>
        </form>
      </div>
    );
  } else {
    authContent = (
      <div className="space-y-6">
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-2">Get Started</h3>
          <p className="text-gray-600">
            Sign in to create your skills profile and connect with
            professionals.
          </p>
        </div>

        <form action={signIn}>
          <LinkedInButton />
        </form>

        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
            <FaLock className="text-gray-400" />
            <span>Secure authentication via LinkedIn</span>
          </div>
        </div>
      </div>
    );
  }
  return authContent;
}
