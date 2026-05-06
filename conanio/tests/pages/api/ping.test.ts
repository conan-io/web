import { describe, expect, it, vi } from "vitest";

import handler from "@/pages/api/ping";

describe("/api/ping handler", () => {
  it("responds with status ok", () => {
    const req = {} as unknown as Parameters<typeof handler>[0];
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as unknown as Parameters<typeof handler>[1];

    handler(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ status: "ok" });
  });
});
