# ElectronAPI

**Type:** type
**File:** `src/renderer/types/electron.d.ts:5`
**Exported:** no (ambient declaration)

## Description
TypeScript interface describing the shape of the `window.electronAPI` object exposed by the preload script via `contextBridge`. Enables type-safe access to IPC methods and version info from the renderer process.

## Signature

```ts
interface ElectronAPI {
  getAppVersion: () => Promise<string>;
  getPlatform: () => Promise<string>;
  versions: {
    electron: string;
    node: string;
    chrome: string;
  };
}
```

## Properties
| Name | Type | Description |
|------|------|-------------|
| `getAppVersion` | `() => Promise<string>` | Async IPC call to get app version |
| `getPlatform` | `() => Promise<string>` | Async IPC call to get OS platform |
| `versions` | `ElectronAPIVersions` | Static snapshot of runtime versions |

## Related
- [[electronAPI-bridge]]
- [[versions]]
- [[Window-electronAPI]]
- [[preload]]
- [[get-app-version]]
- [[get-platform]]
