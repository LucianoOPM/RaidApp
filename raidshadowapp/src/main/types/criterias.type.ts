interface Criteria {
  idCriteria: number
  name: string
  inGamePoints: string
  actualValue: number
}

interface NewCriteria extends Omit<Criteria, 'idCriteria' | 'actualValue'> {
  actualValue: string
}

export type { Criteria, NewCriteria }
