# createWindow

**Type:** function
**File:** `src/main/index.ts:14`
**Exported:** no

## Description
Creates and configures the main `BrowserWindow` for the application. In dev mode it loads from the Vite dev server URL and opens DevTools; in production it applies a strict CSP and loads the built HTML file.

## Signature

```ts
function createWindow(): void
```

## Details
- Window dimensions: 900 × 670
- Preload script resolved from `../preload/index.js`
- `contextIsolation: true`, `nodeIntegration: false`, `sandbox: false`
- In dev mode: loads `process.env.VITE_DEV_SERVER_URL`, opens DevTools
- In production: injects a Content-Security-Policy header via `onHeadersReceived`, loads `../renderer/index.html`

## Related
- [[BrowserWindowOptions]]
- [[CSP-Policy]]
- [[isDev]]
- [[main-process]]
