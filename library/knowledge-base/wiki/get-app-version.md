---
type: ipc-endpoint
path: src/main/ipc.ts
source: src/main/ipc.ts:4-7
last_commit_hash: 76ea0cfb8b4bdd86b458334fdda9e987cd023e0d
worktree_state: modified
status: current
depends_on: ["[[IPC_CHANNELS]]", "[[IpcContract]]"]
---
# get-app-version

The version handler uses `IPC_CHANNELS.getAppVersion` and returns `app.getVersion()` at `src/main/ipc.ts:4-7`. Its literal and empty-argument/string-result contract are defined at `src/shared/ipc.ts:1-10`.
