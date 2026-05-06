import { afterEach, describe, expect, it, vi } from "vitest";

import { getJsonList, getUrls } from "@/service/api";

afterEach(() => {
  vi.unstubAllGlobals();
  delete process.env.conanioServer;
});

describe("getUrls", () => {
  it("builds package URLs and normalizes api base", () => {
    process.env.conanioServer = "http://internal-api:5000///";
    const urls = getUrls({
      pattern: "OpenSSL",
      topics: [1, 2],
      licenses: [5],
      packageId: "OpenSSL",
    });

    expect(urls.api.private).toBe("http://internal-api:5000");
    expect(urls.api.public).toBe("/api");
    expect(urls.search.package).toBe("search/openssl?topics=1%2C2&licenses=5");
    expect(urls.package).toEqual({
      info: "package/openssl",
      useIt: "package/openssl/use_it",
    });
  });

  it("falls back to localhost private API when env is empty", () => {
    const urls = getUrls();
    expect(urls.api.private).toBe("http://localhost:5000");
    expect(urls.search.package).toBe("search/all?topics=&licenses=");
  });
});

describe("getJsonList", () => {
  it("converts object responses into arrays", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      status: 200,
      json: async () => ({
        a: { name: "zlib" },
        b: { name: "openssl" },
      }),
    });
    vi.stubGlobal("fetch", fetchMock);

    const result = await getJsonList<{ name: string }>("popular", "http://localhost:5000");

    expect(fetchMock).toHaveBeenCalledWith("http://localhost:5000/popular");
    expect(result.status).toBe(200);
    expect(result.data).toEqual([{ name: "zlib" }, { name: "openssl" }]);
  });

  it("returns empty data on fetch/json errors", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("boom")));

    const result = await getJsonList<{ name: string }>("popular", "http://localhost:5000");

    expect(result.status).toBe(500);
    expect(result.data).toEqual([]);
  });
});
