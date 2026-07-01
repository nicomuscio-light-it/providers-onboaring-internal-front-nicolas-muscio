import viteReact from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [viteReact()],
  resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
  test: {
    // The env validation in `src/config/env.ts` runs at import time, so these
    // must be present or any module that transitively imports the api client
    // (e.g. the services barrel) throws while loading.
    env: {
      VITE_API_URL: "http://localhost/api",
      VITE_APP_ENV: "local",
      VITE_APP_NAME: "test-app",
    },
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
  },
});
