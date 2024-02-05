import { Dialect } from 'sequelize'

interface DataBaseConfig {
  dialect: Dialect
  storage: string
}

export type { DataBaseConfig }
