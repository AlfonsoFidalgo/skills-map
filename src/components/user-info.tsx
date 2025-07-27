"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { FaPen } from "react-icons/fa";
import UserInfoForm from "@/components/user-info-form";

type UserInfoProps = {
  userId?: string;
  name: string;
  location?: string;
  title?: string;
};

export default function UserInfo({
  userId,
  name,
  location,
  title,
}: UserInfoProps) {
  const { data: session } = useSession();
  const [isEditing, setIsEditing] = React.useState(false);

  return (
    <div className="flex flex-col justify-center items-start gap-1">
      <div className="flex flex-row items-center gap-4">
        <h2 className="sm:text-3xl text-2xl font-bold mb-1">{name}</h2>
        {userId === session?.user?.id && !isEditing && (
          <FaPen
            className="text-gray-500/50 hover:text-gray-500"
            onClick={() => setIsEditing(!isEditing)}
          />
        )}
      </div>
      {!isEditing ? (
        <>
          {title && <p className="text-md">{title}</p>}
          {location && <p className="text-sm text-gray-500">{location}</p>}
        </>
      ) : (
        <UserInfoForm
          userId={userId}
          location={location}
          title={title}
          setIsEditing={setIsEditing}
        />
      )}
    </div>
  );
}
