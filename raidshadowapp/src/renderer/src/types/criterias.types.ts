interface CriteriaPoint {
  id: number
  name: string
  inGamePoints: string
  actualValue: number
}

type Criterias = CriteriaPoint[]
interface NewCriteriaPoint extends Omit<CriteriaPoint, 'id' | 'actualValue'> {
  actualValue: string
}

export type { CriteriaPoint, Criterias, NewCriteriaPoint }
