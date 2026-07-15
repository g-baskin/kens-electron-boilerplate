---
type: config
path: src/main/index.ts
source: src/main/index.ts:16-25
last_commit_hash: 76ea0cfb8b4bdd86b458334fdda9e987cd023e0d
worktree_state: modified
status: current
contradicts: "[[BrowserWindowOptions]]"
---
# BrowserWindowOptions sandboxed

> [!contradiction]
> This configuration supersedes [[BrowserWindowOptions]]: `sandbox` is now `true` at `src/main/index.ts:20-25`, contradicting the `false` historical value at `76ea0cfb8b4bdd86b458334fdda9e987cd023e0d:src/main/index.ts:17-25`.

The 900 × 670 window uses the compiled preload path, context isolation, no renderer Node integration, and Chromium sandboxing at `src/main/index.ts:16-25`. App-wide sandboxing is enabled first at `src/main/index.ts:14`.
