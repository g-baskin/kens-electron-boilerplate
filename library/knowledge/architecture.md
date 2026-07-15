# Architecture

How the Electron processes interact, what security boundaries exist between them, and how data flows from OS to UI.

## Three-Process Model

Electron runs three isolated processes:

```text
┌────────────────────┐     IPC (invoke/handle)     ┌──────────────────┐
│   MAIN PROCESS     │ ◄──────────────────────────  │  RENDERER        │
│   Node.js + OS     │                               │  React + DOM     │
│   src/main/        │                               │  src/renderer/   │
└────────────────────┘                               └──────────────────┘
         ▲                                                     ▲
         │              ┌──────────────────┐                   │
         └──────────────│  PRELOAD         │───────────────────┘
           sandboxed    │  Context Bridge  │  window.electronAPI
                         │  src/preload/    │
                         └──────────────────┘
                                   ▲
                                   │ typed contract
                         ┌──────────────────┐
                         │  src/shared/ipc  │
                         └──────────────────┘
```

**Main process** (`src/main/index.ts`) owns the OS — windows, menus, file system, and native APIs. It enables the app-wide sandbox before readiness (`app.enableSandbox()` at line 14), then registers the contract-defined IPC handlers at line 52.

**Preload** (`src/preload/index.ts`) runs in Electron's Chromium sandbox. It uses renderer-safe Electron APIs and `contextBridge.exposeInMainWorld` (line 24) to expose only a narrow allowlist to the renderer.

**Renderer** (`src/renderer/`) is a standard React app with zero Node access. It communicates with main exclusively through `window.electronAPI`.

## Security Model

Every `BrowserWindow` explicitly enables the three hardening controls in `src/main/index.ts:20-25`:

```typescript
webPreferences: {
  preload: path.join(__dirname, '../preload/index.js'),
  contextIsolation: true,
  nodeIntegration: false,
  sandbox: true,
}
```

`app.enableSandbox()` executes before `app.whenReady()` (`src/main/index.ts:14` before line 51), forcing full sandbox mode for current and future renderers. The per-window `sandbox: true` is retained as a local, auditable defense-in-depth setting.

**Content Security Policy** is applied in production only (`src/main/index.ts:36-45`):

```text
default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'
```

In development, CSP is intentionally omitted because Vite HMR requires `unsafe-eval` and `unsafe-inline` for React Fast Refresh. Security warnings are suppressed with `ELECTRON_DISABLE_SECURITY_WARNINGS` at line 11.

## Shared IPC Contract

`src/shared/ipc.ts` is the single compile-time contract for all three processes. It defines `IPC_CHANNELS`, each channel's argument tuple and result type, the `ElectronAPI` bridge surface, and `RuntimeVersions`.

- Main imports `IPC_CHANNELS` and `IpcResult` to register only declared handlers.
- Preload accepts only `IpcChannel` values through its private typed `invoke` boundary.
- Renderer declares `Window.electronAPI` through the shared `ElectronAPI` type (`src/renderer/types/electron.d.ts:1-8`).

This prevents handler, bridge, and renderer typings from silently drifting apart. Runtime tests also enforce the handler and bridge allowlists (`tests/unit/ipc.test.ts:22-37`, `tests/unit/preload.test.ts:29-60`). See the implementation-level reference in [modules/shared-ipc.md](modules/shared-ipc.md).

## IPC Data Flow

A renderer call such as `window.electronAPI.getAppVersion()` follows this path:

1. **Renderer** calls the typed `window.electronAPI.getAppVersion()` method.
2. **Preload** invokes `IPC_CHANNELS.getAppVersion` through its private helper (`src/preload/index.ts:10-16`).
3. **Main** registers that same contract channel through `ipcMain.handle` (`src/main/ipc.ts:5-7`).
4. **Main** returns `app.getVersion()`; the promise resolves back through the same chain.

All IPC uses `invoke`/`handle` (promise-based), not `send`/`on` (fire-and-forget). The renderer receives no generic channel invocation method and no raw `ipcRenderer` primitive.

## Sandboxed Preload Constraint

A sandboxed preload may import Electron's renderer-safe APIs, but it cannot depend on arbitrary Node modules. The preload is bundled by esbuild, which inlines local shared modules such as `src/shared/ipc.ts`; it externalizes only `electron`. Keep the shared contract dependency-free and add no filesystem or Node API usage to preload. The startup ordering and hardening are regression-tested: sandbox enablement precedes readiness, and every created window retains `contextIsolation: true`, `nodeIntegration: false`, and `sandbox: true` (`tests/unit/main-process.test.ts:80-121`).
