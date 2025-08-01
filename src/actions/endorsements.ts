"use server";

import prisma from "@/db";
import { Skill } from "./skills";

export type Endorsement = {
  id: string;
  endorserId: string;
  endorseeId: string;
  skillId: string;
  createdAt: Date;
};

export async function getEndorsementsSummary(
  userId: string,
  skillIds: string[]
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

    // Group endorsements by skill and count them
    const skillCounts = endorsements.reduce((acc, endorsement) => {
      const skillId = endorsement.skill.id;
      const skillName = endorsement.skill.name;

      if (!acc[skillId]) {
        acc[skillId] = {
          topic: skillName,
          value: 0,
        };
      }
      acc[skillId].value += 1;
      return acc;
    }, {} as Record<string, { topic: string; value: number }>);

    // Convert to array of objects with topic and value
    return {
      skillCounts: Object.values(skillCounts),
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
    return { success: true, message: "Endorsement created successfully" };
  } catch (error) {
    console.error("Error creating endorsement:", error);
    return { success: false, message: "Failed to create endorsement" };
  }
}
