# electron-restart-plugin

**Type:** esbuild-plugin
**File:** `scripts/dev.mjs:62`
**Exported:** no

## Description
Custom esbuild plugin used during development. After each successful main-process rebuild, it restarts the Electron process by calling `startElectron(url)`. Tracks first-build vs subsequent rebuilds for log output.

## Signature

```ts
{
  name: 'electron-restart',
  setup(build) {
    build.onEnd((result) => {
      if (result.errors.length === 0) {
        startElectron(url);
      }
    });
  },
}
```

## Behavior
1. Hooks into `build.onEnd` callback
2. Checks that the build has zero errors
3. On first build: logs "Starting Electron..."
4. On subsequent rebuilds: logs "Restarting Electron..."
5. Calls `startElectron(url)` to kill old process and spawn new one

## Related
- [[startElectron]]
- [[devMain]]
- [[main-process]]
