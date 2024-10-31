<script lang="ts">
  // eslint-disable-next-line unicorn/prefer-node-protocol
  import { Buffer } from "buffer"
  import { decodeMsg, encodeMsg, type REMsg } from "remsg"
  import { fade } from "svelte/transition"
  import MultiSelect, { type Option } from "svelte-multiselect"
  import Entry from "./entry.svelte"
  import { db } from "./state.svelte.js"

  const entries = $derived(Object.values(db.file?.entries ?? {}))

  const relevantLanguages = $derived.by((): Option[] => {
    const languages = Object.keys(
      entries[0].strings,
    ) as (keyof (typeof entries)[0]["strings"])[]
    const relevantLanguages = Object.fromEntries(languages.map((lang) => [lang, false]))

    for (const language of languages) {
      for (const entry of entries) {
        if (entry.strings[language] == null || entry.strings[language].length === 0) {
          continue
        }

        relevantLanguages[language] = true
      }
    }

    return Object.entries(relevantLanguages)
      .filter(([, value]) => value)
      .map(([key]) => key)
  })

  let selectedLanguages = $state(["en"])

  const onFileChange = async (event: Event) => {
    const files = (event.target as HTMLInputElement).files
    if (files == null || files.length === 0) return

    const file = files.item(0)!
    const remsg = decodeMsg(Buffer.from(await file.arrayBuffer()))
    const entries = Object.fromEntries(remsg.entries.map((entry) => [entry.name, entry]))
    db.file = {
      name: file.name,
      meta: remsg.meta,
      entries,
    }
  }

  let dragging = $state<boolean | string>(false)

  const ondragover = (event: Event) => {
    dragging = true
    event.preventDefault()
  }

  const ondragleave = () => {
    dragging = false
  }

  const ondrop = async (event: DragEvent & { currentTarget: HTMLDivElement }) => {
    event.preventDefault()
    const file = event.dataTransfer!.items[0].getAsFile()!
    const remsg = decodeMsg(Buffer.from(await file.arrayBuffer()))
    const entries = Object.fromEntries(remsg.entries.map((entry) => [entry.name, entry]))

    db.file = {
      name: file.name,
      meta: remsg.meta,
      entries,
    }

    dragging = false
  }

  const exportFile = () => {
    if (db.file == null) return

    const entries = Object.values(db.file.entries)
    const remsg = {
      meta: db.file.meta,
      entries,
    } satisfies REMsg

    const remsgBuffer = encodeMsg(remsg)
    const blob = new Blob([remsgBuffer], { type: "application/octet-stream" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = db.file.name
    a.click()
    URL.revokeObjectURL(url)
    a.remove()
  }
</script>

<input id="file" type="file" hidden onchange={onFileChange} />

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  class="flex h-full w-full flex-col items-center justify-center"
  {ondrop}
  {ondragover}
  {ondragleave}
>
  {#if dragging}
    <div
      transition:fade={{ duration: 100 }}
      class="l-0 t-0 bg-amber-9 bg-op-25 z-100 fixed flex h-full w-full items-center justify-center"
    >
      <div
        class="w-350px max-w-80% h-250px text-30px bg-#111 text-shadow-lg border-3px border-amber-4 rounded-30px flex items-center justify-center border-dashed font-bold shadow-lg"
      >
        Drop file
      </div>
    </div>
  {/if}

  {#if db?.file == null}
    <label
      for="file"
      class="h-75 w-75 border-1 border-amber flex cursor-pointer flex-col items-center justify-center rounded-2xl border-solid p-8"
    >
      <span class="i-lucide:file-scan h-25 w-25"></span>
      <span class="text-center font-bold">
        Select/Drop
        <br />
        *.msg.* file
      </span>
    </label>
  {:else}
    <h1 class="m-0">{db.file.name}</h1>
    <div class="flex items-center gap-10">
      <div>Version {db.file.meta.version}</div>
      <div>{db.file.meta.attributes.length} attributes</div>
      <button class="cursor-pointer rounded-lg" onclick={exportFile}>Export</button>
    </div>

    <div class="mb-4 mt-2">
      <MultiSelect
        placeholder="Languages"
        options={relevantLanguages}
        bind:selected={selectedLanguages}
        outerDivClass="w-300px min-h-32px b-color-amber"
        liOptionClass="color-#eee bg-#333"
      />
    </div>

    <div class="flex h-full w-full flex-col items-center overflow-auto">
      {#each entries as entry}
        <Entry entryName={entry.name} languages={selectedLanguages} />
      {/each}
    </div>
  {/if}
</div>

<style>
  :global(html) {
    user-select: none;
  }

  :global(button),
  :global(input) {
    border-color: rgb(251 191 36);
  }

  :global(a) {
    color: #007aff;
  }
</style>
