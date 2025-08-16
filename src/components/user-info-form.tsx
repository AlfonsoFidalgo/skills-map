"use client";

import { useActionState, useEffect } from "react";
import { MdWork } from "react-icons/md";
import { FaBuilding } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { editUserInfo } from "@/actions/users";
import DeleteProfile from "@/components/delete-profile";

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
  const [formState, action, isPending] = useActionState(editUserInfo, {
    success: null,
    error: null,
    response: null,
  });

  useEffect(() => {
    if (formState.success) {
      setIsEditing(false);
    }
  }, [formState.success, setIsEditing]);

  return (
    <div className="w-full">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">
          Edit Profile Information
        </h3>
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
              <MdWork className="h-4 w-4 text-gray-400" />
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
              <option value="Tech">Tech</option>
              <option value="Marketing">Marketing</option>
              <option value="Product Management">Product Management</option>
              <option value="Sales">Sales</option>
            </select>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaBuilding className="h-4 w-4 text-gray-400" />
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
              <FaLocationDot className="h-4 w-4 text-gray-400" />
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
            disabled={isPending}
            className={`flex-1 px-4 py-3 text-sm font-medium rounded-lg focus:outline-none transition-all duration-200 shadow-sm ${
              isPending
                ? "bg-blue-300 text-blue-100 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            }`}
          >
            {isPending ? "Saving..." : "Save Changes"}
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

      <div className="my-6">
        <hr className="border-gray-200" />
      </div>

      <DeleteProfile userId={userId} />
    </div>
  );
}
