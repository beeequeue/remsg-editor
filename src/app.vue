<template>
  <div
    v-if="data == null"
    class="h-full w-full flex flex-col justify-center items-center"
  >
    <div class="i-lucide:file-scan h-20 w-20" @click="openDialog" />
    <div class="font-bold">Select file</div>
  </div>

  <div v-else>
    <pre>{{ JSON.stringify(data, null, 2) }}</pre>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { type REMsg, decodeMsg } from "remsg"
import { type DragDropEvent, getCurrentWebview } from "@tauri-apps/api/webview"
import { open } from "@tauri-apps/plugin-dialog"
import { readFile } from "@tauri-apps/plugin-fs"

const hovering = ref(false)
const data = ref<REMsg>()

const openDialog = async () => {
  const path = await open({ multiple: false, directory: false })
  const file = await readFile(path)
  const msg = decodeMsg(file)

  data.value = msg
}

getCurrentWebview().onDragDropEvent((event: { payload: DragDropEvent }) => {
  if (event.payload.type === "over") {
    hovering.value = true
  } else if (event.payload.type === "drop") {
    void loadFile(event.payload.paths[0])
  } else {
    hovering.value = false
  }
})
</script>

<style>
html {
  user-select: none;
}

a {
  color: #007aff;
}
</style>
