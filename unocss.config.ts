import {
  defineConfig,
  presetIcons,
  presetUno,
  presetWebFonts,
  transformerDirectives,
} from "unocss"

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
