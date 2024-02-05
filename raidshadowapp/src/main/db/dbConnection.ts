import DatabaseSingleton from './DatabaseSingleton'
import User from '../models/Users.model'
import Points from '../models/Points.model'
import Criterias from '../models/Criterias.model'
import CriteriaValues from '../models/CriteriaValues.model'
import {dbConfig} from '../config/enviroments.config'
import {EnvConnectionObject} from '../types/env.connection'

const connectionConfig: EnvConnectionObject = {
  host: dbConfig.host,
  database: dbConfig.database,
  username: dbConfig.username,
  password: dbConfig.password,
  port: dbConfig.port,
  dialect: dbConfig.dialect
}

const { getSequelizeInstance } = DatabaseSingleton.getInstance({
  ...connectionConfig,
  models: [User, Points, Criterias, CriteriaValues]
})

export default getSequelizeInstance
