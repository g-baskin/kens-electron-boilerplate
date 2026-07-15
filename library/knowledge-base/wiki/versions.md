# versions

**Type:** object
**File:** `src/preload/index.ts:6`
**Exported:** no (part of `electronAPI` context bridge)

## Description
Static object exposed on `window.electronAPI.versions` containing runtime version strings for Electron, Node.js, and Chrome. Captured at preload time from `process.versions`.

## Signature

```ts
versions: {
  electron: process.versions.electron,
  node: process.versions.node,
  chrome: process.versions.chrome,
}
```

## Properties
| Name | Type | Description |
|------|------|-------------|
| `electron` | `string` | Electron runtime version |
| `node` | `string` | Node.js runtime version |
| `chrome` | `string` | Chromium runtime version |

## Related
- [[electronAPI-bridge]]
- [[ElectronAPI]]
- [[preload]]
- [[App]]
