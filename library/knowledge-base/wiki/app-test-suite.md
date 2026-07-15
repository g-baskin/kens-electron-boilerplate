---
type: test-suite
path: tests/unit/app.test.tsx
source: tests/unit/app.test.tsx:1-106
last_commit_hash: 9ea9d9914f13545c538978e591e058ad28c815ac
worktree_state: modified
status: current
tests: ["[[App]]", "[[Window-electronAPI]]"]
---
# app test suite

The suite imports [[App]] and [[ElectronAPI-contract]] at `tests/unit/app.test.tsx:1-4`, installs a typed bridge mock before each test at `tests/unit/app.test.tsx:7-19`, covers static rendering at `tests/unit/app.test.tsx:21-63`, and checks bridge calls/resolved values at `tests/unit/app.test.tsx:65-105`.
