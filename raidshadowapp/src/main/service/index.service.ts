import { USER, CRITERIAS, CRVALUES } from '../db/dbConnection'
import CriteriaDao from '../dao/criteria.dao'
import CriteriaService from './criteria.service'
import CriteriaController from '../controller/criteria.controller'
import UserDao from '../dao/user.dao'
import UserService from './user.service'
import UserController from '../controller/user.controller'
import ValuesDao from '../dao/values.dao'
import ValuesService from './cvalues.service'
import ValuesController from '../controller/Cvalues.controller'

const userService = new UserController(new UserService(new UserDao(USER)))
const criteriaService = new CriteriaController(new CriteriaService(new CriteriaDao(CRITERIAS)))
const valuesService = new ValuesController(new ValuesService(new ValuesDao(CRVALUES)))

export { userService, criteriaService, valuesService }
