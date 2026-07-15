---
type: function
path: scripts/dev.mjs
source: scripts/dev.mjs:12-28
last_commit_hash: 76ea0cfb8b4bdd86b458334fdda9e987cd023e0d
status: current
used_by: ["[[devMain]]", "[[electron-restart-plugin]]"]
---
# startElectron

`startElectron(url)` kills an existing child, spawns Electron with `VITE_DEV_SERVER_URL`, and inherits stdio at `scripts/dev.mjs:12-21`; its close callback exits the parent for non-null codes at `scripts/dev.mjs:23-27`.
