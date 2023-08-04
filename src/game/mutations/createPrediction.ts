import { resolver } from "@blitzjs/rpc";
import { z } from "zod";
import db, { PredictionDirection } from "db";

const CreatePredictionSchema = z.object({
  price: z.number(),
  direction: z.nativeEnum(PredictionDirection),
});

export default resolver.pipe(
  resolver.zod(CreatePredictionSchema),
  async ({ price, direction }, ctx) => {
    if (!ctx.session.userId) throw new Error("Unauthorized");
    // This throws an error if credentials are invalid
    return db.prediction.create({
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
  }
);
