---
type: ipc-endpoint
path: src/main/ipc.ts
source: src/main/ipc.ts:9-11
last_commit_hash: 76ea0cfb8b4bdd86b458334fdda9e987cd023e0d
worktree_state: modified
status: current
depends_on: ["[[IPC_CHANNELS]]", "[[IpcContract]]"]
---
# get-platform

The platform handler uses `IPC_CHANNELS.getPlatform` and returns `process.platform` at `src/main/ipc.ts:9-11`. Its literal and empty-argument/string-result contract are defined at `src/shared/ipc.ts:1-4` and `src/shared/ipc.ts:11-15`.
