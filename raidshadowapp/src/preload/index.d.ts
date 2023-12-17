import { ElectronAPI } from '@electron-toolkit/preload'
import { FrontendNewUser } from '../main/types/user.type'
import { SuccessResponse, ErrorResponse } from '../main/types/response.type'
import { NewCriteriaPoint } from '@renderer/types/criterias.types'

interface CustomApi {
  createUser: (user: FrontendNewUser) => Promise<SuccessResponse | ErrorResponse>
  getUsers: () => Promise<SuccessResponse | ErrorResponse>
  getUser: (id: string) => Promise<SuccessResponse | ErrorResponse>
  saveCriteria: (criteria: NewCriteriaPoint) => Promise<SuccessResponse | ErrorResponse>
  getCriterias: () => Promise<SuccessResponse | ErrorResponse>
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: CustomApi
  }
}
