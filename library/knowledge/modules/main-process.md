# Main Process

The Electron main process — sandbox-first window management, application lifecycle, contract-defined IPC handler registration, and Content Security Policy enforcement.

## Files

| File | Purpose |
|------|---------|
| `src/main/index.ts` | App entry point — sandbox enablement, window creation, lifecycle events, CSP |
| `src/main/ipc.ts` | IPC handler registration — all `ipcMain.handle` calls |
| `src/shared/ipc.ts` | Shared channel, request/response, and bridge contract |

## Startup Sequence

When Electron launches, the following happens in order:

1. **Module loads** — `src/main/index.ts` evaluates and checks `process.env.VITE_DEV_SERVER_URL` at line 5 to determine development versus production mode.
2. **Dev mode setup** — When needed, it suppresses Electron security warnings at line 11 for Vite HMR.
3. **Sandbox is forced** — `app.enableSandbox()` runs at line 14, before readiness begins. Electron requires this pre-ready placement and applies full sandbox mode to every renderer.
4. **App ready** — `app.whenReady()` fires at line 51, then `registerIpcHandlers()` (line 52) and `createWindow()` (line 53) run.
5. **macOS re-activation** — The `activate` handler at lines 55-59 recreates a window when all windows were closed.
6. **Window close** — The `window-all-closed` handler at lines 62-66 quits on Windows/Linux but leaves the app alive on macOS.

## Window Configuration

`createWindow()` at line 16 creates a `BrowserWindow` with these security-critical settings:

```typescript
webPreferences: {
  preload: path.join(__dirname, '../preload/index.js'),
  contextIsolation: true,
  nodeIntegration: false,
  sandbox: true,
}
```

- `contextIsolation: true` — The renderer cannot access preload globals directly.
- `nodeIntegration: false` — `require()` is unavailable in renderer page code.
- `sandbox: true` — Documents and reinforces full Chromium sandboxing at the window boundary.
- `app.enableSandbox()` at line 14 — Forces the full sandbox for all current and future renderers, regardless of individual window preferences.

Window dimensions are `900×670` (lines 18-19).

## Dev vs. Production Mode

The `isDev` flag at line 5 controls two behaviors:

**Development** (lines 28-33):

- Loads the Vite dev server URL.
- Opens DevTools automatically.
- Omits CSP because Vite needs `unsafe-eval` for HMR and `unsafe-inline` for React Fast Refresh.

**Production** (lines 35-47):

- Loads the built HTML file.
- Keeps DevTools closed.
- Injects a strict CSP via `onHeadersReceived`:

  ```text
  default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'
  ```

## IPC Handlers

`src/main/ipc.ts` exports `registerIpcHandlers()`. It imports `IPC_CHANNELS` and `IpcResult` from `src/shared/ipc.ts`, then registers exactly the declared handlers:

```typescript
ipcMain.handle(IPC_CHANNELS.getAppVersion, () => app.getVersion());
ipcMain.handle(IPC_CHANNELS.getPlatform, () => process.platform);
```

Both use `ipcMain.handle` (promise-based), not `ipcMain.on` (event-based). To add a capability, update the shared contract first, then add its handler and a deliberately allowlisted preload method. This preserves compile-time agreement across main, preload, and renderer.

## Testing

`tests/unit/main-process.test.ts` mocks Electron and dynamically imports `src/main/index.ts`. It verifies:

- `app.enableSandbox()` is called before `app.whenReady()`.
- `BrowserWindow` receives the preload path plus `contextIsolation: true`, `nodeIntegration: false`, and `sandbox: true`.
- Development loads the Vite URL and opens DevTools; production loads the file and configures CSP.
- `window-all-closed` is registered.

`tests/unit/ipc.test.ts` also asserts that registered handler names equal `Object.values(IPC_CHANNELS)`, preventing undeclared handlers.

## Extension Points

- **New IPC channel**: Extend `src/shared/ipc.ts`, then add its main handler and narrow preload method.
- **New window**: Create a second `createWindow` variant or pass options to the existing one; preserve the three explicit hardening preferences.
- **Menu/tray**: Import from `electron` in `src/main/index.ts` and configure after `app.whenReady()`.
- **Native dialogs**: Add a contract-defined IPC handler that calls `dialog.showOpenDialog()` or an equivalent native API.