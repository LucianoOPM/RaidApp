import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { NewUser } from '../main/types/user.type'
import { NewCriteria } from '../main/types/criterias.type'
import { ErrorResponse, SuccessResponse } from '../main/types/response.type'
import { ToUpdateValues } from '../main/types/values.type'

// Custom APIs for renderer
const api = {
  createUser: async (data: NewUser): Promise<SuccessResponse | ErrorResponse | void> => {
    try {
      return await ipcRenderer.invoke('createUser', data)
    } catch (error) {
      console.log(error)
    }
  },
  getUsers: async (): Promise<SuccessResponse | ErrorResponse | void> => {
    try {
      return await ipcRenderer.invoke('getUsers')
    } catch (error) {
      console.log(error)
    }
  },
  getUser: async (idUser: string): Promise<SuccessResponse | ErrorResponse | void> => {
    try {
      return await ipcRenderer.invoke('getUser', idUser)
    } catch (error) {
      console.log(error)
    }
  },
  saveCriteria: async (criteria: NewCriteria): Promise<SuccessResponse | ErrorResponse | void> => {
    try {
      const valueCreated = await ipcRenderer.invoke('createCriteria', criteria)
      const parsed = JSON.parse(valueCreated.payload)

      await ipcRenderer.invoke('saveCriteriaValues', parsed.idCriteria)
      return valueCreated
    } catch (error) {
      console.log(error)
    }
  },
  getCriterias: async (): Promise<SuccessResponse | ErrorResponse | void> => {
    try {
      return await ipcRenderer.invoke('getCriterias')
    } catch (error) {
      console.log(error)
    }
  },
  updateValues: async (
    idCritValue: number,
    values: ToUpdateValues[]
  ): Promise<SuccessResponse | ErrorResponse | void> => {
    try {
      return await ipcRenderer.invoke('updateValues', idCritValue, values)
    } catch (error) {
      console.log(error)
    }
  },
  getByCriteria: async (id: string): Promise<SuccessResponse | ErrorResponse | void> => {
    try {
      return await ipcRenderer.invoke('getByCriteria', id)
    } catch (error) {
      console.log(error)
    }
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
