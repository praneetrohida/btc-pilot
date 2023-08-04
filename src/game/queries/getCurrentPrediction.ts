import { Ctx } from "blitz";
import db from "db";

export default async function getCurrentPrediction(_ = null, { session }: Ctx) {
  if (!session.userId) return null;

  const currentDate = new Date();
  const sixtySecondsAgo = new Date(currentDate.getTime() - 60 * 1000);

  const prediction = await db.prediction.findFirst({
    where: {
      userId: session.userId,
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      createdAt: true,
      price: true,
      direction: true,
      laterPrice: true,
      result: true,
    },
  });

  if (!prediction) return null;

  return { ...prediction, isPending: prediction.createdAt > sixtySecondsAgo };
}
