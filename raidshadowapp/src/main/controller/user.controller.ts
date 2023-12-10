import { IpcMainInvokeEvent } from 'electron'
import UserService from '../service/user.service'
import { SuccessResponse, ErrorResponse } from '../types/response.type'
import { NewUser } from '../types/user.type'

class UserController {
  private service: UserService
  constructor(service: UserService) {
    this.service = service
  }

  createUser = async (
    _event: IpcMainInvokeEvent,
    data: NewUser
  ): Promise<SuccessResponse | ErrorResponse> => {
    try {
      const user = await this.service.createUser(data)
      return {
        code: 201,
        message: 'success',
        payload: user
      }
    } catch (error) {
      return {
        code: 500,
        error: 'El usuario no pudo ser creado correctamente'
      }
    }
  }

  getUsers = async (): Promise<SuccessResponse | ErrorResponse> => {
    try {
      const users = await this.service.getAll()
      return {
        code: 200,
        message: 'success',
        payload: users
      }
    } catch (error) {
      return {
        code: 404,
        error: 'No se pudieron obtener los usuarios'
      }
    }
  }
}

export default UserController
