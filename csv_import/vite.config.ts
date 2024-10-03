import { resolve } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      tsconfigPath: resolve(__dirname, "tsconfig.build.json"),
      insertTypesEntry: true,
    }),
  ],
  define: {
    "process.env.NODE_ENV": '"production"',
  },
  build: {
    lib: {
      entry: resolve(__dirname, "lib/main.ts"),
      name: "plugin.js",
      fileName: (_) => `plugin.js`,
      formats: ["es"],
    },
  },
});
