# Build System

The three-tool pipeline that compiles source code into a distributable Electron app: Vite for the renderer, esbuild for main and preload, and electron-builder for packaging.

## Pipeline Overview

```
Source Code                    Build Output
───────────                    ────────────
src/renderer/  ──Vite──────→  dist/renderer/    (HTML + JS + CSS)
src/main/      ──esbuild──→  dist/main/        (Node bundle)
src/preload/   ──esbuild──→  dist/preload/     (Node bundle)
dist/**/*      ──electron-builder──→ release/   (dmg, nsis, AppImage)
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
- `platform: 'node'` — Targets Node.js. Resolves Node built-ins, doesn't inject browser polyfills.
- `external: ['electron']` — Electron is provided at runtime by the Electron binary. Bundling it would be incorrect and enormous.
- `minify: true` — Production builds are minified. Dev builds are not (faster rebuilds).
- `sourcemap: true` — Always generates source maps for debugging.

## Development Script

`scripts/dev.mjs` orchestrates three concurrent processes:

```
1. Vite dev server     (line 32)  → serves renderer with HMR on :5173
2. esbuild watch       (line 42)  → rebuilds preload on change
3. esbuild watch       (line 54)  → rebuilds main + restarts Electron on change
```

**Electron restart mechanism** (`dev.mjs:61-77`): A custom esbuild plugin called `electron-restart` hooks into the `onEnd` event. On successful rebuild, it calls `startElectron(url)` which kills the previous Electron process and spawns a new one with the current Vite dev server URL injected via `VITE_DEV_SERVER_URL`.

**Cleanup** (`dev.mjs:83-89`): SIGINT/SIGTERM handlers kill Electron, dispose esbuild contexts, close the Vite server, and exit. This prevents zombie processes.

## Production Build Script

`scripts/build.mjs` runs sequentially:

1. **Clean** (`rmSync('dist', ...)`) — Removes the entire `dist/` directory
2. **Renderer** (`execSync('npx vite build')`) — Vite produces optimized HTML/JS/CSS in `dist/renderer/`
3. **Main** (esbuild) — Bundles and minifies to `dist/main/index.js`
4. **Preload** (esbuild) — Bundles and minifies to `dist/preload/index.js`

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
