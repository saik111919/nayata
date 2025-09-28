import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "robots.txt", "nayata.png"],
      manifest: {
        name: "NAYATA",
        short_name: "NAYATA",
        start_url: "/nayata/",
        scope: "/nayata/",
        icons: [
          {
            src: "/nayata/nayata.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any maskable",
          },
          {
            src: "/nayata/nayata.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
        id: "/nayata/?source=pwa",
        theme_color: "#ffffff",
        background_color: "#000000",
        display: "standalone",
        orientation: "portrait",
        description: "NAYATA is a modern expense tracking application.",
        lang: "en-US",
        categories: ["productivity", "utilities", "finance"],
        shortcuts: [
          {
            name: "Add Expense",
            short_name: "Add",
            description: "Quickly add a new expense",
            url: "/nayata/?source=pwa&action=add",
            icons: [{ src: "/nayata/nayata.png", sizes: "192x192" }],
          },
        ],
        screenshots: [
          {
            src: "/nayata/nayata.png",
            type: "image/png",
            sizes: "540x720",
            form_factor: "narrow",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts-cache",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
              },
            },
          },
        ],
      },
      devOptions: {
        enabled: true,
        type: "module",
      },
      manifestFilename: "manifest.webmanifest",
      minify: false,
    }),
  ],
  base: "/nayata",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
