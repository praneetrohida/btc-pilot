import { Ctx } from "blitz";
import { getLatestBtcPrice } from "src/game/utils/getLatestBtcPrice";

export default async function getBtcPrice(_ = null, { session }: Ctx) {
  if (!session.userId) return null;

  return getLatestBtcPrice();
}
