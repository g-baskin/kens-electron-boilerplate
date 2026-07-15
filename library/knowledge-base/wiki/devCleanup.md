---
type: function
path: scripts/dev.mjs
source: scripts/dev.mjs:82-92
last_commit_hash: 76ea0cfb8b4bdd86b458334fdda9e987cd023e0d
status: current
triggers: ["[[devMain]]"]
---
# devCleanup

The cleanup handler kills Electron if present, disposes both esbuild contexts, closes Vite, and exits at `scripts/dev.mjs:82-88`; both SIGINT and SIGTERM use it at `scripts/dev.mjs:91-92`.
