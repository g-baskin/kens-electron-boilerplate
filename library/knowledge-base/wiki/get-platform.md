# get-platform

**Type:** ipc-endpoint
**File:** `src/main/ipc.ts:8`
**Exported:** n/a (registered via `ipcMain.handle`)

## Description
IPC channel that returns the current OS platform string from `process.platform`. Invoked by the renderer through the preload bridge's `electronAPI.getPlatform()`.

## Signature

```ts
ipcMain.handle('get-platform', () => string)
```

## Channel Name
`get-platform`

## Return Value
`string` — e.g. `'darwin'`, `'win32'`, `'linux'`

## Related
- [[registerIpcHandlers]]
- [[electronAPI-bridge]]
- [[App]]
- [[ipc-handlers]]
