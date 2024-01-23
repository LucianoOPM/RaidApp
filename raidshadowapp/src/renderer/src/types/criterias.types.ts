import { ValueDb } from './values.type'

interface CriteriaPoint {
  idCriteria: number
  name: string
  CriteriaValues: ValueDb[]
}

interface CriteriaSave {
  id: number
  value: string
}

type Criterias = CriteriaPoint[]
interface NewCriteriaPoint extends Omit<CriteriaPoint, 'idCriteria' | 'CriteriaValues'> {}

export type { CriteriaPoint, Criterias, NewCriteriaPoint, CriteriaSave }
