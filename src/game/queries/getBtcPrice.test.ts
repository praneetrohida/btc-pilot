import { describe, it } from "vitest";
import getBtcPrice from "./getBtcPrice";
import fetch from "node-fetch";

globalThis.fetch = fetch as any;

const mockCtx: any = {
  session: {
    userId: null,
  },
};

describe("getBtcPrice", () => {
  it("returns null when no user is in the session", async ({}) => {
    const result = await getBtcPrice(null, mockCtx);
    expect(result).toBeNull();
  });

  it("fetches the latest BTC price", async ({}) => {
    mockCtx.session.userId = 1;

    const result = await getBtcPrice(null, mockCtx);

    // Make sure we're getting a number back (Bitcoin's price)
    expect(typeof result).toBe("number");
  });
});
