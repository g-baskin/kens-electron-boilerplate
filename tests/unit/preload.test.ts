// @vitest-environment node
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { IPC_CHANNELS, type ElectronAPI } from '../../src/shared/ipc';

const mocks = vi.hoisted(() => ({
  exposeInMainWorld: vi.fn(),
  invoke: vi.fn(),
}));

vi.mock('electron', () => ({
  contextBridge: { exposeInMainWorld: mocks.exposeInMainWorld },
  ipcRenderer: { invoke: mocks.invoke },
}));

describe('Preload Script', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.resetModules();
  });

  async function loadPreload() {
    await import('../../src/preload/index');
  }

  function getExposedApi(): ElectronAPI {
    return mocks.exposeInMainWorld.mock.calls[0][1] as ElectronAPI;
  }

  it('exposes exactly one electronAPI namespace', async () => {
    await loadPreload();
    expect(mocks.exposeInMainWorld).toHaveBeenCalledTimes(1);
    expect(mocks.exposeInMainWorld).toHaveBeenCalledWith('electronAPI', expect.any(Object));
  });

  it('exposes only the declared bridge allowlist', async () => {
    await loadPreload();
    const api = getExposedApi();
    expect(Object.keys(api)).toEqual(['getAppVersion', 'getPlatform', 'versions']);
    expect(api).not.toHaveProperty('invoke');
    expect(api).not.toHaveProperty('send');
    expect(api).not.toHaveProperty('sendSync');
    expect(api).not.toHaveProperty('on');
    expect(api).not.toHaveProperty('once');
    expect(api).not.toHaveProperty('removeListener');
    expect(api).not.toHaveProperty('removeAllListeners');
  });

  it('getAppVersion invokes only its contract channel without arguments', async () => {
    await loadPreload();
    getExposedApi().getAppVersion();
    expect(mocks.invoke).toHaveBeenCalledOnce();
    expect(mocks.invoke).toHaveBeenCalledWith(IPC_CHANNELS.getAppVersion);
  });

  it('getPlatform invokes only its contract channel without arguments', async () => {
    await loadPreload();
    getExposedApi().getPlatform();
    expect(mocks.invoke).toHaveBeenCalledOnce();
    expect(mocks.invoke).toHaveBeenCalledWith(IPC_CHANNELS.getPlatform);
  });

  it('exposes exactly the current runtime version fields', async () => {
    await loadPreload();
    expect(getExposedApi().versions).toEqual({
      electron: process.versions.electron,
      node: process.versions.node,
      chrome: process.versions.chrome,
    });
  });
});
