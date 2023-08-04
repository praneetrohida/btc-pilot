import { Ctx } from "blitz";
import fetch from "node-fetch";

const API_URL = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=BTC";
export default async function getBtcPrice(_ = null, { session }: Ctx) {
  if (!session.userId) return null;

  const response = await fetch(API_URL, {
    headers: {
      "X-CMC_PRO_API_KEY": process.env.CMC_API_KEY as string,
    },
  });

  const jsonRes: any = await response.json();

  const price = jsonRes.data.BTC.quote.USD.price;

  return +price.toFixed(2);
}
