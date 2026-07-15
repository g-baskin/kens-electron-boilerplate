---
type: bridge
path: src/preload/index.ts
source: src/preload/index.ts:10-24
last_commit_hash: 76ea0cfb8b4bdd86b458334fdda9e987cd023e0d
worktree_state: modified
status: current
contradicts: "[[electronAPI-bridge]]"
depends_on: ["[[ipc-contract]]", "[[typed-invoke]]", "[[ElectronAPI-contract]]"]
---
# electronAPI bridge typed

> [!contradiction]
> This bridge replaces [[electronAPI-bridge]]'s literal invocations. It uses `IPC_CHANNELS` via [[typed-invoke]] at `src/preload/index.ts:10-16`; the prior literals are recorded at `76ea0cfb8b4bdd86b458334fdda9e987cd023e0d:src/preload/index.ts:3-14`.

The object satisfies [[ElectronAPI-contract]] and exposes only the `electronAPI` namespace at `src/preload/index.ts:14-24`.
