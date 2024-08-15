import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getFollowersInfo(followerIDs: string[]) {
  const followersInfo = await prisma.user.findMany({
    where: { id: { in: followerIDs } },
    select: {
      id: true,
      username: true,
    },
  });

  return followersInfo;
}
