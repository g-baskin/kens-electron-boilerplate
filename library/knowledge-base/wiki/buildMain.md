# buildMain

**Type:** function
**File:** `scripts/build.mjs:5`
**Exported:** no

## Description
Entry point for the production build pipeline. Cleans the `dist/` directory, builds the renderer via Vite, then builds both the main process and preload scripts via esbuild with minification and sourcemaps enabled.

## Signature

```ts
async function main(): Promise<void>
```

## Build Steps
1. `rmSync('dist', { recursive: true, force: true })`
2. `npx vite build` (renderer)
3. esbuild bundle `src/main/index.ts` → `dist/main/index.js` (minified, sourcemap)
4. esbuild bundle `src/preload/index.ts` → `dist/preload/index.js` (minified, sourcemap)

## Related
- [[vite-config]]
- [[main-process]]
- [[preload]]
