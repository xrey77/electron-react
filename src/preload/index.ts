// src/preload/index.ts
import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// 1. Define types for your custom API
export interface CustomApi {
  login: (credentials: any) => Promise<any>
}

// 2. Typed custom API
const customApi: CustomApi = {
  login: (credentials) => ipcRenderer.invoke('auth:login', credentials)
}

// 3. Expose to Main World
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', customApi)
  } catch (error) {
    console.error("Context bridge failed:", error)
  }
} else {
  // Use lowercase 'window.api' to perfectly match your TS definition and React code
  // @ts-ignore (for non-contextIsolated fallback)
  window.electron = electronAPI
  // @ts-ignore
  window.api = customApi
}



// const { contextBridge, ipcRenderer } = require('electron')
// import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
// const api = {}

// contextBridge.exposeInMainWorld('electronAPI', {
//   login: (credentials) => ipcRenderer.invoke('auth:login', credentials)
// });

// if (process.contextIsolated) {
//   try {
//     contextBridge.exposeInMainWorld('electron', electronAPI)
//     contextBridge.exposeInMainWorld('api', api)
//   } catch (error) {
//     console.error(error)
//   }
// } else {
//   window.electron = electronAPI
//   window.api = api
// }
