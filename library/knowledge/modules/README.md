# Modules

Deep-dive reference for each source directory in the project.

## Module Index

| Module | Source Directory | Entry Point | Bundler |
|--------|-----------------|-------------|---------|
| [Shared IPC Contract](shared-ipc.md) | `src/shared/` | `src/shared/ipc.ts` | Bundled into main and preload |
| [Main Process](main-process.md) | `src/main/` | `src/main/index.ts` | esbuild |
| [Preload](preload.md) | `src/preload/` | `src/preload/index.ts` | esbuild |
| [Renderer](renderer.md) | `src/renderer/` | `src/renderer/main.tsx` | Vite |
| [Build System](build-system.md) | `scripts/` + configs | `scripts/dev.mjs`, `scripts/build.mjs` | — |

## Dependency Flow

```
shared-ipc.md
    ├── imported by → main-process.md
    ├── imported by → preload.md
    └── provides types to → renderer.md

build-system.md
    ├── bundles main-process.md + shared-ipc.md → dist/main/index.js
    ├── bundles preload.md + shared-ipc.md → dist/preload/index.js
    └── builds renderer.md → dist/renderer/
```

## How to Read These Docs

Each module doc covers:

1. **Files** — every file in the directory with its purpose
2. **Key code** — verbatim snippets with file:line references
3. **Behavior** — what happens at runtime, in order
4. **Testing** — how the module is tested and what's mocked
5. **Extension points** — where to add new functionality

For a cross-process capability, start with [shared-ipc.md](shared-ipc.md), then cross-reference [architecture.md](../architecture.md) for the security and IPC model.
