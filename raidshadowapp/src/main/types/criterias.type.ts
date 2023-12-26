interface Criteria {
  idCriteria: number
  name: string
}

interface NewCriteria extends Omit<Criteria, 'idCriteria'> {}

export type { Criteria, NewCriteria }
