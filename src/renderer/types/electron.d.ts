import type { ElectronAPI } from '../../shared/ipc';

export {};

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}
