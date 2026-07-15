---
type: function
path: src/preload/index.ts
source: src/preload/index.ts:10-12
last_commit_hash: 76ea0cfb8b4bdd86b458334fdda9e987cd023e0d
worktree_state: modified
status: current
depends_on: ["[[IpcChannel]]", "[[IpcArgs]]", "[[IpcResult]]"]
used_by: ["[[electronAPI-bridge-typed]]"]
---
# typed invoke

The unexported generic `invoke` accepts a [[IpcChannel]], a matching [[IpcArgs]] rest tuple, and returns `Promise<IpcResult<C>>` at `src/preload/index.ts:10-11`. It delegates to `ipcRenderer.invoke(channel, ...args)` at `src/preload/index.ts:11`.
