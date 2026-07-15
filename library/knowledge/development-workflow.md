# Development Workflow

How to develop, test, lint, and package the application. Every script is defined in `package.json:8-23`.

## Daily Development

```bash
npm run dev
```

This triggers `scripts/dev.mjs`, which orchestrates three concurrent processes:

1. **Vite dev server** on port 5173 — serves the renderer with HMR (`dev.mjs:32-39`)
2. **esbuild watch** for the preload — rebuilds on change (`dev.mjs:42-50`)
3. **esbuild watch** for the main process — rebuilds **and restarts Electron** on change (`dev.mjs:53-80`)

The Vite dev server URL is injected into Electron via the `VITE_DEV_SERVER_URL` environment variable (`dev.mjs:19`). The main process detects this at `src/main/index.ts:5` to decide between loading a URL (dev) or a file (production).

**Reload behavior**: Renderer changes are served by Vite and hot-reload without restarting Electron. A successful **main-process** rebuild calls `startElectron(url)`, which replaces the Electron process (`scripts/dev.mjs:61-77`). The preload watcher only rebuilds `dist/preload/index.js` (`scripts/dev.mjs:42-50`); it does not itself restart Electron, so a preload-only change takes effect after the next Electron restart (stop/start `npm run dev` or trigger a main rebuild).

## Code Quality Pipeline

```bash
npm run check
```

This runs four checks sequentially (`package.json:22`):

| Step | Command | Config |
|------|---------|--------|
| Type checking | `node ./node_modules/typescript-7/bin/tsc --noEmit` | `tsconfig.json` — strict mode, ES2022 target, bundler resolution |
| Linting | `eslint src/ tests/` | `eslint.config.mjs` — flat config with TypeScript + React Hooks rules |
| Formatting | `prettier --check ...` | Prettier defaults (no `.prettierrc`) |
| Tests | `vitest run` | `vitest.config.ts` — jsdom environment, `tests/setup.ts` |

**Pre-commit hooks** are enforced via Husky + lint-staged (`package.json:25-33`). On commit, staged `.ts`/`.tsx` files are auto-fixed by ESLint and formatted by Prettier. The `prepare` script (`package.json:23`) installs the Husky hook on `npm install`.

## Testing Strategy

Tests live in `tests/unit/` mirroring source structure:

- `app.test.tsx` — Renders `<App>` with a mocked `window.electronAPI` (set up in `tests/setup.ts:4-17`), verifies static content and async IPC calls via `@testing-library/react`
- `ipc.test.ts` — Node-environment Electron mock; verifies each handler, its result, and that registered names equal `Object.values(IPC_CHANNELS)` (`tests/unit/ipc.test.ts:22-62`)
- `main-process.test.ts` — Node-environment Electron mock plus dynamic import; verifies app-wide sandboxing precedes readiness, window hardening, CSP, and dev/prod loading (`tests/unit/main-process.test.ts:80-157`)
- `preload.test.ts` — Node-environment Electron mock; verifies the sole `electronAPI` namespace, its exact allowlist, absence of raw transport methods, contract-channel invocations, and runtime-version fields (`tests/unit/preload.test.ts:29-69`)

Run with `npm run test` (single pass) or `npm run test:watch` (interactive). Renderer tests use Vitest's configured jsdom environment; the main, IPC, and preload suites explicitly select Node (`vitest.config.ts:5-9`, test-file directives).

## Packaging

```bash
npm run package          # current OS
npm run package:mac      # macOS (dmg + zip)
npm run package:win      # Windows (nsis + portable)
npm run package:linux    # Linux (AppImage + deb)
```

Packaging runs `npm run build` first, then invokes electron-builder with `electron-builder.yml`. Output goes to `release/`. The config sets `appId: com.kenkai.electron-boilerplate` and includes `dist/**/*` plus `package.json` in the distributable.
