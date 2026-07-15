# eslint-config

**Type:** config
**File:** `eslint.config.mjs:1`
**Exported:** yes (default)

## Description
ESLint flat config that defines linting rules across the project. Configures TypeScript-ESLint as the base, applies React Hooks and React Refresh rules to renderer code, uses Node.js globals for main/preload code, and uses browser globals for renderer and test code.

## Signature

```ts
export default tseslint.config(
  { ignores: ['dist', 'release', 'node_modules', 'scripts'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  { /* renderer config block */ },
  { /* main/preload config block */ },
  { /* test config block */ },
);
```

## Config Blocks

### Renderer (`src/renderer/**/*.{ts,tsx}`)
- Plugins: `react-hooks`, `react-refresh`
- Rules: `react-hooks` recommended + `react-refresh/only-export-components: 'warn'`
- Globals: `browser`

### Main & Preload (`src/main/**/*.ts`, `src/preload/**/*.ts`)
- Globals: `node`

### Tests (`tests/**/*.{ts,tsx}`)
- Plugins: `react-hooks`
- Rules: `react-hooks` recommended
- Globals: `browser`

## Ignored Paths
`dist`, `release`, `node_modules`, `scripts`

## Related
- [[vite-config]]
- [[vitest-config]]
