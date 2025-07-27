"use client";

import { useActionState } from "react";
import { editUserInfo } from "@/actions/users";
import React from "react";

type UserInfoFormProps = {
  location?: string;
  userId?: string;
  title?: string;
  setIsEditing: (isEditing: boolean) => void;
};

export default function UserInfoForm({
  location,
  userId,
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
    <form className="space-y-2" action={action}>
      {/* Hidden input to include userId in form submission */}
      {userId && <input type="hidden" name="userId" value={userId} />}
      <div>
        <input
          id="title"
          name="title"
          defaultValue={title}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-md"
          placeholder="Enter your job title"
        />
      </div>
      <div>
        <input
          id="location"
          name="location"
          defaultValue={location}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
          placeholder="Enter your location"
        />
      </div>
      <div className="flex gap-2 mt-4">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          Save
        </button>
        <button
          type="button"
          className="px-4 py-2 bg-gray-200 text-gray-800 text-sm font-medium rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
          onClick={() => setIsEditing(false)}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
