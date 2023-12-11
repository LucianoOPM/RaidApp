interface CriteriaPoint {
  id: number
  name: string
  inGamePoints: string
  actualValue: number
}

type Criterias = CriteriaPoint[]

export type { CriteriaPoint, Criterias }
