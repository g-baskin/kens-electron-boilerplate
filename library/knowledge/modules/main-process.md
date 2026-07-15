# Main Process

The Electron main process — window management, application lifecycle, IPC handler registration, and Content Security Policy enforcement.

## Files

| File | Purpose |
|------|---------|
| `src/main/index.ts` | App entry point — window creation, lifecycle events, CSP |
| `src/main/ipc.ts` | IPC handler registration — all `ipcMain.handle` calls |

## Startup Sequence

When Electron launches, the following happens in order:

1. **Module loads** — `src/main/index.ts` evaluates. It checks `process.env.VITE_DEV_SERVER_URL` (line 5) to determine dev vs. production mode.

2. **Dev mode setup** — If dev, security warnings are suppressed (line 11):
   ```typescript
   process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
   ```

3. **App ready** — `app.whenReady()` fires (line 49), triggering:
   - `registerIpcHandlers()` (line 50) — registers all IPC channels from `src/main/ipc.ts`
   - `createWindow()` (line 51) — creates the BrowserWindow

4. **macOS re-activation** — The `activate` handler (lines 53-57) recreates the window if all windows were closed but the app is still running (standard macOS behavior).

5. **Window close** — `window-all-closed` (lines 60-64) quits the app on Windows/Linux. On macOS (`process.platform !== 'darwin'`), it does nothing — the app stays alive.

## Window Configuration

`createWindow()` at line 14 creates a `BrowserWindow` with these security-critical settings:

```typescript
webPreferences: {
  preload: path.join(__dirname, '../preload/index.js'),
  contextIsolation: true,
  nodeIntegration: false,
  sandbox: false,
}
```

- `contextIsolation: true` — The preload script runs in an isolated JavaScript context. The renderer cannot access preload globals or Node APIs directly.
- `nodeIntegration: false` — `require()` is not available in the renderer.
- `sandbox: false` — Required because the preload needs Node access to call `contextBridge.exposeInMainWorld()`.

Window dimensions are `900×670` (line 16-17).

## Dev vs. Production Mode

The `isDev` flag (line 5) controls two behaviors:

**Development** (lines 26-32):
- Loads the Vite dev server URL (`win.loadURL(process.env.VITE_DEV_SERVER_URL!)`)
- Opens DevTools automatically (`win.webContents.openDevTools()`)
- No CSP — Vite needs `unsafe-eval` for HMR and `unsafe-inline` for React Fast Refresh

**Production** (lines 33-46):
- Loads the built HTML file (`win.loadFile(path.join(__dirname, '../renderer/index.html'))`)
- DevTools remain closed
- Strict CSP is injected via `onHeadersReceived`:
  ```
  default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'
  ```

The CSP allows `unsafe-inline` for styles only (needed for runtime style injection by React). Scripts are restricted to `'self'` — no inline scripts or `eval`.

## IPC Handlers

`src/main/ipc.ts` exports `registerIpcHandlers()`, which registers two channels:

```typescript
ipcMain.handle('get-app-version', () => {
  return app.getVersion();          // line 4-6
});

ipcMain.handle('get-platform', () => {
  return process.platform;          // line 8-10
});
```

Both use `ipcMain.handle` (promise-based), not `ipcMain.on` (event-based). This means the renderer receives a promise that resolves with the return value. To add a new IPC channel, add another `ipcMain.handle` call in this file and expose the corresponding method in `src/preload/index.ts`.

## Testing

`tests/unit/main-process.test.ts` mocks the entire `electron` module and dynamically imports `src/main/index`. It verifies:

- `app.whenReady()` is called on startup
- `BrowserWindow` receives correct dimensions and `webPreferences`
- Dev mode loads URL and opens DevTools; production mode loads file
- CSP headers are set in production only
- `window-all-closed` handler is registered

The `ipc` module is also mocked (`vi.mock('../../src/main/ipc')`) so IPC registration doesn't run during main-process tests.

## Extension Points

- **New IPC channel**: Add handler in `src/main/ipc.ts`, expose method in `src/preload/index.ts`
- **New window**: Create a second `createWindow` variant or pass options to the existing one
- **Menu/tray**: Import from `electron` in `src/main/index.ts` and configure after `app.whenReady()`
- **Native dialogs**: Add IPC handler that calls `dialog.showOpenDialog()` etc.
