interface ValueDb {
  idCritValue: number
  inGameValue: string
  realValue: number
  idCriteria: number
}

interface SaveValueDb {
  inGameValue: string
  realValue: number
}

interface UpdateValueDb {
  inGameValue?: string
  realValue?: number
}

interface inputValues {
  idCritValue: string
  realValue: string
  inGameValue: string
}

export type { ValueDb, SaveValueDb, UpdateValueDb, inputValues }
