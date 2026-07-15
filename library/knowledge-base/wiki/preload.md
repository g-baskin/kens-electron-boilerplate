---
type: module
path: src/preload/index.ts
source: src/preload/index.ts:1-24
last_commit_hash: 76ea0cfb8b4bdd86b458334fdda9e987cd023e0d
worktree_state: modified
status: current
depends_on: ["[[ipc-contract]]"]
triggers: ["[[electronAPI-bridge-typed]]"]
---
# preload

Preload imports Electron bridge APIs and the shared contract at `src/preload/index.ts:1-8`, defines [[typed-invoke]] at `src/preload/index.ts:10-12`, creates a contract-checked API object at `src/preload/index.ts:14-22`, and exposes it at `src/preload/index.ts:24`.
