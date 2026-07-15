# Renderer

The React/TypeScript frontend that runs in Electron's Chromium browser process. This is where all UI code lives.

## Files

| File | Purpose |
|------|---------|
| `src/renderer/index.html` | HTML shell — contains `<div id="root">` and the module script tag |
| `src/renderer/main.tsx` | React entry point — creates root and renders `<App>` |
| `src/renderer/App.tsx` | Root component — displays system info via IPC |
| `src/renderer/App.css` | Global styles — dark theme, layout, card grid |
| `src/shared/ipc.ts` | Dependency-free contract that owns renderer-visible bridge types |
| `src/renderer/types/electron.d.ts` | Imports `ElectronAPI` from the shared contract and augments `window.electronAPI` |

## Entry Point

`index.html` is the Vite entry (`src/renderer/index.html`). It loads `main.tsx` as an ES module:

```html
<script type="module" src="./main.tsx"></script>
```

`main.tsx` (`src/renderer/main.tsx:1-10`) bootstraps React 19:

```typescript
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './App.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

Key details:
- Uses `createRoot` (React 18+ concurrent root API)
- `StrictMode` double-renders in development to catch side effects
- `App.css` is imported directly — Vite handles CSS injection for HMR
- The `!` non-null assertion on `getElementById('root')` is safe because the HTML always contains that element

## App Component

`App.tsx` (`src/renderer/App.tsx`) is a single functional component that demonstrates IPC integration:

**State management** (lines 4-5):
```typescript
const [appVersion, setAppVersion] = useState('...');
const [platform, setPlatform] = useState('...');
```

**IPC on mount** (lines 7-10):
```typescript
useEffect(() => {
  window.electronAPI.getAppVersion().then(setAppVersion);
  window.electronAPI.getPlatform().then(setPlatform);
}, []);
```

The empty dependency array ensures the IPC calls fire once on mount. The initial `'...'` state renders as placeholder text while the promises resolve.

**Synchronous version access** (line 12):
```typescript
const { electron, node, chrome } = window.electronAPI.versions;
```

Unlike `getAppVersion()` and `getPlatform()`, the `versions` object is synchronous — these values are baked in at preload time.

## Rendered UI

The component renders:
- A title and subtitle
- A 3-column info grid with 6 cards: App Version, Platform, Electron, Node, Chrome, Renderer
- Tech stack badges: Electron, React, TypeScript, Vite

The info grid uses CSS Grid (`grid-template-columns: 1fr 1fr 1fr` in `App.css:53`).

## Styling

`App.css` defines a dark theme with CSS custom properties:

```css
:root {
  --primary: #6c63ff;
  --surface: #16213e;
  --text: #e0e0e0;
  --text-secondary: #a0a0b0;
  background-color: #1a1a2e;
}
```

The layout uses flexbox for centering (`body` and `#root` are both flex containers) and CSS Grid for the info cards. The production CSP allows `'unsafe-inline'` for styles specifically to support runtime style injection, though this project uses static CSS files.

## Type Safety

The renderer accesses `window.electronAPI` without importing preload implementation because `src/renderer/types/electron.d.ts:1-9` imports `ElectronAPI` from `src/shared/ipc.ts` and augments the global `Window` interface:

```typescript
import type { ElectronAPI } from '../../shared/ipc';

export {};

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}
```

The `tsconfig.json` includes `src`, so this declaration is available to all renderer files. The concrete methods remain an allowlisted context-bridge API; renderer code does not receive `ipcRenderer` or a generic channel invocation function. See [shared-ipc.md](shared-ipc.md) and [preload.md](preload.md).

## Testing

`tests/unit/app.test.tsx` tests the component with `@testing-library/react`. The `window.electronAPI` mock is set up in `tests/setup.ts` and reset in each test's `beforeEach`. Tests cover:

- Static rendering (title, subtitle, badges, version labels)
- IPC call verification (`getAppVersion` and `getPlatform` called on mount)
- Async resolution (`waitFor` the resolved values appearing in the DOM)

## Extension Points

- **New component**: Create in `src/renderer/`, import from `App.tsx` or a router
- **Routing**: Install `react-router-dom`, wrap `<App>` in a `<BrowserRouter>`
- **State management**: Add a context provider or a library like Zustand above `<App>`
- **New IPC data**: First extend the shared contract and explicit preload allowlist, then call the typed `window.electronAPI.newMethod()` in a `useEffect` and store the result in state
