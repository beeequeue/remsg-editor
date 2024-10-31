<script lang="ts">
  import { db } from "./state.svelte.js"

  type Props = {
    entryName: string
    languages: string[]
  }

  const { entryName, languages }: Props = $props()

  const entry = $derived(db.file?.entries[entryName])
</script>

{#if entry != null}
  <div class="px-6 py-2">
    <h2 class="m-0">{entry.name}</h2>

    <div class="w-450px flex flex-col">
      {#each languages as language}
        <div>{language}</div>
        <textarea
          class="h-100px bg-#33221166 shadow-#00000099 b-color-amber rounded-lg p-3 shadow-md"
          bind:value={entry.strings[language as never]}
        ></textarea>
      {/each}
    </div>
  </div>
{/if}

<style>
  :global(html) {
    user-select: none;
  }

  :global(a) {
    color: #007aff;
  }
</style>
