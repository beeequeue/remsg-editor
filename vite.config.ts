import path from "node:path"

import { defineConfig } from "vite"
import { VitePWA } from "vite-plugin-pwa"

import inject from "@rollup/plugin-inject"
import { svelte } from "@sveltejs/vite-plugin-svelte"
import unocss from "@unocss/vite"

const moduleNameRegex = /\/node_modules\/(?!\.pnpm)(.+?)\//

export default defineConfig({
  build: {
    target: "firefox125",
    rollupOptions: {
      output: {
        manualChunks: (id, { getModuleInfo }) => {
          if (id.includes("node_modules")) {
            if ((getModuleInfo(id)?.code?.length ?? 0) < 1000) {
              return "vendor"
            }

            return moduleNameRegex.exec(id)?.[1] ?? "vendor"
          }
        },
      },
    },
  },

  resolve: {
    alias: {
      "node:buffer": path.resolve("./node_modules/buffer"),
      buffer: path.resolve("./node_modules/buffer"),
    },
  },

  plugins: [
    svelte(),
    unocss(),
    inject({ Buffer: ["buffer"] }) as never,
    VitePWA({
      registerType: "prompt",
      injectRegister: "script-defer",
      manifest: {
        name: "REMsg Editor",
        theme_color: "#222",
        display: "minimal-ui",
        orientation: "portrait",
        icons: [
          {
            src: "/icon.png",
            sizes: "256x256",
            type: "image/png",
          },
        ],
      },
    }),
  ],
})
