import { afterEach, describe, expect, it, vi } from "vitest";

import handler from "@/pages/api/package/[packageId]/use_it";

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

describe("/api/package/[packageId]/use_it", () => {
  it("returns 405 for non-GET methods", async () => {
    const req = { method: "POST", query: {} } as unknown as Parameters<typeof handler>[0];
    const res = createRes() as unknown as Parameters<typeof handler>[1];

    await handler(req, res);

    expect((res as unknown as MockRes).setHeader).toHaveBeenCalledWith("Allow", "GET");
    expect((res as unknown as MockRes).status).toHaveBeenCalledWith(405);
  });

  it("returns 400 when packageId is missing", async () => {
    const req = { method: "GET", query: {} } as unknown as Parameters<typeof handler>[0];
    const res = createRes() as unknown as Parameters<typeof handler>[1];

    await handler(req, res);

    expect((res as unknown as MockRes).status).toHaveBeenCalledWith(400);
  });

  it("maps upstream 404 to 404", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        status: 404,
      }),
    );

    const req = {
      method: "GET",
      query: { packageId: "zlib" },
    } as unknown as Parameters<typeof handler>[0];
    const res = createRes() as unknown as Parameters<typeof handler>[1];

    await handler(req, res);

    expect((res as unknown as MockRes).status).toHaveBeenCalledWith(404);
  });

  it("returns 200 with upstream JSON payload", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => ({ use_it: "conan install zlib/1.3.1" }),
      }),
    );

    const req = {
      method: "GET",
      query: { packageId: "zlib" },
    } as unknown as Parameters<typeof handler>[0];
    const res = createRes() as unknown as Parameters<typeof handler>[1];

    await handler(req, res);

    expect((res as unknown as MockRes).status).toHaveBeenCalledWith(200);
    expect((res as unknown as MockRes).json).toHaveBeenCalledWith({
      use_it: "conan install zlib/1.3.1",
    });
  });
});
