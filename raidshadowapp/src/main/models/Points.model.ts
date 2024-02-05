import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript'
import User from './Users.model'

@Table({
  timestamps: false
})
class Points extends Model<Points> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER
  })
  pointID!: number

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW
  })
  date!: Date

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0
  })
  userPoints!: number

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER
  })
  idUser!: number

  @BelongsTo(() => User)
  user!: User
}
export default Points
