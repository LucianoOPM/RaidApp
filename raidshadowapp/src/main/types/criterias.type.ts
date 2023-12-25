interface Criteria {
  idCriteria: number
  name: string
}

interface NewCriteria extends Omit<Criteria, 'idCriteria' | 'actualValue'> {
  actualValue: string
}

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

export type { Criteria, NewCriteria, UpdateValues }
