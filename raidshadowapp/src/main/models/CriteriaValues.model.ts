import { Model, Table, Column, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript'
import Criterias from './Criterias.model'
import type { NewCriteriaValue, CriteriaValues as CriteriaValuesType } from '../types/values.type'

@Table({
  timestamps: false
})
class CriteriaValues extends Model<CriteriaValuesType, NewCriteriaValue> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER
  })
  idCritValue!: number

  @Column(DataType.STRING)
  inGameValue!: string

  @Column(DataType.INTEGER)
  realValue!: number

  @ForeignKey(() => Criterias)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  idCriteria!: number

  @BelongsTo(() => Criterias)
  criterias!: Criterias
}

export default CriteriaValues
