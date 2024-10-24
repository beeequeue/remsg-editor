import unocss from "@unocss/vite"
import { defineConfig } from "vite"
import { svelte } from "@sveltejs/vite-plugin-svelte"
import inject from "@rollup/plugin-inject"
import path from "node:path"

export default defineConfig(({}) => ({
  build: { target: "firefox125" },

  resolve: {
    alias: {
      "node:buffer": path.resolve("./node_modules/buffer"),
      buffer: path.resolve("./node_modules/buffer"),
    },
  },

  plugins: [
    svelte(),
    unocss(),
    inject({
      Buffer: ["buffer"],
    }),
  ],
}))
