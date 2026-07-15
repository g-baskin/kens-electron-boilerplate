# Technology Stack

Every dependency, why it was chosen, and what version is pinned. All versions come from `package.json:34-60`.

## Runtime

| Dependency | Version | Role |
|-----------|---------|------|
| **Electron** | `^43.1.1` | Chromium-based desktop shell. v43 targets Chromium 134+ and Node 22+. |
| **React** | `^19.2.4` | UI library. v19 brings concurrent features, `use()` hook, and improved hydration. |
| **React DOM** | `^19.2.4` | React renderer for the browser DOM. |

Note: React and React DOM are listed as `devDependencies` because they are bundled by Vite — they are not runtime dependencies in the Electron sense.

## Build Tooling

| Dependency | Version | Role |
|-----------|---------|------|
| **Vite** | `^8.1.4` | Bundles the renderer. Provides HMR, React Fast Refresh, and production builds via Rollup. |
| **esbuild** | `^0.28.1` | Bundles main and preload, including their local `src/shared/ipc.ts` dependency. Electron remains external. |
| **electron-builder** | `^26.7.0` | Packages the app into distributable formats (dmg, nsis, AppImage). Config in `electron-builder.yml`. |
| **@vitejs/plugin-react** | `^6.0.3` | Vite plugin for JSX transform and Fast Refresh. |

## TypeScript

| Dependency | Version | Role |
|-----------|---------|------|
| **typescript** | `npm:@typescript/typescript6@^6.0.0` | Type checking via `tsc --noEmit`. Aliased to avoid conflicts. |
| **typescript-7** | `npm:typescript@^7.0.0` | Used by the `typecheck` script (`package.json:19`). Separate alias so both versions coexist. |

This dual-TypeScript setup is unusual. The `typecheck` script explicitly calls `typescript-7/bin/tsc`. The v6 alias exists for tooling compatibility. `tsconfig.json` targets `ES2022` with `bundler` module resolution, `strict: true`, and `noEmit: true`.

## Testing

| Dependency | Version | Role |
|-----------|---------|------|
| **Vitest** | `^4.0.18` | Test runner. Configured in `vitest.config.ts` with jsdom environment. |
| **@testing-library/react** | `^16.3.2` | Component testing utilities — `render`, `screen`, `waitFor`. |
| **@testing-library/jest-dom** | `^6.9.1` | Custom matchers like `toBeInTheDocument()`. Setup in `tests/setup.ts`. |
| **jsdom** | `^29.1.1` | Browser environment simulation for renderer tests. |

## Linting & Formatting

| Dependency | Version | Role |
|-----------|---------|------|
| **ESLint** | `^10.7.0` | Linter. Flat config in `eslint.config.mjs`. |
| **typescript-eslint** | `^8.64.0` | TypeScript parser and rules for ESLint. |
| **eslint-plugin-react-hooks** | `^7.0.1` | Enforces Rules of Hooks in renderer files. |
| **eslint-plugin-react-refresh** | `^0.5.0` | Warns when exports break Fast Refresh. |
| **Prettier** | `^3.8.1` | Code formatter. No custom config — uses defaults. |
| **Husky** | `^9.1.7` | Git hooks manager. Runs lint-staged on pre-commit. |
| **lint-staged** | `^17.0.8` | Runs linters only on staged files for fast commits. |

## ESLint Configuration Detail

The flat config in `eslint.config.mjs` applies rules per context:

- **Renderer files** (`src/renderer/**`): browser globals + React Hooks + React Refresh rules
- **Main/Preload files** (`src/main/**`, `src/preload/**`): Node globals, no React rules
- **Test files** (`tests/**`): browser globals + React Hooks rules
- **Scripts** (`scripts/`): ignored entirely

## Type Declarations

| File | Purpose |
|------|---------|
| `src/shared/ipc.ts` | Dependency-free channel, request/result, runtime-version, and `ElectronAPI` contract shared across process boundaries. |
| `src/renderer/types/electron.d.ts` | Imports the shared `ElectronAPI` type and augments `Window`; renderer code stays typed without importing preload implementation. |

## Design Decisions

**Why esbuild for main/preload instead of Vite?** Both need small Electron-facing bundles rather than browser HTML/CSS processing. esbuild bundles their local shared contract while leaving Electron external; the resulting preload still executes under Electron's sandbox at runtime.

**Why Vite for the renderer?** The renderer is a browser app that benefits from HMR, CSS modules, asset handling, and React Fast Refresh. Vite provides all of this with the `@vitejs/plugin-react` plugin.

**Why sandboxing plus `contextIsolation: true`?** `src/main/index.ts:14` enables Electron's app-wide sandbox before readiness, and each window also sets `sandbox: true`, `contextIsolation: true`, and `nodeIntegration: false` (`src/main/index.ts:20-25`). The sandboxed preload can use Electron's renderer-safe `contextBridge` and `ipcRenderer` APIs; it exposes only the typed, allowlisted `ElectronAPI`, not Node or raw IPC access.
