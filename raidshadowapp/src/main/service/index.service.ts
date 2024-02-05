import User from '../models/Users.model'
import CriteriaValues from '../models/CriteriaValues.model'
import Criterias from '../models/Criterias.model'
// import Points from '../models/Points.model'

import CriteriaDao from '../dao/criteria.dao'
import CriteriaService from './criteria.service'
import CriteriaController from '../controller/criteria.controller'
import UserDao from '../dao/user.dao'
import UserService from './user.service'
import UserController from '../controller/user.controller'
import ValuesDao from '../dao/values.dao'
import ValuesService from './cvalues.service'
import ValuesController from '../controller/Cvalues.controller'

const userService = new UserController(new UserService(new UserDao(User)))
const criteriaService = new CriteriaController(new CriteriaService(new CriteriaDao(Criterias)))
const valuesService = new ValuesController(new ValuesService(new ValuesDao(CriteriaValues)))

export { userService, criteriaService, valuesService }
