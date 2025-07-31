"use server";

import prisma from "@/db";

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
  endorseeId: string
) {
  try {
    const endorsement = await prisma.endorsement.deleteMany({
      where: {
        endorserId,
        endorseeId,
      },
    });
    return endorsement;
  } catch (error) {
    console.error("Error deleting endorsement:", error);
    return null;
  }
}

export async function createEndorsement(
  endorserId: string,
  endorseeId: string,
  skillIds: string[]
) {
  try {
    await deleteEndorsements(endorserId, endorseeId);
    const endorsements = await prisma.endorsement.createMany({
      data: skillIds.map((skillId) => ({
        endorserId,
        endorseeId,
        skillId,
      })),
    });
    return endorsements;
  } catch (error) {
    console.error("Error creating endorsement:", error);
    return null;
  }
}
