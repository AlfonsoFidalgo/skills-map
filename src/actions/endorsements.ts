"use server";

import prisma from "@/db";
import { revalidatePath } from "next/cache";

export type Endorsement = {
  id: string;
  endorserId: string;
  endorseeId: string;
  skillId: string;
  createdAt: Date;
};

export async function getEndorsementsSummary(
  userId: string,
  skillIds: string[],
  skillNames: string[]
) {
  try {
    const endorsements = await prisma.endorsement.findMany({
      where: {
        endorseeId: userId,
        skillId: {
          in: skillIds,
        },
      },
      include: {
        skill: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    const uniqueEndorserCount = new Set(
      endorsements.map((endorsement) => endorsement.endorserId)
    );

    const skillMap = skillNames.reduce((acc, curr) => {
      acc[curr] = 0.25; //Math.floor(Math.random() * 20);
      return acc;
    }, {} as Record<string, number>);

    endorsements.forEach((endorsement) => {
      const skillName = endorsement.skill.name;
      skillMap[skillName]++;
    });

    const skillMapTransformed = [];
    for (const k in skillMap) {
      skillMapTransformed.push({ topic: k, value: skillMap[k] });
    }
    
    return {
      skillCounts: skillMapTransformed,
      endorsers: uniqueEndorserCount.size,
    };
  } catch (error) {
    console.error("Error fetching endorsements:", error);
    return { skillCounts: [], endorsers: 0 };
  }
}

export async function getUserEndorsements(
  endorserId: string,
  endorseeId: string
) {
  try {
    const endorsements = await prisma.endorsement.findMany({
      where: {
        endorserId,
        endorseeId,
      },
    });
    return endorsements;
  } catch (error) {
    console.error("Error fetching user endorsements:", error);
    return [];
  }
}

export async function deleteEndorsements(
  endorserId: string,
  endorseeId: string,
  skillsList: string[]
) {
  try {
    const endorsement = await prisma.endorsement.deleteMany({
      where: {
        endorserId,
        endorseeId,
        skillId: {
          in: skillsList,
        },
      },
    });
    return endorsement;
  } catch (error) {
    console.error("Error deleting endorsement:", error);
    return null;
  }
}

type CreateEndorsementActionState = {
  success: boolean | null;
  message: string;
};

type EndorsementData = {
  endorserId: string;
  endorseeId: string;
  selectedSkills: string[];
  skillsList: string[];
};

export async function createEndorsement({
  endorserId,
  endorseeId,
  selectedSkills,
  skillsList,
}: EndorsementData): Promise<CreateEndorsementActionState | null> {
  if (endorseeId === endorserId) {
    console.error("Endorser and endorsee cannot be the same.");
    return {
      success: false,
      message: "You cannot endorse yourself.",
    };
  }
  try {
    await deleteEndorsements(endorserId, endorseeId, skillsList);
    await prisma.endorsement.createMany({
      data: selectedSkills.map((skillId) => ({
        endorserId,
        endorseeId,
        skillId,
      })),
    });
    revalidatePath("/user/" + endorseeId);
    return { success: true, message: "Endorsement created successfully" };
  } catch (error) {
    console.error("Error creating endorsement:", error);
    return { success: false, message: "Failed to create endorsement" };
  }
}
