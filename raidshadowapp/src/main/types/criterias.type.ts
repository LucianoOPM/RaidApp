import { Optional } from 'sequelize'
import { CriteriaValues } from './values.type'

export interface Criteria {
  idCriteria: number
  name: string
  criteriaValues: CriteriaValues[]
}

export interface NewCriteria extends Optional<Criteria, 'idCriteria'> {}
