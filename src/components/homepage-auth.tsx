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

        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            <span>Secure authentication via LinkedIn</span>
          </div>
        </div>
      </div>
    );
  }
  return authContent;
}
