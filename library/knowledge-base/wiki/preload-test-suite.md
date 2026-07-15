---
type: test-suite
path: tests/unit/preload.test.ts
source: tests/unit/preload.test.ts:1-70
last_commit_hash: 9ea9d9914f13545c538978e591e058ad28c815ac
worktree_state: modified
status: current
tests: ["[[preload]]", "[[electronAPI-bridge-typed]]", "[[IPC_CHANNELS]]"]
---
# preload test suite

The node suite imports [[IPC_CHANNELS]] and [[ElectronAPI-contract]] at `tests/unit/preload.test.ts:1-4` and mocks Electron at `tests/unit/preload.test.ts:5-13`. It asserts the bridge allowlist at `tests/unit/preload.test.ts:29-46`, contract-channel invocation at `tests/unit/preload.test.ts:48-60`, and runtime-version fields at `tests/unit/preload.test.ts:62-69`.
