---
type: test-setup
path: tests/setup.ts
source: tests/setup.ts:1-20
last_commit_hash: 9ea9d9914f13545c538978e591e058ad28c815ac
worktree_state: modified
status: current
depends_on: ["[[ElectronAPI-contract]]"]
used_by: ["[[vitest-config]]", "[[app-test-suite]]"]
---
# test setup

The shared Vitest setup imports DOM matchers and [[ElectronAPI-contract]] at `tests/setup.ts:1-2`. When a window exists it makes an object satisfying that interface at `tests/setup.ts:4-14` and defines it on `window.electronAPI` at `tests/setup.ts:16-19`.
