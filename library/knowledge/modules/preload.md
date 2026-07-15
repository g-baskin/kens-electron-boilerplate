# Preload

The context bridge between the main process and the renderer. This is the security boundary — everything the renderer can access from Node/Electron flows through this single file.

## Files

| File | Purpose |
|------|---------|
| `src/preload/index.ts` | Defines the `window.electronAPI` surface via `contextBridge` |
| `src/renderer/types/electron.d.ts` | TypeScript declarations for the exposed API (consumed by renderer) |

## How Context Bridge Works

The preload script runs in a privileged context with Node access, but `contextIsolation: true` (set in `src/main/index.ts:20`) means the renderer cannot see preload globals directly. Instead, the preload explicitly opts in to sharing specific functions via `contextBridge.exposeInMainWorld`.

The entire preload is 11 lines (`src/preload/index.ts`):

```typescript
import { contextBridge, ipcRenderer } from 'electron';

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

## Exposed API Surface

`window.electronAPI` exposes three members:

| Member | Type | Behavior |
|--------|------|----------|
| `getAppVersion()` | `() => Promise<string>` | Calls `ipcRenderer.invoke('get-app-version')`, which routes to `ipcMain.handle` in `src/main/ipc.ts:4` |
| `getPlatform()` | `() => Promise<string>` | Calls `ipcRenderer.invoke('get-platform')`, which routes to `ipcMain.handle` in `src/main/ipc.ts:8` |
| `versions` | `{ electron, node, chrome }` | Synchronous object — values are read from `process.versions` at preload time |

The `versions` object is notable: it captures version strings at preload execution time, not on demand. These are baked-in strings, not live references.

## Security Guarantees

1. **No raw `ipcRenderer` exposure** — The renderer cannot call arbitrary IPC channels. It can only invoke `get-app-version` and `get-platform` because those are the only functions exposed.

2. **No Node module access** — `nodeIntegration: false` prevents `require()` in the renderer. The preload is the sole gatekeeper.

3. **Serialization boundary** — Data crossing the context bridge is serialized and deserialized (structured clone algorithm). Functions are proxied, not shared by reference. This prevents the renderer from injecting behavior into the main process.

4. **Sandbox is off** — `sandbox: false` in `src/main/index.ts:23` is required because `contextBridge.exposeInMainWorld` needs Node bindings in the preload. If sandbox were `true`, the preload would run in a Chromium sandbox with no Node access.

## Type Declarations

The renderer knows about `window.electronAPI` through `src/renderer/types/electron.d.ts`:

```typescript
declare global {
  interface Window {
    electronAPI: {
      getAppVersion: () => Promise<string>;
      getPlatform: () => Promise<string>;
      versions: {
        electron: string;
        node: string;
        chrome: string;
      };
    };
  }
}
```

This uses `declare global` with an `export {}` to make it a module augmentation. Any `.ts`/`.tsx` file in `src/renderer/` gets autocomplete on `window.electronAPI` without importing anything.

## Testing

`tests/unit/preload.test.ts` mocks `electron` with `vi.hoisted` and dynamically imports the preload. It verifies:

- `exposeInMainWorld` is called exactly once with `'electronAPI'` as the key
- `getAppVersion` and `getPlatform` are functions that invoke the correct IPC channels
- The `versions` object has `electron`, `node`, and `chrome` keys
- `versions.node` matches `process.versions.node`

## Extension Points

To expose a new API to the renderer:

1. Add an `ipcMain.handle('channel-name', ...)` in `src/main/ipc.ts`
2. Add a method in `src/preload/index.ts`: `myMethod: () => ipcRenderer.invoke('channel-name')`
3. Update the type declaration in `src/renderer/types/electron.d.ts`
4. Call it in the renderer: `window.electronAPI.myMethod()`
