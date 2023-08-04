import { resolver } from "@blitzjs/rpc";
import { z } from "zod";
import db, { PredictionDirection, PredictionResult } from "db";
import ms from "ms";
import { getLatestBtcPrice } from "src/game/utils/getLatestBtcPrice";
import { GAME_TIME } from "../config";

const CreatePredictionSchema = z.object({
  price: z.number(),
  direction: z.nativeEnum(PredictionDirection),
});

export default resolver.pipe(
  resolver.zod(CreatePredictionSchema),
  async ({ price, direction }, ctx) => {
    if (!ctx.session.userId) throw new Error("Unauthorized");
    // This throws an error if credentials are invalid
    const prediction = await db.prediction.create({
      data: {
        price,
        direction,
        user: {
          connect: {
            id: ctx.session.userId,
          },
        },
      },
    });

    setTimeout(async () => {
      const newPrice = await getLatestBtcPrice();

      let priceStayedTheSame = newPrice === price;

      const isPredictionCorrect =
        (prediction.direction === PredictionDirection.UP && newPrice > prediction.price) ||
        (prediction.direction === PredictionDirection.DOWN && newPrice < prediction.price);

      let result: PredictionResult = priceStayedTheSame
        ? PredictionResult.DRAW
        : isPredictionCorrect
        ? PredictionResult.WIN
        : PredictionResult.LOSS;

      await db.prediction.update({
        where: {
          id: prediction.id,
        },
        data: {
          laterPrice: newPrice,
          result,
        },
      });

      if (priceStayedTheSame) return;
      // price stayed the same, no points

      await db.user.update({
        where: {
          id: ctx.session.userId!,
        },
        data: {
          score: {
            increment: isPredictionCorrect ? 1 : -1,
          },
        },
      });
    }, ms(`${GAME_TIME}s`));
  }
);
