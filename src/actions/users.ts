"use server";

import prisma from "@/db";
type User = {
  name: string | null;
  id: string;
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
