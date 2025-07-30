"use server";

import prisma from "@/db";

type Skill = {
  id: string;
  name: string;
  description?: string | null;
  industryId: string;
};

export async function getIndustrySkills(
  industryId: string
): Promise<Partial<Skill>[]> {
  try {
    const skills = await prisma.skill.findMany({
      where: {
        industryId: industryId,
      },
    });
    return skills.map((skill) => ({
      id: skill.id,
      name: skill.name,
      description: skill.description,
    }));
  } catch (error) {
    console.error("Error fetching industry skills:", error);
    return [];
  }
}
