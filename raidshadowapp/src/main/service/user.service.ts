import UserDao from '../dao/user.dao'
import UserDto from '../dto/user.dto'
import { NewUser, User, Users } from '../types/user.type'

class UserService {
  private userDao: UserDao
  constructor(userDao: UserDao) {
    this.userDao = userDao
  }

  createUser = async (data: NewUser): Promise<UserDto> => {
    try {
      const user = await this.userDao.createUser(data)
      const userDto = new UserDto(user)
      if (!userDto) {
        throw new Error('No se pudo crear al usuario')
      }
      return userDto
    } catch (error) {
      throw new Error('No se pudo crear al usuario')
    }
  }

  getAll = async (): Promise<Users> => {
    try {
      const users = await this.userDao.getAll()
      return users
    } catch (error) {
      throw new Error('No se pudo obtener los usuarios')
    }
  }

  getUser = async (id: string): Promise<User> => {
    try {
      const user = await this.userDao.getById(+id)

      if (!user) {
        throw new Error('No se pudo obtener el usuario')
      }
      return user
    } catch (error) {
      throw new Error('No se pudo obtener el usuario')
    }
  }
}

export default UserService
