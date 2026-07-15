# BrowserWindowOptions

**Type:** config
**File:** `src/main/index.ts:15`
**Exported:** no

## Description
Configuration object passed to the `BrowserWindow` constructor. Sets window dimensions and security-hardened web preferences including context isolation and the preload script path.

## Signature

```ts
{
  width: 900,
  height: 670,
  webPreferences: {
    preload: path.join(__dirname, '../preload/index.js'),
    contextIsolation: true,
    nodeIntegration: false,
    sandbox: false,
  },
}
```

## Properties
| Key | Value | Description |
|-----|-------|-------------|
| `width` | `900` | Initial window width in pixels |
| `height` | `670` | Initial window height in pixels |
| `webPreferences.preload` | `../preload/index.js` | Path to the preload script |
| `webPreferences.contextIsolation` | `true` | Isolates preload from renderer context |
| `webPreferences.nodeIntegration` | `false` | Disables Node.js in renderer |
| `webPreferences.sandbox` | `false` | Disables Chromium sandbox (needed for preload) |

## Related
- [[createWindow]]
- [[preload]]
- [[main-process]]
