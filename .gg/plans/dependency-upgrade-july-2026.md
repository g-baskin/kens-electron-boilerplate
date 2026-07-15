# Dependency Upgrade — July 2026

## Goal
Bring all 10 outdated major dependencies to their latest versions as of July 14, 2026.

## Current → Target Versions

| Package | Current | Target | Notes |
|---|---|---|---|
| electron | ^40.4.1 | ^43.1.1 | 3 majors behind, EOL since June 30 |
| vite | ^7.3.1 | ^8.1.4 | Rolldown replaces Rollup |
| @vitejs/plugin-react | ^5.1.4 | ^6.0.3 | Required for Vite 8 |
| typescript | ^5.9.3 | ^7.0.2 | Go-native compiler, no stable API yet |
| eslint | ^9.39.2 | ^10.7.0 | Already on flat config, smooth upgrade |
| @eslint/js | ^9.39.2 | ^10.0.1 | Must match eslint major |
| esbuild | ^0.27.3 | ^0.28.1 | 0.x minor = breaking |
| jsdom | ^28.1.0 | ^29.1.1 | Test environment |
| lint-staged | ^16.2.7 | ^17.0.8 | Pre-commit hook runner |
| @types/node | ^25.2.3 | ^26.1.1 | Type definitions |

## Key Breaking Changes & Mitigations

### TypeScript 7 (Go-native compiler)
- **No stable programmatic API** — typescript-eslint imports the TS API internally
- **Mitigation**: Use dual-package alias recommended by Microsoft:
  ```json
  "typescript": "npm:@typescript/typescript6@^6.0.0",
  "typescript-7": "npm:typescript@^7.0.0"
  ```
  - `tsc` (used by typescript-eslint internally) → gets TS 6.0 API
  - `tsc-7` binary → TS 7 Go compiler for type-checking
- **tsconfig.json**: Add `"types": ["node"]` (TS 7 defaults `types` to `[]`)
- **typecheck script**: Change to use `tsc-7` binary

### Vite 8 (Rolldown)
- Simple config (`defineConfig`, `root`, `base`, `build`, `server`) should work unchanged
- `@vitejs/plugin-react` 6 required for Vite 8
- **Risk**: Vitest 4.x may not support Vite 8 — fall back to Vitest 5.x beta if needed

### ESLint 10
- Removes legacy `.eslintrc` support (already on flat config ✅)
- `@eslint/js` must match ESLint major version
- `typescript-eslint` 8.x should support ESLint 10

### Electron 43
- Chromium 150, Node v24.17.0, V8 15.0
- Core APIs (BrowserWindow, ipcMain, contextBridge) unchanged
- Electron 40 is EOL since June 30, 2026

## Steps

1. **Update `package.json` version strings** for all 10 major-bump packages:
   - electron, vite, @vitejs/plugin-react, eslint, @eslint/js, esbuild, jsdom, lint-staged, @types/node
   - TypeScript: apply dual-package alias (`typescript` → `@typescript/typescript6`, add `typescript-7` → `typescript`)

2. **Update `tsconfig.json`**:
   - Add `"types": ["node"]` to compilerOptions

3. **Update npm scripts in `package.json`**:
   - Change `"typecheck"` to use `tsc-7` binary: `"typecheck": "tsc-7 --noEmit"`

4. **Run `npm install`** — resolve any peer dependency conflicts

5. **Run `npm run check`** (typecheck + lint + format + tests):
   - Fix any breaking changes in eslint.config.mjs for ESLint 10
   - Fix any Vitest/Vite 8 compatibility issues
   - Fix any TypeScript type errors from new strictness

6. **Iterate on failures** — each major bump may surface issues requiring code or config changes

7. **Commit all changes with conventional commit message**

## Files Modified
- `package.json` — version strings, scripts
- `tsconfig.json` — types array
- `eslint.config.mjs` — possibly (ESLint 10 changes)
- `vitest.config.ts` — possibly (Vite 8 compat)
- `vite.config.ts` — possibly (Vite 8 config changes)
- Source/test files — possibly (type errors, API changes)

## Verification
- `npm run typecheck` passes
- `npm run lint` passes
- `npm run format:check` passes
- `npm run test` passes
- All 4 together: `npm run check`
