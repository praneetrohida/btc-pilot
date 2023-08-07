import db from "db";

export const createMockUser = async () => {
  let mockUserId = 1;
  const mockUser = {
    id: mockUserId,
    name: "Test User",
    email: "test@user.com",
    role: "User",
    score: 100,
  };

  const user = await db.user.create({
    data: mockUser,
  });
  return user;
};
