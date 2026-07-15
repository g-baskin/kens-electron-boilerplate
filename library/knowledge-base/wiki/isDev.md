# isDev

**Type:** config
**File:** `src/main/index.ts:5`
**Exported:** no

## Description
Boolean flag indicating whether the app is running in development mode. Derived from the presence of `VITE_DEV_SERVER_URL` in the environment, which is set by the dev script when spawning Electron.

## Signature

```ts
const isDev = !!process.env.VITE_DEV_SERVER_URL;
```

## Usage
- Suppresses Electron security warnings when `true`
- Controls whether the window loads from Vite dev server or built files
- Determines if DevTools are opened automatically

## Related
- [[createWindow]]
- [[main-process]]
- [[startElectron]]
- [[devMain]]
