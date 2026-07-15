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

**HMR behavior**: Renderer changes hot-reload without restarting Electron. Main process or preload changes trigger a full Electron restart — there's no way to hot-swap Node code.

## Code Quality Pipeline

```bash
npm run check
```

This runs four checks sequentially (`package.json:22`):

| Step | Command | Config |
|------|---------|--------|
| Type checking | `tsc --noEmit` | `tsconfig.json` — strict mode, ES2022 target, bundler resolution |
| Linting | `eslint src/ tests/` | `eslint.config.mjs` — flat config with TypeScript + React Hooks rules |
| Formatting | `prettier --check ...` | Prettier defaults (no `.prettierrc`) |
| Tests | `vitest run` | `vitest.config.ts` — jsdom environment, `tests/setup.ts` |

**Pre-commit hooks** are enforced via Husky + lint-staged (`package.json:25-33`). On commit, staged `.ts`/`.tsx` files are auto-fixed by ESLint and formatted by Prettier. The `prepare` script (`package.json:23`) installs the Husky hook on `npm install`.

## Testing Strategy

Tests live in `tests/unit/` mirroring source structure:

- `app.test.tsx` — Renders `<App>` with a mocked `window.electronAPI` (set up in `tests/setup.ts:4-17`), verifies static content and async IPC calls via `@testing-library/react`
- `ipc.test.ts` — Mocks `electron` module, verifies `registerIpcHandlers` registers the correct channels (`src/main/ipc.ts:4-10`)
- `main-process.test.ts` — Mocks `electron` entirely, dynamically imports `src/main/index`, verifies window creation, CSP behavior, and dev/prod mode branching
- `preload.test.ts` — Verifies `contextBridge.exposeInMainWorld` is called with the correct API shape and IPC channel names

Run with `npm run test` (single pass) or `npm run test:watch` (interactive).

## Packaging

```bash
npm run package          # current OS
npm run package:mac      # macOS (dmg + zip)
npm run package:win      # Windows (nsis + portable)
npm run package:linux    # Linux (AppImage + deb)
```

Packaging runs `npm run build` first, then invokes electron-builder with `electron-builder.yml`. Output goes to `release/`. The config sets `appId: com.kenkai.electron-boilerplate` and includes `dist/**/*` plus `package.json` in the distributable.
