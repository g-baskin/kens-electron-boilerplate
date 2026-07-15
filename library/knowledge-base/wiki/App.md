# App

**Type:** component
**File:** `src/renderer/App.tsx:3`
**Exported:** yes (default)

## Description
Root React component of the renderer. Fetches the app version and platform from the main process via `window.electronAPI` on mount, and displays a dashboard with version info (Electron, Node, Chrome) and a tech-stack badge row.

## Signature

```tsx
function App(): JSX.Element
```

## State
| Name | Type | Initial | Description |
|------|------|---------|-------------|
| `appVersion` | `string` | `'...'` | Application version from main process |
| `platform` | `string` | `'...'` | OS platform from main process |

## Side Effects
- `useEffect([], [])` — calls `electronAPI.getAppVersion()` and `electronAPI.getPlatform()` on mount

## Rendered Elements
- `.app` container
  - `h1` — title
  - `.info-grid` — six `.info-card` entries (App Version, Platform, Electron, Node, Chrome, Renderer)
  - `.tech-stack` — four `.tech-badge` spans (Electron, React, TypeScript, Vite)

## Related
- [[ElectronAPI]]
- [[renderer-entry]]
- [[get-app-version]]
- [[get-platform]]
