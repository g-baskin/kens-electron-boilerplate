# renderer-entry

**Type:** module
**File:** `src/renderer/main.tsx:1`
**Exported:** no (entry point)

## Description
React application entry point. Mounts the `<App />` component inside `<StrictMode>` into the `#root` DOM element. Imports global styles from `App.css`.

## Exports
None — mounts the React root as a side effect.

## Imports
| Name | Source |
|------|--------|
| `StrictMode` | `react` |
| `createRoot` | `react-dom/client` |
| `App` | `./App` |
| `./App.css` | (global styles) |

## Mount Target
```ts
document.getElementById('root')!
```

## Related
- [[App]]
- [[vite-config]]
