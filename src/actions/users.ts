"use server";

import prisma from "@/db";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { INDUSTRIES } from "@/utils/constants";

type User = {
  name: string | null;
  id: string;
  title: string | null;
  location: string | null;
  industryId: string | null;
  email: string | null;
  emailVerified: Date | null;
  image: string | null;
  linkedInId: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export async function getUser(id: string): Promise<User | null> {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    return user;
  } catch (err: unknown) {
    console.error("Error fetching user:", err);
    return null;
  }
}

export async function editUser(
  id: string,
  data: Partial<User>
): Promise<User | null> {
  try {
    const user = await prisma.user.update({
      where: {
        id,
      },
      data,
    });
    return user;
  } catch (err: unknown) {
    console.error("Error updating user:", err);
    return null;
  }
}

export interface EditUserFormState {
  success: boolean | null;
  error: string | null;
  response: string | null;
}

export async function editUserInfo(
  prevState: EditUserFormState,
  formData: FormData
): Promise<EditUserFormState> {
  const id = formData.get("userId") as string;
  const session = await auth();
  if (!session || !session.user?.id || session.user.id !== id) {
    return {
      error: "Unauthorized",
      response: null,
      success: false,
    };
  }
  const industry = formData.get("industry") as keyof typeof INDUSTRIES;
  const industryId = INDUSTRIES[industry];
  const title = formData.get("title") as string;
  const location = formData.get("location") as string;

  if (!title || !location) {
    return {
      ...prevState,
      error: "Title and location are required",
    };
  }

  const user = await editUser(id, { title, location, industryId });

  if (!user) {
    return {
      ...prevState,
      error: "Failed to update user",
    };
  }

  revalidatePath(`/user/${id}`);

  return {
    ...prevState,
    success: true,
    response: "User updated successfully",
  };
}
