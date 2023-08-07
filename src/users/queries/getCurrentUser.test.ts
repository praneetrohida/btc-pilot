import { beforeEach, describe, it } from "vitest";
import db from "db";
import getCurrentUser from "./getCurrentUser";
import { createMockUser } from "src/users/queries/test-utils";

beforeEach(async () => {
  await db.$reset();
});

describe("getCurrentUser", () => {
  it("returns null when no user is in the session", async ({}) => {
    const mockCtx: any = {
      session: {
        userId: null,
      },
    };
    const result = await getCurrentUser(null, mockCtx);
    expect(result).toBeNull();
  });

  it("returns the correct user when a user is in the session", async ({}) => {
    let mockUserId = 1;
    const mockUser = {
      id: mockUserId,
      name: "Test User",
      email: "test@user.com",
      role: "User",
      score: 100,
    };

    const user = await createMockUser();

    const mockCtx: any = {
      session: {
        userId: mockUserId,
      },
    };

    const result = await getCurrentUser(null, mockCtx);
    expect(result).toEqual(mockUser);
  });
});
