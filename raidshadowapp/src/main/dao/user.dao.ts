import User from '../models/Users.model'
import { NewUser } from '../types/user.type'

class UserDao {
  private userModel: typeof User
  constructor(userModel: typeof User) {
    this.userModel = userModel
  }

  getAll = async (): Promise<User[]> => {
    try {
      return await this.userModel.findAll()
    } catch (error) {
      throw 'Nuevo error'
    }
  }

  getById = async (id: number): Promise<User | null> => {
    try {
      return await this.userModel.findByPk(id)
    } catch (error) {
      throw 'Nuevo error'
    }
  }

  createUser = async (data: NewUser): Promise<User> => {
    try {
      const res = await this.userModel.create(data)
      return res
    } catch (error) {
      throw new Error('Error al crear el usuario')
    }
  }

  updateUser = async (
    id: number,
    data: NewUser
  ): Promise<{ rowsAffected: number; updatedUser: User[] }> => {
    try {
      const [rowsAffected, updatedUser] = await this.userModel.update(data, {
        where: { idUser: id },
        returning: true
      })

      return {
        rowsAffected,
        updatedUser
      }
    } catch (error) {
      throw 'Nuevo error'
    }
  }

  deleteUser = async (id: number): Promise<number | null> => {
    try {
      return await this.userModel.destroy({
        where: { idUser: id },
        force: true
      })
    } catch (error) {
      throw 'Nuevo error'
    }
  }
}

export default UserDao
