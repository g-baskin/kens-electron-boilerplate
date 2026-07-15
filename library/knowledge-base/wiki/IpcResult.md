---
type: type-alias
path: src/shared/ipc.ts
source: src/shared/ipc.ts:19
last_commit_hash: null
worktree_state: uncommitted
status: current
used_by: ["[[typed-invoke]]", "[[registerIpcHandlers]]", "[[ElectronAPI-contract]]"]
---
# IpcResult

`IpcResult<C>` selects a matching contract entry's result at `src/shared/ipc.ts:19`. Preload returns `Promise<IpcResult<C>>` at `src/preload/index.ts:10-11`, while main handlers use this result type at `src/main/ipc.ts:5-10`.
