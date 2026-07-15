# Window.electronAPI

**Type:** type
**File:** `src/renderer/types/electron.d.ts:4`
**Exported:** no (global augmentation)

## Description
Global `Window` interface augmentation that adds the `electronAPI` property. This makes `window.electronAPI` available as a typed global throughout the renderer codebase without explicit imports.

## Signature

```ts
declare global {
  interface Window {
    electronAPI: {
      getAppVersion: () => Promise<string>;
      getPlatform: () => Promise<string>;
      versions: {
        electron: string;
        node: string;
        chrome: string;
      };
    };
  }
}
```

## Related
- [[ElectronAPI]]
- [[preload]]
- [[App]]
