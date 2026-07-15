---
type: contradiction-report
date: 2026-07-14
status: open
---
# meta/2026 07 14 contradiction report

## Sandboxed window contract

- **Prior:** [[BrowserWindowOptions]] and [[createWindow]] record `sandbox: false` at `76ea0cfb8b4bdd86b458334fdda9e987cd023e0d:src/main/index.ts:17-25`.
- **Current:** `app.enableSandbox()` runs at `src/main/index.ts:14`, and BrowserWindow sets `sandbox: true` at `src/main/index.ts:20-25`.
- **Artifacts:** both historical pages have `[!stale]` callouts; [[BrowserWindowOptions-sandboxed]] and [[createWindow-sandboxed]] carry `[!contradiction]` callouts.

## Typed IPC bridge contract

- **Prior:** [[electronAPI-bridge]] records literal invocations at `76ea0cfb8b4bdd86b458334fdda9e987cd023e0d:src/preload/index.ts:3-14`; [[ElectronAPI]] records a local interface at `76ea0cfb8b4bdd86b458334fdda9e987cd023e0d:src/renderer/types/electron.d.ts:4-15`.
- **Current:** [[ipc-contract]] centralizes the contract at `src/shared/ipc.ts:1-31`; preload uses it at `src/preload/index.ts:2-24`; renderer imports the interface at `src/renderer/types/electron.d.ts:1-8`.
- **Artifacts:** prior pages have `[!stale]` callouts and [[electronAPI-bridge-typed]] has the current `[!contradiction]` callout.

The migration is an uncommitted worktree change. Affected pages label that fact instead of inventing a commit hash.
