# Wiki Index

All code entities extracted from the Electron boilerplate project, organized by type.

---

## Functions

| Entity | File | Description |
|--------|------|-------------|
| [[createWindow]] | `src/main/index.ts:14` | Creates and configures the main BrowserWindow |
| [[registerIpcHandlers]] | `src/main/ipc.ts:3` | Registers all IPC handle listeners |
| [[startElectron]] | `scripts/dev.mjs:12` | Spawns Electron process with dev server URL |
| [[devMain]] | `scripts/dev.mjs:30` | Dev workflow entry point — orchestrates Vite + esbuild + Electron |
| [[devCleanup]] | `scripts/dev.mjs:83` | Graceful shutdown for dev environment |
| [[buildMain]] | `scripts/build.mjs:5` | Production build pipeline entry point |

## Components

| Entity | File | Description |
|--------|------|-------------|
| [[App]] | `src/renderer/App.tsx:3` | Root React component — dashboard with version info |

## Modules

| Entity | File | Description |
|--------|------|-------------|
| [[main-process]] | `src/main/index.ts:1` | Electron main process entry point |
| [[ipc-handlers]] | `src/main/ipc.ts:1` | IPC handler registration module |
| [[preload]] | `src/preload/index.ts:1` | Context bridge preload script |
| [[renderer-entry]] | `src/renderer/main.tsx:1` | React application entry point |
| [[electronAPI-bridge]] | `src/preload/index.ts:3` | Context bridge API surface exposed to renderer |

## IPC Endpoints

| Entity | File | Description |
|--------|------|-------------|
| [[get-app-version]] | `src/main/ipc.ts:4` | Returns `app.getVersion()` |
| [[get-platform]] | `src/main/ipc.ts:8` | Returns `process.platform` |

## Types

| Entity | File | Description |
|--------|------|-------------|
| [[ElectronAPI]] | `src/renderer/types/electron.d.ts:5` | Interface for `window.electronAPI` shape |
| [[Window-electronAPI]] | `src/renderer/types/electron.d.ts:4` | Global Window augmentation for `electronAPI` |

## Config

| Entity | File | Description |
|--------|------|-------------|
| [[isDev]] | `src/main/index.ts:5` | Boolean dev-mode flag from `VITE_DEV_SERVER_URL` |
| [[BrowserWindowOptions]] | `src/main/index.ts:15` | Window dimensions and web preferences |
| [[CSP-Policy]] | `src/main/index.ts:34` | Production Content Security Policy header |
| [[vite-config]] | `vite.config.ts:1` | Vite configuration for renderer |
| [[vitest-config]] | `vitest.config.ts:1` | Vitest test runner configuration |
| [[eslint-config]] | `eslint.config.mjs:1` | ESLint flat config with per-directory rules |

## Objects

| Entity | File | Description |
|--------|------|-------------|
| [[versions]] | `src/preload/index.ts:6` | Static Electron/Node/Chrome version strings |

## Esbuild Plugins

| Entity | File | Description |
|--------|------|-------------|
| [[electron-restart-plugin]] | `scripts/dev.mjs:62` | Restarts Electron on main-process rebuild |
