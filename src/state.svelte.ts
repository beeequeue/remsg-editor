import type { REMsg } from "remsg"

type State = {
  file: null | {
    name: string
    meta: REMsg["meta"]
    entries: Record<string, REMsg["entries"][number]>
  }
}

export const db = $state<State>({ file: null })
