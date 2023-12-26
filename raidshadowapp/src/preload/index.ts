import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { NewUser } from '../main/types/user.type'
import { NewCriteria } from '../main/types/criterias.type'
import { ValueCreate } from '../main/types/values.type'
import { ErrorResponse, SuccessResponse } from '../main/types/response.type'

// Custom APIs for renderer
const api = {
  createUser: (data: NewUser): Promise<SuccessResponse | ErrorResponse> => {
    return ipcRenderer.invoke('createUser', data)
  },
  getUsers: (): Promise<SuccessResponse | ErrorResponse> => {
    return ipcRenderer.invoke('getUsers')
  },
  getUser: (idUser: string): Promise<SuccessResponse | ErrorResponse> => {
    return ipcRenderer.invoke('getUser', idUser)
  },
  saveCriteria: (criteria: NewCriteria): Promise<void> => {
    return ipcRenderer.invoke('createCriteria', criteria)
  },
  getCriterias: (): Promise<SuccessResponse | ErrorResponse> => {
    return ipcRenderer.invoke('getCriterias')
  },
  updateValues: (id: number, values: ValueCreate): Promise<SuccessResponse | ErrorResponse> => {
    return ipcRenderer.invoke('updateValues', id, values)
  },
  getByCriteria: (id: string): Promise<SuccessResponse | ErrorResponse> => {
    return ipcRenderer.invoke('getByCriteria', id)
  }
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
