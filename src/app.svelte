<script lang="ts">
// eslint-disable-next-line unicorn/prefer-node-protocol
import { Buffer } from "buffer"
import { decodeMsg, type REMsg } from "remsg"

let data = $state<REMsg>()

const onFileChange = async (event: Event) => {
  const files = (event.target as HTMLInputElement).files
  if (files == null || files.length === 0) return

  const msg = decodeMsg(Buffer.from(await files.item(0)!.arrayBuffer()))

  data = msg
}

const ondragover = (event: Event) => event.preventDefault()

const ondrop = async (event: DragEvent & { currentTarget: HTMLDivElement }) => {
  event.preventDefault()
  const buffer = await event.dataTransfer!.items[0].getAsFile()!.arrayBuffer()
  data = decodeMsg(Buffer.from(buffer))
}
</script>

<input id="file" type="file" hidden onchange={onFileChange} />

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="flex h-full w-full flex-col items-center justify-center" {ondrop} {ondragover}>
  {#if data == null}
    <label
      for="file"
      class="h-75 w-75 border-1 border-amber flex cursor-pointer flex-col items-center justify-center rounded-2xl border-solid p-8"
    >
      <span class="i-lucide:file-scan h-25 w-25"></span>
      <span class="text-center font-bold">Select file</span>
    </label>
  {:else}
    <div class="h-full w-full overflow-auto">
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  {/if}
</div>

<style>
:global(html) {
  user-select: none;
}

:global(a) {
  color: #007aff;
}
</style>
