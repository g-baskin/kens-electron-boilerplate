# preload

**Type:** module
**File:** `src/preload/index.ts:1`
**Exported:** no (entry point)

## Description
Preload script that bridges Electron's main process APIs to the renderer via `contextBridge.exposeInMainWorld`. Exposes the `electronAPI` object on `window` with async IPC wrappers and static version info.

## Exports
None — uses side-effect `contextBridge.exposeInMainWorld`.

## Imports
| Name | Source |
|------|--------|
| `contextBridge`, `ipcRenderer` | `electron` |

## Exposed API
The `electronAPI` object exposed to the renderer contains:
- `getAppVersion()` → `Promise<string>` — invokes `get-app-version` IPC channel
- `getPlatform()` → `Promise<string>` — invokes `get-platform` IPC channel
- `versions` → `{ electron, node, chrome }` — static `process.versions` snapshot

## Related
- [[electronAPI-bridge]]
- [[versions]]
- [[ElectronAPI]]
- [[main-process]]
