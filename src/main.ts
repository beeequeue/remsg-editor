import { createApp } from "vue"

import App from "./app.vue"

import "virtual:uno.css"
import "@unocss/reset/sanitize/assets.css"
import "@unocss/reset/sanitize/forms.css"
import "@unocss/reset/sanitize/sanitize.css"
import "@unocss/reset/sanitize/typography.css"
import "@unocss/reset/sanitize/reduce-motion.css"

const app = createApp(App)

app.mount("#root")
