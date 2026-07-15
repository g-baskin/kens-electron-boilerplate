---
type: constant
path: src/shared/ipc.ts
source: src/shared/ipc.ts:1-4
last_commit_hash: null
worktree_state: uncommitted
status: current
used_by: ["[[ipc-handlers]]", "[[electronAPI-bridge-typed]]", "[[ipc-test-suite]]", "[[preload-test-suite]]"]
---
# IPC_CHANNELS

`IPC_CHANNELS` is an `as const` map from `getAppVersion` to `'get-app-version'` and `getPlatform` to `'get-platform'` at `src/shared/ipc.ts:1-4`. Main and preload consume the members at `src/main/ipc.ts:5-10` and `src/preload/index.ts:15-16`.
