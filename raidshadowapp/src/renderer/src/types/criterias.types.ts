interface CriteriaPoint {
  idCriteria: number
  name: string
  inGamePoints: string
  actualValue: number
}

type Criterias = CriteriaPoint[]
interface NewCriteriaPoint
  extends Omit<CriteriaPoint, 'idCriteria' | 'inGamePoints' | 'actualValue'> {}

interface UpdateValues {
  'actualValue-0': string
  'actualValue-1': string
  'actualValue-2': string
  'actualValue-3': string
  'actualValue-4': string
  'inGamePoints-0': string
  'inGamePoints-1': string
  'inGamePoints-2': string
  'inGamePoints-3': string
  'inGamePoints-4': string
}

export type { CriteriaPoint, Criterias, NewCriteriaPoint, UpdateValues }
