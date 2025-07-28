"use client";

import { useActionState } from "react";
import { editUserInfo } from "@/actions/users";
import React from "react";

type UserInfoFormProps = {
  location?: string;
  userId?: string;
  title?: string;
  industry?: string | null;
  setIsEditing: (isEditing: boolean) => void;
};

export default function UserInfoForm({
  location,
  userId,
  industry,
  title,
  setIsEditing,
}: UserInfoFormProps) {
  const [formState, action] = useActionState(editUserInfo, {
    success: null,
    error: null,
    response: null,
  });

  React.useEffect(() => {
    if (formState.success) {
      setIsEditing(false);
    }
  }, [formState.success, setIsEditing]);

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mt-4 max-w-md">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">
          Edit Profile Information
        </h3>
        <p className="text-sm text-gray-600">
          Update your professional details
        </p>
      </div>

      <form className="space-y-4" action={action}>
        {/* Hidden input to include userId in form submission */}
        {userId && <input type="hidden" name="userId" value={userId} />}

        <div className="space-y-1">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Job Title
          </label>
          <div className="relative">
            <input
              id="title"
              name="title"
              defaultValue={title}
              className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-all duration-200 hover:border-gray-300"
              placeholder="e.g. Senior Software Engineer"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-4 w-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="space-y-1">
          <label
            htmlFor="industry"
            className="block text-sm font-medium text-gray-700"
          >
            Industry
          </label>
          <div className="relative">
            <select
              id="industry"
              name="industry"
              defaultValue={industry || ""}
              className="w-full pl-10 pr-8 py-3 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-all duration-200 hover:border-gray-300 appearance-none bg-white"
            >
              <option value="" disabled>
                Select an industry
              </option>
              <option value="tech">Technology</option>
              <option value="marketing">Marketing & Advertising</option>
            </select>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-4 w-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <svg
                className="h-4 w-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="space-y-1">
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700"
          >
            Location
          </label>
          <div className="relative">
            <input
              id="location"
              name="location"
              defaultValue={location}
              className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-all duration-200 hover:border-gray-300"
              placeholder="e.g. San Francisco, CA"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-4 w-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Error/Success Messages */}
        {formState.error && (
          <div className="rounded-lg bg-red-50 p-3 border border-red-200">
            <div className="flex">
              <svg
                className="h-4 w-4 text-red-400 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div className="ml-2">
                <p className="text-sm text-red-700">{formState.error}</p>
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-medium rounded-lg hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-sm"
          >
            Save Changes
          </button>
          <button
            type="button"
            className="px-4 py-3 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200"
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
