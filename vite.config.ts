import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import path from "path";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  build: {
    minify: "esbuild",
    target: "esnext",
    sourcemap: false,
    cssMinify: true,
    rollupOptions: {
      external: ["react-devtools"],
    },
  },
  plugins: [
    react(),
    cssInjectedByJsPlugin(),
    mode === "development" ? [] : [],
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
