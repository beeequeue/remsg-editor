import unocss from "unocss/vite"
import vue from "@vitejs/plugin-vue"
import { defineConfig } from "vite"
import { nodePolyfills } from "vite-plugin-node-polyfills"

export default defineConfig(({ command }) => ({
  build: {
    target: "edge122",
  },

  plugins: [vue(), unocss(), nodePolyfills()],
}))
