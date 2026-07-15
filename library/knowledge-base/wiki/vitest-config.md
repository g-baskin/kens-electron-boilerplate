---
type: config
path: vitest.config.ts
source: vitest.config.ts:1-11
last_commit_hash: 76ea0cfb8b4bdd86b458334fdda9e987cd023e0d
status: current
triggers: ["[[test-setup]]"]
---
# vitest-config

Vitest uses React and jsdom at `vitest.config.ts:4-8`, loads [[test-setup]] at `vitest.config.ts:8`, and targets `tests/**/*.test.{ts,tsx}` at `vitest.config.ts:9`.
