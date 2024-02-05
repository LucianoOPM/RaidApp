import { Optional } from 'sequelize'
import Points from '../models/Points.model'

export interface User {
  idUser: number
  username: string
  register_date: Date
  points: Points[]
}

export interface NewUser extends Optional<User, 'idUser'> {}
