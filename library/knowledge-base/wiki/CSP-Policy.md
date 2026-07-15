---
type: config
path: src/main/index.ts
source: src/main/index.ts:35-45
last_commit_hash: 76ea0cfb8b4bdd86b458334fdda9e987cd023e0d
worktree_state: modified
status: current
used_by: ["[[createWindow-sandboxed]]"]
---
# CSP-Policy

Production registers an `onHeadersReceived` callback that supplies the same-origin CSP at `src/main/index.ts:35-45`. Development skips this handler because its HMR/Refresh requirements are documented at `src/main/index.ts:28-32`.
