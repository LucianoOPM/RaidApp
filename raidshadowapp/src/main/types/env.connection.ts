import CriteriaValues from "../models/CriteriaValues.model"
import Criterias from "../models/Criterias.model"
import Points from "../models/Points.model"
import User from "../models/Users.model"

interface EnvConnectionObject {
  host: string | undefined
  database: string | undefined
  username: string | undefined
  password: string | undefined
  port: number | undefined
  dialect: string | undefined
}

interface EnvConnectionWithModels extends EnvConnectionObject{
  models: [typeof User, typeof Points, typeof Criterias, typeof CriteriaValues]
}

export type {EnvConnectionObject, EnvConnectionWithModels}
