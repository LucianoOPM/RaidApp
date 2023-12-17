import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { NewUser } from '../main/types/user.type'
import { NewCriteria } from '../main/types/criterias.type'

// Custom APIs for renderer
const api = {
  createUser: (data: NewUser): Promise<void> => ipcRenderer.invoke('createUser', data),
  getUsers: (): Promise<void> => ipcRenderer.invoke('getUsers'),
  getUser: (idUser: string): Promise<void> => ipcRenderer.invoke('getUser', idUser),
  saveCriteria: (criteria: NewCriteria): Promise<void> => {
    return ipcRenderer.invoke('createCriteria', criteria)
  },
  getCriterias: (): Promise<void> => ipcRenderer.invoke('getCriterias')
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
