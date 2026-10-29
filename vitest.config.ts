import { fileURLToPath } from "node:url";

import { defineConfig } from "vitest/config";

const path = (relative: string) =>
  fileURLToPath(new URL(relative, import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      "@": path("./src"),
      // The marker package throws outside React Server Components; tests run in Node.
      "server-only": path(
        "./node_modules/next/dist/compiled/server-only/empty.js",
      ),
    },
  },
  test: {
    include: ["tests/unit/**/*.test.{ts,tsx}"],
    environment: "jsdom",
  },
});
