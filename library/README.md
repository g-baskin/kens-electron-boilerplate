# Library

Canonical documentation for **Kens Electron Boilerplate** — a modern Electron app with React 19, TypeScript, and Vite.

## Structure

```
library/
├── README.md                          ← You are here
└── knowledge/
    ├── README.md                      ← Knowledge base overview
    ├── architecture.md                ← Process model, sandbox lifecycle, IPC flow
    ├── development-workflow.md        ← Scripts, reload behavior, testing, packaging
    ├── tech-stack.md                  ← Dependency decisions and versions
    └── modules/
        ├── README.md                  ← Module index
        ├── shared-ipc.md              ← Typed cross-process IPC contract
        ├── main-process.md            ← Electron main process deep dive
        ├── preload.md                 ← Sandboxed context bridge boundary
        ├── renderer.md                ← React/TypeScript renderer deep dive
        └── build-system.md            ← Vite, esbuild, electron-builder pipeline
```

## Reading Order

1. **[architecture.md](knowledge/architecture.md)** — Start here. Understand the three-process model (main → preload → renderer) and the security boundaries between them.
2. **[tech-stack.md](knowledge/tech-stack.md)** — Why these specific dependencies and versions.
3. **[development-workflow.md](knowledge/development-workflow.md)** — How to develop, test, and ship.
4. **[modules/](knowledge/modules/README.md)** — Deep dives into each subsystem.

## Quick Reference

| Task | Command |
|------|---------|
| Start dev server | `npm run dev` |
| Production build | `npm run build` |
| Run all checks | `npm run check` |
| Package for current OS | `npm run package` |

## Project at a Glance

- **4 source directories**: `src/main/`, `src/preload/`, `src/renderer/`, `src/shared/`
- **1 typed IPC contract**: `src/shared/ipc.ts` is consumed by main, preload, and renderer typings
- **3 build tools**: Vite (renderer), esbuild (main + preload), electron-builder (packaging)
- **Security**: app-wide and per-window sandboxing, context isolation on, Node integration off, strict CSP in production
- **Zero-config**: clone → `npm install` → `npm run dev`
