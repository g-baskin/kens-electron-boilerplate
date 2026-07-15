# Build System

The three-tool pipeline that compiles source code into a distributable Electron app: Vite for the renderer, esbuild for main and preload, and electron-builder for packaging.

## Pipeline Overview

```
Source Code                    Build Output
───────────                    ────────────
src/renderer/             ──Vite──────→  dist/renderer/    (HTML + JS + CSS)
src/main/ + src/shared/    ──esbuild──→  dist/main/        (Electron main bundle)
src/preload/ + src/shared/ ──esbuild──→  dist/preload/     (sandboxed preload bundle)
dist/**/*                  ──electron-builder──→ release/   (dmg, nsis, AppImage)
```

## Vite — Renderer Bundler

Config: `vite.config.ts`

```typescript
export default defineConfig({
  root: 'src/renderer',
  base: './',
  plugins: [react()],
  build: {
    outDir: '../../dist/renderer',
    emptyOutDir: true,
  },
  server: {
    port: 5173,
    strictPort: true,
  },
});
```

- `root: 'src/renderer'` — Vite treats `src/renderer/` as the project root. `index.html` is the entry point.
- `base: './'` — Relative asset paths. Critical for Electron's `file://` protocol in production — absolute paths like `/assets/foo.js` would break.
- `outDir: '../../dist/renderer'` — Output is relative to root, so it lands in `dist/renderer/` at the project level.
- `strictPort: true` — Fails if port 5173 is taken instead of silently using another port. This prevents the Vite URL from drifting away from what `dev.mjs` expects.

The `@vitejs/plugin-react` plugin provides JSX transformation and React Fast Refresh.

## esbuild — Main & Preload Bundler

Used in both `scripts/dev.mjs` (watch mode) and `scripts/build.mjs` (production).

**Main process build** (`dev.mjs:54-79`, `build.mjs:13-21`):
```javascript
esbuild.build({
  entryPoints: ['src/main/index.ts'],
  bundle: true,
  platform: 'node',
  outfile: 'dist/main/index.js',
  external: ['electron'],
  minify: true,       // production only
  sourcemap: true,
});
```

**Preload build** (`dev.mjs:42-49`, `build.mjs:24-32`):
```javascript
esbuild.build({
  entryPoints: ['src/preload/index.ts'],
  bundle: true,
  platform: 'node',
  outfile: 'dist/preload/index.js',
  external: ['electron'],
  minify: true,       // production only
  sourcemap: true,
});
```

Key settings:
- `platform: 'node'` — Uses Electron's Node-oriented module-resolution shape for both bundles. This is a build target, not permission for the sandboxed preload to use arbitrary Node APIs at runtime.
- `external: ['electron']` — Electron is supplied by the Electron binary at runtime. esbuild bundles local imports, including `src/shared/ipc.ts`, while leaving Electron external.
- `minify: true` — Production builds are minified. Dev builds are not (faster rebuilds).
- `sourcemap: true` — Always generates source maps for debugging.

## Development Script

`scripts/dev.mjs` orchestrates three concurrent processes:

```
1. Vite dev server     (line 32)  → serves renderer with HMR on :5173
2. esbuild watch       (line 42)  → rebuilds preload on change
3. esbuild watch       (line 54)  → rebuilds main + restarts Electron on change
```

**Electron restart mechanism** (`scripts/dev.mjs:61-77`): The `electron-restart` plugin is attached to the **main** esbuild context. On a successful main build, it calls `startElectron(url)`, which kills the previous Electron process and spawns a new one with `VITE_DEV_SERVER_URL`. The preload context has no equivalent `onEnd` hook (`scripts/dev.mjs:42-50`), so a preload-only rebuild writes a new bundle but does not reload the running preload; restart Electron to apply it.

**Cleanup** (`dev.mjs:83-89`): SIGINT/SIGTERM handlers kill Electron, dispose esbuild contexts, close the Vite server, and exit. This prevents zombie processes.

## Production Build Script

`scripts/build.mjs` runs sequentially:

1. **Clean** (`rmSync('dist', ...)`) — Removes the entire `dist/` directory
2. **Renderer** (`execSync('npx vite build')`) — Vite produces optimized HTML/JS/CSS in `dist/renderer/`
3. **Main** (esbuild) — Bundles and minifies main plus its local shared-contract import to `dist/main/index.js`
4. **Preload** (esbuild) — Bundles and minifies preload plus its local shared-contract import to `dist/preload/index.js`

The main entry in `package.json:5` points to `dist/main/index.js`, which Electron loads at startup.

## electron-builder — Packaging

Config: `electron-builder.yml`

```yaml
appId: com.kenkai.electron-boilerplate
productName: Kens Electron Boilerplate
directories:
  output: release
files:
  - dist/**/*
  - package.json
```

Platform targets:
- **macOS**: `dmg` + `zip`, category `developer-tools`
- **Windows**: `nsis` (installer) + `portable` (single exe)
- **Linux**: `AppImage` + `deb`, category `Development`

The NSIS installer is configured with `oneClick: false` and `allowToChangeInstallationDirectory: true` for user control.

`npm run package` calls `npm run build` first (`package.json:11`), so the full pipeline is: clean → Vite build → esbuild build → electron-builder package.

## File Output Map

```
dist/
├── main/
│   ├── index.js         ← Electron main process (bundled by esbuild)
│   └── index.js.map
├── preload/
│   ├── index.js         ← Preload script (bundled by esbuild)
│   └── index.js.map
└── renderer/
    ├── index.html       ← Entry HTML (processed by Vite)
    ├── assets/
    │   ├── index-[hash].js    ← Bundled React app
    │   └── index-[hash].css   ← Extracted styles
    └── ...
```

## Extension Points

- **Add a build plugin**: Add to `plugins` array in `vite.config.ts`
- **Change esbuild options**: Edit `scripts/dev.mjs` and `scripts/build.mjs` in parallel
- **Add native dependencies**: Ensure they are in `dependencies` (not `devDependencies`) so electron-builder includes them
- **Custom installer**: Add NSIS/script options to `electron-builder.yml`
