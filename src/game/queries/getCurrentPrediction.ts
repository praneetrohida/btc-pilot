import { Ctx } from "blitz";
import db from "db";

export default async function getCurrentPrediction(_ = null, { session }: Ctx) {
  if (!session.userId) return null;

  const currentDate = new Date();
  const sixtySecondsAgo = new Date(currentDate.getTime() - 60 * 1000);

  const prediction = await db.prediction.findFirst({
    where: {
      AND: [
        { userId: session.userId },
        {
          createdAt: {
            gte: sixtySecondsAgo,
          },
        },
      ],
    },
    select: {
      createdAt: true,
      price: true,
      direction: true,
    },
  });

  return prediction;
}
