# vitest-config

**Type:** config
**File:** `vitest.config.ts:1`
**Exported:** yes (default)

## Description
Vitest configuration for running tests. Uses jsdom environment for DOM simulation, loads a setup file for global test utilities, and includes the React plugin for component testing with JSX support.

## Signature

```ts
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    include: ['tests/**/*.test.{ts,tsx}'],
  },
});
```

## Properties
| Key | Value | Description |
|-----|-------|-------------|
| `plugins` | `[react()]` | `@vitejs/plugin-react` for JSX in tests |
| `test.environment` | `'jsdom'` | Simulates browser DOM |
| `test.setupFiles` | `['./tests/setup.ts']` | Global test setup |
| `test.include` | `['tests/**/*.test.{ts,tsx}']` | Test file glob pattern |

## Related
- [[vite-config]]
- [[eslint-config]]
