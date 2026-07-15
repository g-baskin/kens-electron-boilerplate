import '@testing-library/jest-dom/vitest';
import type { ElectronAPI } from '../src/shared/ipc';

// Mock electronAPI for renderer tests (only in jsdom environment)
if (typeof window !== 'undefined') {
  const electronAPI = {
    getAppVersion: () => Promise.resolve('1.0.0'),
    getPlatform: () => Promise.resolve('test'),
    versions: {
      electron: '33.0.0',
      node: '20.0.0',
      chrome: '130.0.0',
    },
  } satisfies ElectronAPI;

  Object.defineProperty(window, 'electronAPI', {
    value: electronAPI,
    writable: true,
  });
}
