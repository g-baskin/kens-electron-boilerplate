---
type: function
path: src/main/index.ts
source: src/main/index.ts:16-49
last_commit_hash: 76ea0cfb8b4bdd86b458334fdda9e987cd023e0d
worktree_state: modified
status: current
contradicts: "[[createWindow]]"
triggers: ["[[BrowserWindowOptions-sandboxed]]", "[[CSP-Policy]]"]
---
# createWindow sandboxed

> [!contradiction]
> This implementation supersedes [[createWindow]] by using `sandbox: true` at `src/main/index.ts:20-25`; the predecessor records `false` at `76ea0cfb8b4bdd86b458334fdda9e987cd023e0d:src/main/index.ts:17-25`.

Development loads `VITE_DEV_SERVER_URL` and opens DevTools at `src/main/index.ts:28-33`. Production installs [[CSP-Policy]] and loads the bundled renderer at `src/main/index.ts:35-47`.
