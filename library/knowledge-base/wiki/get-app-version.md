# get-app-version

**Type:** ipc-endpoint
**File:** `src/main/ipc.ts:4`
**Exported:** n/a (registered via `ipcMain.handle`)

## Description
IPC channel that returns the application version string from `app.getVersion()`. Invoked by the renderer through the preload bridge's `electronAPI.getAppVersion()`.

## Signature

```ts
ipcMain.handle('get-app-version', () => string)
```

## Channel Name
`get-app-version`

## Return Value
`string` — the app version from `package.json`

## Related
- [[registerIpcHandlers]]
- [[electronAPI-bridge]]
- [[App]]
- [[ipc-handlers]]
