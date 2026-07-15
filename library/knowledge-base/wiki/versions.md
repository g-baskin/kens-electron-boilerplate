---
type: object
path: src/preload/index.ts
source: src/preload/index.ts:17-21
last_commit_hash: 76ea0cfb8b4bdd86b458334fdda9e987cd023e0d
worktree_state: modified
status: current
depends_on: ["[[RuntimeVersions]]"]
---
# versions

The bridge exposes Electron, Node, and Chrome versions from `process.versions` at `src/preload/index.ts:17-21`. The matching readonly [[RuntimeVersions]] interface is at `src/shared/ipc.ts:21-25`.
