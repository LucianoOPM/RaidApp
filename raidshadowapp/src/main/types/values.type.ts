interface ValueDB {
  idCritValue: number
  inGameValue: string
  realValue: number
  idCriteria: number
}

interface ValueCreate {
  inGameValue: string
  realValue: number
}

export type { ValueDB, ValueCreate }
