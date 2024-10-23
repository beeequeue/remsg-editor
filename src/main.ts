import { mount } from "svelte"

import App from "./app.svelte"

import "virtual:uno.css"
import "@unocss/reset/sanitize/assets.css"
import "@unocss/reset/sanitize/forms.css"
import "@unocss/reset/sanitize/sanitize.css"
import "@unocss/reset/sanitize/typography.css"
import "@unocss/reset/sanitize/reduce-motion.css"

export const app = mount(App, {
  target: document.getElementById("root")!,
})
