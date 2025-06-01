import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import viteImageMin from "vite-plugin-imagemin";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteImageMin({
      gifsicle: { optimizationLevel: 7 },
      mozjpeg: { quality: 80 },
      optipng: { optimizationLevel: 7 },
      pngquant: { quality: [0.8, 0.9] },
      webp: {
        quality: 75, // [0–100], semakin rendah semakin kecil file
        lossless: false, // true untuk lossless webp (mirip PNG)
        method: 6, // [0–6], semakin tinggi semakin lambat tapi lebih kecil
      },
      svgo: {
        plugins: [
          { name: "removeViewBox" },
          { name: "removeEmptyAttrs", active: false },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
