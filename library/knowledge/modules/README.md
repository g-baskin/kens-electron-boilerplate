# Modules

Deep-dive reference for each source directory in the project.

## Module Index

| Module | Source Directory | Entry Point | Bundler |
|--------|-----------------|-------------|---------|
| [Main Process](main-process.md) | `src/main/` | `src/main/index.ts` | esbuild |
| [Preload](preload.md) | `src/preload/` | `src/preload/index.ts` | esbuild |
| [Renderer](renderer.md) | `src/renderer/` | `src/renderer/main.tsx` | Vite |
| [Build System](build-system.md) | `scripts/` + configs | `scripts/dev.mjs`, `scripts/build.mjs` | — |

## Dependency Flow

```
build-system.md
    │
    ├── builds → main-process.md    (esbuild → dist/main/index.js)
    ├── builds → preload.md         (esbuild → dist/preload/index.js)
    └── builds → renderer.md        (Vite → dist/renderer/)
```

## How to Read These Docs

Each module doc covers:

1. **Files** — every file in the directory with its purpose
2. **Key code** — verbatim snippets with file:line references
3. **Behavior** — what happens at runtime, in order
4. **Testing** — how the module is tested and what's mocked
5. **Extension points** — where to add new functionality

Start with the module you need to modify. Cross-reference with [architecture.md](../architecture.md) for the security and IPC model.
