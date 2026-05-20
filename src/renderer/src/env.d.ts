export interface IElectronAPI {
    login: (credentials: string) => Promise<any>;
  }
  
  declare global {
    interface Window {
      electron: any;
      api: IElectronAPI;
    }
  }
  