---
type: module
path: src/shared/ipc.ts
source: src/shared/ipc.ts:1-31
last_commit_hash: null
worktree_state: uncommitted
status: current
triggers: ["[[IPC_CHANNELS]]", "[[IpcContract]]", "[[ElectronAPI-contract]]"]
---
# ipc contract

The shared module defines channel constants, endpoint argument/result entries, derived utility types, runtime version fields, and the renderer bridge interface at `src/shared/ipc.ts:1-31`. It is imported by main at `src/main/ipc.ts:2`, preload at `src/preload/index.ts:2-8`, and the renderer declaration at `src/renderer/types/electron.d.ts:1`.
