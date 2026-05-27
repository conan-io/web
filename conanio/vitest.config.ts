import path from "node:path";

import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(process.cwd(), "src"),
    },
  },
  test: {
    environment: "node",
    include: ["tests/**/*.test.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "lcov"],
      include: ["src/service/**/*.ts", "src/pages/api/**/*.ts"],
      exclude: ["tests/**", "src/**/*.test.ts", "src/**/*.test.tsx"],
    },
  },
});
