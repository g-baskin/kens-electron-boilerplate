# devCleanup

**Type:** function
**File:** `scripts/dev.mjs:83`
**Exported:** no

## Description
Handles graceful shutdown of the dev environment. Kills the running Electron process, disposes both esbuild contexts (preload and main watchers), closes the Vite dev server, and exits the parent process.

## Signature

```ts
const cleanup: () => void
```

## Related
- [[devMain]]
- [[startElectron]]
