// @vitest-environment node
import { describe, it, expect, vi, beforeEach } from 'vitest';

const mocks = vi.hoisted(() => {
  const loadURL = vi.fn();
  const loadFile = vi.fn();
  const openDevTools = vi.fn();
  const onHeadersReceived = vi.fn();

  const BrowserWindowInstance = {
    loadURL,
    loadFile,
    webContents: {
      openDevTools,
      session: {
        webRequest: { onHeadersReceived },
      },
    },
  };

  // Must use regular function (not arrow) so it's constructable with `new`
  const BrowserWindowMock = vi.fn(function () {
    return BrowserWindowInstance;
  });
  (BrowserWindowMock as unknown as Record<string, unknown>).getAllWindows = vi.fn(() => []);

  const readyCallbacks: Array<() => void> = [];
  const whenReady = vi.fn(() => ({
    then: (cb: () => void) => {
      readyCallbacks.push(cb);
      return { catch: vi.fn() };
    },
  }));

  const appOn = vi.fn();
  const enableSandbox = vi.fn();

  return {
    loadURL,
    loadFile,
    openDevTools,
    onHeadersReceived,
    BrowserWindowMock,
    BrowserWindowInstance,
    whenReady,
    appOn,
    enableSandbox,
    readyCallbacks,
  };
});

vi.mock('electron', () => ({
  app: {
    enableSandbox: mocks.enableSandbox,
    whenReady: mocks.whenReady,
    on: mocks.appOn,
    quit: vi.fn(),
  },
  BrowserWindow: mocks.BrowserWindowMock,
  ipcMain: { handle: vi.fn() },
}));

vi.mock('../../src/main/ipc', () => ({
  registerIpcHandlers: vi.fn(),
}));

describe('Main Process', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.readyCallbacks.length = 0;
    delete process.env.VITE_DEV_SERVER_URL;
    vi.resetModules();
  });

  async function loadMain(devUrl?: string) {
    if (devUrl) process.env.VITE_DEV_SERVER_URL = devUrl;
    await import('../../src/main/index');
  }

  it('enables the full sandbox before app readiness begins', async () => {
    await loadMain();
    expect(mocks.enableSandbox).toHaveBeenCalledTimes(1);
    expect(mocks.whenReady).toHaveBeenCalledTimes(1);
    expect(mocks.enableSandbox.mock.invocationCallOrder[0]).toBeLessThan(
      mocks.whenReady.mock.invocationCallOrder[0],
    );
  });

  it('registers window-all-closed handler', async () => {
    await loadMain();
    expect(mocks.appOn).toHaveBeenCalledWith('window-all-closed', expect.any(Function));
  });

  it('creates BrowserWindow on ready', async () => {
    await loadMain();
    mocks.readyCallbacks.forEach((cb) => cb());
    expect(mocks.BrowserWindowMock).toHaveBeenCalled();
  });

  it('configures BrowserWindow with correct dimensions', async () => {
    await loadMain();
    mocks.readyCallbacks.forEach((cb) => cb());
    expect(mocks.BrowserWindowMock).toHaveBeenCalledWith(
      expect.objectContaining({ width: 900, height: 670 }),
    );
  });

  it('enables every BrowserWindow hardening preference and retains the preload path', async () => {
    await loadMain();
    mocks.readyCallbacks.forEach((cb) => cb());
    expect(mocks.BrowserWindowMock).toHaveBeenCalledWith(
      expect.objectContaining({
        webPreferences: expect.objectContaining({
          preload: expect.any(String),
          contextIsolation: true,
          nodeIntegration: false,
          sandbox: true,
        }),
      }),
    );
  });

  it('loads Vite dev server URL in dev mode', async () => {
    await loadMain('http://localhost:5173');
    mocks.readyCallbacks.forEach((cb) => cb());
    expect(mocks.loadURL).toHaveBeenCalledWith('http://localhost:5173');
  });

  it('opens DevTools in dev mode', async () => {
    await loadMain('http://localhost:5173');
    mocks.readyCallbacks.forEach((cb) => cb());
    expect(mocks.openDevTools).toHaveBeenCalled();
  });

  it('loads file in production mode', async () => {
    await loadMain();
    mocks.readyCallbacks.forEach((cb) => cb());
    expect(mocks.loadFile).toHaveBeenCalled();
  });

  it('does not open DevTools in production mode', async () => {
    await loadMain();
    mocks.readyCallbacks.forEach((cb) => cb());
    expect(mocks.openDevTools).not.toHaveBeenCalled();
  });

  it('sets CSP headers in production mode', async () => {
    await loadMain();
    mocks.readyCallbacks.forEach((cb) => cb());
    expect(mocks.onHeadersReceived).toHaveBeenCalledWith(expect.any(Function));
  });

  it('does not set CSP headers in dev mode', async () => {
    await loadMain('http://localhost:5173');
    mocks.readyCallbacks.forEach((cb) => cb());
    expect(mocks.onHeadersReceived).not.toHaveBeenCalled();
  });
});
