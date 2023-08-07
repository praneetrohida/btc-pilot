import { loadEnvConfig } from "@next/env";
import { defineConfig } from "vitest/config";

import tsconfigPaths from "vite-tsconfig-paths";

const projectDir = process.cwd();
loadEnvConfig(projectDir);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // @ts-expect-error Vitest doesn't have types for this
    tsconfigPaths(),
  ],
  test: {
    dir: "./",
    globals: true,
    setupFiles: "./test/setup.ts",
    coverage: {
      reporter: ["text", "json", "html"],
    },
    maxThreads: 1,
    maxConcurrency: 1,
    minThreads: 1,
  },
});
