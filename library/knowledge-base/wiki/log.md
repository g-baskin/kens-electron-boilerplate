# Extraction Log

## Date
2025-07-14

## Source Files Scanned (12)

| # | File | Status |
|---|------|--------|
| 1 | `src/main/index.ts` | ✅ Extracted |
| 2 | `src/main/ipc.ts` | ✅ Extracted |
| 3 | `src/preload/index.ts` | ✅ Extracted |
| 4 | `src/renderer/App.tsx` | ✅ Extracted |
| 5 | `src/renderer/main.tsx` | ✅ Extracted |
| 6 | `src/renderer/types/electron.d.ts` | ✅ Extracted |
| 7 | `src/renderer/types/vite-env.d.ts` | ⚠️ File not found — skipped |
| 8 | `vite.config.ts` | ✅ Extracted |
| 9 | `vitest.config.ts` | ✅ Extracted |
| 10 | `eslint.config.mjs` | ✅ Extracted |
| 11 | `scripts/dev.mjs` | ✅ Extracted |
| 12 | `scripts/build.mjs` | ✅ Extracted |

## Entities Extracted (24)

### Functions (6)
1. `createWindow` — `src/main/index.ts:14`
2. `registerIpcHandlers` — `src/main/ipc.ts:3`
3. `startElectron` — `scripts/dev.mjs:12`
4. `devMain` — `scripts/dev.mjs:30`
5. `devCleanup` — `scripts/dev.mjs:83`
6. `buildMain` — `scripts/build.mjs:5`

### Components (1)
7. `App` — `src/renderer/App.tsx:3`

### Modules (5)
8. `main-process` — `src/main/index.ts:1`
9. `ipc-handlers` — `src/main/ipc.ts:1`
10. `preload` — `src/preload/index.ts:1`
11. `renderer-entry` — `src/renderer/main.tsx:1`
12. `electronAPI-bridge` — `src/preload/index.ts:3`

### IPC Endpoints (2)
13. `get-app-version` — `src/main/ipc.ts:4`
14. `get-platform` — `src/main/ipc.ts:8`

### Types (2)
15. `ElectronAPI` — `src/renderer/types/electron.d.ts:5`
16. `Window-electronAPI` — `src/renderer/types/electron.d.ts:4`

### Config (6)
17. `isDev` — `src/main/index.ts:5`
18. `BrowserWindowOptions` — `src/main/index.ts:15`
19. `CSP-Policy` — `src/main/index.ts:34`
20. `vite-config` — `vite.config.ts:1`
21. `vitest-config` — `vitest.config.ts:1`
22. `eslint-config` — `eslint.config.mjs:1`

### Objects (1)
23. `versions` — `src/preload/index.ts:6`

### Esbuild Plugins (1)
24. `electron-restart-plugin` — `scripts/dev.mjs:62`

## Notes
- `src/renderer/types/vite-env.d.ts` does not exist in the project — skipped.
- `electronAPI` and `ElectronAPI` collided on the case-insensitive macOS filesystem. The context bridge entity was saved as `electronAPI-bridge.md` and the type entity as `ElectronAPI.md`.
- All wiki pages follow the atomic format: H1 entity name, type/file/exported metadata, description, signature, and `[[backlinks]]`.
- The `index.md` catalogs all 24 entities grouped by type.
