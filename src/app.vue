<template>
  <div
    v-if="data == null"
    class="h-full w-full flex flex-col justify-center items-center"
  >
    <label
      ref="input$"
      class="flex flex-col justify-center items-center h-75 w-75 p-8 cursor-pointer border-1 border-solid border-amber rounded-2xl"
      @click="loadFile"
    >
      <span class="i-lucide:file-scan h-25 w-25" />
      <span class="text-center font-bold">Select file</span>
      <input type="file" class="hidden" @change="loadFile" />
    </label>
  </div>

  <div v-else class="h-full w-full overflow-auto">
    <pre>{{ JSON.stringify(toShow, null, 2) }}</pre>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue"
import { type REMsg, decodeMsg } from "remsg"
import { useElementHover } from "@vueuse/core"

const input$ = ref<HTMLInputElement>()
const hovering = useElementHover(input$)
const data = ref<REMsg>()

const loadFile = async (event: Event) => {
  const files = (event.target as HTMLInputElement).files
  if (files == null || files.length === 0) return

  const msg = decodeMsg(Buffer.from(await files.item(0)!.arrayBuffer()))

  data.value = msg
}

const toShow = computed(() => ({
  meta: data.value?.meta,
  entries: Object.fromEntries(
    data.value?.entries.map((entry) => [entry.name, entry.strings.en]) ?? [],
  ),
}))
</script>

<style>
html {
  user-select: none;
}

a {
  color: #007aff;
}
</style>
