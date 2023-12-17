import CriteriaDao from '../dao/criteria.dao'
import UserDao from '../dao/user.dao'
import { USER, CRITERIAS } from '../db/dbConnection'
import CriteriaService from './criteria.service'
import UserService from './user.service'

const userService = new UserService(new UserDao(USER))
const criteriaService = new CriteriaService(new CriteriaDao(CRITERIAS))

export { userService, criteriaService }
