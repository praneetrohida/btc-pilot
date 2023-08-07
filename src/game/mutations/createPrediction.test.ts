import { beforeEach, vi, describe, it } from "vitest";
import db, { PredictionDirection, PredictionResult } from "db";
import { createMockUser } from "src/users/queries/test-utils";
import createPrediction from "src/game/mutations/createPrediction";
import { GAME_TIME } from "src/game/config";
import delay from "delay";

vi.mock("src/game/utils/getLatestBtcPrice", async () => {
  return {
    getLatestBtcPrice: async () => 500,
  };
});

vi.mock("src/game/config", () => ({
  GAME_TIME: 1,
}));

beforeEach(async () => {
  await db.$reset();
  await createMockUser();
});

const mockCtx: any = {
  session: {
    userId: 1,
  },
};

describe("createPrediction", () => {
  it("creates prediction and calculates draw result", async ({}) => {
    const prediction = await createPrediction(
      {
        price: 500,
        direction: PredictionDirection.UP,
      },
      mockCtx
    );
    expect(prediction).toMatchObject({
      price: 500,
      direction: PredictionDirection.UP,
      laterPrice: null,
      userId: 1,
    });

    await delay(GAME_TIME * 1000 + 1000);
    const updatedPrediction = await db.prediction.findUnique({
      where: {
        id: prediction.id,
      },
    });

    expect(updatedPrediction).toMatchObject({
      laterPrice: 500,
      result: PredictionResult.DRAW,
    });
  });
  it("creates prediction and calculates win result", async ({ expect }) => {
    const prediction = await createPrediction(
      {
        price: 490,
        direction: PredictionDirection.UP,
      },
      mockCtx
    );

    await delay(GAME_TIME * 1000 + 1000);
    const updatedPrediction = await db.prediction.findUnique({
      where: {
        id: prediction.id,
      },
    });

    expect(updatedPrediction).toMatchObject({
      laterPrice: 500,
      result: PredictionResult.WIN,
    });
  });
  it("creates prediction and calculates loss result", async ({ expect }) => {
    const prediction = await createPrediction(
      {
        price: 490,
        direction: PredictionDirection.DOWN,
      },
      mockCtx
    );

    await delay(GAME_TIME * 1000 + 1000);
    const updatedPrediction = await db.prediction.findUnique({
      where: {
        id: prediction.id,
      },
    });

    expect(updatedPrediction).toMatchObject({
      laterPrice: 500,
      result: PredictionResult.LOSS,
    });
  });
});
