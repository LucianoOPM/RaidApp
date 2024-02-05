import { Sequelize, SequelizeOptions } from 'sequelize-typescript'
import { EnvConnectionWithModels } from '../types/env.connection'

class DatabaseSingleton {
  private static dbInstance: DatabaseSingleton | null = null
  private sequelizeInstance: Sequelize
  constructor(dbconfig: SequelizeOptions) {
    this.sequelizeInstance = new Sequelize(dbconfig)
  }

  public static getInstance = (dbConfig: EnvConnectionWithModels): DatabaseSingleton => {
    if (!this.dbInstance) {
      const configuration: SequelizeOptions = {
        host: dbConfig.host,
        database: dbConfig.database,
        username: dbConfig.username,
        password: dbConfig.password,
        port: dbConfig.port,
        dialect: 'mysql',
        models: dbConfig.models,
        logging: false
      }
      this.dbInstance = new DatabaseSingleton(configuration)
    }
    return this.dbInstance
  }

  public getSequelizeInstance = (): Sequelize => {
    return this.sequelizeInstance
  }
}

export default DatabaseSingleton
