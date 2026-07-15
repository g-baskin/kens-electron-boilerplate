# startElectron

**Type:** function
**File:** `scripts/dev.mjs:12`
**Exported:** no

## Description
Spawns the Electron process, passing the Vite dev server URL via the `VITE_DEV_SERVER_URL` environment variable. Kills any previously running Electron process before starting a new one. Exits the parent process when Electron closes.

## Signature

```ts
function startElectron(url: string): void
```

## Parameters
| Name | Type | Description |
|------|------|-------------|
| `url` | `string` | The Vite dev server URL to inject into the Electron process env |

## Related
- [[devMain]]
- [[electron-restart-plugin]]
- [[isDev]]
- [[main-process]]
