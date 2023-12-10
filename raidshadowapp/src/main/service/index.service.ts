import UserDao from '../dao/user.dao'
import { USER } from '../db/dbConnection'
import UserService from './user.service'

const userService = new UserService(new UserDao(USER))

export { userService }
