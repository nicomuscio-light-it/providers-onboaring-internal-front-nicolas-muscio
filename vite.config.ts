import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import viteReact from "@vitejs/plugin-react";
import path from "path";
import { defineConfig, loadEnv } from "vite";
import { analyzer } from "vite-bundle-analyzer";

export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return {
    plugins: [
      tanstackRouter(),
      viteReact(),
      tailwindcss(),
      ...(process.env.VITE_APP_ENV === "local" ? [analyzer()] : []),
    ],
    resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
  };
});
