# electronAPI (context bridge)

**Type:** module
**File:** `src/preload/index.ts:3`
**Exported:** no (exposed via `contextBridge`)

## Description
The API surface object injected into the renderer's `window` context by the preload script via `contextBridge.exposeInMainWorld`. Provides async wrappers around IPC channels and a static `versions` object containing Electron, Node, and Chrome runtime version strings.

## Signature

```ts
contextBridge.exposeInMainWorld('electronAPI', {
  getAppVersion: () => ipcRenderer.invoke('get-app-version'),
  getPlatform: () => ipcRenderer.invoke('get-platform'),
  versions: {
    electron: process.versions.electron,
    node: process.versions.node,
    chrome: process.versions.chrome,
  },
});
```

## Properties
| Name | Type | Description |
|------|------|-------------|
| `getAppVersion` | `() => Promise<string>` | Invokes `get-app-version` IPC channel |
| `getPlatform` | `() => Promise<string>` | Invokes `get-platform` IPC channel |
| `versions` | `{ electron, node, chrome }` | Static runtime version strings |

## Related
- [[ElectronAPI]]
- [[versions]]
- [[preload]]
- [[Window-electronAPI]]
