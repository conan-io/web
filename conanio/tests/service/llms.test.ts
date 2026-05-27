import { afterEach, describe, expect, it } from "vitest";

import { getSiteOrigin, hostFromOrigin, recipeReferencePageUrl } from "@/service/llms";

afterEach(() => {
  delete process.env.siteOrigin;
  delete process.env.NEXT_PUBLIC_SITE_ORIGIN;
});

describe("llms helpers", () => {
  it("prefers configured site origin and removes trailing slash", () => {
    process.env.siteOrigin = "https://conan.company.com/";
    expect(getSiteOrigin()).toBe("https://conan.company.com");
  });

  it("falls back to public env and then to conan.io", () => {
    process.env.NEXT_PUBLIC_SITE_ORIGIN = "https://example.org/";
    expect(getSiteOrigin()).toBe("https://example.org");

    delete process.env.NEXT_PUBLIC_SITE_ORIGIN;
    expect(getSiteOrigin()).toBe("https://conan.io");
  });

  it("extracts host safely and builds recipe canonical URL", () => {
    expect(hostFromOrigin("https://conan.io")).toBe("conan.io");
    expect(hostFromOrigin("not a url")).toBe("conan.io");
    expect(recipeReferencePageUrl("https://conan.io", "OpenSSL", "3.2.1")).toBe(
      "https://conan.io/center/recipes/OpenSSL?version=3.2.1",
    );
  });
});
