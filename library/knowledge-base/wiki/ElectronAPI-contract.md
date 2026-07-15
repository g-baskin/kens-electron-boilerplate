---
type: interface
path: src/shared/ipc.ts
source: src/shared/ipc.ts:27-31
last_commit_hash: null
worktree_state: uncommitted
status: current
contradicts: "[[ElectronAPI]]"
used_by: ["[[Window-electronAPI]]", "[[electronAPI-bridge-typed]]", "[[test-setup]]"]
---
# ElectronAPI contract

> [!contradiction]
> This canonical shared interface supersedes the renderer-local [[ElectronAPI]] declaration. The interface is now defined at `src/shared/ipc.ts:27-31` and imported by the renderer at `src/renderer/types/electron.d.ts:1`, contradicting the prior local definition at `76ea0cf51169b675d5e117c9be691c0f812826b0c:src/renderer/types/electron.d.ts:4-15`.

`ElectronAPI` declares promise-returning version and platform methods derived from [[IpcResult]], plus readonly [[RuntimeVersions]], at `src/shared/ipc.ts:27-31`. Renderer declares the global using it at `src/renderer/types/electron.d.ts:5-8`; preload validates its object with `satisfies` at `src/preload/index.ts:14-22`.
