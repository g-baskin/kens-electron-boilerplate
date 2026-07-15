---
type: module
path: src/main/index.ts
source: src/main/index.ts:1-66
last_commit_hash: 76ea0cfb8b4bdd86b458334fdda9e987cd023e0d
worktree_state: modified
status: current
triggers: ["[[registerIpcHandlers]]", "[[createWindow-sandboxed]]"]
---
# main process

The Electron main entry enables app-wide sandboxing before readiness at `src/main/index.ts:14`. After readiness it registers IPC handlers and creates the window at `src/main/index.ts:51-53`, recreates a window on activation at `src/main/index.ts:55-59`, and quits on non-macOS closure at `src/main/index.ts:62-66`.
