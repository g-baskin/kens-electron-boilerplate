# Knowledge Base

Narrative documentation covering architecture, workflow, and technology decisions for Kens Electron Boilerplate.

## Contents

| Document | What It Covers |
|----------|---------------|
| [architecture.md](architecture.md) | Process model, sandbox lifecycle, bridge boundary, IPC data flow, CSP policy |
| [development-workflow.md](development-workflow.md) | Dev server internals, reload behavior, testing strategy, linting, packaging |
| [tech-stack.md](tech-stack.md) | Every dependency and why it was chosen, version rationale |

## Module Deep Dives

Detailed reference for each source directory lives in [`modules/`](modules/README.md):

- [Shared IPC Contract](modules/shared-ipc.md) — Channel allowlist, request/result types, and bridge interface
- [Main Process](modules/main-process.md) — Sandbox-first lifecycle, window creation, handlers, and CSP enforcement
- [Preload](modules/preload.md) — Sandboxed context-bridge API surface and security guarantees
- [Renderer](modules/renderer.md) — React component tree, contract-derived global type, and entry point
- [Build System](modules/build-system.md) — Vite config, esbuild pipelines, reload behavior, and packaging

## How These Docs Are Written

Each document is 200–500 words of dense, actionable knowledge. Every claim references a specific file and line number. Code snippets are copied verbatim from source — not paraphrased. Docs cross-link to each other with relative markdown paths so you can navigate without leaving your editor.
