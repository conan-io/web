import { afterEach, describe, expect, it, vi } from "vitest";

import handler from "@/pages/api/search/[pattern]";

type MockRes = {
  status: ReturnType<typeof vi.fn>;
  json: ReturnType<typeof vi.fn>;
  setHeader: ReturnType<typeof vi.fn>;
  end: ReturnType<typeof vi.fn>;
};

function createRes(): MockRes {
  return {
    status: vi.fn().mockReturnThis(),
    json: vi.fn().mockReturnThis(),
    setHeader: vi.fn(),
    end: vi.fn(),
  };
}

afterEach(() => {
  vi.unstubAllGlobals();
  delete process.env.conanioServer;
});

describe("/api/search/[pattern]", () => {
  it("returns 405 for non-GET methods", async () => {
    const req = { method: "POST", query: {} } as unknown as Parameters<typeof handler>[0];
    const res = createRes() as unknown as Parameters<typeof handler>[1];

    await handler(req, res);

    expect((res as unknown as MockRes).setHeader).toHaveBeenCalledWith("Allow", "GET");
    expect((res as unknown as MockRes).status).toHaveBeenCalledWith(405);
  });

  it("returns 400 when pattern is missing", async () => {
    const req = { method: "GET", query: {} } as unknown as Parameters<typeof handler>[0];
    const res = createRes() as unknown as Parameters<typeof handler>[1];

    await handler(req, res);

    expect((res as unknown as MockRes).status).toHaveBeenCalledWith(400);
  });

  it("maps upstream timeout to 504", async () => {
    const timeoutError = new Error("timeout");
    timeoutError.name = "TimeoutError";
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(timeoutError));

    const req = {
      method: "GET",
      query: { pattern: "zlib", topics: "", licenses: "" },
    } as unknown as Parameters<typeof handler>[0];
    const res = createRes() as unknown as Parameters<typeof handler>[1];

    await handler(req, res);

    expect((res as unknown as MockRes).status).toHaveBeenCalledWith(504);
  });

  it("returns 200 with upstream JSON payload", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => ({ result: "ok" }),
      }),
    );

    const req = {
      method: "GET",
      query: { pattern: "zlib", topics: "1", licenses: "2" },
    } as unknown as Parameters<typeof handler>[0];
    const res = createRes() as unknown as Parameters<typeof handler>[1];

    await handler(req, res);

    expect((res as unknown as MockRes).status).toHaveBeenCalledWith(200);
    expect((res as unknown as MockRes).json).toHaveBeenCalledWith({ result: "ok" });
  });
});
