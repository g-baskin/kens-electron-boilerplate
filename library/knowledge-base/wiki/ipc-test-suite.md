---
type: test-suite
path: tests/unit/ipc.test.ts
source: tests/unit/ipc.test.ts:1-63
last_commit_hash: 9ea9d9914f13545c538978e591e058ad28c815ac
worktree_state: modified
status: current
tests: ["[[registerIpcHandlers]]", "[[IPC_CHANNELS]]"]
---
# ipc test suite

The node suite imports [[IPC_CHANNELS]] at `tests/unit/ipc.test.ts:1-4` and mocks Electron at `tests/unit/ipc.test.ts:5-15`. It tests both registration calls and that the channel list equals `Object.values(IPC_CHANNELS)` at `tests/unit/ipc.test.ts:22-37`, then validates handler results at `tests/unit/ipc.test.ts:39-62`.
