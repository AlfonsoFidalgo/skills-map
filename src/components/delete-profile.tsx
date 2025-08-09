"use client";

import { useActionState } from "react";
import { deleteUser } from "@/actions/users";

export default function DeleteProfile({ userId }: { userId?: string }) {
  const [formState, action] = useActionState(deleteUser, {
    success: null,
    error: null,
    response: null,
  });
  console.log("DeleteProfile formState:", formState);
  return (
    <>
      <form className="flex flex-col gap-3 items-center" action={action}>
        <input type="hidden" name="userId" value={userId} />
        <h4 className="text-sm font-medium text-gray-900 text-center">
          Danger Zone
        </h4>
        <p className="text-xs text-gray-600">
          Once you delete your profile, all your data will be permanently
          removed and cannot be recovered. Please proceed with caution.
        </p>
        <button
          type="submit"
          className="px-4 mt-4 py-2 w-1/3 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200"
        >
          Delete Profile
        </button>
      </form>
      {formState.error && (
        <div className="mt-2 text-red-600 text-sm">
          {formState.error || "An error occurred while deleting your profile."}
        </div>
      )}
    </>
  );
}
