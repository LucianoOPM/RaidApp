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

interface updateValue {
  idCritValue: string
  inGameValue: string
  realValue: string
}

interface acceptedUpdateValues {
  idCritValue: number
  inGameValue: string
  realValue: number
}

export type { ValueDB, ValueCreate, updateValue, acceptedUpdateValues }
