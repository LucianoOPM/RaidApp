import { Model, Column, Table, DataType, HasMany } from 'sequelize-typescript'
import CriteriaValues from './CriteriaValues.model'
import { Criteria, NewCriteria } from '../types/criterias.type'

@Table({
  timestamps: false
})
class Criterias extends Model<Criteria, NewCriteria> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER
  })
  idCriteria!: number

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false
  })
  name!: string

  @HasMany(() => CriteriaValues)
  criteriaValues!: CriteriaValues[]
}

export default Criterias
