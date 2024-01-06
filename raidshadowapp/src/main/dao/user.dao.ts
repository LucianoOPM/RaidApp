import { NewUser, UpdateUser, User, Users } from '../types/user.type'
import { PrismaClient } from '@prisma/client'

class UserDao {
  private userModel: PrismaClient['users']
  constructor(userModel: PrismaClient['users']) {
    this.userModel = userModel
  }

  getAll = async (): Promise<Users> => {
    try {
      return await this.userModel.findMany()
    } catch (error) {
      throw 'Nuevo error'
    }
  }

  getById = async (id: number): Promise<User | null> => {
    try {
      return await this.userModel.findUnique({
        where: {
          idUser: id
        }
      })
    } catch (error) {
      throw 'Nuevo error'
    }
  }

  createUser = async (data: NewUser): Promise<User> => {
    try {
      const res = await this.userModel.create({
        data
      })
      return res
    } catch (error) {
      throw new Error('Error al crear el usuario')
    }
  }

  updateUser = async (id: number, data: UpdateUser): Promise<User | null> => {
    try {
      return await this.userModel.update({
        where: {
          idUser: id
        },
        data
      })
    } catch (error) {
      throw 'Nuevo error'
    }
  }

  deleteUser = async (id: number): Promise<User | null> => {
    try {
      return await this.userModel.delete({
        where: { idUser: id }
      })
    } catch (error) {
      throw 'Nuevo error'
    }
  }
}

export default UserDao
