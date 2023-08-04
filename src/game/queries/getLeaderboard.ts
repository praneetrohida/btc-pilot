import { Ctx } from "blitz";
import db from "db";
export default async function getLeaderboard(_ = null, { session }: Ctx) {
  return db.user.findMany({
    orderBy: {
      score: "desc",
    },
    select: {
      score: true,
      name: true,
      id: true,
      email: true,
    },
  });
}
