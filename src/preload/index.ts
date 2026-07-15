import { contextBridge, ipcRenderer } from 'electron';
import {
  IPC_CHANNELS,
  type ElectronAPI,
  type IpcArgs,
  type IpcChannel,
  type IpcResult,
} from '../shared/ipc';

function invoke<C extends IpcChannel>(channel: C, ...args: IpcArgs<C>): Promise<IpcResult<C>> {
  return ipcRenderer.invoke(channel, ...args) as Promise<IpcResult<C>>;
}

const electronAPI = {
  getAppVersion: () => invoke(IPC_CHANNELS.getAppVersion),
  getPlatform: () => invoke(IPC_CHANNELS.getPlatform),
  versions: {
    electron: process.versions.electron,
    node: process.versions.node,
    chrome: process.versions.chrome,
  },
} satisfies ElectronAPI;

contextBridge.exposeInMainWorld('electronAPI', electronAPI);
