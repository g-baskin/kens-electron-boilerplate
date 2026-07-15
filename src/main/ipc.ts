import { app, ipcMain } from 'electron';
import { IPC_CHANNELS, type IpcResult } from '../shared/ipc';

export function registerIpcHandlers(): void {
  ipcMain.handle(IPC_CHANNELS.getAppVersion, (): IpcResult<typeof IPC_CHANNELS.getAppVersion> => {
    return app.getVersion();
  });

  ipcMain.handle(IPC_CHANNELS.getPlatform, (): IpcResult<typeof IPC_CHANNELS.getPlatform> => {
    return process.platform;
  });
}
