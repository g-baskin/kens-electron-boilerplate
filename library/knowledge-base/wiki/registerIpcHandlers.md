# registerIpcHandlers

**Type:** function
**File:** `src/main/ipc.ts:3`
**Exported:** yes

## Description
Registers all IPC handle listeners on `ipcMain`. Called once during app startup from the main process `whenReady` handler. Currently registers the `get-app-version` and `get-platform` channels.

## Signature

```ts
export function registerIpcHandlers(): void
```

## Related
- [[get-app-version]]
- [[get-platform]]
- [[ipc-handlers]]
- [[main-process]]
