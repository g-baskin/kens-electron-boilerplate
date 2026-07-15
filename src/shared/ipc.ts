export const IPC_CHANNELS = {
  getAppVersion: 'get-app-version',
  getPlatform: 'get-platform',
} as const;

export interface IpcContract {
  [IPC_CHANNELS.getAppVersion]: {
    args: [];
    result: string;
  };
  [IPC_CHANNELS.getPlatform]: {
    args: [];
    result: string;
  };
}

export type IpcChannel = keyof IpcContract;
export type IpcArgs<C extends IpcChannel> = IpcContract[C]['args'];
export type IpcResult<C extends IpcChannel> = IpcContract[C]['result'];

export interface RuntimeVersions {
  readonly electron: string;
  readonly node: string;
  readonly chrome: string;
}

export interface ElectronAPI {
  getAppVersion: () => Promise<IpcResult<typeof IPC_CHANNELS.getAppVersion>>;
  getPlatform: () => Promise<IpcResult<typeof IPC_CHANNELS.getPlatform>>;
  readonly versions: RuntimeVersions;
}
