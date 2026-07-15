# CSP-Policy

**Type:** config
**File:** `src/main/index.ts:34`
**Exported:** no

## Description
Content Security Policy applied in production builds via the `onHeadersReceived` session web request handler. Restricts resource loading to same-origin and limits script execution to bundled files only. Allows inline styles (required by React component styles).

## Signature

```ts
"default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'"
```

## Directives
| Directive | Value | Reason |
|-----------|-------|--------|
| `default-src` | `'self'` | Only load resources from same origin |
| `script-src` | `'self'` | Only execute scripts from same origin |
| `style-src` | `'self' 'unsafe-inline'` | Same-origin styles + inline styles for React |

## Notes
- **Not applied in dev mode** — Vite's HMR and React Fast Refresh require `unsafe-eval` and `unsafe-inline` for scripts
- Injected via `win.webContents.session.webRequest.onHeadersReceived`

## Related
- [[createWindow]]
- [[isDev]]
- [[main-process]]
