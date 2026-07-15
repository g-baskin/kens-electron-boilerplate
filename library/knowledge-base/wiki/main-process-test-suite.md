---
type: test-suite
path: tests/unit/main-process.test.ts
source: tests/unit/main-process.test.ts:1-158
last_commit_hash: 9ea9d9914f13545c538978e591e058ad28c815ac
worktree_state: modified
status: current
tests: ["[[main-process]]", "[[createWindow-sandboxed]]"]
---
# main process test suite

The node suite creates Electron and IPC mocks at `tests/unit/main-process.test.ts:1-65` and reloads the module for each case at `tests/unit/main-process.test.ts:67-78`. It checks sandbox enablement before readiness at `tests/unit/main-process.test.ts:80-87`, hardening including `sandbox: true` at `tests/unit/main-process.test.ts:108-121`, and dev/prod loading plus CSP at `tests/unit/main-process.test.ts:123-157`.
