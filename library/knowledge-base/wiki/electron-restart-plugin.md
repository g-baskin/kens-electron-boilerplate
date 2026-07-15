---
type: esbuild-plugin
path: scripts/dev.mjs
source: scripts/dev.mjs:61-78
last_commit_hash: 76ea0cfb8b4bdd86b458334fdda9e987cd023e0d
status: current
triggers: ["[[startElectron]]"]
---
# electron-restart-plugin

The inline `electron-restart` plugin calls `startElectron(url)` after successful main builds at `scripts/dev.mjs:61-78`, distinguishing first build from rebuild for its log output at `scripts/dev.mjs:67-73`.
