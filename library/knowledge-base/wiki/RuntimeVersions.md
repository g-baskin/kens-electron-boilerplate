---
type: interface
path: src/shared/ipc.ts
source: src/shared/ipc.ts:21-25
last_commit_hash: null
worktree_state: uncommitted
status: current
used_by: ["[[ElectronAPI-contract]]", "[[versions]]"]
---
# RuntimeVersions

`RuntimeVersions` has readonly `electron`, `node`, and `chrome` strings at `src/shared/ipc.ts:21-25`. Preload supplies these values from `process.versions` at `src/preload/index.ts:17-21`.
