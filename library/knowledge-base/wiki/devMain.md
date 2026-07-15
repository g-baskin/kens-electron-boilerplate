# devMain

**Type:** function
**File:** `scripts/dev.mjs:30`
**Exported:** no

## Description
Entry point for the development workflow. Orchestrates three concurrent tasks: (1) starts a Vite dev server for the renderer, (2) builds and watches the preload script with esbuild, (3) builds and watches the main process with esbuild, restarting Electron on each rebuild. Sets up SIGINT/SIGTERM cleanup handlers.

## Signature

```ts
async function main(): Promise<void>
```

## Related
- [[startElectron]]
- [[devCleanup]]
- [[electron-restart-plugin]]
- [[vite-config]]
