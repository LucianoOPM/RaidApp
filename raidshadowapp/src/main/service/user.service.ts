import UserDao from '../dao/user.dao'
import UserDto from '../dto/user.dto'
import { NewUser, User } from '../types/user.type'

class UserService {
  private userDao: UserDao
  constructor(userDao: UserDao) {
    this.userDao = userDao
  }

  createUser = async (data: NewUser): Promise<UserDto> => {
    try {
      const registerUser: NewUser = {
        username: data.username,
        register_date: new Date(data.register_date),
        points: data.points
      }
      const user = await this.userDao.createUser(registerUser)
      const userDto = new UserDto(user)
      if (!userDto) {
        throw new Error('No se pudo crear al usuario')
      }
      return userDto
    } catch (error) {
      throw new Error('No se pudo crear al usuario')
    }
  }

  getAll = async (): Promise<User[]> => {
    try {
      return await this.userDao.getAll()
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
