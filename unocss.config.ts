import presetUno from "@unocss/preset-uno"
import presetIcons from "@unocss/preset-icons"
import presetWebFonts from "@unocss/preset-web-fonts"
import transformerDirectives from "@unocss/transformer-directives"
import { defineConfig } from "@unocss/vite"

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons(),
    presetWebFonts({
      fonts: {
        sans: { name: "Synonym", provider: "fontshare" },
        serif: { name: "Chubbo", provider: "fontshare" },
      },
    }),
  ],
  transformers: [transformerDirectives()],
  rules: [
    [/ratio-(\d+)/, ([, n]) => ({ "aspect-ratio": `1 / ${n}` })],
    [/opac-(.+)/, ([, value]) => ({ opacity: value })],
    [/trans-(.+)/, ([, name]) => ({ "view-transition-name": name })],
  ],
})
