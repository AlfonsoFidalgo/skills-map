"use server";

import prisma from "@/db";
import { type Industry } from "../../prisma/generated/prisma";

export async function getIndustryDetails(
  industryId: string
): Promise<Industry | null> {
  try {
    const industry = await prisma.industry.findUnique({
      where: {
        id: industryId,
      },
    });
    return industry || null;
  } catch (err: unknown) {
    console.error("Error fetching industry details:", err);
    return null;
  }
}
