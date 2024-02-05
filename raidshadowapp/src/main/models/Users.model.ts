import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript'
import Points from './Points.model'
import { User as UserType, NewUser } from '../types/user.type'

@Table({
  timestamps: false
})
class User extends Model<UserType, NewUser> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER
  })
  idUser!: number

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false
  })
  username!: string

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW
  })
  register_date!: Date

  @HasMany(() => Points)
  points!: Points[]
}

export default User
