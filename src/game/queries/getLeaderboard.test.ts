import { beforeEach, describe, it } from "vitest";
import db from "db";
import getLeaderboard from "./getLeaderboard";

beforeEach(async () => {
  await db.$reset();
});

const mockCtx: any = {
  session: {
    userId: null,
  },
};

describe("getLeaderboard", () => {
  it("returns users ordered by score", async ({ expect }) => {
    const mockUsers = [
      { id: 1, name: "User1", email: "user1@test.com", score: 100 },
      { id: 2, name: "User2", email: "user2@test.com", score: 90 },
    ];
    await db.user.createMany({
      data: mockUsers,
    });

    const result = await getLeaderboard(null, mockCtx);
    expect(result).toEqual(mockUsers);
  });
});
