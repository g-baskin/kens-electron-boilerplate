# ipc-handlers

**Type:** module
**File:** `src/main/ipc.ts:1`
**Exported:** yes

## Description
Dedicated module for Electron IPC handler registration. Exports `registerIpcHandlers` which binds all `ipcMain.handle` listeners. Keeps IPC logic separated from window management.

## Exports
| Name | Type |
|------|------|
| `registerIpcHandlers` | function |

## Imports
| Name | Source |
|------|--------|
| `ipcMain`, `app` | `electron` |

## Channels Registered
- [[get-app-version]]
- [[get-platform]]

## Related
- [[registerIpcHandlers]]
- [[preload]]
- [[ElectronAPI]]
