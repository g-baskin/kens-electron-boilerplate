---
type: module
path: src/main/ipc.ts
source: src/main/ipc.ts:1-12
last_commit_hash: 76ea0cfb8b4bdd86b458334fdda9e987cd023e0d
worktree_state: modified
status: current
depends_on: ["[[ipc-contract]]"]
---
# ipc handlers

This module imports `IPC_CHANNELS` and `IpcResult` from the shared contract at `src/main/ipc.ts:1-2` and exports [[registerIpcHandlers]] at `src/main/ipc.ts:4-12`. It binds both handlers with contract-derived names and result types at `src/main/ipc.ts:5-10`.
