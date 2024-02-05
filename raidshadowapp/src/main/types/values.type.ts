import { Optional } from 'sequelize'

interface CriteriaValues {
  idCritValue: number
  inGameValue: string
  realValue: number
  idCriteria: number
}

interface NewCriteriaValue extends Optional<CriteriaValues, 'idCritValue'> {}
interface UpdateCriteriaValue extends Optional<CriteriaValues, 'idCriteria' | 'idCritValue'> {}
interface ToUpdateValues extends Optional<CriteriaValues, 'idCriteria'> {}

export type { CriteriaValues, NewCriteriaValue, UpdateCriteriaValue, ToUpdateValues }
