import { defineConfig } from "vite"
import unocss from "unocss/vite"
import vue from "@vitejs/plugin-vue"

export default defineConfig(({ command }) => ({
  build: {
    target: "edge122",
  },

  plugins: [vue(), unocss()],
}))
