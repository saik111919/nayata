import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isProduction = mode === "production";

  return {
    base: isProduction ? "/nayata/" : "/",
    plugins: [
      react(),
      tailwindcss(),
      VitePWA({
        registerType: "autoUpdate",
        includeAssets: ["favicon.ico", "nayata.png", "robots.txt"],
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
                  maxAgeSeconds: 60 * 60 * 24 * 365,
                },
              },
            },
          ],
        },
        devOptions: {
          enabled: false,
        },
        manifest: {
          name: "NAYATA",
          short_name: "NAYATA",
          description: "NAYATA - Modern Expense Tracking Application",
          start_url: isProduction ? "/nayata/" : "/",
          scope: isProduction ? "/nayata/" : "/",
          display: "standalone",
          background_color: "#000000",
          theme_color: "#ffffff",
          orientation: "portrait",
          icons: [
            {
              src: isProduction ? "/nayata/nayata.png" : "/nayata.png",
              sizes: "192x192",
              type: "image/png",
              purpose: "any maskable",
            },
            {
              src: isProduction ? "/nayata/nayata.png" : "/nayata.png",
              sizes: "512x512",
              type: "image/png",
              purpose: "any maskable",
            },
          ],
          shortcuts: [
            {
              name: "Add Expense",
              short_name: "Add",
              description: "Quickly add a new expense",
              url: isProduction
                ? "/nayata/?source=pwa&action=add"
                : "/?source=pwa&action=add",
              icons: [
                {
                  src: isProduction ? "/nayata/nayata.png" : "/nayata.png",
                  sizes: "192x192",
                },
              ],
            },
          ],
        },
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});

// import react from "@vitejs/plugin-react";
// import path from "path";
// import { fileURLToPath } from "url";
// import tailwindcss from "@tailwindcss/vite";
// import { VitePWA } from "vite-plugin-pwa";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [
//     react(),
//     tailwindcss(),
//     VitePWA({
//       registerType: "autoUpdate",
//       includeAssets: ["favicon.ico", "robots.txt", "nayata.png"],
//       manifest: {
//         name: "NAYATA",
//         short_name: "NAYATA",
//         start_url: "/",
//         scope: "/",
//         icons: [
//           {
//             src: "nayata.png",
//             sizes: "192x192",
//             type: "image/png",
//           },
//           {
//             src: "nayata.png",
//             sizes: "512x512",
//             type: "image/png",
//           },
//         ],
//         id: "/?source=pwa",
//         theme_color: "#000000",
//         background_color: "#000000",
//         display: "standalone",
//         orientation: "portrait",
//         description: "NAYATA is a modern web application.",
//         lang: "en-US",
//         categories: ["productivity", "utilities"],
//         shortcuts: [
//           {
//             name: "Nayata",
//             short_name: "Nayata",
//             description: "Manage your expenses",
//             url: "/?source=pwa",
//             icons: [{ src: "nayata.png", sizes: "192x192" }],
//           },
//         ],
//         screenshots: [
//           {
//             src: "nayata.png",
//             type: "image/png",
//             sizes: "540x720",
//             form_factor: "narrow",
//           },
//         ],
//       },
//       workbox: {
//         // Add workbox options here if needed
//       },
//     }),
//   ],
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"),
//     },
//   },
// });
