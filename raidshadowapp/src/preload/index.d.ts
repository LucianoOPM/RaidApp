import { ElectronAPI } from '@electron-toolkit/preload'
import { NewUser } from '../main/types/user.type'
import { SuccessResponse, ErrorResponse } from '../main/types/response.type'

interface CustomApi {
  createUser: (user: NewUser) => Promise<SuccessResponse | ErrorResponse>
  getUsers: () => Promise<SuccessResponse | ErrorResponse>
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: CustomApi
  }
}
