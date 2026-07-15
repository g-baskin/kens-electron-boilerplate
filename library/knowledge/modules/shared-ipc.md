# Shared IPC Contract

`src/shared/ipc.ts` is the source of truth for the app's renderer-to-main IPC vocabulary. It deliberately contains only channel constants, TypeScript types, and the renderer-visible bridge interface, so it can be imported by main, bundled into the sandboxed preload, and referenced by renderer type declarations without creating a Node dependency.

## Consumers and Boundary

| Consumer | Contract use | Source evidence |
|---|---|---|
| Main | Registers implementations for declared channels | `src/main/ipc.ts:1-12` |
| Preload | Constrains its private invocation helper and checks the public bridge object | `src/preload/index.ts:1-24` |
| Renderer | Augments `Window` with the shared `ElectronAPI` interface | `src/renderer/types/electron.d.ts:1-9` |
| Tests | Derive handler and bridge allowlists from the same channel constants | `tests/unit/ipc.test.ts:1-63`, `tests/unit/preload.test.ts:1-70` |

The contract does **not** expose a generic transport to renderer code. `window.electronAPI` is the narrow, capability-specific boundary documented in [preload.md](preload.md).

## Current Contract

`IPC_CHANNELS` (`src/shared/ipc.ts:1-4`) is the canonical channel-name map:

| API method | Channel | Arguments | Result |
|---|---|---|---|
| `getAppVersion()` | `get-app-version` | `[]` | `string` |
| `getPlatform()` | `get-platform` | `[]` | `string` |

`IpcContract` maps each channel to its argument tuple and result type (`src/shared/ipc.ts:6-15`). Its derived types provide the contract at each boundary:

- `IpcChannel` is the declared-channel union (`src/shared/ipc.ts:17`).
- `IpcArgs<C>` selects that channel's argument tuple (`src/shared/ipc.ts:18`).
- `IpcResult<C>` selects that channel's result type (`src/shared/ipc.ts:19`).
- `ElectronAPI` defines only `getAppVersion`, `getPlatform`, and readonly Electron/Node/Chrome runtime versions (`src/shared/ipc.ts:21-31`).

## Safe Extension Sequence

1. Add a channel constant and its `args`/`result` entry together in `src/shared/ipc.ts`.
2. Add the corresponding `ipcMain.handle` implementation in `src/main/ipc.ts`; return the declared `IpcResult`.
3. Add a named, narrow preload method and the matching `ElectronAPI` member. Keep `ipcRenderer` private.
4. Consume the typed method from renderer code through `window.electronAPI`.
5. Extend the handler, preload allowlist/invocation, and renderer tests. Run `npm run check`.

Do not add Node built-ins, filesystem access, or arbitrary runtime dependencies to this shared module: the preload build must be compatible with the app-wide and per-window sandbox described in [main-process.md](main-process.md).

## Regression Coverage

`tests/unit/ipc.test.ts:22-62` verifies that main registers both declared handlers, that the registered names equal `Object.values(IPC_CHANNELS)`, and that they return the expected platform/version data. `tests/unit/preload.test.ts:29-69` checks that only one `electronAPI` namespace is exposed, its keys are the bridge allowlist, raw IPC methods are absent, and each bridge method invokes its contract channel without arguments.

These runtime tests complement TypeScript's compile-time agreement; neither replaces the other.
