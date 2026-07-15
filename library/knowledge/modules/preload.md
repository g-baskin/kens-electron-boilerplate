# Preload

The sandbox-safe context bridge between main and renderer. This is the capability boundary: every Electron feature visible to page code must be deliberately exposed here.

## Files

| File | Purpose |
|------|---------|
| `src/preload/index.ts` | Defines the strict `window.electronAPI` allowlist via `contextBridge` |
| `src/shared/ipc.ts` | Shared IPC channel, request/response, runtime-version, and bridge types |
| `src/renderer/types/electron.d.ts` | Global declaration derived from the shared `ElectronAPI` type |

## Sandboxed Context Bridge

The preload runs with `contextIsolation: true` and full Chromium sandboxing. Electron's renderer-safe `contextBridge` and `ipcRenderer` APIs remain available, but arbitrary Node module access does not. `app.enableSandbox()` must execute before readiness (`src/main/index.ts:14`), and the window also sets `sandbox: true` (`src/main/index.ts:20-25`).

The preload is bundled by esbuild. That bundle inlines the local dependency-free shared contract, allowing `src/shared/ipc.ts` to work under the sandbox. Keep preload imports limited to renderer-safe Electron APIs and bundled local modules; never add filesystem, Node, or raw transport exposure.

## Typed Bridge Implementation

`src/preload/index.ts` has one private typed invoke boundary:

```typescript
function invoke<C extends IpcChannel>(channel: C, ...args: IpcArgs<C>): Promise<IpcResult<C>> {
  return ipcRenderer.invoke(channel, ...args) as Promise<IpcResult<C>>;
}
```

Electron declares `ipcRenderer.invoke` with an untyped result, so the single assertion remains inside this private boundary. Public methods use only `IPC_CHANNELS` and an API object that satisfies `ElectronAPI`, then expose that object at line 24:

```typescript
contextBridge.exposeInMainWorld('electronAPI', electronAPI);
```

## Exposed API Surface

`window.electronAPI` exposes exactly three own enumerable members:

| Member | Type | Behavior |
|--------|------|----------|
| `getAppVersion()` | `() => Promise<string>` | Invokes `IPC_CHANNELS.getAppVersion` through the private helper (`src/preload/index.ts:15`) |
| `getPlatform()` | `() => Promise<string>` | Invokes `IPC_CHANNELS.getPlatform` through the private helper (`src/preload/index.ts:16`) |
| `versions` | readonly `{ electron, node, chrome }` | Captures sandbox-provided `process.versions` values at preload execution time |

The `versions` object contains baked-in strings, not live references. The renderer receives no `invoke`, `send`, `sendSync`, `on`, `once`, or listener-removal primitive.

## Security Guarantees

1. **Strict bridge allowlist** — The only renderer-visible Electron capability is `window.electronAPI` with the three members above.
2. **Contract-only IPC** — The private helper accepts only `IpcChannel` values declared by `src/shared/ipc.ts`; page code cannot choose an arbitrary channel.
3. **No raw `ipcRenderer` exposure** — All transport primitives stay inside preload.
4. **Sandboxed renderer and preload** — Renderer Node integration is disabled and the app-wide sandbox is forced before Electron becomes ready.
5. **Serialization boundary** — Context bridge data crosses the structured-clone boundary and functions are proxied rather than shared by reference.

## Type Declarations

`src/renderer/types/electron.d.ts` imports `ElectronAPI` from `src/shared/ipc.ts` and declares:

```typescript
declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}
```

The renderer, preload, and main process therefore use the same contract. Adding or removing bridge members fails type checking until all affected boundaries agree.

## Testing

`tests/unit/preload.test.ts` dynamically imports preload with Electron mocks and verifies:

- The bridge is exposed once under the only namespace, `electronAPI`.
- Its own keys are exactly `getAppVersion`, `getPlatform`, and `versions`.
- No raw IPC/control primitive is exposed.
- Each method invokes only its corresponding `IPC_CHANNELS` entry without arguments.
- The runtime-version object contains exactly Electron, Node, and Chrome values.

## Extension Points

To expose a new renderer capability:

1. Extend `IpcContract` and `IPC_CHANNELS` in `src/shared/ipc.ts`.
2. Register the matching `ipcMain.handle` implementation in `src/main/ipc.ts`.
3. Add one narrow method to the preload API object and update `ElectronAPI` in the shared contract.
4. Consume the typed `window.electronAPI` method in renderer code.

Keep the shared module dependency-free so esbuild can bundle it into the sandbox-compatible preload artifact.