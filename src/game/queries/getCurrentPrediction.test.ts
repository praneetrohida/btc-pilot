import { beforeEach, describe, it } from "vitest";
import db, { PredictionDirection, PredictionResult } from "db";
import getCurrentPrediction from "./getCurrentPrediction";
import { createMockUser } from "src/users/queries/test-utils";

beforeEach(async () => {
  await db.$reset();
});

const mockCtx: any = {
  session: {
    userId: null,
  },
};

describe("getCurrentPrediction", () => {
  it("returns null when no user is in the session", async ({}) => {
    const mockCtx: any = {
      session: {
        userId: null,
      },
    };
    const result = await getCurrentPrediction(null, mockCtx);
    expect(result).toBeNull();
  });

  it("returns null when no prediction is found", async ({ expect }) => {
    const user = await createMockUser();
    mockCtx.session.userId = user.id;

    const result = await getCurrentPrediction(null, mockCtx);
    expect(result).toBeNull();
  });

  it("returns the latest prediction when a prediction is found", async ({ expect }) => {
    const user = await createMockUser();
    mockCtx.session.userId = user.id;

    const mockPrediction = {
      createdAt: new Date(),
      price: 50000.0,
      direction: PredictionDirection.UP,
      laterPrice: 51000.0,
      result: PredictionResult.WIN,
    };

    const prediction = await db.prediction.create({
      data: {
        userId: user.id,
        ...mockPrediction,
      },
    });

    const result = await getCurrentPrediction(null, mockCtx);
    expect(result).toEqual({
      ...mockPrediction,
      isPending: !mockPrediction.result,
    });
  });
});
