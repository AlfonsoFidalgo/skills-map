"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { FaPen } from "react-icons/fa";
import { MdWork } from "react-icons/md";
import { FaBuilding } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import EditProfileModal from "@/components/edit-profile-modal";

type UserInfoProps = {
  userId?: string;
  name: string;
  location?: string;
  title?: string;
  industry?: string | null;
};

export default function UserInfo({
  userId,
  name,
  location,
  industry,
  title,
}: UserInfoProps) {
  const { data: session } = useSession();
  const [isEditing, setIsEditing] = React.useState(false);

  return (
    <div className="flex flex-col justify-center items-start gap-3 w-full">
      <div className="flex flex-row items-center gap-4 w-full">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 leading-tight">
          {name}
        </h2>
        {userId === session?.user?.id && (
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 flex-shrink-0"
            aria-label="Edit profile information"
          >
            <FaPen className="w-4 h-4" />
          </button>
        )}
      </div>
      <div className="space-y-2">
        {title && (
          <div className="flex items-center gap-2">
            <MdWork className="w-4 h-4 text-gray-500" />
            <p className="text-lg md:text-xl text-gray-700">{title}</p>
          </div>
        )}
        {industry && (
          <div className="flex items-center gap-2">
            <FaBuilding className="w-4 h-4 text-gray-500" />
            <p className="text-lg md:text-xl text-gray-700">{industry}</p>
          </div>
        )}
        {location && (
          <div className="flex items-center gap-2">
            <FaLocationDot className="w-3 h-3 text-gray-500" />
            <p className="text-sm md:text-md text-gray-500">{location}</p>
          </div>
        )}
      </div>

      <EditProfileModal
        open={isEditing}
        setOpen={setIsEditing}
        userId={userId}
        title={title}
        location={location}
        industry={industry}
      />
    </div>
  );
}
