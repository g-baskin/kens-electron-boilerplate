---
type: function
path: scripts/build.mjs
source: scripts/build.mjs:5-40
last_commit_hash: 76ea0cfb8b4bdd86b458334fdda9e987cd023e0d
status: current
triggers: ["[[main-process]]", "[[preload]]", "[[renderer-entry]]"]
---
# buildMain

The production build deletes `dist`, runs Vite, then esbuild-bundles main and preload to their dist entries with Electron external, minification, and sourcemaps at `scripts/build.mjs:5-35`. Errors log and exit nonzero at `scripts/build.mjs:37-40`.
