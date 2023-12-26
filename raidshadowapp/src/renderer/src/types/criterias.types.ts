interface CriteriaPoint {
  idCriteria: number
  name: string
}

type Criterias = CriteriaPoint[]
interface NewCriteriaPoint extends Omit<CriteriaPoint, 'idCriteria'> {}

export type { CriteriaPoint, Criterias, NewCriteriaPoint }
