import path from "node:path"

import { defineConfig } from "vite"

import inject from "@rollup/plugin-inject"
import { svelte } from "@sveltejs/vite-plugin-svelte"
import unocss from "@unocss/vite"

export default defineConfig(({}) => ({
  build: { target: "firefox125" },

  resolve: {
    alias: {
      "node:buffer": path.resolve("./node_modules/buffer"),
      buffer: path.resolve("./node_modules/buffer"),
    },
  },

  plugins: [svelte(), unocss(), inject({ Buffer: ["buffer"] })],
}))
