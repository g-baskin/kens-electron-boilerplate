---
type: function
path: src/main/index.ts
source: 76ea0cfb8b4bdd86b458334fdda9e987cd023e0d:src/main/index.ts:16-49
last_commit_hash: 76ea0cfb8b4bdd86b458334fdda9e987cd023e0d
status: stale
superseded_by: "[[createWindow-sandboxed]]"
---
# createWindow

> [!stale]
> This historical page described a window with `sandbox: false`. The active implementation is [[createWindow-sandboxed]], which uses `sandbox: true` at `src/main/index.ts:20-25`.

The pre-migration function created the main window, loaded Vite in development, and installed the production CSP before loading built HTML at `76ea0cfb8b4bdd86b458334fdda9e987cd023e0d:src/main/index.ts:16-49`.
