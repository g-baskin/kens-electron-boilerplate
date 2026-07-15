# vite-config

**Type:** config
**File:** `vite.config.ts:1`
**Exported:** yes (default)

## Description
Vite configuration for the renderer process. Sets the project root to `src/renderer`, uses relative base paths for Electron file protocol compatibility, and configures the React plugin for JSX transform and Fast Refresh.

## Signature

```ts
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

## Properties
| Key | Value | Description |
|-----|-------|-------------|
| `root` | `'src/renderer'` | Renderer source as Vite project root |
| `base` | `'./'` | Relative asset paths for Electron `file://` protocol |
| `plugins` | `[react()]` | `@vitejs/plugin-react` for JSX + Fast Refresh |
| `build.outDir` | `'../../dist/renderer'` | Build output relative to root |
| `build.emptyOutDir` | `true` | Clean output dir before build |
| `server.port` | `5173` | Dev server port |
| `server.strictPort` | `true` | Fail if port is already in use |

## Related
- [[renderer-entry]]
- [[devMain]]
- [[buildMain]]
- [[vitest-config]]
