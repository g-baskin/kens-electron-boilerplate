# Architecture

How the three Electron processes interact, what security boundaries exist between them, and how data flows from OS to UI.

## Three-Process Model

Electron runs three isolated processes:

```
┌────────────────────┐     IPC (invoke/handle)     ┌──────────────────┐
│   MAIN PROCESS     │ ◄──────────────────────────  │  RENDERER        │
│   Node.js + OS     │                               │  React + DOM     │
│   src/main/        │                               │  src/renderer/   │
└────────────────────┘                               └──────────────────┘
         ▲                                                     ▲
         │              ┌──────────────────┐                   │
         └──────────────│  PRELOAD         │───────────────────┘
           Node bridge  │  Context Bridge  │  window.electronAPI
                        │  src/preload/    │
                        └──────────────────┘
```

**Main process** (`src/main/index.ts`) owns the OS — windows, menus, file system, native APIs. It registers IPC handlers in `src/main/ipc.ts` (line 50: `registerIpcHandlers()`).

**Preload** (`src/preload/index.ts`) runs in a privileged context with Node access but uses `contextBridge.exposeInMainWorld` (line 3) to expose only a whitelisted API to the renderer. This is the **only** bridge between Node and the browser.

**Renderer** (`src/renderer/`) is a standard React app. It has zero Node access. It communicates with main exclusively through `window.electronAPI`, which calls `ipcRenderer.invoke()` under the hood.

## Security Model

The `BrowserWindow` is configured with strict defaults in `src/main/index.ts:18-23`:

```typescript
webPreferences: {
  preload: path.join(__dirname, '../preload/index.js'),
  contextIsolation: true,   // preload runs in isolated context
  nodeIntegration: false,   // no require() in renderer
  sandbox: false,           // preload needs Node for contextBridge
}
```

**Content Security Policy** is applied in production only (`src/main/index.ts:34-43`):

```
default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'
```

In development, CSP is intentionally omitted — Vite's HMR requires `unsafe-eval` and `unsafe-inline` for React Fast Refresh. Security warnings are suppressed with `ELECTRON_DISABLE_SECURITY_WARNINGS` (line 11).

## IPC Data Flow

A renderer call like `window.electronAPI.getAppVersion()` follows this path:

1. **Renderer** calls `window.electronAPI.getAppVersion()` (`src/renderer/App.tsx:8`)
2. **Preload** translates to `ipcRenderer.invoke('get-app-version')` (`src/preload/index.ts:4`)
3. **Main** handler receives it via `ipcMain.handle('get-app-version', ...)` (`src/main/ipc.ts:4`)
4. **Main** returns `app.getVersion()` — the promise resolves back through the same chain

All IPC uses `invoke`/`handle` (promise-based), not `send`/`on` (fire-and-forget). This ensures request/response pairing and automatic error propagation.

## TypeScript Bridge

The renderer knows about `window.electronAPI` through a global type declaration in `src/renderer/types/electron.d.ts:3-14`. This declares the full API shape — `getAppVersion()`, `getPlatform()`, and the synchronous `versions` object — so renderer code gets full autocomplete and type checking without importing anything from the preload.
