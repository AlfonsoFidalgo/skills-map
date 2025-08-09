"use client";

import { FaRegTrashAlt } from "react-icons/fa";
import { GoAlertFill } from "react-icons/go";
import { useActionState, useState } from "react";
import { deleteUser } from "@/actions/users";

export default function DeleteProfile({ userId }: { userId?: string }) {
  const [clickedDelete, setClickedDelete] = useState(false);
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
        {clickedDelete && (
          <div className="w-full flex items-center justify-center gap-4">
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200 shadow-sm"
            >
              <GoAlertFill className="w-4 h-4" />
              Confirm
            </button>
            <button
              type="button"
              className="px-6 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 transition-all duration-200"
              onClick={() => setClickedDelete(false)}
            >
              Cancel
            </button>
          </div>
        )}
      </form>
      {!clickedDelete && (
        <div className="flex items-center justify-center mt-4">
          <button
            type="button"
            className="px-6 py-2 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200 shadow-sm flex items-center gap-2"
            onClick={() => setClickedDelete(true)}
          >
            <FaRegTrashAlt className="w-4 h-4" />
            Delete Profile
          </button>
        </div>
      )}
      {formState.error && (
        <div className="mt-2 text-red-600 text-sm">
          {formState.error || "An error occurred while deleting your profile."}
        </div>
      )}
    </>
  );
}
