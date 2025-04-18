<script lang="ts">
  // eslint-disable-next-line unicorn/prefer-node-protocol
  import { Buffer } from "buffer"
  import { decodeMsg, encodeMsg, type REMsg } from "remsg"
  import { fade } from "svelte/transition"
  import MultiSelect, { type Option } from "svelte-multiselect"
  import Entry from "./entry.svelte"
  import { db } from "./state.svelte.js"

  const entries = $derived(Object.values(db.file?.entries ?? {}))

  let error = $state(false)
  $effect(() => {
    if (!error) return

    setTimeout(() => {
      error = false
    }, 7500)
  })

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
    error = false

    try {
      const file = event.dataTransfer!.items[0].getAsFile()!
      const remsg = decodeMsg(Buffer.from(await file.arrayBuffer()))
      const entries = Object.fromEntries(
        remsg.entries.map((entry) => [entry.name, entry]),
      )

      db.file = {
        name: file.name,
        meta: remsg.meta,
        entries,
      }
    } catch {
      error = true
    }

    dragging = false
  }

  const exportFile = (format: "json" | "msg") => () => {
    if (db.file == null) return

    const entries = Object.values(db.file.entries)
    const remsg = {
      meta: db.file.meta,
      entries,
    } satisfies REMsg

    let blob: Blob
    if (format === "msg") {
      const data = encodeMsg(remsg)
      blob = new Blob([data], { type: "application/octet-stream" })
    } else {
      const data = JSON.stringify(remsg, null, 2)
      blob = new Blob([data], { type: "application/json" })
    }

    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = db.file.name
    if (format === "json") {
      a.download += ".json"
    }

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
      class="bg-amber-9 bg-op-25 z-100 fixed flex h-full w-full items-center justify-center"
    >
      <div
        class="w-350px max-w-80% h-250px text-30px bg-#111 text-shadow-lg b-3px b-amber-4 rounded-30px b-dashed flex items-center justify-center font-bold shadow-lg"
      >
        Drop file
      </div>
    </div>
  {/if}

  {#if error}
    <div
      transition:fade={{ duration: 250 }}
      class="b-3 b-1px b-solid b-red-5 fixed bottom-8 right-8 z-50 flex items-center justify-center rounded-lg bg-red-950 px-5 py-3"
    >
      Invalid file
    </div>
  {/if}

  {#if db?.file == null}
    <label
      for="file"
      class="h-75 w-75 b-1 b-amber b-solid flex cursor-pointer flex-col items-center justify-center rounded-2xl p-8"
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
    <div class="flex items-center gap-6">
      <div>Version {db.file.meta.version}</div>
      <div>{db.file.meta.attributes.length} attributes</div>

      <button class="b-solid b-1 b-amber cursor-pointer rounded-lg" onclick={exportFile("msg")}>
        Export as msg
      </button>
      <button class="b-solid b-1 b-amber cursor-pointer rounded-lg" onclick={exportFile("json")}>
        Export as json
      </button>
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

  <a
    target="_blank"
    rel="noopener"
    href="https://github.com/beeequeue/remsg-editor"
    class="text-#eee fixed bottom-2 flex items-center"
  >
    <div class="i-simple-icons:github mr-1"></div>
    Made by beequeue
  </a>
</div>

<style>
  :global(html) {
    user-select: none;
  }

  :global(a) {
    color: #007aff;
  }
</style>
