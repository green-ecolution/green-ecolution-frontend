import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
//
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), TanStackRouterVite()],
  server: {
    host: true,
    proxy: {
      "/api-local": {
        target: "http://127.0.0.1:3000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-local/, "/api"),
      },
      "/api-dev": {
        target: "https://app.dev.green-ecolution.de",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-dev/, "/api"),
      },
      "/api-stage": {
        target: "https://app.stage.green-ecolution.de",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-stage/, "/api"),
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
