import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("next/cache", () => ({
  unstable_cache: <T>(fn: () => Promise<T>) => fn,
}));

import { getConanPypiMonthlyDownloadsCached } from "@/service/pypiStats";

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("getConanPypiMonthlyDownloadsCached", () => {
  it("returns last_month when pypistats responds with JSON", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ data: { last_month: 3_675_729.4 } }),
      }),
    );

    await expect(getConanPypiMonthlyDownloadsCached()).resolves.toBe(3_675_729);
  });

  it("returns null on non-OK responses (e.g. rate limit)", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        status: 429,
        json: async () => ({}),
      }),
    );

    await expect(getConanPypiMonthlyDownloadsCached()).resolves.toBeNull();
  });

  it("returns null when last_month is missing or invalid", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ data: {} }),
      }),
    );

    await expect(getConanPypiMonthlyDownloadsCached()).resolves.toBeNull();
  });

  it("returns null on network errors", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("timeout")));

    await expect(getConanPypiMonthlyDownloadsCached()).resolves.toBeNull();
  });
});
