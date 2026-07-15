# main-process

**Type:** module
**File:** `src/main/index.ts:1`
**Exported:** no (entry point)

## Description
Electron main process entry point. Controls application lifecycle, creates the browser window, registers IPC handlers, applies security policies, and manages platform-specific quit behavior.

## Exports
None — this is the app entry point.

## Imports
| Name | Source |
|------|--------|
| `app`, `BrowserWindow` | `electron` |
| `path` | `path` |
| `registerIpcHandlers` | `./ipc` |

## Key Behaviors
- Suppresses Electron security warnings in dev mode
- Calls `registerIpcHandlers()` and `createWindow()` on `app.whenReady()`
- Re-creates window on `activate` (macOS dock click)
- Quits app on `window-all-closed` (non-macOS)

## Related
- [[createWindow]]
- [[registerIpcHandlers]]
- [[isDev]]
- [[CSP-Policy]]
- [[BrowserWindowOptions]]
