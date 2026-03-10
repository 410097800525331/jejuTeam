import path from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: path.resolve(import.meta.dirname, "../../components/runtime"),
    emptyOutDir: true,
    lib: {
      entry: path.resolve(import.meta.dirname, "src/runtime/index.ts"),
      formats: ["es"],
      fileName: () => "shell-runtime.js"
    },
    rollupOptions: {
      output: {
        chunkFileNames: "[name]-[hash].js",
        assetFileNames: "[name][extname]"
      }
    }
  },
  resolve: {
    alias: {
      "@runtime": path.resolve(import.meta.dirname, "src/runtime"),
      "@front-fab": path.resolve(import.meta.dirname, "../../components/ui/FAB")
    }
  },
  server: {
    fs: {
      strict: true,
      allow: [
        path.resolve(import.meta.dirname, "src"),
        path.resolve(import.meta.dirname, "../../components/ui/FAB")
      ]
    }
  }
});
