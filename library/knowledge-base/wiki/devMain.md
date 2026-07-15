---
type: function
path: scripts/dev.mjs
source: scripts/dev.mjs:30-98
last_commit_hash: 76ea0cfb8b4bdd86b458334fdda9e987cd023e0d
status: current
triggers: ["[[startElectron]]", "[[electron-restart-plugin]]", "[[devCleanup]]"]
---
# devMain

The development entry starts Vite, watches preload and main esbuild bundles, and attaches cleanup behavior at `scripts/dev.mjs:30-93`. Its final error handler logs and exits at `scripts/dev.mjs:95-98`.
